const express =require('express')
const { handle404 } = require('../lib/custom-errors')
const Fighter = require('../models/fighter')
const router = express.Router()
const { requireToken } = require('../config/auth')


//INDEX
// GET /fighters
router.get('/fighters', (req, res, next) => {
    Fighter.find()
        .then(fighters => {
            return fighters.map(fighter => fighter)
        })
        .then(fighters => {
            res.status(200).json({ fighters: fighters })
        })
        .catch(next)
})

// SHOW
// GET /fighters/:id
router.get('/fighters/:id', (req, res, next) => {
    Fighter.findById(req.params.id)
        .then(handle404)
        .then(fighter => {
            res.status(200).json({ fighter: fighter })
        })
        .catch(next)
})

// CREATE
// POST /fighters
router.post('/fighters', (req, res, next) => {
    // req.body
    // fighter: {}
    Fighter.create(req.body.fighter)
        .then(fighter => {
            // top lvl of this object is fighter
            res.status(201).json({ fighter: fighter })
        })
        .catch(next)
})

// UPDATE
// PATCH /fighter/:id
router.patch('/fighters/:id', (req, res, next) => {
    Fighter.findById(req.params.id)
        .then(handle404)
        .then(fighter => {
            // { fighter: {} }
            return fighter.updateOne(req.body.fighter)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /fighters/:id
router.delete('/fighters/:id', (req, res, next) => {
    Fighter.findById(req.params.id)
        .then(handle404)
        .then(fighter => {
            return fighter.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router