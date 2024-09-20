let express = require('express');
const {handleRequest} = require('../utils/http-handler');
const {injector} = require('../utils/injector');

const {authorize} = require('../utils/token-service');


var userController = injector.lookup('userController');


var users = express.Router();
 
//Root:   /api/authors/
users.route("/")
    .get(authorize("admin","root"),handleRequest(userController.getAllUsers)) //should only be for admin
    .post(handleRequest(userController.register)); //should be for all user to register


users.route("/login")
    .post(handleRequest(userController.login)) //should be for all user to login.






module.exports = users;



