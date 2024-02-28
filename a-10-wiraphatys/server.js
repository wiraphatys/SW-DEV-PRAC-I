// define express
const express = require('express')
const app = express()
app.use(express.json())     // use bodyParser

// swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// Swagger setup options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Library API",
            version: '1.0.0',
            description: "A simple Express API for managing a library"
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            }
        ],
    },
    // Ensure this path matches where your annotated route files are
    apis: ['./routes/*.js'],
};
const swaggerDoc = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

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
app.use(cors())
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