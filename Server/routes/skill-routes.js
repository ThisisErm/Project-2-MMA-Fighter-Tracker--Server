const express = require('express')
const Fighter = require('../models/fighter')
const { handle404 } = require('../lib/custom-errors')
const router = express.Router()
const { requireToken } = require('../config/auth')

//GET/Index
router.get('/skills', (req, res) => {
    Fighter.find({})
        .then(fighters => {
            const skills = fighters.map(fighter => fighter.skills)
            res.json({ skills: JSON.stringify(skills) })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong' })
        })
})


// CREATE
// POST /skills
router.post('/skills', (req, res, next) => {
    const fighterId = req.body.skill.fighterId

    const skill = req.body.skill

    //adding owner
    // skill.owner = req.user._id

    // find the fighter that I want to add the skill to
    // `push` the skill into the Mongoose Array
    // send status of 201 created if success
    // next if failure
    Fighter.findById(fighterId)
        .then(handle404)
        .then(fighter => {
            fighter.skills.push(req.body.skill)

            // have to save the doc when modified
            return fighter.save()
        })
        .then(fighter => {
            res.status(201).json({ fighter: fighter })
        })
        .catch(next)
})

// UPDATE
// PATCH /skills/:id
router.patch('/skills/:skillId', (req, res, next) => {
    const fighterId = req.body.skill.fighterId

    const skillBody = req.body.skill

    Fighter.findById(fighterId)
        .then(handle404)
        .then(fighter => {
            // finding the skill by it's id
            const skill = fighter.skills.id(req.params.skillId)

            // setting the new skill content to be the content passed in
            skill.set(skillBody)

            // saving it
            return fighter.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /skills/:skillId
router.delete('/skills/:skillId', (req, res, next) => {
    const fighterId = req.body.skill.fighterId

    Fighter.findById(fighterId)
        .then(handle404)
        .then(fighter => {
            //finding the correct skill to remove
            //.remove() we delete it
            fighter.skills.id(req.params.skillId).remove()

            // since I've modified I have to save
            return fighter.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router