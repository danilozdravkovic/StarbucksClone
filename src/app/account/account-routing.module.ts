import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { SingInComponent } from './components/sing-in/sing-in.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"register",
    pathMatch:"full"
  },
  {
    path:"register",
    component:RegisterComponent,
  },
  {
    path:"signin",
    component:SingInComponent,
  },
  {
    path:"**",
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
