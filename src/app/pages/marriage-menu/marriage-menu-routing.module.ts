import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarriageMenuPage } from './marriage-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MarriageMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarriageMenuPageRoutingModule {}
