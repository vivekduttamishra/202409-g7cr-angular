import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "login", component: UserLoginComponent },
  { path: "register", component: UserRegisterComponent },
  {
    path: "admin/users",
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  }
]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserListComponent,
    UserMenuComponent
  ],
  exports: [
    RouterModule,
    UserMenuComponent,
  ]

})
export class UsersModule { }
