// define express
const express = require('express')
const app = express()
app.use(express.json())     // use bodyParser

// define port
const PORT = process.env.PORT || 3000;

// define .env
const dotenv = require('dotenv')
dotenv.config({path: "./config/config.env"})

// connect database
const connectDB = require('./config/db')
connectDB()

// cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// router
app.use("/api/v1/hospitals", require('./routes/hospitalRouter'))
app.use("/api/v1/auth", require('./routes/authRouter'))

const server = app.listen(PORT, () => {
    console.log(`This server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})