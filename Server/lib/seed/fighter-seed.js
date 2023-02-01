const express = require('express')

const router = express.Router()

const Fighter = require('../../models/fighter')

const startingfighters = [
	{
		firstName: 'Anderson',
		lastName: 'Silva',
		skills: [],
		wins: 9,
		losses: 1,
		draws: 0,
	},
	{
	firstName: 'George',
		lastName: 'St.Pierre',
		skills: [],
		wins: 10,
		losses: 1,
		draws: 0,
	},
	{
		firstName: 'Nate',
		lastName: 'Diaz',
		skills: [],
		wins: 8,
		losses: 1,
		draws: 0,
	},
	{
		firstName: 'Forrest',
		lastName: 'Griffin',
		skills: [],
		wins: 7,
		losses: 1,
		draws: 0,
	},
	{
		firstName: 'Chuck',
		lastName: 'Lidell',
		skills: [],
		wins: 7,
		losses: 1,
		draws: 0,
	},
	{
		firstName: 'Rampage',
		lastName: 'Jackson',
		skills: [],
		wins: 7,
		losses: 1,
		draws: 0,
	},
	{
		firstName: 'John',
		lastName: 'Jones',
		skills: [],
		wins: 7,
		losses: 1,
		draws: 0,
	},
	{
		firstName: 'Bob',
		lastName: 'Sapp',
		skills: [],
		wins: 7,
		losses: 1,
		draws: 0,
	},
]

// /seed/fighters
router.get('/fighters', (req, res, next) => {
    Fighter.deleteMany({})
        .then(() => {
            Fighter.create(startingfighters)
                .then(fighters => {
                    res.status(200).json({ fighters: fighters })
                })
        })
        .catch(next)
})

module.exports = router