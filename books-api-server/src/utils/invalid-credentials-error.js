const AppException =require('./app-exception');

class InvalidCredentialsError extends AppException{
    constructor(...errors){
        super(...errors);       
    }
}

module.exports=InvalidCredentialsError;