import { Component, OnInit ,ViewChild} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

import { UtilsService } from './../../services/utils.service';
import { HttpService } from './../../services/http.service';
import { SharedService } from './../../services/shared.service';
import { NavController, Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages: Observable<any[]>;
  newMsg = '';
  counter:number = 0;
  parseData: any;
  myProfile: any = {};

  constructor(private navCtrl: NavController,
    private shared_service: SharedService, private chatService: ChatService, private router: Router, private platform: Platform, private utils: UtilsService, private httpService: HttpService,) { }

  ngOnInit() {
    this.getMyProfile()
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage() {
    if(this.counter == 0){
      this.chatService.sendNotificationForChat();
      this.counter++;
     }
     else
     this.counter++;
    this.chatService.addChatMessage(this.newMsg, this.myProfile.PName).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
  
  getMyProfile() {
    if (this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      let user = localStorage.getItem("Dhakad_Login_UserID") 
      this.httpService.httpGetwithHeader(this.httpService.Url.userProfile + user, token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("My Profile api :", res);

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        //this.profileImgPath=this.parseData.imgpath;
        this.myProfile = this.parseData.profile_data;

        console.log("My Profile details:", this.myProfile);

      }, (err) => {
        this.utils.dismissLoading();
        console.log("My Profile fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }



 

}
