import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignInUser } from '../../interfaces/i-register-user';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  constructor(private userService : UserService){}
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
