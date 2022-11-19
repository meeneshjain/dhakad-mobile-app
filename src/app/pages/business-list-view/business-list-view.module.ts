import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessListViewPageRoutingModule } from './business-list-view-routing.module';

import { BusinessListViewPage } from './business-list-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessListViewPageRoutingModule
  ],
  declarations: [BusinessListViewPage]
})
export class BusinessListViewPageModule {}
