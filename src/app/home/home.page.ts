import { Component, OnInit,ViewChild } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { NavController, Platform,IonRouterOutlet} from '@ionic/angular';
import { HttpService } from './../services/http.service';
import { UtilsService } from './../services/utils.service';
import { SharedService } from './../services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  slideOpts = {
    initialSlide: 0,
    autoplay: {
      delay: 3000,
    },
    speed: 1000
  };

  successStories: any = [];
  testimonials: any = [];
  profiles: any = [];
  businesses: any = [];
  parseData: any;
  myProfile: any;
  profileImgPath: string = "https://dhakadmatrimony.shinebrandseeds.com/";
  reqsentId : string;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(private navCtrl: NavController, public httpService: HttpService, private utils: UtilsService,
    private platform: Platform, private router: Router, private shared_service: SharedService) {
      // this.platform.backButton.subscribeWithPriority(0, () => {
      //   if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      //     this.routerOutlet.pop();
      //   } else if (this.router.url === '/home') {
      //      navigator['app'].exitApp();
      //   } 
      // });
    this.shared_service.toggle_loggged_on(true)
    }

  

  ngOnInit() {
  
    this.generateDashboard();
    this.getMyProfile();
  }

  generateDashboard() {

    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.dashboard,token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Dashboard api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
          this.parseData.profile_data.forEach(element => {
            element.loadImage = false;
            this.profiles.push(element);
          });
         
          // this.profiles=this.parseData.profile_data;
          // this.businesses=this.parseData.buisness_list;
          
          this.parseData.buisness_list.forEach(element => {
            element.loadImage = false;
            this.businesses.push(element);
          });
          
         // this.successStories=this.parseData.successstory;
        this.parseData.successstory.forEach(element => {
          element.loadImage = false;
          this.successStories.push(element);
        });
         
         //this.testimonials=this.parseData.testimonial;
        this.parseData.testimonial.forEach(element => {
          element.loadImage = false;
          this.testimonials.push(element);
        });
          
         // this.profileImgPath=this.parseData.profile_image_path;
          console.log("profiles",typeof this.profiles);
          console.log("profiles data", this.profiles);
          console.log("businesses", this.businesses);
          console.log("successStories", this.successStories);
          console.log("testimonials", this.testimonials);
          this.shared_service.toggle_loggged_on(true)
      }, (err) => {
        this.utils.dismissLoading();
        this.shared_service.toggle_loggged_on(true)
        console.log("Dashboard fetch api error :", err);
      });
    } else {
      this.shared_service.toggle_loggged_on(true)
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getMyProfile() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      let UserId = localStorage.getItem("Dhakad_Login_UserID");
     // this.httpService.httpGetwithHeader(this.httpService.Url.myProfile, token).subscribe((res) => {
      this.httpService.httpGetwithHeader(this.httpService.Url.userProfile+UserId, token).subscribe((res) => { 
       this.utils.dismissLoading();
        console.log("My Profile api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.myProfile=this.parseData.profile_data;
          localStorage.setItem("Dhakad_User_Virtual_id", this.myProfile.Virtual_id);
          console.log("My Profile details:", this.myProfile);
          this.httpService.publish('profile', this.myProfile);
          this.httpService.publish('profile:update', {
            name: this.myProfile.PName,
            profileData: this.myProfile,
        });
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  open(page) {
    this.navCtrl.navigateForward(page);
  }

  businessList(categoryId) {
    this.navCtrl.navigateForward('/business-list/'+categoryId);
  }

  viewProfile(id) {
    this.httpService.setIsMyProfile(false);
    this.httpService.setUserId(id);
     this.navCtrl.navigateForward('my-profile');
   
  }
  
 
  sendRequest(id) {
    if(this.utils.isOnline()) {
      let token = localStorage.getItem("Dhakad_Token");
      this.utils.presentLoading();
      
      this.httpService.httpPostwithHeader(this.httpService.Url.sendRequest+id, {}, token).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("send request  api :", this.parseData);
        if(this.parseData.status == true) {
         this.reqsentId = id;
          console.log("this.reqsentId"+this.reqsentId)
         
          this.utils.presentAlert(this.parseData.message); 
        } else {
         this.reqsentId = '';
          this.utils.presentAlert(this.parseData.errors); 
        }
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("send request error", err); 
        this.utils.presentAlert("Unable to send Request. "); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

 
  // ionViewDidEnter(){ 
  //   console.log("Home Page",this.router.url);
  //   if(this.nav.getActive().name == '/home'){
  //     //this.platform.backButton.subscribeWithPriority(0, () => {
  //       //navigator['app'].exitApp();
  //      // });
  //      navigator['app'].exitApp();
  //   }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }

}
