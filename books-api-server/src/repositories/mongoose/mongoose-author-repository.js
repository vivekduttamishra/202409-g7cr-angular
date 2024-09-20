const Author = require('./author.schema');

class MongooseAuthorRepository{
    constructor(){

    }

    getAllAuthors=async()=>{

       return  await Author.find({},{_id:0,id:1,name:1,photo:1,biography:1});

    }
    getAuthorById=async(id)=>{

        return await Author.findOne({id});

    }

    addAuthor=async(author)=>{

        var newAuthor = new Author(author);
       
        var dbAuthor= await newAuthor.save(); 
        return dbAuthor;

    }


    removeAuthor=async(id)=>{

    }
    updateAuthor=async(id,author)=>{

    }
    searchAuthors=async(q)=>{

    }

    
}

module.exports = MongooseAuthorRepository;