const { Router } = require('express')

// Objeto de rotas
const usersRoutes = Router()

// Importa o Controller
const UsersController = require('../controllers/UsersController')

// Middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureAuthorized = require('../middlewares/ensureAuthorized')

// Instancia o Controller
const usersController = new UsersController()

// Rotas públicas
usersRoutes.post('/', usersController.create)

// Rotas protegidas por autenticação
usersRoutes.get('/', ensureAuthenticated, usersController.index)
usersRoutes.get('/:id', ensureAuthenticated, usersController.show)

// Rotas protegidas por autenticação e autorização
usersRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAuthorized(['admin']),
  usersController.update
)
usersRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAuthorized(['admin']),
  usersController.delete
)

// Export
module.exports = usersRoutes
