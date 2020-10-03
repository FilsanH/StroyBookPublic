const express = require('express')
const dotenv = require('dotenv')

//Load config
dotenv.config({ path: './config/config.env' }) // put all of our global variables
const app = express()

const PORT = process.env.PORT || 5000 //.env access defined variables

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
