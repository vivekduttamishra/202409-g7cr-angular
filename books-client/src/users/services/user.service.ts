import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo, User } from '../models/user.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

const url='http://localhost:8000/api/users'

interface LoginResponse{
  user:User;
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  _user = new BehaviorSubject<User|undefined>(this._getCurrentUser());

  get user() {
    return this._user.asObservable(); //send as ordinary observable
  }

  
  _getCurrentUser(){
    const userStr=localStorage.getItem('user');
    let user:User|undefined;
    if(userStr){
      user= JSON.parse(userStr);
    } else{
      user= undefined;
    }
    console.log('user',user);
    return user;
    
  }
  
  //user?:User
 

  _processLogin=(userData:LoginResponse)=>{
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
    //this.user=userData.user;
    this._user.next(userData.user); //inform user is logged in.
  }

  _processLogout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    //this.user=undefined;
    this._user.next(undefined); //inform user is logged out
  }

  login(loginInfo:LoginInfo){
    return this.http
              .post<LoginResponse>(`${url}/login`,loginInfo)
              .pipe(
                tap(this._processLogin),
                catchError(error=>{
                  this._processLogout();
                  return throwError(()=>error);
                })
              )
              
              ;
  }

  logout(){
    this._processLogout();
  }

  get currentUser():User|undefined{
    const userStr= localStorage.getItem('user');
    if(userStr){
      return JSON.parse(userStr);
    }else{
      return undefined;
    }
  }


  getAllUsers() {
    return this.http.get<User[]>(url,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
