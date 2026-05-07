const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'mf-secret-key-change-in-production';

// Arquivo de dados
const DATA_FILE = path.join(__dirname, 'usuarios.json');

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const schema = buildSchema(`
    type User {
        id: ID!
        email: String!
        nome: String!
        createdAt: String!
        ultimoAcesso: String
    }

    type AuthPayload {
        success: Boolean!
        message: String!
        user: User
    }

    type Query {
        verificarToken: AuthPayload!
        meuPerfil: User
        emailExiste(email: String!): Boolean!
    }

    type Mutation {
        cadastro(email: String!, senha: String!, nome: String): AuthPayload!
        login(email: String!, senha: String!): AuthPayload!
        logout: AuthPayload!
    }
`);

async function getUsuarios() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        const inicial = { usuarios: [] };
        await saveUsuarios(inicial);
        return inicial;
    }
}

async function saveUsuarios(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function getUserFromToken(token) {
    if (!token) return null;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const db = await getUsuarios();
        const user = db.usuarios.find(u => u.id === decoded.userId);
        return user || null;
    } catch (error) {
        return null;
    }
}

const root = {
    // Queries
    verificarToken: async ({}, context) => {
        const token = context.req.cookies?.token;
        const user = await getUserFromToken(token);
        
        return {
            success: !!user,
            message: user ? 'Token válido' : 'Token inválido',
            user: user ? {
                id: user.id,
                email: user.email,
                nome: user.nome,
                createdAt: user.createdAt,
                ultimoAcesso: user.ultimoAcesso
            } : null
        };
    },

    meuPerfil: async ({}, context) => {
        const token = context.req.cookies?.token;
        const user = await getUserFromToken(token);
        
        if (!user) throw new Error('Não autorizado');
        
        return {
            id: user.id,
            email: user.email,
            nome: user.nome,
            createdAt: user.createdAt,
            ultimoAcesso: user.ultimoAcesso
        };
    },

    emailExiste: async ({ email }) => {
        const db = await getUsuarios();
        return db.usuarios.some(u => u.email === email);
    },

    cadastro: async ({ email, senha, nome }, context) => {
        // Validações
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios');
        }
        
        if (senha.length < 6) {
            throw new Error('Senha deve ter pelo menos 6 caracteres');
        }
        
        const db = await getUsuarios();
        
        // Verifica se email já existe
        if (db.usuarios.find(u => u.email === email)) {
            throw new Error('Email já cadastrado');
        }
        
        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);
        
        // Cria novo usuário
        const newUser = {
            id: Date.now().toString(),
            email,
            nome: nome || email.split('@')[0],
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            ultimoAcesso: null,
            role: "user"
        };
        
        db.usuarios.push(newUser);
        await saveUsuarios(db);
        
        // Cria token JWT
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        // Armazena token em cookie
        context.res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return {
            success: true,
            message: 'Cadastro realizado com sucesso!',
            user: {
                id: newUser.id,
                email: newUser.email,
                nome: newUser.nome,
                createdAt: newUser.createdAt,
                ultimoAcesso: newUser.ultimoAcesso,
                role: newUser.role
            }
        };
    },
    
    login: async ({ email, senha }, context) => {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios');
        }
        
        const db = await getUsuarios();
        const user = db.usuarios.find(u => u.email === email);
        
        if (!user) {
            throw new Error('Email ou senha inválidos');
        }
        
        // Verifica senha
        const isValid = await bcrypt.compare(senha, user.password);
        
        if (!isValid) {
            throw new Error('Email ou senha inválidos');
        }
        
        // Atualiza último acesso
        user.ultimoAcesso = new Date().toISOString();
        await saveUsuarios(db);
        
        // Cria token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        // Define cookie
        context.res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return {
            success: true,
            message: 'Login realizado com sucesso!',
            user: {
                id: user.id,
                email: user.email,
                nome: user.nome,
                createdAt: user.createdAt,
                ultimoAcesso: user.ultimoAcesso
            }
        };
    },
    
    logout: async ({}, context) => {
        context.res.clearCookie('token');
        return {
            success: true,
            message: 'Logout realizado com sucesso!',
            user: null
        };
    }
};

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { req, res }
})));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'Backend GraphQL rodando! Acesse /graphql' });
});

// Inicia servidor
async function start() {
    await getUsuarios();
    
    app.listen(PORT, () => {
        console.log(`
╔═════════════════════════════════════════════════╗
║   🚀 Backend GraphQL rodando!                   ║
╠═════════════════════════════════════════════════╣
║   📡 Porta: ${PORT}                             ║
║   🔗 GraphQL: http://localhost:${PORT}/graphql  ║
║   ✅ Health: http://localhost:${PORT}/health    ║
╚═════════════════════════════════════════════════╝
        `);
    });
}

start();