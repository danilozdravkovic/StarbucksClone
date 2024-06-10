import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterLink } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  declarations: [
    PageNotFoundComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule
  ],
  exports:[
    AuthFormComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SharedModule { }
