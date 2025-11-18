const knex = require('../../database')
const AppError = require('../../utils/AppError')

class UserDeleteService {
  /**
   * Deleta um usuário.
   * @param {number} user_id - O ID do usuário a ser deletado.
   */
  async execute(user_id) {
    try {
      const rowsDeleted = await knex('usuarios').where({ id: user_id }).delete()

      if (rowsDeleted === 0) {
        // SE NÃO HOUVER LINHAS DELETADAS, O USUÁRIO NÃO EXISTIA OU NÃO FOI ENCONTRADO
        throw new AppError('Usuário não encontrado para exclusão.', 404)
      }
    } catch (error) {
      // Se for um AppError (nosso erro de negócio), apenas repassa
      if (error instanceof AppError) {
        throw error
      }
      
      // Captura erros inesperados do DB ou do sistema
      console.error('Database Deletion Failed:', error)
      throw new AppError(
        'Não foi possível excluir o usuário devido a um erro interno.',
        500
      )
    }
    return // RETORNO VAZIO (204 NO CONTENT)
  }
}

module.exports = UserDeleteService
