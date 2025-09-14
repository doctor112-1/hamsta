import express from 'express'
import { JSONFilePreset } from 'lowdb/node'
import formidable, { errors as formidableErrors } from 'formidable';
import * as badwords from "badwords-list"
import { rateLimit } from 'express-rate-limit'
import * as gibberish from "./gibberishWrapper.cjs"
import 'dotenv/config'

const limiter = rateLimit({
  windowMs: 10 * 1000,
  limit: 1,
})

const defaultData = { posts: [] }
const db = await JSONFilePreset('db.json', defaultData)

const app = express()
const port = process.env.PORT

app.use(express.static('public'))

app.use(express.json())

app.set('trust proxy', 1)

app.use("/postResponse", limiter)

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
  let badWord;

  for (let i = 0; i < badwords.array.length; i++) {
    if (fields.response[0].includes(badwords.array[i])) {
      badWordsDetected = true
      badWord = badwords.array[i]
      break
    }
  }

  try {
    if (badWordsDetected) {
      res.send(`no bad words, detected: ${badWord}`)
    } else if (fields.response[0].length < 50) {
      res.send("please write more than 50 characters")
    } else if (gibberish.gibberishWrapper(fields.response[0])) {
      res.send("detected gibberish please do not write gibberish")
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
