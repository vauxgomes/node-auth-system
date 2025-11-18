// src/middlewares/ensureAuthorized.js

const AppError = require('../utils/AppError')

/**
 * Retorna uma função middleware para verificar a role do usuário.
 * @param {Array<string>} allowedRoles - Array de roles (papéis) que têm permissão para acessar a rota (ex: ['admin']).
 * @returns {function} Uma função middleware do Express.
 */
function ensureAuthorized(allowedRoles) {
  // A função retornada é o middleware do Express (req, res, next)
  return (request, response, next) => {
    const userRole = request.user?.role

    if (!userRole) {
      // Se por algum motivo o role não estiver anexado (erro de implementação), negar acesso.
      throw new AppError('Informação de papel de usuário (role) ausente.', 500)
    }

    // VERIFICAÇÃO DO PAPEL
    // Verifica se o papel do usuário (userRole) está incluído no array de papéis permitidos.
    const isAuthorized = allowedRoles.includes(userRole)

    if (!isAuthorized) {
      // Retorna 403 Forbidden (Acesso negado)
      throw new AppError(
        'Acesso negado. Você não possui as permissões necessárias.',
        403
      )
    }

    return next() // Acesso concedido
  }
}

module.exports = ensureAuthorized
