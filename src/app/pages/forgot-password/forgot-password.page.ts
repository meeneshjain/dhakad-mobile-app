import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  parseData: any;
  phone: string;
  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService,
    private platform: Platform, private ActivatedRouter: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
  }


  forgotPassword() {
    
    if(this.utils.isOnline()) {
      let data = {   
          "username": this.phone,    
      }
      this.httpService.setUserId(this.phone);
      this.utils.presentLoading();
      this.httpService.httpPost(this.httpService.Url.forgotPassword, data).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
       
         
        console.log("forgotPassword api :", this.parseData); 
        if(this.parseData.status == true) {
          this.httpService.seForgetPasswordToken(this.parseData.forget_password_token);
          this.httpService.setValidateOTPToken(this.parseData.verify_otp_token);
          this.utils.presentCustomAlert(this.parseData.message).then((onResult:any) =>{
            if(onResult === 'ok'){
              this.navCtrl.navigateForward('/confirm-otp');
             
            }
          });
        } else {
          this.utils.presentAlert(this.parseData.errors);
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
  
  navigate_back() {
    this.route.navigateByUrl('/login');
  }


}
