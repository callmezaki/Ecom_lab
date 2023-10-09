import { Injectable } from "@angular/core";
import { User } from "../common/user";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    user: User = JSON.parse(window.localStorage.getItem('userLogged')|| '{}')

  
    isLoggedIn(): boolean {
      if (this.user.email == undefined){
        return false;
      }
      return true;
    }
  
    hasRole(role: string): boolean {
      return this.user.role.includes(role);
    }
  }
