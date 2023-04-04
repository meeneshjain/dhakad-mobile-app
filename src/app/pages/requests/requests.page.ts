import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { forkJoin, Subscription } from 'rxjs';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  btn1= "selected";
  btn2= "";
  btn3= "";
  parseData : any;
  acceptedRequest : any = [];
  pendingRequest : any = [];
  sentRequest : any = [];
  subscription: Subscription;
  public current_user_profile: any; 
  constructor(private navCtrl: NavController, 
    private httpService: HttpService, private utils: UtilsService,private  callNumber:  CallNumber, private platform: Platform) { }
  profileImgPath: string = 'https://dhakadmatrimony.shinebrandseeds.com/';

  ngOnInit() {
    
    let token = localStorage.getItem("Dhakad_Token");
    let user = localStorage.getItem("Dhakad_Login_UserID");
    this.httpService.httpGetwithHeader(this.httpService.Url.userProfile + user, token).subscribe((res) => {

      let parseData: any
      if (this.platform.is('cordova')) {
        parseData = JSON.parse(res.data);
      } else {
        parseData = res;
      }
      //this.profileImgPath=this.parseData.imgpath;
      this.current_user_profile = parseData.profile_data;
      console.log('current_user_profile ', this.current_user_profile)
      
    }, (err) => {
      console.log("My Profile fetch api error :", err);
    });

    this.requestRecieved();
    //this.requestSent();
  }

  select(id) {
    if(id == "accepted") {
      this.btn1 = "selected"; this.btn2="", this.btn3=""; 
      
    } else if(id == "pending") {
      this.btn1 = ""; this.btn2="selected", this.btn3="";
      
    }  else {
      this.btn1 = ""; this.btn2="", this.btn3="selected";
      //  this.getShortlistedProfiles();
    }
   }


   requestRecieved() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      
      const receiveReq = this.httpService.httpGetwithHeader(this.httpService.Url.requestRecieved,token);
      const mySentReq = this.httpService.httpGetwithHeader(this.httpService.Url.requestSent, token)
      this.subscription = forkJoin([receiveReq, mySentReq]).subscribe((res) => {
     
     // this.httpService.httpGetwithHeader(this.httpService.Url.requestRecieved, token).subscribe((res) => {
        // this.utils.dismissLoading();
        console.log("Request Recieved  api :", res[0]);
        console.log("send my Request  api :", res[1]);
        let parseData1;
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res[0].data);
          parseData1 = JSON.parse(res[1].data);
        } else {
          this.parseData = res[0];
          parseData1 =  res[1];
        }
       // this.pendingRequest=this.parseData.all_recive_request;//this.parseData.recive_pend_request;
       this.pendingRequest  = this.parseData.all_recive_request;
       this.sentRequest = parseData1.my_pend_request;
       this.acceptedRequest =this.parseData.all_accepted_request;
       if(parseData1.my_act_request.length > 0)
       this.acceptedRequest.push(...parseData1.my_act_request);
       console.log("accepted data",this.acceptedRequest);
          /**logic when we have sent req and incoming req to show in Pending Tab */
            // let accetedData = this.parseData.all_accepted_request;
         // let newdata = parseData1.my_act_request;
      // if( accetedData != undefined && newdata != undefined){
       
      //   if( accetedData.length == 0){
      //     this.acceptedRequest = newdata;
        
      //  }else{
      //    this.acceptedRequest=accetedData;
      //    for(var i=0; i< newdata?.length; i++){
      //    this.acceptedRequest.push(newdata[i]);
      //  }
      //  }
      // }
      //   console.log("accepted data",this.acceptedRequest);
      //   let allReceiveReq =[];
      //   let myReceiveReq =[];
      //   if(this.parseData.all_recive_request.length != undefined && this.parseData.all_recive_request.length != 0){
      //    allReceiveReq = this.parseData.all_recive_request.map(obj=> ({ ...obj, Active: 'true' })); //requests received
      //   }
      //  if(parseData1.my_pend_request != undefined && parseData1.my_pend_request != 0){
      //   myReceiveReq = parseData1.my_pend_request.map(obj=> ({ ...obj, Active: 'false' }));//requests sent
      //  }
      //   console.log("allReceiveReq",allReceiveReq);
      //   console.log("myReceiveReq",myReceiveReq);
      //   if(allReceiveReq != undefined && myReceiveReq != undefined){
      //     if( allReceiveReq.length == 0 ){
      //      this.pendingRequest= myReceiveReq;
      //      }else{
      //       this.pendingRequest=allReceiveReq;
      //       for(var i=0; i< myReceiveReq?.length; i++){
      //       this.pendingRequest.push(myReceiveReq[i]);
      //     }
      //     }
      //   }
        /**end */
       console.log("pending ",this.pendingRequest);

      }, (err) => {
        // this.utils.dismissLoading();
        console.log("Request Recieved   fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  requestSent() {
    if(this.utils.isOnline) {
      // this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.requestSent, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("requestSent  api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        this.pendingRequest=this.parseData.all_recive_request;
       
        this.sentRequest=this.parseData.my_pend_request;
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("requestSent fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  action(id,action) {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
    
      let postparms = {"status":action}
      this.httpService.httpPostwithHeader(this.httpService.Url.requestAction+id, postparms,token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("request action api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        if(this.parseData.status == true) {
          this.utils.presentAlert(this.parseData.message); 
        } else {
          this.utils.presentAlert(this.parseData.errors); 
        }
       // this.requestRecieved();
       // this.requestSent();
    //    this.pendingRequest.forEach((value,index)=>{
    //     if(value.ProfileId==id) this.pendingRequest.splice(index,1);
    // });
    this.requestRecieved();
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("request action  api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  viewProfile(id) {
    this.httpService.setIsMyProfile(false);
    this.httpService.setUserId(id);
    this.navCtrl.navigateForward('my-profile');
  }

  goToChat(virtualID,DeviceGcm){
    if (this.current_user_profile?.Purchase_plan != null && this.current_user_profile?.Purchase_plan != '' && this.current_user_profile?.Purchase_plan != undefined && this.current_user_profile?.Purchase_plan != 0) {
      console.log("virtual ID",virtualID);
      localStorage.setItem("Dhakad_Partner_Virtual_id", virtualID);
      localStorage.setItem('gcmTocken',DeviceGcm);
      this.navCtrl.navigateForward('/chat');
    } else {
      this.navCtrl.navigateForward('/offers');

    }
  }
  goToCall(contact : any){
    if (this.current_user_profile?.Purchase_plan != null &&  this.current_user_profile?.Purchase_plan != '' && this.current_user_profile?.Purchase_plan != undefined && this.current_user_profile?.Purchase_plan != 0) {
      console.log("contact number",contact);
      var regrex = '/^[6-9]\d{9}$/';
      console.log("Valid contact number",regrex.match(contact));
      if(contact != null && contact.length == 10){
        this.callNumber.callNumber(contact, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
      }else
      this.utils.presentAlert("Incorrect Mobile Number!!");
    } else {
      this.navCtrl.navigateForward('/offers');

    }
  }
  
  callApi() {
    if (this.btn1 == 'selected') {
    } else if (this.btn2 == 'selected') {
    } else if (this.btn3 == 'selected') {
      // requestSent() 
    }
  }
  
  /*
   requestSent() {
    if(this.utils.isOnline) {
      let token = localStorage.getItem("Dhakad_Token");
      this.utils.presentLoading();
      let url = this.httpService.Url.requestSent;
      if (this.currentPage == 0) {
        this.pendingRequest = [];
        this.sentRequest = [];

      } else {
        url = this.httpService.Url.requestSent + "?page=" + (this.currentPage + 1)
      }
      this.httpService.httpGetwithHeader(url, token).subscribe((res) => {
        this.infinite.complete();
        if (this.currentPage == 0) {
          this.utils.dismissLoading();
        }
        console.log('Shortlisted  api :', res);
        this.currentPage++;
        if (this.parseData.current_page == this.parseData.last_page) {
          this.infinite.disabled = true;
        }
        console.log("requestSent  api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }

        this.parseData.all_recive_request.forEach(element => {
          this.pendingRequest.push(element);
        });

        this.parseData.my_pend_request.forEach(element => {
          this.sentRequest.push(element);
        });


        }, (err) => {
          this.utils.dismissLoading();
          console.log("requestSent fetch api error :", err);
        });
            } else {
          this.utils.presentAlert(this.utils.appConfig.internetMsg);
        }
  }
  */ 
 
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }
}
