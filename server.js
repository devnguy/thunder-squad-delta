const express = require('express')
const bodyParser = require('body-parser')

// Create global app object.
const app = express()

// Standard express config.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'))

app.get('/test', (req, res) => {
  res.send('Hello from the server')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
