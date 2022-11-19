import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileVisitorsPageRoutingModule } from './profile-visitors-routing.module';

import { ProfileVisitorsPage } from './profile-visitors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileVisitorsPageRoutingModule
  ],
  declarations: [ProfileVisitorsPage]
})
export class ProfileVisitorsPageModule {}
