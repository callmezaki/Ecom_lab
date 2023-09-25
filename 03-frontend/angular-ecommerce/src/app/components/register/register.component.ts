import { Component } from '@angular/core';
import {  User } from 'src/app/common/user';
import { Roles } from 'src/app/common/roles';
import { RegisterService } from 'src/app/services/register.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TCShopValidators } from 'src/app/validators/tcshop-validators';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = Roles.User;
  admin = Roles.Admin;
  registerFormGroup!: FormGroup;

  constructor(private userService: RegisterService,
              private formBuilder: FormBuilder,
              private router: Router){}

  ngOnInit(): void{
    this.registerFormGroup = this.formBuilder.group({
        name: new FormControl('',
                    [Validators.required,Validators.minLength(4), TCShopValidators.notOnlyWhiteSpace]),
        surname: new FormControl('',
                    [Validators.required,Validators.minLength(3),TCShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('',
                              [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl('',
                              [Validators.required,Validators.minLength(8),TCShopValidators.notOnlyWhiteSpace]),
        roles: new FormControl('',
                              [Validators.required,Validators.minLength(4),TCShopValidators.notOnlyWhiteSpace]),  
                               
    })
  }
  get name(){return this.registerFormGroup.get('name')}
  get surname(){return this.registerFormGroup.get('surname')}
  get email(){return this.registerFormGroup.get('email')}
  get password(){return this.registerFormGroup.get('password')}
  get roles(){return this.registerFormGroup.get('roles')}

  onSubmit(){
    if(this.registerFormGroup.invalid){
      //Touching all fields triggers the display of error msg.
      this.registerFormGroup.markAllAsTouched()
      return
    }
    //set up new User
    let newUser = new User()
    //populate user form
    
    newUser.name = this.registerFormGroup.controls['name'].value
    newUser.surname= this.registerFormGroup.controls['surname'].value
    newUser.email = this.registerFormGroup.controls['email'].value
    newUser.password = this.registerFormGroup.controls['password'].value
    newUser.role = this.registerFormGroup.controls['roles'].value
    this.userService.registerUser(newUser).subscribe({
      next: response =>{
        alert(`User successfully Registred!`)
        localStorage.setItem('user',JSON.stringify(response));
        this.router.navigate(['/verify'])
        
      },
      error: err =>{
        alert(`There was an error:${err.message}`)
      }
        
  })

  }
}
