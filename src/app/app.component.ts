import { Component,ViewChild } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { Platform, MenuController, NavController,IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './../app/services/http.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ChatService } from './services/chat.service';
import { SharedService } from './services/shared.service';

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
    private chatService: ChatService
  ) {
    this.initializeApp();
    // this.menu.enable(true, 'first');
    this.httpService.subscribe('profile:update', (data: any) => {
      console.log('Welcome', data.name, 'at', data.profileData);
      this.profile = data.profileData;
      console.log('this.profile ', this.profile )
     // this.profileImg = "http://dhakadmatromonial.graspcorn.in/assets/profile/"+data.profileData.ProfileImg;
     this.profileImg = "https://dhakadmatrimony.shinebrandseeds.com/"+data.profileData.ProfileImg;
     console.log("profile-image", this.profileImg)

  });

  this.httpService.subscribe('profile:updateImg',(ImgData) => {
    console.log('only image update from edit profile', ImgData);
    
    this.profileImg = "https://dhakadmatrimony.shinebrandseeds.com/"+ ImgData.profileImg;
    console.log("imgae updated in app"+ this.profileImg);
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
        this.httpService.httpGetwithHeader(this.httpService.Url.myProfile, token).subscribe((res) => {
          
          let parseData:any
          if (this.platform.is('cordova')) {
            parseData = JSON.parse(res.data);
          } else {
            parseData = res;
          }
          //this.profileImgPath=this.parseData.imgpath;
          this.profile = parseData.profile_data;

        }, (err) => {
          console.log("My Profile fetch api error :", err);
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
      //   console.log("FCM token",token);
      // });
        // this.fcm.onNotification().subscribe(data => {
        //   if (data.wasTapped) {
        //     console.log("Received in background");
        //     this.fcm.getInitialPushPayload().then( data => {
        //       // or handle data here
        //       console.log(data);
        //       console.log("received in background")
        // }, error=> console.log(error))
        //   } else {
        //     console.log("Received in foreground");
        //     console.log(data);
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
