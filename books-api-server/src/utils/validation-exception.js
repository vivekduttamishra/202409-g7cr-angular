const AppException =require('./app-exception');

class ValidationException extends AppException{
    constructor(...errors){
        super(...errors);       
    }
}

module.exports=ValidationException;