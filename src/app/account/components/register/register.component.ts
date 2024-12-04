import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IRegisterUser } from '../../interfaces/i-register-user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService : UserService,private router: Router, private snackBar : MatSnackBar){}
  hide:boolean = true;

  registerForm = new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    username:new FormControl("",[Validators.required,Validators.pattern('^(?=.{3,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$')]),
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
        this.router.navigate(["/main/account/signin"]);
      },
      error:(err)=>{
        if (err.status === 422) {
          let errorMessages = err.error.map((errorItem: any) => `${errorItem.property}: ${errorItem.error}`).join('\n');
          this.snackBar.open(errorMessages, "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open("An error occurred. Please try again.", "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
