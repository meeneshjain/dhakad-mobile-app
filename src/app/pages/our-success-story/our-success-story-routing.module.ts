import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurSuccessStoryPage } from './our-success-story.page';

const routes: Routes = [
  {
    path: '',
    component: OurSuccessStoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurSuccessStoryPageRoutingModule {}
