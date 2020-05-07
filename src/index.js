const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
require('./db/mongoose')
const covidRouter = require('./routes/covid')



dotenv.config({ path: './src/config/config.env'})

//console.log(require('dotenv').config({ path: './src/config/config.env'}))

const app = express()

// body parser
app.use(express.json())

// cors
app.use(cors())


// set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.use(covidRouter)


const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

