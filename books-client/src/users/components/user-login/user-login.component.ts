import { Component } from '@angular/core';
import { LoginInfo } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router
    
    ){}

  success?:string;
  error?:string;
  loginInfo: LoginInfo={
    email:'amit@gmail.com',
    password:'p@ss#1'
  }

  subscriber:any;
  errorCode?:number;
  message=''

  ngOnInit(){
    //console.log('this.route.snapshot.queryParams',this.route.snapshot.queryParams);
    
    //this.message= this.route.snapshot.queryParams['message'] || '';

    this.route.queryParams.subscribe({next: q=> this.message=q['message']});

  }

  handleLogin(){
    // console.log('successfully submitted', 
    //   this.loginInfo);

    

    this.success='logging...';
    this.error='';
    this.errorCode=undefined;
    this.message='';

    

    this.subscriber=this.userService
                       .login(this.loginInfo)
                       .subscribe({
                          next: (data:any)=>{
                            this.success=`Welcome ${data.user.name}`;
                            this.error='';
                            console.log(data);
                            console.log(this.route.snapshot);
                            const returnPath=this.route.snapshot.queryParams['returnPath'] || '/';
                            this.router.navigateByUrl(returnPath);
                          },
                          error: error=>{
                            this.errorCode=error.status;
                            if(error.status===401)
                              this.error='Invalid Credentials';
                            else
                              this.error='Uknown Error:'+error.message
                            this.success='';
                            console.log(error);
                          }
                       })

  }
}
