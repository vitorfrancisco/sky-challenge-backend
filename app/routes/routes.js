const userController = require('../controllers/userController');
const tokenHelper = require('../helpers/token');
const Router = require('express').Router();

Router.post('/signup', userController.signUp);

Router.post('/signin', userController.signIn);

Router.get('/user', tokenHelper.validateToken, userController.search);


module.exports = Router;



