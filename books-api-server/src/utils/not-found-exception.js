const AppException =require('./app-exception');

class NotFoundException extends AppException{
    constructor(...errors){
        super(...errors);       
    }
}

module.exports=NotFoundException;