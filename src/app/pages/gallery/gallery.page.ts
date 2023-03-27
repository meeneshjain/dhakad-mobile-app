import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform ,ActionSheetController} from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
//import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  parseData : any;
  gallery : any;
  userImg: any = [];
  base64Img = '';
  uploadedImage :any = [];
  fileInputData:any;
  currentSelected: Number = null;
  profileImgPath: string = "https://dhakadmatrimony.shinebrandseeds.com/";
  constructor(private navCtrl: NavController, 
    private httpService: HttpService, private utils: UtilsService, private platform: Platform, private camera: Camera, private actionSheetController: ActionSheetController, private router: Router) { }//,private imagePicker: ImagePicker

  ngOnInit() {
    this.getMyGallery()
  }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }

  getMyGallery() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.gallery, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Gallery api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.gallery=this.parseData.data;
          console.log(this.parseData.profilepath);
          this.userImg = [];
         // this.gallery.forEach(i => this.userImg.push(this.profileImgPath+i.image));
        // this.gallery.forEach(i => this.userImg.push(this.profileImgPath+i.full));
        this.userImg = this.gallery.filter(obj => {
          obj.loadImage = false;
          obj.imagepath = obj.full;
          obj.full = this.profileImgPath + obj.full
          return obj
        })
         console.log("data image"+this.userImg);
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("Gallery fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  async actAddImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
           // this.browsePictures();
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
      allowEdit: true
     }
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.camera.getPicture(cameraOptions).then((imgData) => {
         // console.log('image data =>  ', imgData);
          this.base64Img = 'data:image/jpeg;base64,' + imgData;
          this.userImg.push(this.base64Img);
          this.uploadedImage =[];
          this.uploadedImage.push(imgData);
          }, (err) => {
          console.log(err);
          })
         
      }
  })
  this.uploadImage();
}
// browsePictures(){
//   // const options: ImagePickerOptions = {
//   //   quality: 100,
//   //   maximumImagesCount: 8,
//   //   outputType: 1
//   // };
// alert("browser pic called");
//   this.imagePicker.getPictures(options).then((results) => {  
//     results.forEach(i => this.userImg.push("data:image/jpeg;base64," + i));
//     alert(this.userImg);
//     console.log("Image Lists", this.userImg);  
// }, (error) => {  
//     // Handle error 
//     alert(error);  
//     console.log("Error occurred  while loading", error);  
// }); 
  
// }

takePicture(sourceType: PictureSourceType) {
  const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: true,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.PNG,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE
  };

  this.camera.getPicture(options).then(image => {
    //console.log(image);

    if (
      this.platform.is('android') &&
      sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
    ) {
     // this.uploadImage(image);
     this.userImg.push('data:image/jpeg;base64,' + image);  
    } else {
     // this.uploadImage(image);
     this.userImg.push('data:image/jpeg;base64,' + image);  
    }
    this.uploadedImage =[];
    this.uploadedImage.push(image);
    this.uploadImage();
 });
}
uploadImage(){
  if(this.utils.isOnline) {
    this.utils.presentLoading();
    let token = localStorage.getItem("Dhakad_Token");
   // var fd = new FormData();
    // for (let file of this.userImg) {
    //   fd.append('images[]', file);
    // }
   // console.log("this.uploadedImage"+JSON.stringify(this.uploadedImage));
   
  
    //for(var i=0;i< this.uploadedImage.length;i++ ){
    // var fileDataImage = this.convertBase64ToFile(this.uploadedImage[i]);
 
  // console.log("fileDataImage"+JSON.stringify(fileDataImage));
  // console.log("fileDataImage"+JSON.stringify(fileDataImage.name));
//   var bstr = atob(this.uploadedImage[i]),
//   n = bstr.length, 
//   u8arr = new Uint8Array(n);
  
// while(n--){
//   u8arr[n] = bstr.charCodeAt(n);
// }

// var file = new File([u8arr],'test'+i, {type:'image/jpeg'});
// console.log("file",file);
// console.log("file type",file[0]);
 
// var blob = new Blob([this.uploadedImage[i]], {type: 'image/png'});
// var file = new File([blob], 'imageFileName.png');
//console.log("data file"+JSON.stringify(file));
// this.urltoFile(this.uploadedImage[i], 'test'+i+'.png')
// .then(function(file){
//     console.log(file);
// });
// var file =  this.dataURLtoFile(this.uploadedImage[i],'test'+i+'.jpeg');
// console.log("file"+file);
// var image = document.getElementById('upload-photo');
// image = this.uploadedImage[i];  
//     // fd.append('images[]', file);
//     }
  
  
    let data = {
       "images" : this.uploadedImage
    }
    console.log("postparams"+JSON.stringify(data));
   // console.log("form data"+JSON.stringify(fd));
    this.httpService.httpPostwithHeader(this.httpService.Url.addmultipleimag,data, token).subscribe((res) => {
      this.utils.dismissLoading();
      console.log("update Img :", res);

      if(this.platform.is('cordova')) {
        this.parseData = JSON.parse(res.data);
      } else {
        this.parseData = res;
      }
       // this.gallery=this.parseData.data;
       //alert(this.parseData );
       console.log("Status for image upload",this.parseData.status);
       if(this.parseData.status == true) {
        this.utils.presentAlert(this.parseData.message);
       }else{
         this.utils.presentAlert(this.parseData.error_msg);  
       }
      
    }, (err) => {
      this.utils.dismissLoading();
      console.log("upload Image api error :", err);
    });
  } else {
    this.utils.presentAlert(this.utils.appConfig.internetMsg);
  }
}
convertBase64ToFile(image) {
 // const byteString = atob(image.split(',')[1]);
  const ab = new ArrayBuffer(image.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < image.length; i += 1) {
    ia[i] = image.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: 'image/jpeg',
  });
  return  new File([newBlob], '', { type: 'file' });
 
};

