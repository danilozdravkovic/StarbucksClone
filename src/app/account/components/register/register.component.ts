import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IRegisterUser } from '../../interfaces/i-register-user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService : UserService){}
  hide:boolean = true;

  registerForm = new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    username:new FormControl("",[Validators.required,Validators.pattern('^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
    termsAndPrivacy:new FormControl("",Validators.required),
  },{validators : this.checkboxRequiredValidator});

  prepareDataToSend() : IRegisterUser{
    let formValue = this.registerForm.value;
    return {
      firstName:formValue.firstName,
      lastName:formValue.lastName,
      username:formValue.username,
      email:formValue.email,
      password:formValue.password
    }
  }

  checkboxRequiredValidator(formGroup: AbstractControl): ValidationErrors | null {
    const termsAndPrivacyControl = formGroup.get('termsAndPrivacy');
    return termsAndPrivacyControl && termsAndPrivacyControl.value ? null : { termsAndPrivacyRequired: true };
  }

  sendData() : void{
    let dataToSend = this.prepareDataToSend();
    this.userService.post(dataToSend).subscribe({
      next:(data)=>{
        console.log("ok");
      },
      error:(err)=>{
        console.log(err);
      }
    });
    window.location.reload();
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
