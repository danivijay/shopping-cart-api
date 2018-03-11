const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY || 'secret'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log('token', token)
    const decoded = jwt.verify(token, jwtKey)
    req.userData = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
  
}
