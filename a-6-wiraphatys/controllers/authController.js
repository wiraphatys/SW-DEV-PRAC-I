// import User model
const User = require('../models/UserModel')

// define function for send token response
const sendTokenResponse = ((user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode).cookie('token', token, options).send({
        success: true,
        token
    })
})

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = (async (req, res, next) => {
    try {
        const {name , email , password , role} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        sendTokenResponse(user, 200, res)

    } catch (e) {
        res.status(400).send({
            success: false
        })
        console.log(e.stack)
    }
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = (async (req, res, next) => {
    const {email , password} = req.body

    // validation email and password cannot be empty string
    if (!email || !password) {
        res.status(400).send({
            success: false,
            msg: "Please provide an email and password."
        })
    }

    // check for user
    const user = await User.findOne({email}).select('+password');

    // if user not found
    if (!user) {
        res.status(400).send({
            success: false,
            msg: "Invalid credentials"
        })
    }

    // defind isMatch
    const isMatch = await user.matchPassword(password);

    // if password is not match
    if (!isMatch) {
        res.status(401).send({
            success: false,
            message: "Invalid credentials"
        })
    }

    sendTokenResponse(user, 200, res)

})

// @desc    Get current Logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = (async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).send({
        success: true,
        data: user
    })
})