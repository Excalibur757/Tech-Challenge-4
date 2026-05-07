// /login/services/auth.ts
const GRAPHQL_URL = 'http://localhost:3000/graphql';

async function graphqlRequest(query: string, variables?: any): Promise<any> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ESSENCIAL: envia e recebe cookies automagicamente
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result.data;
}

export async function login(email: string, password: string) {
  const query = `
    mutation Login($email: String!, $senha: String!) {
      login(email: $email, senha: $senha) {
        success
        message
        user {
          id
          email
          nome
          ultimoAcesso
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { email, senha: password });
  
  if (!data?.login?.success) {
    throw new Error(data?.login?.message || 'Erro ao fazer login');
  }

  // Não retorna mais token, pois ele está no cookie
  return {
    user: data.login.user
  };
}

export async function logout() {
  const query = `
    mutation Logout {
      logout {
        success
        message
      }
    }
  `;

  await graphqlRequest(query);
  // Não precisa limpar localStorage pois não usamos mais
}

export async function isAuthenticated() {
  const query = `
    query VerificarToken {
      verificarToken {
        success
        user {
          id
          email
          nome
        }
      }
    }
  `;

  try {
    const data = await graphqlRequest(query);
    return data.verificarToken.success;
  } catch (error) {
    return false;
  }
}

export async function getMe() {
  const query = `
    query MeuPerfil {
      meuPerfil {
        id
        email
        nome
        createdAt
        ultimoAcesso
      }
    }
  `;

  try {
    const data = await graphqlRequest(query);
    return data.meuPerfil;
  } catch (error) {
    return null;
  }
}