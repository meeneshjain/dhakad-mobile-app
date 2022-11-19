import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
})
export class ConfirmOtp implements OnInit {
  
  parseData: any;
  token: string;
  otp: number;
 ;
  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService,
    private platform: Platform) {
      this.token = this.httpService.getValidateOTPToken();
     
      console.log("forget password token", this.token);
     
     }

  ngOnInit() {}

  submit() {
    console.log("otp", this.otp);
    this.verifyOtp();
  }

  verifyOtp() {
    
    if(this.utils.isOnline()) {
      let data = {   
          "otp": this.otp   
      }
      this.httpService.setOTP(this.otp);
      this.utils.presentLoading();
      this.httpService.httpPostwithHeader(this.httpService.Url.verifyOtp, data, this.token).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("verify otp api :", this.parseData);
        if(this.parseData.status == true) {
          
           this.navCtrl.navigateForward('/create-password');
        
        } else {
          this.utils.presentAlert("OTP verification failed");
        }
        
         
      }, (err) => {
        this.utils.dismissLoading();
        console.log("login error", err); 
        this.utils.presentAlert("OTP Verification failed. Please check the OTP"); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }


  resendOtp(){
    let phone = this.httpService.getUserId();
    if(this.utils.isOnline()) {
      let data = {   
          "username": phone,    
      }
     
      this.utils.presentLoading();
      this.httpService.httpPost(this.httpService.Url.forgotPassword, data).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        this.httpService.seForgetPasswordToken(this.parseData.forget_password_token);
       this.httpService.setValidateOTPToken(this.parseData.verify_otp_token);
        this.token = this.parseData.verify_otp_token;
        console.log("forgotPassword api :", this.parseData); 
        if(this.parseData.status == true) {
          this.utils.presentAlert(this.parseData.message);
        } else {
          this.utils.presentAlert(this.parseData.error_msg);
        }
         
      }, (err) => {
        this.utils.dismissLoading();
        console.log("login error", err); 
        this.utils.presentAlert("Unable to process your request. Please try later."); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
}
