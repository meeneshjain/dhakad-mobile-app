import { Component, OnInit } from '@angular/core';
import { NavController, Platform,ActionSheetController } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from './../../services/chat.service';
import { VideoCallService } from './../../services/video-call.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  registerForm : FormGroup;
  parseData : any;
  religion : any = [];
  caste : any = [];
  maxDob:any;
  maritial_status:any;
  userImg ="assets/images/photo2.png";
  imgUpload : string;
   
 

  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService,
    private formBuilder: FormBuilder, private platform: Platform, private camera: Camera, private actionSheetController: ActionSheetController, public domSanitizer: DomSanitizer, private chatService: ChatService, private videoService: VideoCallService, private ActivatedRouter: ActivatedRoute,
    private route: Router) { 
        var newDate = new Date();
        // var year = (newDate.getFullYear() - 18);
        // var month = "0"+(newDate.getMonth() + 1);
        // var date = "0"+newDate.getDate();
        this.maxDob = this.formatDate(newDate);
        console.log("max DOB for 18 years "+this.maxDob);
        // console.log(new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString());
        // console.log( new Date((new Date().getFullYear() - 18),new Date().getMonth(), new Date().getDate()));
       
      this.registerForm = formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        dob: ['', Validators.required],
        martstatus: ['',Validators.required],
        gender: ['', Validators.required],
        religion: ['', Validators.required],
        subcaste: ['', Validators.required],
        subcaste1: ['', Validators.required],
        pwd: ['', [Validators.required, Validators.minLength(6)]]
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
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.religion).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Religion api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("relion details", this.parseData);
         this.religion=this.parseData.caste;
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("religion fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }


  getCaste() {
    if(this.utils.isOnline) {
      // this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.caste).subscribe((res) => {
        // this.utils.dismissLoading();
        console.log("Caste api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("caste details", this.parseData);
         this.caste=this.parseData.caste;
        
      }, (err) => {
        // this.utils.dismissLoading();
        console.log("religion fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getDropDownData(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      
      this.httpService.httpGet(this.httpService.Url.dropDownAPI).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("My Profile api :", res);
        

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
         console.log("data of updated_marital status"+ JSON.stringify(this.parseData));
        
         this.religion=this.parseData.religion;
         this.caste = this.parseData.cast; 
         this.maritial_status = this.parseData.marritial_status;
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  register() {
    console.log("Register", this.registerForm);
    if(this.userImg === "assets/images/photo2.png") {
      this.utils.presentAlert("Please Select Profile Image")
    }else if(this.registerForm.controls.fullname.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid name")
    } else if(this.registerForm.controls.contact.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid mobile number")
    } else if(this.registerForm.controls.dob.status === "INVALID") {
      this.utils.presentAlert("Please select date of birth")
    } else if(this.registerForm.controls.gender.status === "INVALID") {
      this.utils.presentAlert("Please select gender")
    } else if(this.registerForm.controls.martstatus.status === "INVALID") {
      this.utils.presentAlert("Please select Marital Status")
    } else if(this.registerForm.controls.religion.status === "INVALID") {
      this.utils.presentAlert("Please select religion")
    } else if(this.registerForm.controls.subcaste.status === "INVALID") {
      this.utils.presentAlert("Please select caste")
    } else if(this.registerForm.controls.subcaste1.status === "INVALID") {
      this.utils.presentAlert("Please select sub caste")
    } else  if(this.registerForm.controls.email.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid email")
    } else if(this.registerForm.controls.pwd.status === "INVALID") {
      this.utils.presentAlert("Please enter a valid password. Password should be min 6 characters")
    } else {
      console.log("Img uploaded"+  this.imgUpload);
      var data ={
        "userimg" :  this.imgUpload,
        "fullname" : this.registerForm.controls.fullname.value,
        "email": this.registerForm.controls.email.value,
        "pwd": this.registerForm.controls.pwd.value,
         "contact" : this.registerForm.controls.contact.value,
         "gender":this.registerForm.controls.gender.value,
         "dob":this.registerForm.controls.dob.value ,
         "religion":this.registerForm.controls.religion.value,
         "Caste":this.registerForm.controls.subcaste.value,
         "subCaste":this.registerForm.controls.subcaste1.value,
         "martstatus" : this.registerForm.controls.martstatus.value
      
      }
      this.registerApi(data);
    }
  }

  registerApi(data) {
      console.log("API data", data);
      if(this.utils.isOnline()) {
        
        this.utils.presentLoading();
        this.httpService.httpPost(this.httpService.Url.register,data).subscribe((res) => {
          this.utils.dismissLoading();
          if(this.platform.is('cordova')) {
            this.parseData = JSON.parse(res.data);
          } else {
            this.parseData = res;
          }
          console.log('this.parseData ', JSON.stringify(this.parseData) )
          console.log('this.parseData.status ', this.parseData.status )
          if (this.parseData.status == true){
            var data= {
              email : this.registerForm.value.email,
              contact : this.registerForm.value.contact,
              password:this.registerForm.value.pwd,
              userName : this.registerForm.value.fullname
            }
            console.log("Data storing in firebase",JSON.stringify(data));
            this.chatService.signup(data);
          //  this.videoService.signUpQuickblox(data);
            this.registerForm.reset();
            console.log("register api :", this.parseData);
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
            console.log('this.parseData.errors ', this.parseData.errors )
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
                console.log("err msg", this.parseData.error.message);
                this.utils.presentAlert(this.parseData.error.message);
              }
            }
          }
  
  
        }, (err) => {
          if(err){
            this.utils.dismissLoading();
          }
         
          if(this.platform.is('cordova')) {
            this.parseData = JSON.parse(err.error);
            console.log("err msg",this.parseData.message);
            if( this.parseData.errors != undefined && this.parseData.errors.contact != undefined){
              this.utils.presentAlert(this.parseData.errors.contact[0]);
            }else if(this.parseData.errors != undefined && this.parseData.errors.email != undefined){
              this.utils.presentAlert(this.parseData.errors.email[0]);
            }else
             this.utils.presentAlert(this.parseData.message);
          } else {
            this.parseData = err;
            console.log("err msg",this.parseData.error.message);
          this.utils.presentAlert(this.parseData.error.message);
          }
          console.log("register error", this.parseData);
          
          
          
        });
      } else {
        this.utils.presentAlert(this.utils.appConfig.internetMsg);
      }

  }

  async updateProfileImage(){
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
      if(this.platform.is('cordova')){
        this.camera.getPicture(cameraOptions).then((imgData) => {

          if ( this.platform.is('android') &&
            sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
          ) {
            this.userImg = 'data:image/jpeg;base64,' + imgData; 
          } else {
            this.userImg = 'data:image/jpeg;base64,' + imgData; 
          }
          this.imgUpload = imgData;
          // console.log('image data =>  ', imgData);
          // this.userImg = 'data:image/jpeg;base64,' + imgData;
         
         
          }, (err) => {
          console.log(err);
          })
         
      }
  })
 
}

  navigate_back() {
    this.route.navigateByUrl('/login');
  }


}
