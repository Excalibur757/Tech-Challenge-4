const bcrypt = require('bcryptjs');

const {
    getUsuarios,
    saveUsuarios
} = require('../repositories/user.repository');

const {
    getUserFromToken,
    generateToken
} = require('./token.service');

const {
    getLoginAttemptInfo,
    recordFailedAttempt,
    resetLoginAttempts,
    getRemainingLockoutTime
} = require('./login-attempt.service');

const logger = require('../utils/logger');

async function verificarToken(token) {

    const user =
        await getUserFromToken(token);

    return {
        success: !!user,

        message: user
            ? 'Token válido'
            : 'Token inválido',

        user: user ? {
            id: user.id,
            email: user.email,
            nome: user.nome,
            createdAt: user.createdAt,
            ultimoAcesso: user.ultimoAcesso
        } : null
    };
}

async function meuPerfil(token) {

    const user =
        await getUserFromToken(token);

    if (!user) {
        throw new Error('Não autorizado');
    }

    return {
        id: user.id,
        email: user.email,
        nome: user.nome,
        createdAt: user.createdAt,
        ultimoAcesso: user.ultimoAcesso
    };
}

async function emailExiste(email) {

    const db = await getUsuarios();

    return db.usuarios.some(
        u => u.email === email
    );
}

async function getLoginStatus(email) {

    const info =
        getLoginAttemptInfo(email);

    const lockoutTimeRemaining =
        getRemainingLockoutTime(email);

    return {
        attempts: info.attempts,

        remainingAttempts:
            info.remainingAttempts,

        isLocked:
            info.lockoutUntil !== null &&
            info.lockoutUntil > Date.now(),

        lockoutTimeRemaining
    };
}

async function cadastro(email, senha, nome) {

    logger.info(
        'Tentativa de cadastro',
        { email }
    );

    if (!email || !senha) {

        throw new Error(
            'Email e senha são obrigatórios'
        );
    }

    if (senha.length < 6) {

        throw new Error(
            'Senha deve ter pelo menos 6 caracteres'
        );
    }

    const db = await getUsuarios();

    const userExists =
        db.usuarios.find(
            u => u.email === email
        );

    if (userExists) {

        throw new Error(
            'Email já cadastrado'
        );
    }

    const hashedPassword =
        await bcrypt.hash(senha, 10);

    const newUser = {
        id: Date.now().toString(),
        email,
        nome: nome || email.split('@')[0],
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        ultimoAcesso: null,
        role: 'user'
    };

    db.usuarios.push(newUser);

    await saveUsuarios(db);

    const token =
        generateToken(newUser);

    return {
        success: true,

        message:
            'Cadastro realizado com sucesso!',

        token,

        user: {
            id: newUser.id,
            email: newUser.email,
            nome: newUser.nome,
            createdAt: newUser.createdAt,
            ultimoAcesso:
                newUser.ultimoAcesso
        }
    };
}

async function login(email, senha) {

    const startTime = Date.now();

    logger.info(
        'Tentativa de login recebida',
        { email }
    );

    if (!email || !senha) {

        throw new Error(
            'Email e senha são obrigatórios'
        );
    }

    const loginStatus =
        getLoginAttemptInfo(email);

    const isLocked =
        loginStatus.lockoutUntil !== null &&
        loginStatus.lockoutUntil > Date.now();

    const lockoutTimeRemaining =
        getRemainingLockoutTime(email);

    if (isLocked) {

        logger.security(
            'Tentativa bloqueada',
            {
                email,
                remaining:
                    lockoutTimeRemaining
            }
        );

        throw new Error(
            `Muitas tentativas. Tente novamente em ${lockoutTimeRemaining} segundos.`
        );
    }

    const db = await getUsuarios();

    const user =
        db.usuarios.find(
            u => u.email === email
        );

    if (!user) {

        const attemptInfo =
            recordFailedAttempt(email);

        const remaining =
            attemptInfo.remainingAttempts;

        if (remaining === 0) {

            throw new Error(
                'Email ou senha inválidos. Conta bloqueada por 1 minuto.'
            );
        }

        throw new Error(
            `Email ou senha inválidos. Você tem mais ${remaining} tentativa${remaining > 1 ? 's' : ''}.`
        );
    }

    const isValid =
        await bcrypt.compare(
            senha,
            user.password
        );

    if (!isValid) {

        const attemptInfo =
            recordFailedAttempt(email);

        const remaining =
            attemptInfo.remainingAttempts;

        if (remaining === 0) {

            throw new Error(
                'Email ou senha inválidos. Conta bloqueada por 1 minuto.'
            );
        }

        throw new Error(
            `Email ou senha inválidos. Você tem mais ${remaining} tentativa${remaining > 1 ? 's' : ''}.`
        );
    }

    resetLoginAttempts(email);

    logger.info(
        'Login realizado com sucesso',
        {
            userId: user.id,
            email: user.email,
            duration:
                `${Date.now() - startTime}ms`
        }
    );

    user.ultimoAcesso =
        new Date().toISOString();

    await saveUsuarios(db);

    const token =
        generateToken(user);

    return {
        success: true,

        message:
            'Login realizado com sucesso!',

        token,

        user: {
            id: user.id,
            email: user.email,
            nome: user.nome,
            createdAt: user.createdAt,
            ultimoAcesso:
                user.ultimoAcesso
        },

        remainingAttempts: 5,
        lockoutTimeRemaining: 0
    };
}

async function logout() {

    return {
        success: true,
        message:
            'Logout realizado com sucesso!',
        user: null
    };
}

module.exports = {
    verificarToken,
    meuPerfil,
    emailExiste,
    getLoginStatus,
    cadastro,
    login,
    logout
};