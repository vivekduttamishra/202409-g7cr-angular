const { Response, ValidationException } = require('../utils/http-handler');
const InvalidCredentialsError = require('../utils/invalid-credentials-error');


class AuthorsController {

    constructor(authorService, tokenService) {
        this.service = authorService;
        // console.log('service object', this.service);

        this.getAuthorById = this.getAuthorById.bind(this);
        this.tokenService = tokenService;
    }

    getAllAuthors = async () => {
        return await this.service.getAllAuthors();
    }

    async getAuthorById({ authorId }) {
        var author = await this.service.getAuthorById(authorId);
        return author;
    }

    addAuthor_with_authorization = async ({ body, request }) => {
        // console.log('request.body',request.body);
        // console.log('request.json',request.json);
        //console.log('saving', body);

        const authorizationHeader = request.headers.authorization;
        console.log('authorizationHeader',authorizationHeader);
        
        if (!authorizationHeader)
            throw new InvalidCredentialsError("Token Not Found"); //  
        const token = authorizationHeader.split(' ')[1];
        
        console.log('token',token);
        
        const user = await this.tokenService.deTokenize(token);
        //we are fine to proceed  
        console.log('user adding author',user);
        

        let result = await this.service.addAuthor(body);
        console.log('author added', result);
        return new Response(result, 201, {
            location: `/api/authors/${result.id}`
        });


    }

    addAuthor = async ({ body }) => {
       
        let result = await this.service.addAuthor(body);
        console.log('author added', result);
        return new Response(result, 201, {
            location: `/api/authors/${result.id}`
        });


    }

    updateAuthor = async ({ authorId, body }) => {
        var updatedAuthor = await this.service.updateAuthor(authorId, body);
        return updatedAuthor;
    }

    removeAuthor = async ({ authorId, response }) => {
        await this.service.removeAuthor(authorId);
        //response.status(204).send();

        //returns undefined.
        //handleRequest will not reply now.
        response.status(204).send();

    }

    search = async (request, response) => {
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


module.exports = AuthorsController;

