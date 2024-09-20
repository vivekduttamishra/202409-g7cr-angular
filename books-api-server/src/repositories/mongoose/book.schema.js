const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    reviewerName: String,
    rating:Number,
    title:String,
    reviewText: String, 

});

const Bookschema = new mongoose.Schema({

    id:String,
    title:String,
    authorId:{
        type:String        
    },
    description:String,
    price:Number,
    cover:String,
    tags:[String],
    reviews:[ReviewSchema]

})

Bookschema.virtual('authorDetails', {
    ref: 'Author',        // The model to use
    localField: 'authorId',  // The field in Book
    foreignField: 'id',  // The field in Author
    justOne: true        // Use `justOne` if you want to get a single document instead of an array
});

// Virtual field for 'rating' (average rating)
bookSchema.virtual('rating').get(function() {
    if (this.reviews.length === 0) {
        return 0;  // No reviews
    }
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / this.reviews.length;
});

bookSchema.pre('save', async function(next) {
    try {
        const authorExists = await Author.exists({ id: this.authorId });
        if (!authorExists) {
            throw new Error('Invalid authorId. The specified author does not exist.');
        }
        next();
    } catch (err) {
        next(err);
    }
});

// Ensure virtuals are included in JSON and Object output
bookSchema.set('toObject', { virtuals: true });
bookSchema.set('toJSON', { virtuals: true });

const Book = mongoose.model('Book', Bookschema,'books');

module.exports={Book};