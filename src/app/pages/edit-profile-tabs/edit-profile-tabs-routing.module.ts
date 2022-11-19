import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileTabsPage } from './edit-profile-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileTabsPage,
	children: [
	  {     
       path: 'tab1',
        children: [
        {
            path: '',
            loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule'
          
       }]},
      {
        path: 'tab2',
        children: [
        {
        path: '',
        loadChildren: '../gallery/gallery.module#GalleryPageModule'
          
      }]}
      ,
     
      {
        path: '',
        redirectTo: '../edit-profile/edit-profile.module#EditProfilePageModule',
        pathMatch: 'full'
      }
	]
  },
     
  {
    path: '',
    redirectTo: './pages/edit-profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileTabsPageRoutingModule {}
