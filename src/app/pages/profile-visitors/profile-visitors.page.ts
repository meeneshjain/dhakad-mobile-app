import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-profile-visitors',
  templateUrl: './profile-visitors.page.html',
  styleUrls: ['./profile-visitors.page.scss'],
})
export class ProfileVisitorsPage implements OnInit {

  parseData : any;
  visitors : any = [];
  profileImgPath: string = 'https://dhakadmatrimony.shinebrandseeds.com/';
  constructor(private navCtrl: NavController, 
    private httpService: HttpService, private utils: UtilsService, private platform: Platform) { }

  ngOnInit() {
    this.getProfileVisitors();
  }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }


  getProfileVisitors() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.profileVisitors, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Profile Visitors api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.visitors=this.parseData.allvisitor.data;
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("Profile Visitors fetch api error :", err);
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

  viewProfile(id) {
    this.httpService.setIsMyProfile(false);
    this.httpService.setUserId(id);
    this.navCtrl.navigateForward('my-profile');
  }

  

}
