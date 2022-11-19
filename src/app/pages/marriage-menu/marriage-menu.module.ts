import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarriageMenuPageRoutingModule } from './marriage-menu-routing.module';

import { MarriageMenuPage } from './marriage-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarriageMenuPageRoutingModule
  ],
  declarations: [MarriageMenuPage]
})
export class MarriageMenuPageModule {}
