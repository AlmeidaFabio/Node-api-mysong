const express = require('express')
const multer = require('multer')
const uploadImage = require('./middlewares/uploadImage')
const uploadMusic = require('./middlewares/uploadMusic')

const routes = express.Router()

const auth = require('./middlewares/auth')

const userController = require('./controllers/userController')
const diskController = require('./controllers/diskController')
const musicController = require('./controllers/musicController')
const coverController = require('./controllers/coverController')
const loginController = require('./controllers/loginController')

routes.get('/', (req, res) => {
    res.send('Oi')
})

routes.post('/login', loginController.login)
routes.get('/logout', loginController.logout)

routes.get('/users', userController.list)
routes.post('/user', userController.store)
routes.get('/user/:id', userController.show)
routes.put('/user/:id', userController.update)
routes.delete('/user/:id', userController.destroy)

routes.get('/disks', diskController.list)
routes.post('/disk', diskController.store)
routes.get('/disk/:id', diskController.show)
routes.put('/disk/:id', diskController.update)
routes.delete('/disk/:id', diskController.destroy)

routes.post('/cover/:id', multer(uploadImage).single('cover'), coverController.store)
routes.delete('/cover/:id', coverController.destroy)


routes.get('/musics', musicController.list)
routes.get('/musics/:id', musicController.musicsForDisk)
routes.post('/music/:id', multer(uploadMusic).single('file'), musicController.store)
routes.delete('/music/:id', musicController.destroy)

module.exports = routes