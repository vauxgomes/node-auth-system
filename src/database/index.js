const knex = require('knex');
const knexConfig = require('../../knexfile'); // Importa o arquivo de configuração

// Exporta a conexão inicializada do Knex usando o ambiente 'development'
const connection = knex(knexConfig.development);

module.exports = connection;
