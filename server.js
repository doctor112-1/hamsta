import express from 'express'
import { JSONFilePreset } from 'lowdb/node'
import formidable, { errors as formidableErrors } from 'formidable';
import * as badwords from "badwords-list"

const defaultData = { posts: [] }
const db = await JSONFilePreset('db.json', defaultData)

const app = express()
const port = 3000

app.use(express.static('public'))

app.use(express.json())

app.get('/getResponses', async (req, res) => {
  await db.read()
  res.send(db.data)
})

app.post('/postResponse', async (req, res) => {
  const form = formidable({})
  let fields
  let files
  try {
    [fields, files] = await form.parse(req)
  } catch (err) {
    res.send("error: " + err)
  }

  let badWordsDetected = false

  for (let i = 0; i < badwords.array.length; i++) {
    if (fields.response[0].includes(badwords.array[i])) {
      badWordsDetected = true
      break
    }
  }

  try {
    if (badWordsDetected) {
      res.send("no bad words")
    } else {
      await db.update(({ posts }) => posts.push(fields.response[0]))
      res.send("posted successfully")
    }
  } catch (err) {
    res.send("error: " + err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
