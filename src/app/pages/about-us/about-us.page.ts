import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  parseData : any;
  aboutUs : any;
  constructor(private navCtrl: NavController, 
    private httpService: HttpService, private utils: UtilsService, private platform: Platform) { }

  ngOnInit() {
    this.getAboutus();
  }

  getAboutus() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.about).subscribe((res) => {
        this.utils.dismissLoading();
        

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
           this.aboutUs=this.parseData.about;
         
      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

}
