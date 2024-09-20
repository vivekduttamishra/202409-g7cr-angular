import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor(private userService: UserService, private router:Router){}
  
  users:User[]=[]

  errorCode?:number;
  subscriber:any;
  currentUser?:User;

  ngOnInit(){
  
    //this.userSe
    this.getAllUsers();

    this.userService.user.subscribe({
      next:user=>{
          this.currentUser = user
          // if(!this.currentUser){
          //   this.navigateToLogin();
          // }
      }
    });
  }

  navigateToLogin(){
    let message='You need to login first';
    if(this.errorCode==403)
    message=`${this.userService.currentUser?.name}, you are not authorized to perform this action`
    this.router.navigateByUrl(`/login?returnPath=/admin/users&message=${message}`);
  }

  getAllUsers(){
    this.subscriber=this.userService.getAllUsers()
      .subscribe({
        next: (users:User[])=>this.users=users,
        error:error=>{
          this.errorCode=error.status
          // if(this.errorCode===401 || this.errorCode==403){
          //   this.navigateToLogin();
          // }
        }
      })
  }


}
