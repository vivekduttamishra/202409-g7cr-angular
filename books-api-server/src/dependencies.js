const {injector} = require('./utils/injector');

// Import all your modules here.
const MongooseAuthorRepository = require('./repositories/mongoose/mongoose-author-repository');
const AuthorService= require('./services/author-service');
const Author = require('./repositories/mongoose/author.schema');
const db= require('./repositories/mongoose/connection');
const AuthorController = require('./controllers/author-controller');
const UserController = require('./controllers/user-controller');
const UserService = require('./services/user-service');
const MongooseUserRepository = require('./repositories/mongoose/mongoose-user-repository');
const User= require('./repositories/mongoose/user.schema');
const tokenService = require('./utils/token-service');
module.exports = ()=>{

    //add all your dependencies here.

    injector
        .register("authorRepository", MongooseAuthorRepository)
        .register("authorService", AuthorService)
        .register("author", Author)
        .registerFactory("db",()=>db) // we need the db.
        .register("authorController", AuthorController)
        .register("userController", UserController)
        .register("userService", UserService)
        .register("userRepository", MongooseUserRepository)
       
        .registerObject("tokenService", tokenService)
        

}