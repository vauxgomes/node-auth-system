exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('usuarios', (table) => {
    // ID único para cada usuário (chave primária)
    table.increments('id')

    // Nome completo do usuário
    table.text('name').notNullable()

    // Email (usado para login e deve ser único)
    table.text('email').unique().notNullable()

    // Senha (armazenará o hash gerado pelo bcrypt)
    table.text('password').notNullable()

    // Status do Usuário (ex: 'active', 'inactive', 'pending')
    table
      .text('status')
      .defaultTo('active')
      .notNullable()
      .checkIn(['active', 'inactive', 'pending'])

    // Nível de Permissão (ex: 'admin', 'user')
    table
      .text('role')
      .defaultTo('user')
      .notNullable()
      .checkIn(['admin', 'user'])

    // Campos automáticos de timestamp (criado em/atualizado em)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('usuarios')
}
