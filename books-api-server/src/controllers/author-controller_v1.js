



class AuthorsController{

    constructor(authorService){
        this.service=  authorService;
       // console.log('service object', this.service);

        this.getAuthorById=this.getAuthorById.bind(this);
    }

    getAllAuthors=async(request,response)=>{
        var authors= await this.service.getAllAuthors();
        response.send(authors);
    }
    
    async getAuthorById(request,response){
        var author=await this.service.getAuthorById(request.params.authorId);
        response.send(author);
    }

    addAuthor=async (request,response)=>{
        // console.log('request.body',request.body);
        // console.log('request.json',request.json);
        var result =await this.service.addAuthor(request.body);
        response.status(201).send(result);
        
    }

    updateAuthor=async(request,response)=>{
        var updatedAuthor= await this.service.updateAuthor(request.params.authorId,request.body);
        response.status(202).send(updatedAuthor);
    }

    removeAuthor=async(request,response)=>{
        await this.service.removeAuthor(request.params.authorId);
        response.status(204).send();
    }

    search=async(request,response)=>{
        var result = await this.service.search(request.query["q"]);
        response.send(result);
    }

    

}    



// async getAuthors(){
//     return await this.service.getAllAuthors();  //auto response.send
// }

// async function getById({params}){
//     //auto response.send
//     //auto handle error
//     return await service.getAuthorById(params.authorId);  
// }


module.exports=AuthorsController;

