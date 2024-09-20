
let express = require('express');


async function createApp(){
    let app = express();
    
    app.use((request,response,next)=>{
        console.log(`recevied request: ${request.method} ${request.path}`)
        return next(); //call next middlware.
    });

    app.use((request,response,next)=>{
        request.date=new Date(); //attach a property called. date.
        request.user= process.env.username;
        next(); //call next middlware.
    });

    app.get('/', (request,response)=>{
        response.send("Book's Api Server");
    })


    app.use((request,response,next)=>{
    
        if(request.path==="/info" && request.method=="GET"){
            response.send( {
                username: request.user,
                date:request.date
            });
        }else{
            next();
        }
    
    });

    app.use((request,response)=>{
        console.log('reached third middleware');
        response.send(`Message from special second middleware`);
    });

    //app.return404Error();


    return app;
}

module.exports = createApp;