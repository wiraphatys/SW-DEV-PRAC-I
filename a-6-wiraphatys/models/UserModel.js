const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// email regex pattern defining
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please add a name."]
    },

    email : {
        type: String,
        required: [true, "Please add a email."],
        unique: true,
        match: [emailRegex, "Please add valid email address."]
    },

    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    password : {
        type: String,
        required: [true, "Please add a password."],
        minlength: 6,
        select: false
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,

    createdAt : {
        type: Date,
        default: Date.now()
    }
})

// Encrpyt password using bcryptjs
UserSchema.pre("save", async function(next) {
    const salt = await bcrpyt.genSalt(10)
    this.password = await bcrpyt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Matching password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return bcrpyt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)