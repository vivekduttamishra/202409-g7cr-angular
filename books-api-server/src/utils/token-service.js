const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const InvalidCredentialsError = require('./invalid-credentials-error');

const tokenize = (user) => {
    console.log('tokenizing user', user);

    const token = jwt.sign(
        user,
        process.env.JWT_SECRET,

        {
            expiresIn: '1h'
        }
    );
    return token;
}

const deTokenize = (token) => {

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                return reject(new InvalidCredentialsError("Invalid Token", { type: err.name }));
            else {
                console.log("in deTokenize", user);
                return resolve(user);
            }
        });
    });
}


const tokenInspector = async (request, response, next) => {

    try {
        console.log('token inspector called');
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader)
            throw new InvalidCredentialsError("Token Not Found", { type: "TOKEN NOT FOUND" });

        const token = authorizationHeader.split(' ')[1];
        console.log('token', token);

        const user = await deTokenize(token);
        request.user = user;
    } catch (err) {


        request.tokenError = err;

        console.log('request.tokenError', request.tokenError);

    }
    next();

}


const authenticate = (request, response, next) => {

    if (request.tokenError) {
        console.log('authenticate recieved error', request.tokenError);
        console.log('request.tokenError.error', request.tokenError.error);

        response
            .status(401)
            .send(request.tokenError.error);
        return;
    }

    next();

}

const authorize = (...roles) => {

    roles = roles.map(role=>role.toLowerCase());

    return (request, response, next) => {
        if(request.user){
            const match  = request.user.roles.find( r=> roles.includes(r));
            if(match){
                next(); //it is ok to continue
            }else{
                response.status(403).send({error: 'Not Authorized', allowedRoles: roles});
            }
        }else{
            response.status(401).send({error: 'User not Logged in'});
        }


    }
}


module.exports = { tokenize, deTokenize, tokenInspector, authenticate, authorize };