const { Router } = require('express')

const routes = Router()

// Imports
const usersRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')

// Rotas
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

// Export
module.exports = routes
