import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

  constructor(private userService: UserService, 
              private router:Router){}

  user?:User

  get userName(){
    return this.user?.name || 'Guest';
  }

  get userPhoto(){
    return this.user? this.user.photo : '/images/guest.png';
  }

  ngOnInit(): void {
    //this.user=this.userService.user.getValue();
    this.userService.user.subscribe({
        next: user=> this.user=user
    });
  }

  handleLogout(){
    this.userService.logout();
    //this.userService.user.next(undefined); //logged out
    //this.router.navigate(['/']);
    //this.user=undefined;
  }
}
