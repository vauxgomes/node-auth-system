// Importa o serviço específico da pasta Users
const UserCreateService = require('../services/Users/UserCreateService')

class UsersController {
  // INDEX: Lista todos os usuários
  async index(request, response) {
    const userIndexService = new UserIndexService()
    const users = await userIndexService.execute()

    return response.json(users)
  }

  // SHOW: Exibe um usuário específico
  async show(request, response) {
    const { id } = request.params // ID vem do parâmetro da rota (ex: /users/1)

    const userShowService = new UserShowService()
    const user = await userShowService.execute(id)

    return response.json(user)
  }

  // CREATE: Cria um novo usuário
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

  // UPDATE: Atualiza dados do usuário
  async update(request, response) {
    // ID do usuário que será atualizado (vem do parâmetro da rota)
    const { id } = request.params
    // Dados a serem atualizados (vem do corpo da requisição)
    const { name, email, password, old_password, status, role } = request.body

    const userUpdateService = new UserUpdateService()
    await userUpdateService.execute(id, {
      name,
      email,
      password,
      old_password,
      status,
      role
    })

    return response.status(204).json() // 204 No Content (Sucesso sem retorno de corpo)
  }

  // DELETE: Remove um usuário
  async delete(request, response) {
    const { id } = request.params

    const userDeleteService = new UserDeleteService()
    await userDeleteService.execute(id)

    return response.status(204).json() // 204 No Content
  }
}

module.exports = UsersController
