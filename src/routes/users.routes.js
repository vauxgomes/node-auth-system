const { Router } = require('express')

// Objeto de rotas
const usersRoutes = Router()

// Importa o Controller
const UsersController = require('../controllers/UsersController')

// Instancia o Controller
const usersController = new UsersController()

// Rotas
usersRoutes.post('/', usersController.create)
// As demais rotas devem ser colocadas aqui

// Export
module.exports = usersRoutes
