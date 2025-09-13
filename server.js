import express from 'express'
import { JSONFilePreset } from 'lowdb/node'

const defaultData = { posts: [] }
const db = await JSONFilePreset('db.json', defaultData)

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/getResponses', (req, res) => {
  res.send('not implemented yet')
})

app.post('/postResponse', async (req, res) => {
  await db.update(({ posts }) => posts.push('hello world'))
  res.send('POST request to the homepage')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
