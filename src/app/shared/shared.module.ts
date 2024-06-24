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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LogoutComponent } from './components/logout/logout.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FirstLetterOfNameUppercasePipe } from './pipes/first-letter-of-name-uppercase.pipe';
import { MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    PageNotFoundComponent,
    AuthFormComponent,
    LogoutComponent,
    FirstLetterOfNameUppercasePipe
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports:[
    AuthFormComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    LogoutComponent,
    MatDialogModule,
    FirstLetterOfNameUppercasePipe,
    MatSnackBarModule
  ]
})
export class SharedModule { }
