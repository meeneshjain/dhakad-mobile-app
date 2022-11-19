import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessListViewPage } from './business-list-view.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessListViewPageRoutingModule {}
