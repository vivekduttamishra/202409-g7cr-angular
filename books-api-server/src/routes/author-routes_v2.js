let express = require('express');
//let authorRepository= require('../repositories/in-memory/in-memory-author-repository');

let AuthorService = require('../services/author-service');
let AuthorRepository = require('../repositories/mongoose/mongoose-author-repository');

let AuthorController = require('../controllers/author-controller');

let authorRepository = new AuthorRepository();

let authorController=new AuthorController(new AuthorService(authorRepository));


var authors = express.Router();

//Root:   /api/authors/
authors.route("/")
    .get(authorController.getAllAuthors.bind(authorController))
    .post(authorController.addAuthor);


authors.route("/:authorId")
    .get(authorController.getAuthorById)
    .put(authorController.updateAuthor)
    .delete(authorController.removeAuthor);

authors
    .route("/:authorId/books")
    .get((request, response) => {
        response.status(501).send({message:'Not Yet Implemented',status:'Work in Progress',puprose:'GetAll Books by the Author'});
    })




module.exports = authors;



