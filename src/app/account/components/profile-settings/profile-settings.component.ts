import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IRegisterUser } from '../../interfaces/i-register-user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  constructor(private userService : UserService, private snackBar: MatSnackBar){}
  user:any;

  editUserForm = new FormGroup({
    firstName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    username:new FormControl("",[Validators.required,Validators.pattern('^(?=.{3,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$')]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
  });

  ngOnInit():void{
    let currentUser = localStorage.getItem("user");
    if(currentUser){
      let currentUserId=JSON.parse(currentUser).Id;
      this.userService.getOne(currentUserId).subscribe({
        next:(data)=>{
          this.user=data;
          this.fillForm(this.user);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  hide:boolean = true;

  fillForm(data:any):void{
    this.editUserForm.get("username")?.setValue(data.username);
    this.editUserForm.get("firstName")?.setValue(data.firstName);
    this.editUserForm.get("lastName")?.setValue(data.lastName);
    this.editUserForm.get("email")?.setValue(data.email);
 }

  prepareDataToSend() : IRegisterUser{
    let formValue = this.editUserForm.value;
    return {
      firstName:formValue.firstName,
      lastName:formValue.lastName,
      username:formValue.username,
      email:formValue.email,
      password:formValue.password
    }
  }

  sendData() : void{
    let dataToSend = this.prepareDataToSend();
    let userId = this.user.id;
    this.userService.put(userId,dataToSend).subscribe({
      next:(data)=>{
        this.snackBar.open("Data successfully changed", "Close", {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
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
