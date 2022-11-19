import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {
  passwordForm: FormGroup;
  error_messages = {
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
    ],
  }
  token: string;
  parseData : any;
  userID: any;
  constructor( public formBuilder: FormBuilder,private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService,
    private platform: Platform) {
    this.token = this.httpService.getForgetPasswordToken();
      console.log("forget password token", this.token);
      this.userID = this.httpService.getUserId();
    this.passwordForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this)
    });

   }

  ngOnInit() {
  }

  
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  submit(){
    let otp = this.httpService.getOTP();
    console.log("OTP",otp);
    if(this.utils.isOnline()) {
      let data ={
        //"email":this.userID,
        "forget_password_token": this.token,
       // "confirm_password":this.passwordForm.value.confirmpassword,
        "password":this.passwordForm.value.password,
        "otp": otp
       }
    console.log("password"+JSON.stringify(data));
      this.utils.presentLoading();
     
      this.httpService.httpPost(this.httpService.Url.resetPassword, data).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("updateProfileImage api :", this.parseData); 
        if(this.parseData.status == true) {
          this.utils.presentAlert(this.parseData.message);
          this.navCtrl.navigateForward('/login');
        } else {
          this.utils.presentAlert(this.parseData.error_msg);
        }
        
         
      }, (err) => {
        this.utils.dismissLoading();
        console.log("updateProfileImage error", err); 
        this.utils.presentAlert("Unable to process your request. Please try later."); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

}
