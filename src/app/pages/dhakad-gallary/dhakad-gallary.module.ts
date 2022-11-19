import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DhakadGallaryPageRoutingModule } from './dhakad-gallary-routing.module';

import { DhakadGallaryPage } from './dhakad-gallary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DhakadGallaryPageRoutingModule
  ],
  declarations: [DhakadGallaryPage]
})
export class DhakadGallaryPageModule {}
