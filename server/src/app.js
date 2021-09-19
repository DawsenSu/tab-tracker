const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const initRoutes = require('./routes/index')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())


initRoutes(app)

sequelize.sync()
  .then(() =>{
    app.listen(config.port, () =>{
      console.log(`App listening on port ${config.port}`)
  })
})

