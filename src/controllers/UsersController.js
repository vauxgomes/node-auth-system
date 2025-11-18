// Importa o serviço específico da pasta Users
const UserCreateService = require('../services/Users/UserCreateService')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    // Instancia o serviço
    const userCreateService = new UserCreateService()

    // Chama o método execute do serviço, passando os dados
    // Se o serviço for executado sem lançar um AppError, o cadastro foi um sucesso.
    await userCreateService.execute({ name, email, password })

    // Retorna status 201 (Created) sem conteúdo.
    return response.status(201).json()
  }
}

module.exports = UsersController
