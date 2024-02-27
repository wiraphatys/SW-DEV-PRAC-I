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

// mongo sanitize
const mongoSanitize = require('express-mongo-sanitize')
app.use(mongoSanitize())

// helmet
const helmet = require('helmet')
app.use(helmet())

// xss
const {xss} = require('express-xss-sanitizer')
app.use(xss())

// express rate limit
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 10*60*1000,    // 10 min
    max: 100
})
app.use(limiter)

// http params pollutions
const hpp = require('hpp')
app.use(hpp())

// CORS : Cross Origin Resource Sharing
const cors = require('cors')
app.use(cors)
// router
app.use("/api/v1/hospitals", require('./routes/hospitalRouter'))
app.use("/api/v1/auth", require('./routes/authRouter'))
app.use("/api/v1/appointments", require('./routes/appointmentRouter'))

const server = app.listen(PORT, () => {
    console.log(`This server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})