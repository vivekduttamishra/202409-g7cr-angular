const { Response, ValidationException } = require('../utils/http-handler');



class UserController {

    constructor(userService, tokenService) {
        this.service = userService;
        this.tokenService = tokenService;

    }

    getAllUsers = async () => {
        return await this.service.getAllUsers();
    }

    register = async ({ body: user }) => {
        var result = await this.service.registerUser(user);
        return this._userResult(result);
    }

    _userResult= (user)=>{

        user  = user.toJSON();

        ["password","_id","__v","shelf"]
            .forEach(field=>delete user[field]);
        
        const token =  this.tokenService.tokenize({email:user.email, roles:user.roles});

        return {user,token}
    }


    login = async ({ body: loginInfo }) => {
        let result = await this.service.loginUser(loginInfo);
        return this._userResult(result);
    }
}






module.exports = UserController;

