const { Router } = require('express')

const routes = Router()

// Imports
const usersRoutes = require('./users.routes')

// Rotas
routes.use('/users', usersRoutes)

// Export
module.exports = routes
