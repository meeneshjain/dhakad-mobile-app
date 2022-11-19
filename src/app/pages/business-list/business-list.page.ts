import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.page.html',
  styleUrls: ['./business-list.page.scss'],
})
export class BusinessListPage implements OnInit {

  btn1= "selected";
  btn2= "";

  parseData: any;
  businessList: any;
  
  constructor(private route: ActivatedRoute, private navCtrl: NavController, 
    public httpService: HttpService, private utils: UtilsService, private platform: Platform) {
      let id  = this.route.snapshot.params['id'];
      this.getBusinessVendorList(id);
     }

  ngOnInit() {
  }

  select(id) {
    if(id == "your-city") {
      this.btn1 = "selected"; this.btn2="";
    }  else {
      this.btn1 = ""; this.btn2="selected";
    }
   }

  detailView(business) {
    this.httpService.setBusinessDetail(business);
    this.navCtrl.navigateForward('/business-list-view');
  }

  getBusinessVendorList(id) {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.businessVendorList+id).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("businessList api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.businessList=this.parseData.data;
        
      }, (err) => {
        this.utils.dismissLoading();
        console.log("businessList fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

}
