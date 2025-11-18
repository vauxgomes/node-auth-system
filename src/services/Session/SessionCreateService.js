const knex = require('../../database');
const AppError = require('../../utils/AppError');
const bcrypt = require('bcryptjs');

class SessionCreateService {
  /**
   * Executa a lógica de login: busca usuário e compara senha.
   * @returns {object} O objeto user encontrado (sem a senha).
   */
  async execute({ email, password }) {
    // 1. BUSCA O USUÁRIO PELO EMAIL
    const user = await knex('usuarios').where({ email }).first();

    if (!user) {
      throw new AppError('E-mail ou senha incorreta.', 401); 
    }

    // 2. COMPARAÇÃO DE SENHA com Bcrypt
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail ou senha incorreta.', 401);
    }

    // 3. RETORNA O USUÁRIO (A remoção da senha fica no Controller, ou use DTO)
    return user;
  }
}

module.exports = SessionCreateService;