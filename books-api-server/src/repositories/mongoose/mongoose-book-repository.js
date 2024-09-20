const {Author} = require('./author.schema');
const {Book} =require('./book.schema');

class MongooseBookRepository{

    getAllBooks=async()=>{
        return await Book.find({})
                .populate('authorDetails')
                .exec(); 
    }

    
}

module.exports=MongooseBookRepository;