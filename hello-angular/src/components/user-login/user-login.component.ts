import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(private userService:UserService){}

  email:string='';
  password:string='';
  rememberMe:boolean=false;
  role:string="";

  error:String="";
  success:string="";

  handleLogin(){
    this.error="";
    this.success="";
    if(!this.email){
      this.error="Missing Email"
    } else if(!this.password){
      this.error="Missing Password";
    } else {
      const user = this.userService.login({email:this.email, password:this.password})
      if(user){
        this.success=`Welcome ${user.name}, to our service`
      } else{
        this.error='Invalid Credentials'
      }
    
    }
    

  }

}
