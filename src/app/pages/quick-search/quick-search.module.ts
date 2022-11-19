import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickSearchPageRoutingModule } from './quick-search-routing.module';

import { QuickSearchPage } from './quick-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickSearchPageRoutingModule
  ],
  declarations: [QuickSearchPage]
})
export class QuickSearchPageModule {}
