import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-refer-friend',
  templateUrl: './refer-friend.page.html',
  styleUrls: ['./refer-friend.page.scss'],
})
export class ReferFriendPage implements OnInit {
  
  link: string='https://goo.gl/se48kd';
  text: string='Dhakad Matrimony has helped many people to find a perfect life partner for a happy married life.'
  imgurl:string= ''
  constructor(private socialSharing: SocialSharing ) { }

  ngOnInit() {
  }

  getInvite(){
    //alert("share clicked");
    this.sendShare(this.text, this.imgurl, this.link);
  }
  sendShare(message, subject, url) {
    const text = message +'\n'
    this.socialSharing.share(text, subject, null, url);
  }

  ShareGeneric(parameter){
    const url = this.link
    const text = parameter+'\n'
  //  this.socialSharing.share(text, 'MEDIUM', null, url)
  }
  
  ShareWhatsapp(){
   // this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link)
  }

  ShareFacebook(){
    //this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, this.imgurl, null /* url */, 'Copia Pega!')
  }

  SendEmail(){
   // this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com'])
  }

  SendTwitter(){
   // this.socialSharing.shareViaTwitter(this.text, this.imgurl, this.link)
  }

  SendInstagram(){
   // this.socialSharing.shareViaInstagram(this.text, this.imgurl)
  }
  

}
