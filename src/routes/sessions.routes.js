const { Router } = require('express')

// Objeto de rotas
const sessionsRoutes = Router()

// Importa o Controller
const SessionsController = require('../controllers/SessionsController')

// Instancia o Controller
const sessionsController = new SessionsController()

// Rotas
sessionsRoutes.post('/', sessionsController.create)
// As demais rotas devem ser colocadas aqui

// Export
module.exports = sessionsRoutes
