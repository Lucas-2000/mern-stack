require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')
const corsOptions = {  
      origin:'*',
      credentials:true,
      optionSuccessStatus:200,
}

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db and listening on port', (process.env.PORT))
    })
  })
  .catch((error) => {
    console.log(error)
  })
