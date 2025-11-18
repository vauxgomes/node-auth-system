// Imports
require('dotenv/config') // Carrega variáveis de ambiente do arquivo .env˝
require('express-async-errors') // Garante que erros assíncronos sejam capturados

// Express
const express = require('express')

// Local imports
const AppError = require('./utils/AppError')
const routes = require('./routes')
const knex = require('./database') // Apenas para garantir que a conexão Knex está disponível

// App
const app = express()
app.use(express.json()) // Permite que o Express leia o corpo das requisições como JSON
app.use(routes) // Roteamento

// Middleware Global de Tratamento de Erros
app.use((error, request, response, next) => {
  // Se o erro for uma instância do nosso AppError
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  // Erros de servidor (não previstos)
  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

// Inicialização do Servidor
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`🚀 Server is running on Port ${PORT}`))
