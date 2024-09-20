export interface LoginInfo{
    email:string;
    password?:string;
}

export interface User extends LoginInfo{
    name:string;
    photo:string;
    roles:string[];
}