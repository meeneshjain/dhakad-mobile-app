import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  parseData: any;
  token: string;
  otp: number;
  otpLoginFlag: boolean;
  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService, private ActivatedRouter: ActivatedRoute,
    private route: Router, private platform: Platform) {
      this.token = this.httpService.getLoginRegisterToken();
      
      this.otpLoginFlag = this.httpService.getOtpFlag();

  }

  ngOnInit() {
  }

  submit() {
    
    this.verifyOtp();
  }


  verifyOtp() {
    
    if(this.utils.isOnline()) {
      let data = {   
          "otp": this.otp,    
      }
      this.utils.presentLoading();
      this.httpService.httpPostwithHeader(this.httpService.Url.verifyOtp, data, this.token).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        if(this.parseData.status == true) {
          if(this.otpLoginFlag == true) {
            this.utils.presentAlert("OTP Verified, please login again");
            this.navCtrl.navigateRoot('/login');
          } else {
            this.utils.presentAlert("Registration sucessful.");
            //this.navCtrl.navigateForward('/login');
            localStorage.setItem("Dhakad_Token", this.token);
            // localStorage.setItem("Dhakad_Login_UserID", this.parseData.user.id);
            localStorage.setItem("Dhakad_Login_Status", "true");
            this.navCtrl.navigateRoot('/home');
          }
        } else {
          this.utils.presentAlert("OTP verification failed");
        }
        
         
      }, (err) => {
        this.utils.dismissLoading();
        
        this.utils.presentAlert("OTP Verification failed. Please check the OTP"); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }


  resendOtp() {
    
    if(this.utils.isOnline()) {
      this.utils.presentLoading();
      this.httpService.httpPostwithHeader(this.httpService.Url.resendOtp, {}, this.token).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
          this.utils.presentAlert(this.parseData.message);  
      }, (err) => {
        this.utils.dismissLoading();
        
       
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
  

  navigate_back() {
    this.route.navigateByUrl('/login');
  }


}
