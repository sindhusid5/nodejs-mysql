const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded token:', decoded) // Add this line for logging
    req.auth = { id: decoded.id }
    next()
  } catch (error) {
    console.error('Error decoding token:', error) // Add this line for logging
    return res.status(401).json({ error: 'Invalid token' })
  }
}

const authorizeUser = (req, res, next) => {
  const loggedInUserId = req.auth.id
  if (!loggedInUserId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  // Attach the id to the request object
  req.userId = loggedInUserId
  next()
}

module.exports = { authenticate, authorizeUser }
