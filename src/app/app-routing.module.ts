import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'testimonials',
    loadChildren: () => import('./pages/testimonials/testimonials.module').then( m => m.TestimonialsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'profile-visitors',
    loadChildren: () => import('./pages/profile-visitors/profile-visitors.module').then( m => m.ProfileVisitorsPageModule)
  },
  {
    path: 'matches',
    loadChildren: () => import('./pages/matches/matches.module').then( m => m.MatchesPageModule)
  },
  {
    path: 'marriage-menu/:id',
    loadChildren: () => import('./pages/marriage-menu/marriage-menu.module').then( m => m.MarriageMenuPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./pages/requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'business-list/:id',
    loadChildren: () => import('./pages/business-list/business-list.module').then( m => m.BusinessListPageModule)
  },
  {
    path: 'business-list-view',
    loadChildren: () => import('./pages/business-list-view/business-list-view.module').then( m => m.BusinessListViewPageModule)
  },
  {
    path: 'view-profile',
    loadChildren: () => import('./pages/view-profile/view-profile.module').then( m => m.ViewProfilePageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./pages/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'confirm-otp',
    loadChildren: () => import('./pages/confirm-otp/confirm-otp.module').then( m => m.ConfirmOtpPageModule)
  },
  {
    path: 'create-password',
    loadChildren: () => import('./pages/create-password/create-password.module').then( m => m.CreatePasswordPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'profiles',
    loadChildren: () => import('./pages/profiles/profiles.module').then( m => m.ProfilesPageModule)
  },
  {
    path: 'quick-search',
    loadChildren: () => import('./pages/quick-search/quick-search.module').then( m => m.QuickSearchPageModule)
  },
  {
    path: 'searched-results',
    loadChildren: () => import('./pages/searched-results/searched-results.module').then( m => m.SearchedResultsPageModule)
  },
  {
    path: 'refer-friend',
    loadChildren: () => import('./pages/refer-friend/refer-friend.module').then( m => m.ReferFriendPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'add-business',
    loadChildren: () => import('./pages/add-business/add-business.module').then( m => m.AddBusinessPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'img-gallary',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'edit-profile-tabs',
    loadChildren: () => import('./pages/edit-profile-tabs/edit-profile-tabs.module').then( m => m.EditProfileTabsPageModule)
  },
  {
    path: 'dhakad-gallary',
    loadChildren: () => import('./pages/dhakad-gallary/dhakad-gallary.module').then( m => m.DhakadGallaryPageModule)
  },
  {
    path: 'our-success-story',
    loadChildren: () => import('./pages/our-success-story/our-success-story.module').then( m => m.OurSuccessStoryPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
