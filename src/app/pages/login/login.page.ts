import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ChatService } from './../../services/chat.service';
import { VideoCallService } from './../../services/video-call.service';
import { SharedService } from './../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  parseData: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  public device_type = '';
  isLoggedIn = false;
  users = {
    id: '',
    name: '',
    email: '',
    picture: {
      data: {
        url: ''
      }
    }
  };
  fcmToken: any;
  userData: any = {};
  geoLatitude: number;
  geoLongitude: number; isGoogleLogin: boolean = false;
  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService, private fcm: FCM,
    private formBuilder: FormBuilder, private platform: Platform, private fb: Facebook, private geolocation: Geolocation, private googlePlus: GooglePlus, private fireAuth: AngularFireAuth, private chatService: ChatService, private videoService: VideoCallService, private ActivatedRouter: ActivatedRoute,
    private route: Router, private shared_service: SharedService,
  ) {

    this.platform.ready()
      .then(() => {
        // get FCM token
        this.fcm.getToken().then(token => {
          console.log("FCM token", token);
          this.fcmToken = token;
        });
        
        if (this.platform.is('android')) {
          this.device_type = 'android';
        } else if (this.platform.is('ios')) {
          this.device_type = 'ios';
        } else {
          this.device_type = 'chrome';
        }
        
      });
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      console.log("this.geoLatitude" + this.geoLatitude);
      console.log("this.geoLongitude" + this.geoLongitude);
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });

    this.loginForm = formBuilder.group({
      username: [''],
      password: ['']
    });

    fb.getLoginStatus()
      .then(res => {
        console.log("facebook status - ", res.status);
        if (res.status === 'connect') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));

  }

  fbLogin() {
    console.log('in here')
    this.fb.getLoginStatus().then((res) => {
      console.log('loginStatus Res ', JSON.stringify(res))
      if (res.status == 'connected') {
        this.getUserDetail(res.authResponse.userID);

      } else {
        this.fb.login(['public_profile', 'user_friends', 'email'])
          .then(res => {
            console.log('fb res.status ', res.status)
            if (res.status === 'connected') {
              this.getUserDetail(res.authResponse.userID);

            } else {
              this.isLoggedIn = false;
            }
          })
          .catch(e => console.log('Error logging into Facebook', JSON.stringify(e)));
      }
    });

  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log("get user details ", JSON.stringify(res));
        this.users = res;
        console.log('this.users ', this.users)
        // id" , "email", "name"
        this.socialLogn('facebook', this.users.email, this.users.id, this.users.name, (user_details)=>{
          if (user_details.status == true) {
            localStorage.setItem("Dhakad_Login_UserID", user_details.profileId);
           localStorage.setItem("Dhakad_Login_Status", "true");
            localStorage.setItem("Dhakad_Token", user_details.token);
            this.httpService.setLoginRegisterToken(user_details.token);
           this.navCtrl.navigateRoot('/home');
           this.shared_service.toggle_loggged_on(true)
           this.isLoggedIn = true; 
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  // logout() {
  //   this.fb.logout()
  //     .then( res => this.isLoggedIn = false)
  //     .catch(e => console.log('Error logout from Facebook', e));
  // }

  ngOnInit() {
    if (localStorage.getItem('Dhakad_Login_Status') == 'true') {
      this.navCtrl.navigateRoot('/home');
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';

  }

  forgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }



  // login() {
  //   this.navCtrl.navigateForward('/home');
  //   this.shared_service.toggle_loggged_on(true)
  // }

  login() {
    let userData = this.loginForm.value;

    if (userData.username.trim() === "" || userData.password.trim() === "") {
      this.utils.presentAlert("Please enter username and password to login");
    } else {
      this.loginApi(userData);
    }
  }

  loginApi(userData) {

    if (this.utils.isOnline()) {
      let data = {
        "email": userData.username,
        "password": userData.password,
        "lat": this.geoLatitude,
        "lon": this.geoLongitude,
        "gcmid": this.fcmToken,
        "DeviceId": this.fcmToken,
        "DeviceType": this.device_type,
      }
      
      console.log('data ', data )
        
      this.utils.presentLoading();
      this.httpService.httpPost(this.httpService.Url.login, data).subscribe((res) => {
        this.utils.dismissLoading();


        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("login api :", this.parseData);
        if (this.parseData.status == true) {
          var data = {
            email: this.parseData.user.Email,
            password: userData.password,
          }
          // var isSignIn =  this.chatService.signIn(data);
          // this.videoService.loginQuickBlox(data);
          this.chatService.signIn(data)
            .then(res => {
              console.log("chat data - ",res);
              //  this.errorMessage = "";
              //  this.navCtrl.navigateForward('/dashboard');
            }, err => {
              err.message;
              console.log("user is registered with firebase database" + err.message);
              var data = {
                email: this.parseData.user.Email,
                contact: this.parseData.user.Contact,
                password: userData.password,
                userName: this.parseData.user.PName
              }
              console.log("Data storing in firebase", JSON.stringify(data));
              this.chatService.signup(data);
            })

          this.loginForm.reset();

          if (this.parseData.otpverification == true) {

            console.log("OTP not verified");
            this.httpService.setOtpFlag(true);
            this.httpService.setLoginRegisterToken(this.parseData.token);
            this.navCtrl.navigateForward('/otp');
          } else {

            localStorage.setItem("Dhakad_Token", this.parseData.token);
            localStorage.setItem("Dhakad_Login_UserID", this.parseData.user.ProfileId);
            localStorage.setItem("Dhakad_Login_Status", "true");
            this.navCtrl.navigateRoot('/home');
            this.shared_service.toggle_loggged_on(true)
          }

        } else {
          this.utils.presentAlert(this.parseData.message);
        }



      }, (err) => {
        this.utils.dismissLoading();
        console.log("login error", err);


      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }


  // googleSignIn() {
  //   this.googlePlus.login({

  //     'webClientId': '701269312784-bn70irl4j0j4hcm07t8npd5bpaha540m.apps.googleusercontent.com',
  //     'offline': true
  //   }).then(result =>{
  //       this.userData = result;

  //       alert("google login"+this.userData);
  //       localStorage.setItem("Dhakad_Login_UserID", this.userData);
  //       localStorage.setItem("Dhakad_Login_Status", "true");
  //       this.navCtrl.navigateRoot('/home');
  //       this.shared_service.toggle_loggged_on(true)
  //     })
  //     .catch(err =>{
  //       this.userData = `Error ${JSON.stringify(err)}`;
  //       alert("google login error"+err);
  //     } );
  // }


  googleSignIn() {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          // webClientId: '701269312784-4ud6fgv1obi0pnj1se5467j02iepshr5.apps.googleusercontent.com',
          webClientId: '701269312784-4ud6fgv1obi0pnj1se5467j02iepshr5.apps.googleusercontent.com',
          idToken: 'AIzaSyDcm7ywIbeqnE1m0CiswyJVMxlxiSeRy3U', 
          offline: true,
          };
        
      } else {
        params = {};
      }
    
    
      this.googlePlus.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          /* 
             this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
         */
          this.onLoginSuccess(idToken, accessToken);
        }).catch((error) => {
          console.log("full error  google sign - ", JSON.stringify(error));
          // this.utils.presentAlert(this.utils.appConfig.internetMsg);
          alert('error google sign in :' + JSON.stringify(error));
        });
    } else {
    console.log('else...');
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
      console.log('success in google login', success);
      this.isGoogleLogin = true;
      this.userData = success.user;
      // uid , displayName , email
      this.socialLogn('google', this.userData.email, this.userData.uid, this.userData.displayName, (user_details) => {
        console.log("userData" + JSON.stringify(user_details));
        if (user_details.status == true){
          localStorage.setItem("Dhakad_Login_UserID", user_details.profileId);
          localStorage.setItem("Dhakad_Token", user_details.token);
          this.httpService.setLoginRegisterToken(user_details.token);
          localStorage.setItem("Dhakad_Login_Status", "true");
          this.navCtrl.navigateRoot('/home');
          this.shared_service.toggle_loggged_on(true)   
        }
      });

    }).catch(err => {
      console.log(err.message, 'error in google login');
    });
    }
  

  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.userData = success.user;
        console.log('this.userData', this.userData)
        localStorage.setItem("Dhakad_Login_UserID", this.userData);
        localStorage.setItem("Dhakad_Login_Status", "true");
        this.navCtrl.navigateRoot('/home');
        this.shared_service.toggle_loggged_on(true)

      });

  }

  logoutGoogle() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
    });
  }

  socialLogn(type, email, id, displayname, callback) {
    if (this.utils.isOnline()) {

      let data = {
        "type": type,
        "email": email,
        "gcmid": this.fcmToken,
        "id": id,
        "name": displayname,
        "fcmtoken": this.fcmToken

      }
      console.log("postparams of Social Login", JSON.stringify(data));
      this.utils.presentLoading();
      this.httpService.httpPost(this.httpService.Url.socialMemberLogin, data).subscribe((res) => {
        this.utils.dismissLoading();


        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("Get Social login api : ", this.parseData);
        if (callback != '' && callback!= null){
          callback(this.parseData)
        }
      }, (err) => {
        this.utils.dismissLoading();
        console.log("login error", err);


      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
  
  navigate_front(){
    this.route.navigateByUrl('/sign-up');
  }
}
