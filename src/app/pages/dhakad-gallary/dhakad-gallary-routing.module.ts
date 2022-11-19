import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DhakadGallaryPage } from './dhakad-gallary.page';

const routes: Routes = [
  {
    path: '',
    component: DhakadGallaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DhakadGallaryPageRoutingModule {}
