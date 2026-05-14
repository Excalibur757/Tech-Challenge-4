// /login/services/auth.ts
const GRAPHQL_URL = 'http://localhost:3000/graphql';

interface LoginStatus {
  attempts: number;
  remainingAttempts: number;
  isLocked: boolean;
  lockoutTimeRemaining: number;
}

async function graphqlRequest(query: string, variables?: any): Promise<any> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    // Erro HTTP - isso é problema de servidor, não do usuário
    console.error('[DEBUG] Erro HTTP:', response.status);
    throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
  }

  const result = await response.json();
  
  if (result.errors) {
    // AQUI ESTÁ O PONTO CHAVE!
    // O GraphQL já retorna a mensagem amigável no errors[0].message
    // Não precisamos adicionar nada, só repassar a mensagem limpa
    const errorMessage = result.errors[0].message;
    console.error('[DEBUG] GraphQL Error:', errorMessage);
    throw new Error(errorMessage); // Mensagem já é amigável (ex: "Email ou senha inválidos. Você tem mais 3 tentativas.")
  }
  
  return result.data;
}

export async function getLoginStatus(email: string): Promise<LoginStatus> {
  const query = `
    query GetLoginStatus($email: String!) {
      getLoginStatus(email: $email) {
        attempts
        remainingAttempts
        isLocked
        lockoutTimeRemaining
      }
    }
  `;

  const data = await graphqlRequest(query, { email });
  return data.getLoginStatus;
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
        remainingAttempts
        lockoutTimeRemaining
      }
    }
  `;

  const data = await graphqlRequest(query, { email, senha: password });
  
  if (!data?.login?.success) {
    // Isso não deve acontecer porque o GraphQL já lançou erro
    throw new Error(data?.login?.message || 'Erro ao fazer login');
  }

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