import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { NavController,Platform,ActionSheetController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.page.html',
  styleUrls: ['./add-business.page.scss'],
})
export class AddBusinessPage implements OnInit {
  businessForm : FormGroup;
  userImg ="assets/images/photo2.png";
  imgUpload : string;
  parseData : any;
  stateData : any;
  cityData : any;
  subscription: Subscription;
  businessCat : any;
 
  
  constructor(private formBuilder: FormBuilder, private navCtrl: NavController,public domSanitizer: DomSanitizer,private httpService: HttpService,private utils: UtilsService,private platform: Platform,
    private camera: Camera, private actionSheetController: ActionSheetController) { 
    this.businessForm = new FormGroup({
      Business: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', Validators.compose([Validators.required,Validators.minLength(10), Validators.pattern('[6-9]\\d{9}')])),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      District: new FormControl('', Validators.required),
      Pincode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6)])),
      weblink: new FormControl('', Validators.required),
      playstoreLink: new FormControl('', Validators.required),
     
    });
   

   
  }

  ngOnInit() {
    this.getState();
    this.getDropDownData();
  
  }

  getState(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
     // const getState = this.httpService.httpGet(this.httpService.Url.getState);
     // const getBusinessCategory = this.httpService.httpGetwithHeader(this.httpService.Url.businesslistcat, token)
     // this.subscription = forkJoin([getState, getBusinessCategory]).subscribe((res) => {
     
    this.httpService.httpGet(this.httpService.Url.getState).subscribe((res) => {
     this.utils.dismissLoading();
         console.log("State api :", res);
         
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
         } else {
          this.parseData = res;
         }
        console.log("state details", this.parseData);
        this.stateData=this.parseData;
      // if(this.parseData.message == 'Success'){
      //   this.stateData=this.parseData.data;
      // //  this.businessCat = parseData1.data;
      // }
     }, (err) => {
         console.log("religion fetch api error :", err);
      });
     
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getCity(event:any){
    console.log("value of city",event)
 
    if(this.utils.isOnline) {
      let postData = {
       "state_id" : event
      }
     this.httpService.httpGet(this.httpService.Url.getCity+event).subscribe((res) => {
      
       console.log("city api :", res);
 
       if(this.platform.is('cordova')) {
         this.parseData = JSON.parse(res.data);
       } else {
         this.parseData = res;
       }
       console.log("city details", this.parseData);
        this.cityData=this.parseData;
       
     }, (err) => {
       
       console.log("religion fetch api error :", err);
     });
   } else {
     this.utils.presentAlert(this.utils.appConfig.internetMsg);
   }
   }


   get f() { return this.businessForm.controls; }

   addBusiness(){
     console.log("called add "+this.businessForm);
     if(this.businessForm.invalid){
      this.utils.presentAlert("Please enter all details!!");
       console.log("Please enter all details!!");
       return;
     }
     if(this.userImg === "assets/images/photo2.png") {
      this.utils.presentAlert("Please Select Profile Image")
    }else{
      console.log("form validated");
      var data ={
        "business_id" : this.businessForm.controls.Business.value,  
        "name" : this.businessForm.controls.Name.value,
        "email": this.businessForm.controls.email.value,
        "contact" : this.businessForm.controls.contact.value,
        "desc" :this.businessForm.controls.description.value,
        "address":this.businessForm.controls.address.value,
         "dist":this.businessForm.controls.District.value,
        "state":this.businessForm.controls.state.value,
        "city":this.businessForm.controls.city.value,
        "zipcode":this.businessForm.controls.Pincode.value,
        "weblink":this.businessForm.controls.weblink.value,
         "applink":this.businessForm.controls.playstoreLink.value, 
         "vender_img1" : this.imgUpload
 }
      console.log("post params", JSON.stringify(data));
      if(this.utils.isOnline) {
        let token = localStorage.getItem("Dhakad_Token");
        this.utils.presentLoading();
        this.httpService.httpPostwithHeader(this.httpService.Url.addBusiness,data,token).subscribe((res) => {
          this.utils.dismissLoading();
          console.log("business Add api :", res);
  
          if(this.platform.is('cordova')) {
            this.parseData = JSON.parse(res.data);
          } else {
            this.parseData = res;
          }
           console.log("data"+JSON.stringify( this.parseData ));
           this.utils.presentAlert(this.parseData.message);
           this.navCtrl.navigateForward('/home');

          
        }, (err) => {
          this.utils.dismissLoading();
          console.log("businessList fetch api error :", err);
          if(this.platform.is('cordova')) {
            this.parseData = JSON.parse(err.error);
            console.log("err msg",this.parseData.message);
            if(this.parseData.errors != undefined && this.parseData.errors.email != undefined){
              this.utils.presentAlert(this.parseData.errors.email[0]);
            }else if(this.parseData.errors != undefined && this.parseData.errors.contact != undefined){
              this.utils.presentAlert(this.parseData.errors.contact[0]);
            }else
             this.utils.presentAlert(this.parseData.message);
          } else {
            this.parseData = err;
            console.log("err msg",this.parseData.error.message);
          this.utils.presentAlert(this.parseData.error.message);
          }
         

        });
      } else {
        this.utils.presentAlert(this.utils.appConfig.internetMsg);
      }
    }
      

   
   }
   getDropDownData(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");//marital_status
      this.httpService.httpGetwithHeader(this.httpService.Url.dropDownAPI, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("My Profile api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
         console.log("data of updated_marital status"+ JSON.stringify(this.parseData));
         this.businessCat =  this.parseData.bus_category;
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
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
          // console.log('image data =>  ', imgData);
          // this.userImg = 'data:image/jpeg;base64,' + imgData;


        }, (err) => {
          console.log(err);
        })

      }
    })

  }

/*    async updateProfileImage(){
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
  } */

 /*  openCamera(sourceType: PictureSourceType) {
  
    const cameraOptions: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
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
          }, (err) => {
          console.log(err);
          })
         
      }
  })
 
} */
}
