

function configureAuthorRoutes(app){

    app.get('/authors', (request,response)=>{
        response.send('returning all authors')
    });

    app.post('/authors',(request,response)=>{
        response.send('creating a new author')
    });

    app.get('/authors/:authorId', (request,response)=>{

        const authorId= request.params.authorId;

        response.send(`fetching author ${authorId}`);


    });



    app.get('/authors/info', (request,response)=>{
        var authorId= request.query['id'];
       response.send('fetching author with id: '+authorId )
    });

   

};

module.exports=configureAuthorRoutes;   