processFile(imageInput) {
  if (imageInput.files[0]) {
    const file: File = imageInput.files[0];
    var pattern = /image-*/;

    if (!file.type.match(pattern)) {
      alert('Invalid format');
      return;
    }

    // here you can do whatever you want with your image. Now you are sure that it is an image
  }
}
dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

//return a promise that resolves with a File instance
 async urltoFile(url, filename){
  var mimeType =  (url.match(/^data:([^;]+);/)||'')[1];
    return await(fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename, {type:mimeType});})
  );
}
async onItemClicked(data, idx){
console.log("item selected"+data);

this.currentSelected = idx;
const actionSheet = await this.actionSheetController.create({
  header: 'Select Image',
  buttons: [
    {
      text: 'Set as Profile Pic',
      handler: () => {
       this.updateProfileImage(data);
      }
    },
     
    {
      text: 'Cancel',
      handler: ()=>{
        this.currentSelected = null;
      },
      role: 'cancel'
    }
  ]
});
await actionSheet.present();
}

updateProfileImage(data) {
  console.log("image selected"+data);
  console.log("item selected length"+data.length);
  let postParams;
  let apiName;
  var splitData = data.split(":");
  console.log("split data"+splitData[0]);
  if(splitData[0] == 'http'){
    var imgName = splitData[1].split("/")[5];
    console.log("Image Name"+imgName);
    var selectedData = this.gallery.filter((item)=>{
      if(item.image.split("/")[2] == imgName)
      return item;
    });
    console.log("Selected data"+JSON.stringify(selectedData));
    // postParams= {
    //   "image_id" : selectedData[0].id,
    //   "image_name" : selectedData[0].image
    // }
    apiName = this.httpService.Url.galleryimagetoprofileimage;
    if(this.utils.isOnline()) {
      console.log("postParams"+JSON.stringify(postParams));
      console.log("api name"+apiName);
       this.utils.presentLoading();
       let token = localStorage.getItem("Dhakad_Token");
       this.httpService.httpGetwithHeader(apiName+selectedData[0].id, token).subscribe((res) => {
         this.utils.dismissLoading();
         this.currentSelected = null;
         if(this.platform.is('cordova')) {
           this.parseData = JSON.parse(res.data);
         } else {
           this.parseData = res;
         }
        if(this.parseData.status == true){
        
           console.log( this.parseData.image_url);
             this.httpService.publish('profile:updateImg', {
           profileImg: selectedData[0].image
       });
        
       }
       
         console.log("updateProfileImage api :", this.parseData); 
         this.utils.presentAlert(this.parseData.message);
          
       }, (err) => {
         this.utils.dismissLoading();
         console.log("updateProfileImage error", err); 
         this.utils.presentAlert("Unable to process your request. Please try later."); 
       });
     } else {
       this.utils.presentAlert(this.utils.appConfig.internetMsg);
     }
 
  }else{
    var splitBase64 = data.split(",")[1];
    let UserId = localStorage.getItem("Dhakad_Login_UserID");
    postParams= {  
      "id": UserId,  
      "userimg": splitBase64,    
  }
//  apiName = this.httpService.Url.updateProfileImage;
apiName = this.httpService.Url.register;
if(this.utils.isOnline()) {
  console.log("postParams"+JSON.stringify(postParams));
  console.log("api name"+apiName);
   this.utils.presentLoading();
   let token = localStorage.getItem("Dhakad_Token");
   this.httpService.httpPostwithHeader(apiName, postParams, token).subscribe((res) => {
     this.utils.dismissLoading();
     this.currentSelected = null;
     if(this.platform.is('cordova')) {
       this.parseData = JSON.parse(res.data);
     } else {
       this.parseData = res;
     }
    if(this.parseData.status == true){
    
       console.log( this.parseData.image_url);
         this.httpService.publish('profile:updateImg', {
       profileImg: this.parseData.user.ProfileImg
   });
    
   }
   
     console.log("updateProfileImage api :", this.parseData); 
     this.utils.presentAlert(this.parseData.message);
      
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

  goToProfilePics(image) {
    let navigationExtras: NavigationExtras = {
      state: {
        gallaryPics: image
      }
    };
    this.router.navigate(['img-gallary'], navigationExtras);

  }

}
