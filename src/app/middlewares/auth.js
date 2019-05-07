const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(req.headers)
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }
  // Por padrao o Authorization vem no formato
  // Bearer TOKEN
  const [, token] = authHeader.split(' ')

  try {
    // promisify converte as funcoes que retornam um call back para promisses
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}
