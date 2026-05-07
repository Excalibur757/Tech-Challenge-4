// lib/graphql-client.js (no seu MF login)
const GRAPHQL_URL = 'http://localhost:3000/graphql';

async function graphqlRequest(query, variables = {}) {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para enviar cookies
        body: JSON.stringify({ query, variables })
    });
    
    const result = await response.json();
    
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }
    
    return result.data;
}

// Mutations para usar no seu componente
export const mutations = {
    async cadastro(email, senha, nome) {
        const query = `
            mutation Cadastro($email: String!, $senha: String!, $nome: String) {
                cadastro(email: $email, senha: $senha, nome: $nome) {
                    success
                    message
                    user {
                        id
                        email
                        nome
                    }
                }
            }
        `;
        
        const result = await graphqlRequest(query, { email, senha, nome });
        return result.cadastro;
    },
    
    async login(email, senha) {
        const query = `
            mutation Login($email: String!, $senha: String!) {
                login(email: $email, senha: $senha) {
                    success
                    message
                    user {
                        id
                        email
                        nome
                    }
                }
            }
        `;
        
        const result = await graphqlRequest(query, { email, senha });
        return result.login;
    },
    
    async logout() {
        const query = `
            mutation Logout {
                logout {
                    success
                    message
                }
            }
        `;
        
        const result = await graphqlRequest(query);
        return result.logout;
    }
};

// Queries
export const queries = {
    async verificarToken() {
        const query = `
            query VerificarToken {
                verificarToken {
                    success
                    message
                    user {
                        id
                        email
                        nome
                    }
                }
            }
        `;
        
        const result = await graphqlRequest(query);
        return result.verificarToken;
    },
    
    async meuPerfil() {
        const query = `
            query MeuPerfil {
                meuPerfil {
                    id
                    email
                    nome
                    ultimoAcesso
                }
            }
        `;
        
        const result = await graphqlRequest(query);
        return result.meuPerfil;
    }
};