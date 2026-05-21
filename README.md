<h1 align="center">
  <a href="https://github.com/Excalibur757/Tech-Challenge-Fase-4">
    Tech Challenge - Fase 04
  </a>
</h1>

<p align="center">
  Aplicação de gerenciamento financeiro desenvolvida com foco em arquitetura moderna, performance, segurança e escalabilidade utilizando <strong>Next.js</strong>, <strong>GraphQL</strong> e <strong>Microfrontends</strong>.
</p>

<br />

## 📖 Índice

- 🎯 Sobre o Projeto
- ✨ Features
- 🏗️ Arquitetura
- ⚡ Performance e Otimização
- 🔐 Segurança
- 🛠️ Tecnologias Utilizadas
- 🚀 Executando o Projeto
- 🎥 Vídeo

<br />

# 🎯 Sobre o Projeto

Este projeto é a evolução do sistema de gerenciamento financeiro desenvolvido nas fases anteriores do Tech Challenge.  
O objetivo desta fase é aprimorar a aplicação com foco em escalabilidade, modularidade, segurança e performance, aplicando conceitos modernos de arquitetura front-end e boas práticas de organização de código.

A aplicação oferece funcionalidades essenciais para controle financeiro, como:

- Cadastro e autenticação segura de usuários
- Visualização de saldo e extrato 
- Filtros avançados e paginação  
- Persistência de dados em cache  
- Gráficos financeiros interativos
- Análise financeira com base no saldo

Toda a estrutura foi reorganizada com princípios inspirados em **Clean Architecture**, garantindo separação clara entre domínio, apresentação e infraestrutura.

<br />

# ✨ Features

- **Arquitetura Moderna:** Estrutura modular e organizada seguindo princípios inspirados em Clean Architecture, garantindo separação clara entre domínio, apresentação e infraestrutura.

- **Gerenciamento de Estado:** Estado global compartilhado de forma eficiente entre páginas e componentes, com atualização reativa da interface.

- **Performance e Otimização:** Carregamento inteligente de componentes, cache local, persistência de dados e otimização de cálculos para uma experiência fluida.

- **Segurança:** Autenticação robusta com proteção contra múltiplas tentativas, armazenamento seguro de credenciais e controle de acesso às páginas restritas.

- **Funcionalidades Financeiras:** Cadastro de transações, extrato com filtros avançados (categoria, tipo, valor, datas, busca textual), paginação, cálculo automático de saldo e gráficos interativos.

# 🏗️ Arquitetura

O projeto foi estruturado seguindo conceitos inspirados em Clean Architecture:

```bash
src/
├── app/
├── components/
├── context/
├── hooks/
├── domain/
│   └── useCases/
├── services/
├── styles/
└── utils/
```

### Separação das responsabilidades

| Camada         | Responsabilidade                        |
| -------------- | --------------------------------------- |
| Presentation   | Pages e Components                      |
| Domain         | Regras de negócio e UseCases            |
| Infrastructure | Cache, autenticação, GraphQL e serviços |

<br />

# ⚡ Performance e Otimização

As seguintes estratégias foram aplicadas para melhorar a experiência do usuário:

- Lazy loading de componentes pesados
- Cache local com `localStorage`
- Persistência de estado entre páginas
- Memoização de filtros e cálculos
- Loading states personalizados
- Atualizações reativas com hooks

<br />

# 🔐 Segurança

A aplicação implementa:

- Autenticação via GraphQL
- Verificação de sessão/token
- Armazenamento de token em cookie
- Hash de senhas
- Logout seguro com limpeza de cache
- Controle de tentativas de login
- Bloqueio temporário após múltiplas tentativas inválidas
- Controle de acesso às páginas protegidas

<br />

# 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando:

- [**Next.js**](https://nextjs.org/)
- [**React**](https://react.dev/)
- [**TypeScript**](https://www.typescriptlang.org/)
- **GraphQL**
- **Context API**
- **CSS Modules**
- **Microfrontends**
- **LocalStorage**

<br />

# 🚀 Executando o Projeto

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/pt-br/download)

<br />

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Excalibur757/Tech-Challenge-Fase-4.git
```

### 2. Acesse a pasta do projeto

```bash
cd Tech-Challenge-Fase-4
```

### 3. Instale as dependências

```bash
npm install
```

<br />

# ▶️ Executando a aplicação

```bash
npm run dev
```

Abra:

```bash
http://localhost:3001
```

<br />

# 🔑 Credenciais de Login

## Atenção

É possível criar sua própria conta, mas caso não queira, utilize as credenciais abaixo:

## Usuário de demonstração

### Email

```bash
demo@mfbank.com
```

### Senha

```bash
demo123
```

<br />

# 🎥 Vídeo

Adicione aqui o link do vídeo demonstrando a aplicação.

<br />

---

<p align="center">
  Feito por <strong>Kevin Santos (RM369050)</strong> e <strong>Pedro Moura (RM367447)</strong>.
</p>