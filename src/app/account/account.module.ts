import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';


@NgModule({
  declarations: [
    RegisterComponent,
    SingInComponent,
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
