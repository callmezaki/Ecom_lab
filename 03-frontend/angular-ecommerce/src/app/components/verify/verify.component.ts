import { Component } from '@angular/core';
import {  User } from 'src/app/common/user';
import { RegisterService } from 'src/app/services/register.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TCShopValidators } from 'src/app/validators/tcshop-validators';
import {Router} from "@angular/router"

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  constructor(private userService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router){}

    verifyFormGroup!: FormGroup;
    newUser: User = JSON.parse(localStorage.getItem('user') || '{}')
    

    ngOnInit(): void{
      this.verifyFormGroup = this.formBuilder.group({
          email: new FormControl('',
                                [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
          otp: new FormControl('',
                                [Validators.required,Validators.minLength(5),TCShopValidators.notOnlyWhiteSpace]),
                                 
      })
    }
    get email(){return this.verifyFormGroup.get('email')}
    get otp(){return this.verifyFormGroup.get('otp')}

    onSubmit(){

      if(this.verifyFormGroup.invalid){
        //Touching all fields triggers the display of error msg.
        this.verifyFormGroup.markAllAsTouched()
        return
      }
        let user = new User();
        user = JSON.parse(localStorage.getItem('user') || '{}')
        user.email = this.verifyFormGroup.controls['email'].value
        user.otp = this.verifyFormGroup.controls['otp'].value
        this.userService.verifyUser(user).subscribe({
          next: response=>{
            alert('User is verified!')
            console.log(response.otp)
            this.router.navigate(['/login']) 
          },
          error: err=>{
            alert(`There was an error:${err.message}`)
          }

        })
    }
}
