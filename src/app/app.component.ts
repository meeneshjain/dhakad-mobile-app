import { Component,ViewChild } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { Platform, MenuController, NavController,IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './../app/services/http.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ChatService } from './services/chat.service';
import { SharedService } from './services/shared.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  profile: any;
  public current_user_profile: any; 
  profileImg: string= null;
  public is_logged_in = false;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private nav: NavController,
    private httpService: HttpService,
    private shared_service: SharedService,
    private fcm: FCM,
    private router : Router,
    private chatService: ChatService,
    private utils: UtilsService, 
  ) {
    this.initializeApp();
    // this.menu.enable(true, 'first');
    this.httpService.subscribe('profile:update', (data: any) => {
      
      this.profile = data.profileData;
      
     // this.profileImg = "http://dhakadmatromonial.graspcorn.in/assets/profile/"+data.profileData.ProfileImg;
     this.profileImg = "https://dhakadmatrimony.shinebrandseeds.com/"+data.profileData.ProfileImg;
     

  });

  this.httpService.subscribe('profile:updateImg',(ImgData) => {
    
    
    this.profileImg = "https://dhakadmatrimony.shinebrandseeds.com/"+ ImgData.profileImg;
    
  });
  this.platform.backButton.subscribeWithPriority(0, () => {
    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.routerOutlet.pop();
    } else if (this.router.url === '/home') {
       navigator['app'].exitApp();
    } 
  });
  
    this.shared_service.hidePremiumOption.subscribe((obj) => {
      if (obj == true) {
        
      
        let token = localStorage.getItem("Dhakad_Token");
        let user = localStorage.getItem("Dhakad_Login_UserID");
        this.httpService.httpGetwithHeader(this.httpService.Url.userProfile + user, token).subscribe((res) => {

          let parseData: any
          if (this.platform.is('cordova')) {
            parseData = JSON.parse(res.data);
          } else {
            parseData = res;
          }
          //this.profileImgPath=this.parseData.imgpath;
          this.profile = parseData.profile_data;
          this.profileImg = "https://dhakadmatrimony.shinebrandseeds.com/" + this.profile.ProfileImg;
          

        }, (err) => {
          
        });
      
      }
    });
    
    this.shared_service.loggedInOption.subscribe((obj) => {
      if (obj == true) {
        this.is_logged_in = true;
      } else if (obj == false) {
        this.is_logged_in = false;
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.splashScreen.hide();
      if(localStorage.getItem('Dhakad_Login_Status') == 'true') {
       //  this.nav.navigateRoot('/home');
      } else {
        this.nav.navigateRoot('/welcome');
      }

      // this.fcm.getToken().then(token => {
      //   
      // });
        // this.fcm.onNotification().subscribe(data => {
        //   if (data.wasTapped) {
        //     
        //     this.fcm.getInitialPushPayload().then( data => {
        //       // or handle data here
        //       
        //       
        // }, error=> 
        //   } else {
        //     
        //     
        //     this.httpService.setNotification(data);
        //      };
        // });

    
    });
  }

  closeMenu() {
    this.menu.close();
  }

  open(page) {
    this.menu.close();
    this.nav.navigateForward(page);
  }

  openProfile(page) {
    this.menu.close();
    this.httpService.setIsMyProfile(true);
    this.nav.navigateForward(page);
  }
  goPremium(){
    this.menu.close();
    this.nav.navigateForward('offers');
  }
  logout() {
    this.menu.close();
    this.is_logged_in = false;
    
    localStorage.removeItem("Dhakad_Token");
    localStorage.removeItem("Dhakad_Login_UserID");
    localStorage.removeItem("Dhakad_Login_Status");
    this.chatService.signOut();
    this.nav.navigateRoot('/login');
  }
}
