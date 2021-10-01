const express = require('express')
const routers = express.Router()
const controller = require('../controllers/API_helper')
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const SongController = require('../controllers/SongControllers')
const BookmarkController = require('../controllers/BookmarkController')

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
  routers.get('/songs/:songId', SongController.show)
  routers.post('/songs', SongController.post)
  routers.put('/songs/:songId', SongController.put)

  routers.get('/bookmarks', BookmarkController.index)
  routers.post('/bookmarks', BookmarkController.post)
  routers.delete('/bookmarks/:bookmarkId', BookmarkController.delete)

  app.use(routers)
}

module.exports = routes