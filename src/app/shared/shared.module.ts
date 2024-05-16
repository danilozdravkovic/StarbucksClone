import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterLink } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    AuthFormComponent
  ]
})
export class SharedModule { }
