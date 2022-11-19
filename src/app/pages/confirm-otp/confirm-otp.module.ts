import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmOtpPageRoutingModule } from './confirm-otp-routing.module';

import { ConfirmOtp } from './confirm-otp.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmOtpPageRoutingModule
  ],
  declarations: [ConfirmOtp]
})
export class ConfirmOtpPageModule {}
