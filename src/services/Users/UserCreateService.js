const knex = require('../../database')
const AppError = require('../../utils/AppError')
const bcrypt = require('bcryptjs') // Usamos bcryptjs para o hashing

class UserCreateService {
  /**
   * Executa a lógica de criação de um novo usuário.
   * @param {object} userData - Objeto contendo nome, email, senha.
   * @param {string} userData.name - O nome completo do usuário.
   * @param {string} userData.email - O e-mail (deve ser único).
   * @param {string} userData.password - A senha em texto simples.
   * @returns {Promise<number>} O ID do novo usuário criado.
   * @returns {number} O ID do novo usuário criado.
   */
  async execute({ name, email, password }) {
    // VERIFICAÇÃO DE DADOS MÍNIMOS
    if (!name || !email || !password) {
      throw new AppError(
        'Nome, e-mail e senha são obrigatórios para o cadastro.',
        400
      )
    }

    // VERIFICAÇÃO DE E-MAIL DUPLICADO
    const checkUserExists = await knex('usuarios').where({ email }).first()

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.', 409)
    }

    // HASHING DE SENHA (A Segurança)
    let hashedPassword

    try {
      const saltRounds = 10
      hashedPassword = await bcrypt.hash(password, saltRounds)
    } catch (error) {
      console.error('Bcrypt Hashing Failed:', error)
      throw new AppError(
        'Falha na segurança da aplicação. Tente novamente.',
        500
      )
    }

    // INSERÇÃO NO BANCO DE DADOS
    try {
      const [userId] = await knex('usuarios').insert({
        name,
        email,
        password: hashedPassword
      })
      
      return userId
    } catch (error) {
      console.error('Database Insert Failed:', error)
      throw new AppError(
        'Não foi possível registrar o usuário devido a um erro interno.',
        500
      )
    }
  }
}

module.exports = UserCreateService
