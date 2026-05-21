import { graphqlRequest } from "../graphql/graphqlClient";

export async function verificarTokenService() {
  return graphqlRequest(`
    query {
      verificarToken {
        success
        user {
          email
          nome
        }
      }
    }
  `);
}

export async function logoutService() {
  return graphqlRequest(`
    mutation {
      logout {
        success
      }
    }
  `);
}