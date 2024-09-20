var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
    id:{type: String, unique: true},
    name:{type:String, required:true},
    biography:{type:String, required:true, minLength:50, maxLength:5000},
    photo:{type:String, required:true},
    tags:[String]
});


authorSchema.pre('save',function(){
    if(this.id===undefined){
        this.id=this.name.toLowerCase().split(' ').join('-');
    }
});

// authorSchema.virtual('books', {
//     ref: 'Book',        // The model to use
//     localField: 'id',  // The field in Book
//     foreignField: 'authorId',  // The field in Author
//    // justOne: true        // Use `justOne` if you want to get a single document instead of an array
// });

/**
 * Parameter
 * 1. Model Name: Identifies the current inside mongoose framework.
 *     * With this framework, I can access the current Model from mongoose library.
 *     * It is like a key in a model collection inside mongoose.
 * 2. The schema that should be stored with mongoose
 * 3. (optional) Name of the collection in mongo db. 
 *       * if not provides, uses the model name for the same

*/
const Author= mongoose.model('Author', authorSchema,"authors");

module.exports=Author;