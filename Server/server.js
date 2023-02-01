// command center
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8000

const fighterRoutes = require('./routes/fighter-routes')
const requestLogger = require('./lib/request-logger')
const fighterSeed = require('./lib/seed/fighter-seed')
const skillRoutes = require('./routes/skill-routes')
const userRoutes = require('./routes/user-routes')

// deprecation warning
mongoose.set('strictQuery', true)

// creates the connection between your local MongoDB and this express app
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// starting an express app
const app = express()

app.use(cors({ origin: `http://127.0.0.1:5555` }))

// sending json 
// need to be able to accept json
app.use(express.json())
app.use(requestLogger)

// server needs to know about this router!!!
app.use(fighterRoutes)


//skill routes
app.use(skillRoutes)

//user routes
app.use(userRoutes)


// /seed/fighters
app.use('/seed', fighterSeed)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app