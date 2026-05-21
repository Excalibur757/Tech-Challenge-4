const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type User {
        id: ID!
        email: String!
        nome: String!
        createdAt: String!
        ultimoAcesso: String
    }

    type LoginStatus {
        attempts: Int!
        remainingAttempts: Int!
        isLocked: Boolean!
        lockoutTimeRemaining: Int!
    }

    type AuthPayload {
        success: Boolean!
        message: String!
        user: User
        remainingAttempts: Int
        lockoutTimeRemaining: Int
    }

    type Query {
        verificarToken: AuthPayload!
        meuPerfil: User
        emailExiste(email: String!): Boolean!
        getLoginStatus(email: String!): LoginStatus!
    }

    type Mutation {
        cadastro(email: String!, senha: String!, nome: String): AuthPayload!
        login(email: String!, senha: String!): AuthPayload!
        logout: AuthPayload!
    }
`);

module.exports = schema;