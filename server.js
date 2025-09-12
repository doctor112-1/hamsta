import express from 'express'

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/getResponses', (req, res) => {
  res.send('not implemented yet')
})

app.post('/postResponse', async (req, res) => {
  res.send('POST request to the homepage')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
