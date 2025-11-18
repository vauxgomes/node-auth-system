const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  // Pega o token do header de autorização
  const authHeader = request.headers.authorization

  // VERIFICA SE O TOKEN EXISTE
  if (!authHeader) {
    throw new AppError('JWT Token não informado.', 401)
  }

  // ["Bearer", "TOKEN_AQUI"]
  const [, token] = authHeader.split(' ')

  // VERIFICA A VALIDADE DO TOKEN
  try {
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret)

    // ANEXA O ID DO USUÁRIO À REQUISIÇÃO
    request.user = {
      id: Number(user_id),
      role
    }

    return next() // Prossegue para o controller
  } catch (error) {
    // Se a verificação falhar (expirado, assinatura inválida, etc.)
    throw new AppError('JWT Token inválido.', 401)
  }
}

module.exports = ensureAuthenticated
