import { Injectable } from "@angular/core";
import { LoginInfo, User } from "../models/user.model";

let users:User[]=[
    {name: 'John', email:'john@gmail.com', password:'pass#1', photo:"", roles:["admin"]},
    {name: 'Vivek', email:'vivek@gmail.com', password:'pass#1', photo:"", roles:["user"]},
]

@Injectable({providedIn:'root'})
export class UserService{
    login(info:LoginInfo){
        return users.find(user=>user.email===info.email && user.password===info.password);
    }
}