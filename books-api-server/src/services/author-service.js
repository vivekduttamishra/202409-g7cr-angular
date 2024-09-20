let ValidationException = require('../utils/validation-exception');

let NotFoundException = require('../utils/not-found-exception');

class AuthorService{

    constructor(authorRepository){
        this.authorRepository = authorRepository;
    }

    getAllAuthors=async ()=>{
        return await this.authorRepository.getAllAuthors();
    }

    getAuthorById=async(id)=>{

        var author =await this.authorRepository.getAuthorById(id);
        if(!author)
            throw new NotFoundException( "Author Not Found",{id});
        return author;
    }  

    _validate= author=>{
        if(!author.name)
            throw new ValidationException('Missing Author Name');
        if(!author.biography)
            throw new ValidationException('Missing Author Biography');
    }

    addAuthor=async(author)=>{
        //should validate author properties here.
        this._validate(author);

        // if(!author.id){
        //     author.id=author.name.split(' ').join('-').toLowerCase();
        // }

        return await this.authorRepository.addAuthor(author);
    }
    
    removeAuthor=async(id)=>{
        
        return await this.authorRepository.removeAuthor(id);
    }

    updateAuthor=async(id, author)=>{
        this._validate(author);
        return await this.authorRepository.updateAuthor(id, author);
    }

    search=async(q)=>{
        return await this.authorRepository.search({
            $or:{
                name:'/'+q+'/i',
                biography:{$regex:q, $options:'i'}
            }
        });
    }


}


module.exports = AuthorService;