const mongoose = require('mongoose');
const ValidationException = require('../../utils/validation-exception');

const BookshelfItemSchema = new mongoose.Schema({

    bookId:String,
    readingStatus:String, //wishlist, reading, read
    rating:Number,
    notes:[String],
    review:String, 
    createdAt: { type: Date, default: Date.now }  //date when the book was added to the shelf

});

const UserSchema = new mongoose.Schema({

    email:{type:String, unique:true, required:true},
    name:{type:String, required:true},
    password:{type:String, required:true},
    photo:String,
    roles:[String],
    shelf:[BookshelfItemSchema]

})


UserSchema.pre('save', async function(next) {
    console.log('validating unique user email in pre save')
    // var {user}=getUser();
    // const {email}=this;
    // console.log('user in pre save',email);
    // try {
    //     const userExists = await user.exists({ email });
    //     if (userExists) {
    //         throw new ValidationException('Duplicate Email.',{email});
    //     }
    //     next();
    // } catch (err) {
    //     next(err);
    // }
    
});



const User = mongoose.model('User', UserSchema,'users');

const getUser=()=>User;


module.exports={User};