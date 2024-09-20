
let NotFoundException = require('../../utils/not-found-exception');
let {v4}= require('uuid');


var authors= [
    {id: 'vivek-dutta-mishra', name:'Vivek Dutta Mishra',biography:'Author of the Lost Epic Series'},
    {id:'dinkar', name:'Ramdhari Singh Dinkar',biography:'National Poet of India'},
]

class InMemoryAuthorRepository{

    
    getAllAuthors=async()=>{
        return authors;

    }
    getAuthorById=async (id)=>{
        let author= authors.find(author => author.id === id);
        if(author)
            return author;
        else
            throw new NotFoundException( "Author Not Found",{id});
    }

    addAuthor=async(author)=>{
        author._id=v4();
        console.log('auhtor._id',author._id);
        
        authors.push(author);

        return author;
    }
    removeAuthor=async(id)=>{

    }
    updateAuthors=async(id,author)=>{

    }
    searchAuthors=async(q)=>{

    }

}

module.exports=new InMemoryAuthorRepository();