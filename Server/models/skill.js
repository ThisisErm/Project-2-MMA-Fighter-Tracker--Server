const mongoose = require('mongoose')

const Schema = mongoose.Schema

const skillSchema = new Schema(
    {
        // Remove the [] around this String. We just want a single string not many strings
        title: [String],
    }
)

module.exports = skillSchema
