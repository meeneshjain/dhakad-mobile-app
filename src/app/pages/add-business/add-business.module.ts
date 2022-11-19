import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBusinessPageRoutingModule } from './add-business-routing.module';

import { AddBusinessPage } from './add-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddBusinessPageRoutingModule
  ],
  declarations: [AddBusinessPage]
})
export class AddBusinessPageModule {}
