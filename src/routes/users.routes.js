const { Router } = require('express')

// Objeto de rotas
const usersRoutes = Router()

// Importa o Controller
const UsersController = require('../controllers/UsersController')

// Middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

// Instancia o Controller
const usersController = new UsersController()

// Rotas públicas
usersRoutes.post('/', usersController.create)

// Rotas protegidas por autenticação
usersRoutes.get('/', ensureAuthenticated, usersController.index)
usersRoutes.get('/:id', ensureAuthenticated, usersController.show)
usersRoutes.put('/:id', ensureAuthenticated, usersController.update)
usersRoutes.delete('/:id', ensureAuthenticated, usersController.delete)

// Export
module.exports = usersRoutes
