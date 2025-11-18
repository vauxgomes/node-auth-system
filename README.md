# Sistema de Autenticação JWT e Bcrypt (Node.js/Express)

## Sumário do Projeto

Este projeto implementa a fundação de uma **API RESTful** com um sistema de **Autenticação e Autorização** robusto e moderno. A arquitetura segue o padrão de **Camadas (Controller-Service)** para separar responsabilidades, garantindo código limpo e escalável.

O núcleo da segurança é formado por:

1. **Segurança de Credenciais:** As senhas dos usuários são armazenadas utilizando o algoritmo de _hashing_ **Bcrypt**, garantindo que as senhas nunca sejam expostas em texto simples.

1. **Sessões Stateless**: A aplicação utiliza **JSON Web Tokens (JWT)** para criar sessões sem estado. Após o login, um token assinado digitalmente é emitido, contendo a identidade do usuário (`sub`). O servidor valida este token em cada requisição protegida.

## Inicialização do Projeto

### Dependências Core

O projeto é construído sobre as seguintes tecnologias:

| Categoria          | Tecnologia           | Uso                                           |
| ------------------ | -------------------- | --------------------------------------------- |
| **Framework**      | Express              | Roteamento e manipulação de requisições HTTP. |
| **Banco de Dados** | Knex (Query Builder) | Interação com o banco de dados (SQLite).      |
| **Segurança**      | BcryptJS             | _Hashing_ seguro e comparação de senhas.      |
| **Autenticação**   | JSON Web Token (JWT) | Emissão e verificação de tokens de acesso.    |
| Utilidade          | Dotenv               | Gerenciamento de variáveis de ambiente.       |

### Executando o Script de Setup

O _script_ de setup cria a estrutura de pastas e arquivos vazios essenciais para o projeto.

#### Unix (Linux/macOS)

```bash
chmod +x setup.sh
./setup.sh
```

#### Windows (PowerShell)

```PowerShell
./setup.ps1
```

### Comandos Essenciais

🔑Após o `setup` e a instalação das dependências, adicione estes comandos no seu `package.json` e execute-os:

| Comando                   | Descrição                                                    |
| ------------------------- | ------------------------------------------------------------ |
| `npm run dev`             | Inicia o servidor Node.js com nodemon (reload automático).   |
| `npx knex migrate:latest` | Executa as migrações pendentes para criar a tabela usuarios. |

### Variáveis de Ambiente

Crie um arquivo chamado .env na raiz do projeto (copiando do .env.example) e preencha as variáveis. Este arquivo não deve ser versionado.

```
# Variável de Ambiente para a Porta
PORT=3333

# Segredo do JWT (Deve ser uma string longa e complexa)
# Use uma chave longa e aleatória (ex: gerada por um gerador de senhas).
AUTH_SECRET="sua_chave_secreta_jwt_muito_longa_e_aleatoria"
```
