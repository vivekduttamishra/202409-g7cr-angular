let ValidationException = require('../utils/validation-exception');

let NotFoundException = require('../utils/not-found-exception');
const { User } = require('../repositories/mongoose/user.schema');
const bcrypt = require('bcrypt');
const InvalidCredentialsError = require('../utils/invalid-credentials-error');

class UserService{

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    //useful for admin perpose
    getAllUsers=async ()=>{
        return await this.userRepository.getAllUsers();
    }

    loginUser=async(loginInfo)=>{

        var user =await this.userRepository.getUserByEmail(loginInfo.email);
        console.log('user',user);
        
        if(!user)
            throw new InvalidCredentialsError( "Invalid credentials");

        var matched = await bcrypt.compare(loginInfo.password, user.password)
        if(!matched)
            throw new InvalidCredentialsError( "Invalid Credentials");


        user.password="";
        return user;
    }  

    registerUser=async(registerUser)=>{

        var {email}=registerUser;
        var existing = await this.userRepository.getUserByEmail(email);
        if(existing){
            throw new ValidationException("Duplicate Email",{email});
        }


        var user = {...registerUser, roles:['USER']};
        user.password = await bcrypt.hash(user.password, 10);
        return await this.userRepository.addUser(user);
        
    }

    
}


module.exports = UserService;