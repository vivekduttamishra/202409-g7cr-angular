let CLI = require('conceptarchitect-cli');
let MongooseBooksRepository = require('../repositories/mongoose/mongoose-book-repository');
let db=require('../repositories/mongoose/connection');

let cli = new CLI("Books CLI",{init:db.connect, close:db.disconnect});

const repository=new MongooseBooksRepository();

cli.addCommand( repository.getAllBooks, "books");

cli.run();