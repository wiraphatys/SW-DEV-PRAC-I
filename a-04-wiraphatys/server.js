// define express
const express = require('express')
const app = express()

// define .env
const dotenv = require('dotenv')
dotenv.config({path: "./config/config.env"})

// define port
const PORT = process.env.PORT || 3000;

// router
app.use("/api/v1/hospitals", require('./routes/hospitalRouter'))


app.listen(PORT, () => {
    console.log(`This server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})