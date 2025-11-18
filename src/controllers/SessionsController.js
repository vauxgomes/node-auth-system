const SessionCreateService = require('../services/Session/SessionCreateService') // Importa o Service
const jwt = require('jsonwebtoken')

const authConfig = require('../configs/auth')
const { secret, expiresIn } = authConfig.jwt

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    // CHAMADA AO SERVICE
    const sessionCreateService = new SessionCreateService()
    const user = await sessionCreateService.execute({ email, password })

    // GERAÇÃO DO JSON WEB TOKEN (JWT)
    const token = jwt.sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    })

    // Remove a senha do objeto de resposta
    delete user.password

    // 3. RETORNO DO TOKEN e USUÁRIO
    return response.json({ user, token })
  }
}

module.exports = SessionsController
