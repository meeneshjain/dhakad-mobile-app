import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileVisitorsPage } from './profile-visitors.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileVisitorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileVisitorsPageRoutingModule {}
