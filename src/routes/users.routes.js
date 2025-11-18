const { Router } = require('express')

// Objeto de rotas
const usersRoutes = Router()

// Importa o Controller
const UsersController = require('../controllers/UsersController')

// Instancia o Controller
const usersController = new UsersController()

// Rotas
usersRoutes.get('/', usersController.index)
usersRoutes.get('/:id', usersController.show)
usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', usersController.update)
usersRoutes.delete('/:id', usersController.delete)

// Export
module.exports = usersRoutes
