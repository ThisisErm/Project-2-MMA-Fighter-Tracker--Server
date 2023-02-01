const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {//field - email unique: true
        email: {
            type: String,
            required: true,
            unique: true, 
        },

        password: {
            type: String,
            required: true,
        },
        token: String,
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, user) => {
                delete user.password
                return user
            },
        },
    }

)

module.exports = mongoose.model('User', userSchema)