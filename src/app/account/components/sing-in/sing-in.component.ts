import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignInUser } from '../../interfaces/i-register-user';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  constructor(private userService : UserService, private snackBar: MatSnackBar){}
  hide:boolean = true;

  signInUserForm = new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",Validators.required),
  });


  prepareDataToSend() : ISignInUser{
    let formValue = this.signInUserForm.value;
    return {
      email:formValue.email,
      password:formValue.password
    } 
  }
  
  sendData() : void{
    let dataToSend = this.prepareDataToSend();
    this.userService.signInUser(dataToSend).subscribe({
      next:(data)=>{},
      error:(err)=>{
        if (err.status === 401) {
          let errorMessages = "Wrong credentials."
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
