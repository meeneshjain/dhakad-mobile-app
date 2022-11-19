import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurSuccessStoryPageRoutingModule } from './our-success-story-routing.module';

import { OurSuccessStoryPage } from './our-success-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurSuccessStoryPageRoutingModule
  ],
  declarations: [OurSuccessStoryPage]
})
export class OurSuccessStoryPageModule {}
