// Middleware function to log incoming requests
const routeLogger = (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`)
  next()
}

// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  return res.status(500).json({ error: 'Internal Server Error' })
}

module.exports = { routeLogger, errorHandler }
