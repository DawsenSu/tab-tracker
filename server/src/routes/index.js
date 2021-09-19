const express = require('express')
const routers = express.Router()
const controller = require('../controllers/API_helper')
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

let routes = (app) => {
  routers.get('/files', controller.getListFiles)
  routers.get('/files/:name',controller.download)
  routers.get('/status', controller.getStatus)
  routers.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  routers.post('/login', AuthenticationController.login)
  routers.post('/upload', controller.upload)

  app.use(routers)
}

module.exports = routes