#!/bin/bash

# 1. Instalação e Configuração
# echo "Inicializando projeto Node.js e instalando dependências..."
# npm init -y

# Instalação de dependências principais
# npm install express sqlite3 knex bcryptjs jsonwebtoken express-async-errors

# Instalação de dependências de desenvolvimento
# npm install nodemon dotenv --save-dev

# 2. Criação da Estrutura de Pastas e Arquivos
echo "Criando estrutura de pastas e arquivos..."
mkdir -p src/{controllers,database,middlewares,routes,services,utils}
touch .env .env.example # .gitignore knexfile.js
touch src/server.js src/routes/index.js src/database/index.js src/utils/AppError.js

mkdir src/database/{migrations,seeds}
touch src/{controllers,database/migrtions,database/seeds,middlewares,services}/.gitkeep


# 3. Configuração Inicial do .gitignore
# echo "Configurando .gitignore..."
# echo -e "node_modules/\n.env\n*.db" > .gitignore

# echo "Setup inicial concluído. Não se esqueça de adicionar o 'dev' script ao package.json!"