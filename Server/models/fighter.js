const mongoose = require('mongoose')
const skillSchema = require('./skill')

const Schema = mongoose.Schema

const fighterSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		skills: [skillSchema],
		required: false,

        wins: {
            type: Number,
            required: true,
			min: 0,
			max: 100    
        },
        losses: {
            type: Number,
            required: true,   
			min: 0,
			max: 100    
        },
        draws: {
            type: Number,
            required: true,  
			min: 0,
			max: 100     
        }
	},
	{
        timestamps: true
    }
)

// mongosh collection fighters
const Fighter = mongoose.model('Fighter', fighterSchema)

module.exports = Fighter