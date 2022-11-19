import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SharedService } from './../../services/shared.service';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  btn1= "selected";
  btn2= "";
  btn3= "";
  btn4= "";
  parseData : any;
  myProfile : any;
  isMyProfile : boolean =false;
  cityname : any;
  gallaryPics : any = [];
  
  profileImgPath: string = "https://dhakadmatrimony.shinebrandseeds.com/";
  
  constructor(private navCtrl: NavController, 
    private shared_service: SharedService,
    private httpService: HttpService, private utils: UtilsService,private router: Router, private platform: Platform,private  callNumber:  CallNumber) { //
      
    }

  ngOnInit() {
    this.isMyProfile = this.httpService.isMyProfile();
    console.log("whose profile"+this.isMyProfile);
    if(this.isMyProfile) {
      this.getMyProfile();
    } else {
      this.getUserProfile();
    }
    
  }

  select(id) {
    if(id == "tab1") {
      this.btn1 = "selected"; this.btn2="", this.btn3=""; this.btn4="";
    } else if(id == "tab2") {
      this.btn1 = ""; this.btn2="selected", this.btn3=""; this.btn4="";
    } else if(id == "tab3"){
      this.btn1 = ""; this.btn2="", this.btn3="selected"; this.btn4="";
    } else {
      this.btn1 = ""; this.btn2="", this.btn3=""; this.btn4="selected";
    }
   }


  getMyProfile() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.myProfile, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("My Profile api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        //this.profileImgPath=this.parseData.imgpath;
          this.myProfile=this.parseData.profile_data;
          
          console.log("My Profile details:", this.myProfile);
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getUserProfile() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      let user = this.httpService.getUserId();
      this.httpService.httpGetwithHeader(this.httpService.Url.userProfile+user, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("User Profile api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        //this.profileImgPath=this.parseData.imgpath;
          this.myProfile=this.parseData.profile_data;
         
          this.myProfile.gallery.forEach(i => this.gallaryPics.push(this.profileImgPath+i.image));
          console.log("gallary pics",this.gallaryPics);
          if(this.parseData.profile_data.City != null)
          this.getCityName(this.parseData.profile_data.City);
          console.log("User Profile details:", this.myProfile);
          console.log("Virtual ID",this.myProfile.Virtual_id);
          localStorage.setItem("Dhakad_Partner_Virtual_id", this.myProfile.Virtual_id);
          localStorage.setItem('gcmTocken',this.myProfile.DeviceGcm);
        this.save_profile_visitor(this.myProfile.ProfileId);
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
  
  save_profile_visitor(visited_id) {
    if (this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      let url = this.httpService.Url.save_profileVisitors + visited_id;
      this.httpService.httpGetwithHeader(url, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Visitor :", res);

/*         if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        } */
        //this.profileImgPath=this.parseData.imgpath;
    /*     this.myProfile = this.parseData.profile_data;

        console.log("My Profile details:", this.myProfile); */

      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getCityName(cityId){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
     
      this.httpService.httpGetwithHeader(this.httpService.Url.getCityName+cityId, token).subscribe((res) => { 
        this.utils.dismissLoading();
        console.log("MCity Name api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
       this.cityname = this.parseData.city_name;
       console.log("city Name",this.cityname);
         
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
  getDOB(date) {
    let d = date.split("T");
    console.log("d", d);
    return d[0];
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
        this.shared_service.load_reload_matches(true);
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("add to shortlist error", err); 
        this.utils.presentAlert("Unable to process your request "); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
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
  goToChat(){
    this.navCtrl.navigateForward('/chat');
  }
  goToCall(contact : any){
    console.log("contact number",contact);
    var regrex = '/^[6-9]\d{9}$/';
    console.log("Valid contact number",regrex.match(contact));
    if(contact != null && contact.length == 10){
      this.callNumber.callNumber(contact, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
    }else
    this.utils.presentAlert("Incorrect Mobile Number!!");
  }

  goToProfilePics(){
    let navigationExtras: NavigationExtras = {
      state: {
          gallaryPics: JSON.stringify(this.gallaryPics)
      }
  };
  this.router.navigate(['img-gallary'],  navigationExtras);
   
  }
}
