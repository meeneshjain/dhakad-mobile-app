import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRate } from '@ionic-native/app-rate/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private httpService: HttpService, private utils: UtilsService, public domSanitizer: DomSanitizer, private appRate: AppRate) { }

  ngOnInit() {
  }
  
  open_url(type){
    if(type == 'contact'){
      window.open('http://dhakadclient.shinebrandseeds.com/#/contact-us', '_blank');
    }
    
    if (type == 'share'){
      window.open('https://play.google.com/store/apps/details?id=sashwati.com.metrimonial', '_blank');
    }
  }
  
  rate_us(){
    this.appRate.preferences = {
      storeAppURL: {
        //ios: '< my_app_id >',
        // android: 'market://details?id=sashwati.com.metrimonial'
        android: 'market://details?id=io.ionic.dhakad'
        //windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
      }
    };

    this.appRate.promptForRating(true); 
  }
}
