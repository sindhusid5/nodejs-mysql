const express = require('express')
const app = express()
const routes = require('./routes/user')
const middleware = require('./middleware/routingMiddleware')
const { authenticate } = require('./middleware/autenticate')
require('dotenv').config()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(middleware.routeLogger) // Use routeLogger middleware to log incoming requests

app.post('/users/login', routes.loginUser)

app.use(authenticate)

app.get('/users', routes.getAllUsers)
app.get('/users/:id', authenticate, routes.getUserById)
app.post('/users', authenticate, routes.addUser)

app.use(middleware.errorHandler) // Use errorHandler middleware to handle errors

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
