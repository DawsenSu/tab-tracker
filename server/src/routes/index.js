const express = require('express')
const routers = express.Router()
const controller = require('../controllers/API_helper')
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const SongController = require('../controllers/SongControllers')

let routes = (app) => {
  routers.get('/files', controller.getListFiles)
  routers.get('/files/:name',controller.download)
  routers.get('/status', controller.getStatus)
  routers.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  routers.post('/login', AuthenticationController.login)
  routers.post('/upload', controller.upload)

  routers.get('/songs', SongController.index)
  routers.post('/songs', SongController.post)

  app.use(routers)
}

module.exports = routes