import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, Subject, Subscription } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
 Base_url : string =  "https://dhakadmatrimony.shinebrandseeds.com/";//"http://dhakad.graspcorn.in/";//"http://dhakadmatromonial.graspcorn.in/"; //UAT

 //Base_url : string =  "http://dhakadmatrimony.com/";
 img_url : string = "https://dhakadmatrimony.shinebrandseeds.com/";//"http://dhakad.graspcorn.in/";
  Url : any = {
    login : "api/user/login",
    register: "api/user/newRegister",
    testimonial : "api/home/testimonial",///15",
    successStories : "api/home/successstory?15" ,
    dashboard : "api/home/dashboard",
    marriagePackages : "api/home/marriagepackages",
    businessDirectory : "api/home/businessdirectory",
    businessVendorList : "api/home/businessvender/",
    offers : "api/home/offers_pricing",
    verifyOtp : "api/user/verify_otp_token",
    resendOtp : "api/user/resend_otp",
    religion : "api/home/religion",
    caste : "api/home/caste",
    myProfile : "api/profile",
    userProfile : "api/profile/get_profile/",
    profileVisitors: "api/profile/visitors",
    save_profileVisitors: "api/profile/visit/",
    gallery : "api/profile/myprofilegallery",
    about : "api/home/about",
    allProfile : "api/profile",//"api/home/profile/100",
    sendRequest : "api/request/sentrequest/",//"api/request/sentrequest/",
    addToShortlist : "api/request/add_to_shortlist/",
    shortlistedProfiles : "api/profile/shortuserlist",
    editProfile : "api/profile/editProfile/",
    requestRecieved : "api/request/reciverequest",
    requestSent : "api/request/mysentrequest",
    requestAction : "api/request/reciveRequestStatus/",
    forgotPassword : "api/user/forgetpassword",
    updateProfileImage : "api/profile/updateprofileImage",
    preferredMatch : "api/profile/preferredMatch",
    resetPassword :"api/user/resetPassword",
    addmultipleimag: "api/profile/addmultipleimag",
    search: "api/user/search", //"api/user/searchbyname",
    marital_status:"api/home/marital_status",
    dropDownAPI : "api/dropdowndata",
    getState : "api/getState", //"api/home/get_state",
    getCity : "api/getCity/",//"api/home/get_city",
    advanceSearch:"api/profile/newAdvanceSearch",
    addBusiness:"api/business/create",//"api/Buisness/addbusiness",
    businesslistcat:"api/Buisness/businesslistcat",
    galleryimagetoprofileimage :"api/profile/set_galleryimage_profile/",//"api/profile/imagetoprofileimage"
    payment :"api/payment",
    notification : "api/notification",
    getCountry : "api/getCountry",
    getCityName : "api/city_id/",
    socialMemberLogin :"api/user/socialmemberlogin",
    dhakadGallary : "api/gallery"
  }

  businessDetail: any;
  loginRegisterToken: string;
  myProfilePage: boolean;
  userId: string;
  otp: boolean;
  
 
  forgetPasswordToken: string;
  validateOTPToken:string;
  OTP: string;
  

  httpOptions : any;
  notificationData : any;
  
  constructor(private http: HttpClient, private nativeHttp: HTTP, private platform: Platform) { 

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  getOtpFlag() {
    return this.otp;
  }

  setOtpFlag(otp) {
    this.otp = otp;
  }
  

  setIsMyProfile(data) {
    this.myProfilePage = data;
  }

  isMyProfile() {
    return this.myProfilePage;
  }

  setUserId(data) {
    this.userId = data;
  }

  getUserId() {
    return this.userId;
  }

  setBusinessDetail(data) {
    this.businessDetail = data;
  }

  getBusinessDetail() {
    return this.businessDetail;
  }

  getLoginRegisterToken() {
    return this.loginRegisterToken;
  }

  setLoginRegisterToken(token) {
    this.loginRegisterToken = token;
  }

  getForgetPasswordToken() {
    return this.forgetPasswordToken;
  }

  seForgetPasswordToken(token) {
    this.forgetPasswordToken = token;
  }
  getValidateOTPToken() {
    return this.validateOTPToken;
  }

  setValidateOTPToken(token) {
    this.validateOTPToken = token;
  }

  getOTP(){
   return this.OTP;
   }
  setOTP(otp){
   this.OTP = otp;
  }

  getNotification() {
    return this.notificationData;
  }

  setNotification(data) {
    this.notificationData = data;
  }

  httpGet(url): Observable<any> {
      this.nativeHttp.setDataSerializer('json');
      if(this.platform.is('cordova')) {
        return from(this.nativeHttp.get(this.Base_url + url, {}, {}));
      } else {
        return this.http.get(this.Base_url + url, this.httpOptions);
      }
  }

  httpPost(url, postData): Observable<any> {

      this.nativeHttp.setDataSerializer('json');
      if(this.platform.is('cordova')) {
        return from(this.nativeHttp.post(this.Base_url + url, postData , {}));
      } else {
        return this.http.post(this.Base_url + url, postData, this.httpOptions );
      }

  }

  httpGetwithHeader(url, token): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ token }`
      })
    };
  
    this.nativeHttp.setDataSerializer('json');
    if(this.platform.is('cordova')) {
      return from(this.nativeHttp.get(this.Base_url + url, {}, {'Authorization': `Bearer ${ token }`}));
    } else {
      return this.http.get(this.Base_url + url, httpOptions);
    }
  }

  httpPostwithHeader(url, postData, token): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${ token }`
      })
    };
    
    this.nativeHttp.setDataSerializer('json');
    if(this.platform.is('cordova')) {
      return from(this.nativeHttp.post(this.Base_url + url, postData , {'Authorization': `Bearer ${ token }`}));
    } else {
      return this.http.post(this.Base_url + url, postData, httpOptions );
    }

  }

  httpPostMultiImageUpload(url, postData, token): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
        'Authorization': `Bearer ${ token }`
      })
    };
 console.log("Inside upload API"+httpOptions);
    this.nativeHttp.setDataSerializer('multipart');
    if(this.platform.is('cordova')) {
      return from(this.nativeHttp.post(this.Base_url + url, postData , {'Authorization': `Bearer ${ token }`}));
    } else {
      return this.http.post(this.Base_url + url, postData, httpOptions );
    }

  }

  private channels: { [key: string]: Subject<any>; } = {};

    /**
     * Subscribe to a topic and provide a single handler/observer.
     * @param topic The name of the topic to subscribe to.
     * @param observer The observer or callback function to listen when changes are published.
     *
     * @returns Subscription from which you can unsubscribe to release memory resources and to prevent memory leak.
     */
    subscribe(topic: string, observer: (_: any) => void): Subscription {
        if (!this.channels[topic]) {
            // You can also use ReplaySubject with one concequence
            this.channels[topic] = new Subject<any>();
        }

        return this.channels[topic].subscribe(observer);
    }

    /**
     * Publish some data to the subscribers of the given topic.
     * @param topic The name of the topic to emit data to.
     * @param data data in any format to pass on.
     */
    publish(topic: string, data?: any): void {
        const subject = this.channels[topic];
        if (!subject) {
            // Or you can create a new subject for future subscribers
            return;
        }

        subject.next(data);
    }

    /**
     * When you are sure that you are done with the topic and the subscribers no longer needs to listen to a particular topic, you can
     * destroy the observable of the topic using this method.
     * @param topic The name of the topic to destroy.
     */
    destroy(topic: string): null {
        const subject = this.channels[topic];
        if (!subject) {
            return;
        }

        subject.complete();
        delete this.channels[topic];
    }

   
}
