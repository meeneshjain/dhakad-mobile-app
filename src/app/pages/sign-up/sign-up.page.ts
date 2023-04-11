import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ActionSheetController } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from './../../services/chat.service';
import { VideoCallService } from './../../services/video-call.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  registerForm: FormGroup;
  parseData: any;
  religion: any = [];
  caste: any = [];
  maxDob: any;
  maritial_status: any;
  userImg = "assets/images/photo2.png";
  imgUpload: string;
  public device_type = '';
  fcmToken: any;


  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService,
    private formBuilder: FormBuilder, private platform: Platform, private camera: Camera, private actionSheetController: ActionSheetController, public domSanitizer: DomSanitizer, private chatService: ChatService, private videoService: VideoCallService, private ActivatedRouter: ActivatedRoute,
    private route: Router, private fcm: FCM,) {
    var newDate = new Date();
    // var year = (newDate.getFullYear() - 18);
    // var month = "0"+(newDate.getMonth() + 1);
    // var date = "0"+newDate.getDate();
    this.maxDob = this.formatDate(newDate);
    
     

    this.registerForm = formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      dob: ['', Validators.required],
      martstatus: ['', Validators.required],
      gender: ['', Validators.required],
      religion: ['', Validators.required],
      subcaste: ['', Validators.required],
      subcaste1: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.platform.ready()
      .then(() => {
        // get FCM token
        this.fcm.getToken().then(token => {
          
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

  }

  formatDate(date) {
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = (d.getFullYear() - 18);
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  ngOnInit() {

    //this.getReligion();
    //this.getCaste();
    this.getDropDownData();
  }




  getReligion() {
    if (this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.religion).subscribe((res) => {
        this.utils.dismissLoading();
        

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        this.religion = this.parseData.caste;

      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }


  getCaste() {
    if (this.utils.isOnline) {
      // this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.caste).subscribe((res) => {
        // this.utils.dismissLoading();
        

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        this.caste = this.parseData.caste;

      }, (err) => {
        // this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getDropDownData() {
    if (this.utils.isOnline) {
      this.utils.presentLoading();

      this.httpService.httpGet(this.httpService.Url.dropDownAPI).subscribe((res) => {
        this.utils.dismissLoading();
        


        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        

        this.religion = this.parseData.religion;
        this.caste = this.parseData.cast;
        this.maritial_status = this.parseData.marritial_status;

      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  register() {
    
    if (this.userImg === "assets/images/photo2.png") {
      this.utils.presentAlert("Please Select Profile Image")
    } else if (this.registerForm.controls.fullname.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid name")
    } else if (this.registerForm.controls.contact.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid mobile number")
    } else if (this.registerForm.controls.dob.status === "INVALID") {
      this.utils.presentAlert("Please select date of birth")
    } else if (this.registerForm.controls.gender.status === "INVALID") {
      this.utils.presentAlert("Please select gender")
    } else if (this.registerForm.controls.martstatus.status === "INVALID") {
      this.utils.presentAlert("Please select Marital Status")
    } else if (this.registerForm.controls.religion.status === "INVALID") {
      this.utils.presentAlert("Please select religion")
    } else if (this.registerForm.controls.subcaste.status === "INVALID") {
      this.utils.presentAlert("Please select caste")
    } else if (this.registerForm.controls.subcaste1.status === "INVALID") {
      this.utils.presentAlert("Please select sub caste")
    } else if (this.registerForm.controls.email.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid email")
    } else if (this.registerForm.controls.pwd.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid password. Password should be min 6 characters")
    } else {
      
      var dateobj = new Date(this.registerForm.value.dob);
      var dateformatted = dateobj.getFullYear() + '-' + ("0" + (dateobj.getMonth() + 1)).slice(-2) + '-' + ("0" + dateobj.getDate()).slice(-2)
      var data = {
        "userimg": this.imgUpload,
        "fullname": this.registerForm.value.fullname,
        "email": this.registerForm.value.email,
        "pwd": this.registerForm.value.pwd,
        "contact": this.registerForm.value.contact,
        "gender": this.registerForm.value.gender,
        "dob": dateformatted,
        "religion": this.registerForm.value.religion,
        "Caste": this.registerForm.value.subcaste,
        "subcaste": this.registerForm.value.subcaste1,
        "martstatus": this.registerForm.value.martstatus,
        "DeviceId": this.fcmToken,
        "DeviceType": this.device_type,

      }
      this.registerApi(data);
    }
  }

  registerApi(data) {
    
    if (this.utils.isOnline()) {

      this.utils.presentLoading();
      this.httpService.httpPost(this.httpService.Url.register, data).subscribe((res) => {
        this.utils.dismissLoading();
        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        
        if (this.parseData.status == true) {
          var data = {
            email: this.registerForm.value.email,
            contact: this.registerForm.value.contact,
            password: this.registerForm.value.pwd,
            userName: this.registerForm.value.fullname
          }
          
          this.chatService.signup(data);
          //  this.videoService.signUpQuickblox(data);
          this.registerForm.reset();
          
          // if(this.parseData.status == true) {
          //   this.utils.presentAlert("Registration sucessful, please proceed to login");
          //   this.navCtrl.navigateBack('/otp');
          // } else {
          //   this.utils.presentAlert("Registration failed");
          // } 
          this.httpService.setLoginRegisterToken(this.parseData.verify_otp_token);
          localStorage.setItem("Dhakad_Login_UserID", this.parseData.user.ProfileId);
          this.httpService.setOtpFlag(false);
          this.navCtrl.navigateForward('/otp');

        } else {
          
          if (this.parseData.errors) {
            if (this.platform.is('cordova')) {

              if (this.parseData.errors != undefined && this.parseData.errors.contact != undefined) {
                this.utils.presentAlert(this.parseData.errors.contact[0]);
              } else if (this.parseData.errors != undefined && this.parseData.errors.email != undefined) {
                this.utils.presentAlert(this.parseData.errors.email[0]);
              } else
                this.utils.presentAlert(this.parseData.message);
            } else {
              this.parseData = res;
              
              this.utils.presentAlert(this.parseData.error.message);
            }
          }
        }


      }, (err) => {
        if (err) {
          this.utils.dismissLoading();
        }

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(err.error);
          
          if (this.parseData.errors != undefined && this.parseData.errors.contact != undefined) {
            this.utils.presentAlert(this.parseData.errors.contact[0]);
          } else if (this.parseData.errors != undefined && this.parseData.errors.email != undefined) {
            this.utils.presentAlert(this.parseData.errors.email[0]);
          } else
            this.utils.presentAlert(this.parseData.message);
        } else {
          this.parseData = err;
          
          this.utils.presentAlert(this.parseData.error.message);
        }
        



      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }

  }

  async updateProfileImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.openCamera(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  openCamera(sourceType: PictureSourceType) {

    const cameraOptions: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false
    }

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.camera.getPicture(cameraOptions).then((imgData) => {

          if (this.platform.is('android') &&
            sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
          ) {
            this.userImg = 'data:image/jpeg;base64,' + imgData;
          } else {
            this.userImg = 'data:image/jpeg;base64,' + imgData;
          }
          this.imgUpload = imgData;
          // 
          // this.userImg = 'data:image/jpeg;base64,' + imgData;


        }, (err) => {
          
        })

      }
    })

  }

  navigate_back() {
    this.route.navigateByUrl('/login');
  }


}
