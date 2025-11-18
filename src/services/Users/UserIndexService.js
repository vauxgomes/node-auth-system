const knex = require('../../database')

class UserIndexService {
  /**
   * Lista todos os usuários.
   * @returns {Promise<Array<object>>} Uma lista de todos os usuários (sem a senha).
   */
  async execute() {
    try {
      // BUSCA TODOS OS USUÁRIOS, SELECIONANDO EXPLICITAMENTE OS CAMPOS PARA EXCLUIR A SENHA
      const users = await knex('usuarios').select(
        'id',
        'name',
        'email',
        'status',
        'role',
        'created_at',
        'updated_at'
      )

      return users
    } catch (error) {
      // Captura erros inesperados do DB (ex: falha de conexão)
      console.error('Database Index Failed:', error)
      throw new AppError(
        'Não foi possível listar os usuários devido a um erro interno.',
        500
      )
    }
  }
}

module.exports = UserIndexService
