import { Component, OnInit } from '@angular/core';
//import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';

import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notificationData :any = [];
  parseData : any;
  constructor(private fcm: FCM, public plt: Platform,private httpService: HttpService,private utils: UtilsService) { 
    // if(this.httpService.getNotification())
    // this.notificationData.push(this.httpService.getNotification());
    // this.plt.ready()
    //   .then(() => {
    //     // get FCM token
    //   this.fcm.getToken().then(token => {
    //     console.log("FCM token",token);
    //   });
    //     this.fcm.onNotification().subscribe(data => {
    //       if (data.wasTapped) {
    //         console.log("Received in background");
    //         this.fcm.getInitialPushPayload().then( data => {
    //           // or handle data here
    //           console.log(data);
    //           console.log("received in background")
    //     }, error=> console.log(error))
    //       } else {
    //         console.log("Received in foreground");
    //         console.log(data);
    //         this.notificationData.push(data);
    //         console.log("data in notification"+ JSON.stringify(this.notificationData));
           
    //       };
    //     });

     
    
    //     this.fcm.onTokenRefresh().subscribe(token => {
    //       // Register your new token in your back-end if you want
    //       // backend.registerToken(token);
    //       console.log("FCM RefreshToken"+token);
    //     });
    //   })
  }

  ngOnInit() {
    this.getToken();
  }
  getToken(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.notification, token).subscribe((res) => { 
        this.utils.dismissLoading();
        console.log("Notification api :", res);

        if(this.plt.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        console.log("Notification details:", this.parseData);
        if(this.parseData.status == true){
        this.notificationData=this.parseData.notification;
        }
          
       
        
         
      }, (err) => {
        this.utils.dismissLoading();
        console.log("Notification fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
}
