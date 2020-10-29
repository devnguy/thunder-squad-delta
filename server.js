const express = require('express')
const app = express()

app.get('/test', (req, res) => {
  res.send('Hello from the server')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
