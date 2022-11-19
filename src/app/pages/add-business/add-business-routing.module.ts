import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBusinessPage } from './add-business.page';

const routes: Routes = [
  {
    path: '',
    component: AddBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBusinessPageRoutingModule {}
