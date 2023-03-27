
import { Component, OnInit } from '@angular/core';
import { NavController, Platform,ActionSheetController } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Camera, CameraOptions,PictureSourceType } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  btn1= "selected";
  btn2= "";
  btn3= "";
  btn4= "";
  btn5 = "";
  parseData : any;
  myProfile : any;
  profileForm : FormGroup;
  cam : boolean = true;
  profileImage = "assets/images/photo2.png";
  error_messages = {
    'FatherContacts': [
      { type: 'minlength', message: 'Mobile number should be 10 digits.' }
    ]
  }
  height : any;
  skinTone : any;
  education_Field : any;
  education_level : any;
  maritial_status : any;
  hobbiesoptions: any;
  aboutMeOptions : any;
  profile_for : any;
  body_type: any;
  prefrence : any;
  caste: any;
  cityData: any;
  stateData:any;
  fatherOccupation:any;
  motherOccupation:any;
  occupation:any;
  annualIncome:any;
  OccupationDetails = [
     "Banking Professional",
     "Chartered Accountant",
     "Company Secretary",
    "Finance Professional",
     "Investment Professional",
    "Accounting Professional (Others)",
     "Admin Professional",
     "Human Resources Professional",
     "Actor",
     "Advertising Professional",
    "Entertainment Professional",
     "Event Manager",
    "Journalist",
     "Media Professional",
     "Public Relations Professional",
     "Farming",
     "Horticulturist",
     "Agricultural Professional (Others)",
     "Air Hostess / Flight Attendant",
     "Pilot / Co-Pilot",
     "Other Airline Professional",
     "Architect",
     "Interior Designer",
     "Landscape Architect",
     "Animator",
     "Commercial Artist",
     "Web / UX Designers",
     "Artist (Others)",
     "Customer Support / BPO / KPO Professional",
     "Beautician",
     "Fashion Designer",
    "Hairstylist",
     "Jewellery Designer",
     "Designer (Others)",
     "IAS / IRS / IES / IFS",
     "Indian Police Services (IPS)",
     "Law Enforcement Employee (Others)",
     "CxO / Chairman / Director / President",
     "VP / AVP / GM / DGM",
    "Sr. Manager / Manager",
     "Consultant / Supervisor / Team Leads",
     "Team Member / Staff",
     "Airforce",
     "Army",
     "Navy",
     "Defense Services (Others)",
    "Lecturer",
     "Professor",
    "Research Assistant",
     "Research Scholar",
     "Teacher",
     "Training Professional (Others)",
     "Civil Engineer",
     "Electronics / Telecom Engineer",
     "Mechanical / Production Engineer",
     "Non IT Engineer (Others)",
     "Chef / Sommelier / Food Critic",
     "Catering Professional",
     "Hotel & Hospitality Professional (Others)",
    "Software Developer / Programmer",
     "Software Consultant",
     "Hardware &amp; Networking professional",
     "Software Professional (Others)",
     "Lawyer",
     "Legal Assistant",
     "Legal Professional (Others)",
     "Dentist",
     "Doctor",
     "Medical Transcriptionist",
     "Pharmacist",
     "Physician Assistant",
     "Physiotherapist / Occupational Therapist",
     "Psychologist",
     "Surgeon",
     "Veterinary Doctor",
     "Therapist (Others)",
     "Medical / Healthcare Professional (Others)",
     "Merchant Naval Officer",
     "Mariner",
     "Student",
     "Retired",
     "Not working",
     "Agent / Broker / Trader / Contractor",
     "Business Owner / Entrepreneur",
    "Politician",
     "Social Worker / Volunteer / NGO",
    "Sportsman",
     "Writer",
     "Marketing Professional",
     "Sales Professional",
     "Biologist / Botanist",
     "Science Professional (Others)"
  ];

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder,private datePipe: DatePipe, 
    private httpService: HttpService, private utils: UtilsService, private platform: Platform,
    private camera: Camera, public domSanitizer: DomSanitizer, private actionSheetController: ActionSheetController) { 

      this.httpService.subscribe('profile:updateImg',(ImgData) => {
        console.log('only image update from edit profile', ImgData);
       
        this.profileImage= "https://dhakadmatrimony.shinebrandseeds.com/"+ ImgData.profileImg;
        console.log("imgae updated in app"+ this.profileImage);
      });


      this.profileForm = formBuilder.group({
        PName: [''],
        AboutMe: [''],
        aboutLifePartner: [''],
        preferences: [''],
        Virtual_id: [''],
        Profile_for: [''],
        Gender: [''],
        DOB: [''],
        birthTime:[''],
        age: [''],
        Height: [''],
        Skin: [''],
        Body: [''],
        Manglik: [''],
        Caste: [''],
        MTongue: [''],
        SubCaste: [''],
        Marrital: [''],
        Disability: [''],
        Drink: [''],
        State:[''],
        City: [''],
        Elevel: [''],
        Efield: [''],
        Work: [''],
        WorkAs: [''],
        Income: [''],
        Father: [''],
        Fstatus: [''],
        Mstatus: [''],
        Brother: [''],
        Sister: [''],
        villageCity: [''],
        Pincode:['',Validators.maxLength(6)],
        Smoke : [''],
        Country: [''],
        Hobbies:[''],
       
        FatherContact: ['', Validators.compose([
          Validators.pattern('[6-9]\\d{9}'),
          Validators.minLength(10)
        ])]
      });

    }

  ngOnInit() {
    this.getMyProfile();
    this.getDropDownData();
    this.getState();
    
    //this.getCaste();
  }
  async updateProfileImage(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.captureImage(this.camera.PictureSourceType.PHOTOLIBRARY);
           
          }
        },
         {
           text: 'Use Camera',
           handler: () => {
             this.captureImage(this.camera.PictureSourceType.CAMERA);
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

  captureImage(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 90,
      targetWidth: 900,
      targetHeight: 900,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
   
  this.platform.ready().then(() => {
    if(this.platform.is('cordova')){
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     console.log("imageData", imageData);
     this.profileImage = 'data:image/jpeg;base64,' + imageData;
    //  this.imageData = imageData;
    console.log("image updated in edit profile"+this.profileImage);
     this.cam = true;
     this.updateImage(imageData);
    }, (err) => {
     // Handle error
     console.log("err img", err);
    });
  }
})
  }

  updateImage(img) {
    let UserId = localStorage.getItem("Dhakad_Login_UserID");
    if(this.utils.isOnline()) {
      let data = {  
        "id": UserId, 
          "userimg": img,    
      }
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");//updateProfileImage
      this.httpService.httpPostwithHeader(this.httpService.Url.register, data, token).subscribe((res) => {
        this.utils.dismissLoading();
        
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log( this.parseData.user.ProfileImg);
        this.httpService.publish('profile:updateImg', {
          profileImg: this.parseData.user.ProfileImg
      });
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

  update() {
    if(this.profileForm.controls.FatherContact.status === "INVALID") {
      this.utils.presentAlert("Please enter valid contact no for Father");
    } else {
      let UserId = localStorage.getItem("Dhakad_Login_UserID");
        if(this.utils.isOnline()) {
          let token = localStorage.getItem("Dhakad_Token");
          this.utils.presentLoading();
          console.log('this.profileForm.value.AboutMe ', this.profileForm.value.AboutMe )
          let data = {
            "id": UserId,
            "PName" : this.profileForm.value.PName,
            "AboutMe" : JSON.stringify(this.profileForm.value.AboutMe),
            "about_partners": JSON.stringify(this.profileForm.value.aboutLifePartner),
            "preferences": this.profileForm.value.preferences,
            "Profile_for": this.profileForm.value.Profile_for,
            "Height": this.profileForm.value.Height,
            "Skin": this.profileForm.value.Skin,
            "Body": this.profileForm.value.Body,
            "Manglik": this.profileForm.value.Manglik,
            "Caste": this.profileForm.value.Caste,
            "MTongue": this.profileForm.value.MTongue,
            "SubCaste": this.profileForm.value.SubCaste,
            "Marrital": this.profileForm.value.Marrital,
            "Disability": this.profileForm.value.Disability,
            "Drink": this.profileForm.value.Drink,
            "State":this.profileForm.value.State,
            "City": this.profileForm.value.City,
            "Elevel": this.profileForm.value.Elevel,
            "Efield": this.profileForm.value.Efield,
            "Work": this.profileForm.value.Work,
            "WorkAs": this.profileForm.value.WorkAs,
            "Income": this.profileForm.value.Income,
            "Father": this.profileForm.value.Father,
            "Fstatus": this.profileForm.value.Fstatus,
            "Mstatus": this.profileForm.value.Mstatus,
            "Brother": this.profileForm.value.Brother,
            "Sister": this.profileForm.value.Sister,
            "FatherContact": this.profileForm.value.FatherContact,
            "Address" : this.profileForm.value.villageCity,
            "Pincode" : this.profileForm.value.Pincode,
            "Smoke" : this.profileForm.value.Smoke,
            "Work_Country" : this.profileForm.value.Country,
            "hobbies" : this.profileForm.value.Hobbies,
            "dob_time" : this.profileForm.value.birthTime
          }

          console.log("profile data", data);//editProfile
          this.httpService.httpPostwithHeader(this.httpService.Url.register, data, token).subscribe((res) => {
            this.utils.dismissLoading();
            
            if(this.platform.is('cordova')) {
              this.parseData = JSON.parse(res.data);
            } else {
              this.parseData = res;
            }
            console.log("Edit Profile  api :", this.parseData); 
            this.utils.presentAlert(this.parseData.message);
           // this.myProfile.Height = this.parseData.userData.Height;
             
          }, (err) => {
            this.utils.dismissLoading();
            console.log("edit profile error", err);  
            this.utils.presentAlert(err.message);
          });
        } else {
          this.utils.presentAlert(this.utils.appConfig.internetMsg);
        }
    }
  }

  select(id) {
    if(id == "tab1") {
      this.btn1 = "selected"; this.btn2="", this.btn3=""; this.btn4="";this.btn5="";
    } else if(id == "tab2") {
      this.btn1 = ""; this.btn2="selected", this.btn3=""; this.btn4="";this.btn5="";
    } else if(id == "tab3"){
      this.btn1 = ""; this.btn2="", this.btn3="selected"; this.btn4="";this.btn5="";
    }else if(id == "tab4"){
      this.btn1 = ""; this.btn2="", this.btn3=""; this.btn4="selected";this.btn5="";
    } else {
      this.btn1 = ""; this.btn2="", this.btn3=""; this.btn4="";this.btn5="selected";
      
    }
   }
  

  getMyProfile() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      let UserId = localStorage.getItem("Dhakad_Login_UserID");
     // this.httpService.httpGetwithHeader(this.httpService.Url.myProfile, token).subscribe((res) => {
      this.httpService.httpGetwithHeader(this.httpService.Url.userProfile+UserId, token).subscribe((res) => { 
        this.utils.dismissLoading();
        console.log("My Profile api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.myProfile=this.parseData.profile_data;
          console.log("My Profile details:", this.myProfile);
          if(this.parseData.profile_data.ProfileImg != null) {
            this.profileImage = "https://dhakadmatrimony.shinebrandseeds.com/"+this.parseData.profile_data.ProfileImg;
          }
          this.updatePage(this.myProfile);
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  updatePage(profile) {
    if(profile.State){
      this.getCity(profile.State);
    }
    
    if (profile.AboutMe != ""){
      profile.AboutMe = JSON.parse(profile.AboutMe).map( (e) => { return e.toString() });
    }
    
    if (profile.about_partners != "") {
      profile.about_partners = JSON.parse(profile.about_partners).map( (e) => { return e.toString() });
    }
    
   /*  if (profile.hobbies != "") {
      profile.hobbies = JSON.parse(profile.hobbies).map((e) => { return e.toString() });
    } */
    console.log('profile.AboutMe ', profile.AboutMe )
    
    this.profileForm.patchValue({
      PName: profile.PName,
      AboutMe: profile.AboutMe,
      aboutLifePartner: profile.about_partners,
      preferences: profile.preferences,
      Virtual_id: profile.Virtual_id,
      Profile_for: profile.Profile_for,
      Gender: profile.Gender,
      DOB: this.datePipe.transform(profile.DOB,'dd-MM-yyyy'),//this.getDOB(profile.DOB),
      birthTime : profile.dob_time,
      age: profile.age,
      Height: profile.Height,
      Skin: profile.Skin,
      Body: profile.Body,
      Manglik: profile.Manglik,
      Caste: profile.Caste,
      MTongue: profile.MTongue,
      SubCaste: profile.SubCaste,
      Marrital: profile.Marrital,
      Disability: profile.Disability,
      Drink: profile.Drink,
      City: profile.City,
      Elevel: profile.Elevel,
      Efield: profile.Efield,
      Work: profile.Work,
      WorkAs: profile.WorkAs,
      Income: profile.Income,
      Father: profile.Father,
      Fstatus: profile.Fstatus,
      Mstatus: profile.Mstatus,
      Brother: profile.Brother,
      Sister: profile.Sister,
      FatherContact: profile.FatherContact,
      villageCity : profile.Address,
      Pincode : profile.Pincode,
      Smoke : profile.Smoke,
      Country : profile.Work_Country,
      Hobbies : profile.hobbies,
      State : profile.State
    });
 console.log("updating data :",this.profileForm);
  }

  getDOB(date) {
    let d = date.split("T");
    console.log("d", d);
    return d[0];
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
         this.height = this.parseData.height_new;
         this.skinTone = this.parseData.skin_tone;
         this.education_Field =  this.parseData.eduction_field;
         this.education_level= this.parseData.eduction_level;
         this.maritial_status = this.parseData.marritial_status;
         this.profile_for = this.parseData.profile_dropdown;
         this.body_type= this.parseData.body_type;
         this.prefrence = this.parseData.prefrence;
         this.caste=this.parseData.cast;
         this.hobbiesoptions = this.parseData.hobbies_options;
         this.aboutMeOptions = this.parseData.preference_options;
         this.fatherOccupation = this.parseData.father_occuptaion;
         this.motherOccupation = this.parseData.mother_occupation;
         this.occupation = this.parseData.occupation;
        // this.OccupationDetails = this.parseData.occupational_detail;
         this.annualIncome = this.parseData.annual_income;
        // console.log("Occupational details",JSON.stringify(this.OccupationDetails[0]));
         console.log("Profile for"+JSON.stringify(this.profile_for));
      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
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

  getState(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
     
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
   getCountry(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
     
    this.httpService.httpGet(this.httpService.Url.getCountry).subscribe((res) => {
     this.utils.dismissLoading();
         console.log("Country api :", res);
         
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
         } else {
          this.parseData = res;
         }
        console.log("country details", this.parseData);
        //this.stateData=this.parseData;
     
     }, (err) => {
         console.log("religion fetch api error :", err);
      });
     
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
   }

  
}

