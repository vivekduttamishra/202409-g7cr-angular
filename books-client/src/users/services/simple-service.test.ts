import { RouterLink } from "@angular/router";

class SimpleUserService{
    login(email:any, password:any){
        if(email==='admin@example.com' && password=='pass'){
            return {
                email,
                roles:['admin']
            }
        } else if(email==='user@example.com' && password=='pass'){
            return {
                email,
                roles:['user']
            }
        }else{
            return null;
        }
    }
}


describe('UserService Tests',()=>{

    it('should return null for invalid login',()=>{
        const service = new SimpleUserService();
        const user= service.login("invalid@example.com","invalid password");
        expect(user).toBeNull();

    })

    it('should return a valid user with user credential',()=>{
        const service = new SimpleUserService();
        const user= service.login('user@example.com',"p@ss");
        expect(user?.roles).toContain('user');
        expect(user?.roles).not.toContain('admin');

    })

    it('should return admin role for admin credentials',()=>{

    });

});