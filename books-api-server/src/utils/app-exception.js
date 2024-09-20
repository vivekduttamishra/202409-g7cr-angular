class AppException extends Error{
    constructor(message, errors){
        super(message);
        this.errors={
            message,
            ...errors
        }
    }
}

module.exports=AppException;