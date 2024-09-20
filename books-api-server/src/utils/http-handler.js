const ValidationException = require('./validation-exception');
const NotFoundException = require('./not-found-exception');
const InvalidCredentialError = require('./invalid-credentials-error');
const tokenService = require('./token-service');
const { response } = require('express');
const methodStatusMap = {
    GET: 200,
    POST: 201,
    PUT: 202,
    PATCH: 202,
    DELETE: 204
};

const exceptionMapper = {
    ValidationException: (e) => new HttpErrorResponse(400, e.errors),
    NotFoundException: (e) => new HttpErrorResponse(404, e.errors),
    ValidationError: (e) => new HttpErrorResponse(400, e.errors),
    InvalidCredentialsError: (e) => new HttpErrorResponse(401, e.errors),
}

class Response {
    constructor(body, status = 200, headers = {}) {
        this.status = status;
        this.headers = headers;
        this.body = body;
    }

    send(response) {
        
        response
            .set(this.headers)
            .status(this.status)
            .send(this.body);
    }
}

class HttpErrorResponse extends Response {
    constructor(status, body = {}, headers = {}) {
        super({ status, ...body }, status, headers);
    }
}


function handleRequest(handler) {
    return async (request, response, next) => {

        try {
            var body = request.body ?? {};
            var params = request.params ?? {};
            var info = { ...body, ...params, body, params, query: request.query, request, response, next }
            
            var result = await handler(info);
            if (result === undefined) {
                return;
            }
            if (result instanceof Response)
                result.send(response);
            else {
                const status = methodStatusMap[request.method] ?? 200;
                response.status(status).send(result);
            }


        } catch (e) {

            console.log('error in handleRequest',e.constructor.name);
            var errorType = e.constructor.name;
            var errorResponse = exceptionMapper[errorType];
            if (errorResponse) {
                errorResponse(e).send(response);
            } else {
                new HttpErrorResponse(500, { status: 500, message: e.message })
                    .send(response);
            }

        }


    }
}

function nullIs404(request, response, next) {
   var _send = response.send.bind(response);

   response.send=body=>{
        console.log('body in send',body);
        
        if(body){
           return  _send(body);
        } else{
            response
                .status(404)
                .send({status:404, message:"Not Found", path:request.url , ...request.params})
        }
   }

   next();
}


async function tokenChecker(request,response,next){
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    console.log('authHeader',authHeader);
    console.log('token',token);
    
    
    if(token){
        try{
            request.user= await tokenService.deTokenize(token);
            console.log('request.user',request.user);
            
        }catch(err){
            //It's ok not to have a token
            console.log('err.message',err.message);
            
        }
    }

    next();
}


const authenticate = (req, res, next) => {
    console.log('in authenticate req.user',req.user);
    
    
    if(req.user){
        next();
    }else{
        res
            .status(401)
            .send({status:401, message: 'Unauthorized', path:req.originalUrl })
    }
};

const authorize=(...roles)=>(req,res, next)=>{

    const user=req.user;
    if(user){
        for(let userRole of user.roles){
            if(roles.includes(userRole)){
                next();
                return;
            }
        }
    }
    response
        .status(403)
        .send({status:403, message:'Not Authorized'});
}




module.exports = {
    handleRequest,
    Response,
    ValidationException,
    NotFoundException,
    authenticate,
    authorize,
    tokenChecker,
    nullIs404
};
