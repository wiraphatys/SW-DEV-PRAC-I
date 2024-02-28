// define express
const express = require('express')
const app = express()

app.use(express.json())

// define .env
const dotenv = require('dotenv')
dotenv.config({path: "./config/config.env"})

// connect database
const connectDB = require('./config/db')
connectDB()

// define port
const PORT = process.env.PORT || 3000;

// router
app.use("/api/v1/hospitals", require('./routes/hospitalRouter'))


const server = app.listen(PORT, () => {
    console.log(`This server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})