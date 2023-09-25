import { Component } from '@angular/core';
import {  User } from 'src/app/common/user';
import { RegisterService } from 'src/app/services/register.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TCShopValidators } from 'src/app/validators/tcshop-validators';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router,){}

    loginFormGroup!: FormGroup;
    
    ngOnInit(): void{
      this.loginFormGroup = this.formBuilder.group({
          email: new FormControl('',
                                [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
          password: new FormControl('',
                                [Validators.required,Validators.minLength(8),TCShopValidators.notOnlyWhiteSpace]),
                                 
      })
    }
    get email(){return this.loginFormGroup.get('email')}
    get password(){return this.loginFormGroup.get('password')}

    onSubmit(){
      if(this.loginFormGroup.invalid){
        //Touching all fields triggers the display of error msg.
        this.loginFormGroup.markAllAsTouched()
        return
      }
         let user = new User();
         user.email = this.loginFormGroup.controls['email'].value
         user.password = this.loginFormGroup.controls['password'].value
         this.userService.loginUser(user).subscribe({
           next: response=>{
             alert('User is Logged!')
             window.localStorage.setItem('userLogged',JSON.stringify(response));
             this.router.navigate(['/products'])
           },
           error: err=>{
             alert(`There was an error:${err.message}`)
           }

         })
    }
}
