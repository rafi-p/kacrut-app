require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use()

app.listen(port, () => console.log('listening at ' + port))