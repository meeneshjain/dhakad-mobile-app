import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmOtp } from './confirm-otp.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmOtp
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmOtpPageRoutingModule {}
