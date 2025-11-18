const knex = require('../../database')
const AppError = require('../../utils/AppError')
const bcrypt = require('bcryptjs')

class UserUpdateService {
  /**
   * Atualiza os dados de um usuário, incluindo a senha, se fornecida.
   * @param {number} user_id - ID do usuário.
   * @param {object} data - Dados a serem atualizados.
   */
  async execute(
    user_id,
    { name, email, password, old_password, status, role }
  ) {
    // 1. Buscas e Validações Iniciais (Englobadas por um try...catch principal)
    try {
      // BUSCA O USUÁRIO EXISTENTE
      const user = await knex('usuarios').where({ id: user_id }).first()

      if (!user) {
        throw new AppError('Usuário não encontrado.', 404)
      }

      // VERIFICA SE O NOVO EMAIL JÁ ESTÁ EM USO POR OUTRO USUÁRIO
      if (email && email !== user.email) {
        const emailInUse = await knex('usuarios').where({ email }).first()
        if (emailInUse) {
          throw new AppError(
            'Este novo e-mail já está em uso por outro usuário.',
            409
          )
        }
      }

      // ATUALIZAÇÃO DE SENHA - Validação de campos
      if (password && !old_password) {
        throw new AppError(
          'Você precisa informar a senha antiga para definir uma nova senha.',
          400
        )
      }

      // ATUALIZAÇÃO DE SENHA - Comparações e Hashing
      if (password && old_password) {
        // COMPARA A SENHA ANTIGA COM O HASH ARMAZENADO
        const checkOldPassword = await bcrypt.compare(
          old_password,
          user.password
        )

        if (!checkOldPassword) {
          throw new AppError('A senha antiga não confere.', 401)
        }

        // HASHEA A NOVA SENHA ANTES DE SALVAR
        try {
          const saltRounds = 10
          user.password = await bcrypt.hash(password, saltRounds)
        } catch (error) {
          // Captura falhas na operação bcrypt
          console.error('Bcrypt Hashing Failed during update:', error)
          throw new AppError('Falha de segurança ao processar nova senha.', 500)
        }
      }

      // ATUALIZA OS DADOS NO OBJETO LOCAL
      user.name = name ?? user.name
      user.email = email ?? user.email
      user.status = status ?? user.status
      user.role = role ?? user.role

      // GARANTE QUE O UPDATED_AT SEJA ATUALIZADO
      const updated_at = knex.fn.now()

      // EXECUTA A ATUALIZAÇÃO NO BANCO DE DADOS
      await knex('usuarios').where({ id: user_id }).update({
        name: user.name,
        email: user.email,
        password: user.password,
        status: user.status,
        role: user.role,
        updated_at
      })

      return // Retorno vazio (204 No Content)
    } catch (error) {
      // Se for um AppError (nosso erro de negócio), apenas repassa
      if (error instanceof AppError) {
        throw error
      }
      // Captura erros inesperados do DB ou do sistema
      console.error('Database Update Failed:', error)
      throw new AppError(
        'Não foi possível atualizar o usuário devido a um erro interno.',
        500
      )
    }
  }
}

module.exports = UserUpdateService
