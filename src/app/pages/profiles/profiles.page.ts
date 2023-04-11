import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  parseData : any;
  allProfiles : any = [];
  profileImgPath: string = "https://dhakadmatrimony.shinebrandseeds.com/";
  public current_user_profile: any; 

  constructor(private navCtrl: NavController, 
    private httpService: HttpService, private utils: UtilsService, private platform: Platform,private  callNumber:  CallNumber) { }

  ngOnInit() {
    
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
      this.current_user_profile = parseData.profile_data;
      console.log('current_user_profile ', this.current_user_profile)

    }, (err) => {
      console.log("My Profile fetch api error :", err);
    });
    
    this.getAllProfiles();
  }


  getAllProfiles() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.allProfile, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("All Profile  api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.allProfiles=this.parseData.profile_data.data;
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("All Profile  fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
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
          this.utils.presentAlert(this.parseData.message); 
        } else {
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

  shortlist(id) {
    if(this.utils.isOnline()) {
      let token = localStorage.getItem("Dhakad_Token");
      this.utils.presentLoading();
      
      this.httpService.httpPostwithHeader(this.httpService.Url.addToShortlist+id, {}, token).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("add to shortlist  api :", this.parseData);
        this.utils.presentAlert(this.parseData.message);
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("add to shortlist error", err); 
        this.utils.presentAlert("Unable to process your request "); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  goToChat(virtualID,DeviceGcm){
    console.log('this.current_user_profile ', this.current_user_profile )
    if (this.current_user_profile?.Purchase_plan != null && this.current_user_profile?.Purchase_plan != '' &&  this.current_user_profile?.Purchase_plan != undefined && this.current_user_profile?.Purchase_plan != 0) {
      console.log("virtual ID",virtualID);
      localStorage.setItem("Dhakad_Partner_Virtual_id", virtualID);
      localStorage.setItem('gcmTocken',DeviceGcm);
      this.navCtrl.navigateForward('/chat');
    } else {
      this.navCtrl.navigateForward('/offers');

    }
  }
  goToCall(contact : any){
    if (this.current_user_profile?.Purchase_plan != null && this.current_user_profile?.Purchase_plan != '' &&  this.current_user_profile?.Purchase_plan != undefined && this.current_user_profile?.Purchase_plan != 0) {
      console.log("contact number",contact);
      var regrex = '/^[6-9]\d{9}$/';
      console.log("Valid contact number",regrex.match(contact));
      if(contact != null && contact.length == 10){
        this.callNumber.callNumber(contact, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
      }else
      this.utils.presentAlert("Incorrect Mobile Number!!");
    } else {
      this.navCtrl.navigateForward('/offers');
    }
  }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }
}
