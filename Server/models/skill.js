const mongoose = require('mongoose')

const Schema = mongoose.Schema

const skillSchema = new Schema(
    {
        title: [String],
    }
)

module.exports = skillSchema
