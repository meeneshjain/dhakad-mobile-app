import { Injectable } from '@angular/core';

declare var require: any;
var QB = require('quickblox/quickblox.min');

//declare var QB: any; 

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  constructor() { }

  public initQuickblox() {
    var APPLICATION_ID = 92054;
    var AUTH_KEY = "xvOddRrrPydh7ZG";
    var AUTH_SECRET = "r5CCcP3tUjnckFS";
    var ACCOUNT_KEY = "kPVRcdJCe8B8SBE_skdX";
    var sessionToken = '1b785b603a9ae88d9dfbd1fc0cca0335086927f1';
    var CONFIG = { debug: true };

    QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);

    QB.createSession(function(err, result) {
      // callback function
      if(result) {
        console.log("success", result);
         //result.session.token
      } else {
        console.log("error", err);
      }
   });
  }

  public appSession() {
    QB.getSession(function(error, result) {
      // callback function
      if(result) {
        console.log("success", result);
      } else {
        console.log("error", error);
      }
    });
  }
  public userAuthorize() {
    var params = { login: 'garry', password: 'garry5santos' };  
    QB.createSession(params, function(error, result) {
      // callback function
      if(result) {
        console.log("success", result);
      } else {
        console.log("error", error);
      }
    });
  }

  public signUpQuickblox(data) {
    var params = {
       email: 'rahul.atosky@gmail.com',
      password: "test@123"
    };
    
    QB.users.create(params, function(error, result) {
      if (error) {
        console.log("Create user error: " + JSON.stringify(error));
      } else {
      }
    });
  }

  loginQuickBlox(data) {
   // var params = { email: "rahul.atosky@gmail.com", password: "test@123" };
   var params = { email: data.email, password: data.Password };
    // or through email
    // var params = {email: 'garry@gmail.com', password: 'garry5santos'};
    QB.login(params, function(error, result) {
      // callback function
      if (error) {
        console.log("Create user error: " + JSON.stringify(error));
      } else {
        console.log("success", result);
        
      }
    });

    this.initiateCall();
  }

  public initiateCall() {
    console.log("call initiated");
    var calleesIds = [128889249]; // Users' ids
    var sessionType = QB.webrtc.CallType.VIDEO; // AUDIO is also possible
    var additionalOptions = {};

    var session = QB.webrtc.createNewSession(calleesIds, sessionType, null, additionalOptions);

    var mediaParams = {
      audio: true,
      video: true,
      options: {
        muted: true,
        mirror: true,
      },
      elemId: "localVideoElem",
    };
    
    session.getUserMedia(mediaParams, function (error, stream) {
      if (error) {
      } else {
            //run call function here
            var extension = {};
session.call(extension, function(error) {
    
});
      }
    });
  }
}
