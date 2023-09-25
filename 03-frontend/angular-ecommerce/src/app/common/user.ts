import { Roles } from "./roles";

export class User {
    id!:number;
    name!:string;
    surname!:string;
    email!:string;
    password!:string;
    role!:Roles;
    otp!:string;
    verified!:boolean;
}
