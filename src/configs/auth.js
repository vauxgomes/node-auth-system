module.exports = {
  jwt: {
    // A chave secreta é lida do .env e usada para assinar o token.
    secret: process.env.AUTH_SECRET,
    // Tempo de expiração do token (Ex: '1d' = 1 dia, '1h' = 1 hora)
    expiresIn: '1d'
  }
}
