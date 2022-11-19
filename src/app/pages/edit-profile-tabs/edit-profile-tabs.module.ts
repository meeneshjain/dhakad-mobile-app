import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileTabsPageRoutingModule } from './edit-profile-tabs-routing.module';

import { EditProfileTabsPage } from './edit-profile-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileTabsPageRoutingModule
  ],
  declarations: [EditProfileTabsPage]
})
export class EditProfileTabsPageModule {}
