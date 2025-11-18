const knex = require('../../database')
const AppError = require('../../utils/AppError')

class UserShowService {
  /**
   * Busca um usuário específico por ID.
   * @param {number} user_id - O ID do usuário a ser buscado.
   * @returns {Promise<object>} O objeto do usuário (sem a senha).
   */
  async execute(user_id) {
    try {
      // BUSCA O USUÁRIO NO DB
      const user = await knex('usuarios').where('id', user_id).first()

      if (!user) {
        throw new AppError('Usuário não encontrado.', 404)
      }

      // GARANTE QUE A SENHA NÃO SEJA RETORNADA
      delete user.password

      return user
    } catch (error) {
      // Se for um AppError (nosso erro de negócio), apenas repassa
      if (error instanceof AppError) {
        throw error
      }
      // Captura erros inesperados do DB
      console.error('Database Show Failed:', error)
      throw new AppError(
        'Não foi possível buscar o usuário devido a um erro interno.',
        500
      )
    }
  }
}

module.exports = UserShowService
