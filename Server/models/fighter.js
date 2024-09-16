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
		// remove this rule it's not applied to anything. If you wanted to apply this rule to the above `skills` field you will need to, like the other fields, you would have to start with and object, declare a type, then set the rule (demo below). But you will not have to `required: false` here because by default it's already false. You will only have to pass that rule to a subdocument relationship if you wanted it required. So:
		// skills: {
		// 	type: [skillSchema],
		// 	required: true
		// }
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