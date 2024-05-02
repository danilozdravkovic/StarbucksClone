import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards/rewards.component';


@NgModule({
  declarations: [
    RewardsComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule
  ]
})
export class RewardsModule { }
