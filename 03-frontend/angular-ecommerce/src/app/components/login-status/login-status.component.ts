import { Component} from '@angular/core';
import { User } from 'src/app/common/user';
import {Router} from '@angular/router'
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent {

   newUser: User = new User()

   constructor(public status: RegisterService,
               public userLog: RegisterService){}
    ngOnInit():void{
      this.newUser = JSON.parse(window.localStorage.getItem('userLogged')|| '{}')
    }
}
