import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  btn1 = "selected";
  btn2 = "";
  myID: any;
  parseData: any;
  myName: any;
  dataByName: any;
  public dataByID: any = [];
  public base_url = '';
  constructor(private navCtrl: NavController,
    private httpService: HttpService, private utils: UtilsService, private platform: Platform) {
    this.base_url = this.httpService.Base_url;
  }
  ngOnInit() {
  }


  select(id) {
    if (id == "id") {
      this.btn1 = "selected"; this.btn2 = "";

    } else if (id == "name") {
      this.btn1 = ""; this.btn2 = "selected";

    }
  }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }

  onSearchByID(event: any, id_value) {
    
    
    let postparms = "?search=" + id_value + '&type=id';          //  "user_by" : "test test"


    if (this.utils.isOnline) {
      let token = localStorage.getItem("Dhakad_Token");

      this.utils.presentLoading();
      this.dataByID  = [];
      this.httpService.httpGetwithHeader(this.httpService.Url.search + postparms, token).subscribe((res) => {
        this.utils.dismissLoading();
        

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        if (this.parseData.status == true) {
          if (this.parseData.message != undefined) {
            this.utils.presentAlert(this.parseData.message);
          }
          this.dataByID = this.parseData.data.data;
          
        } else {
          if (this.parseData.message != undefined) {
            this.utils.presentAlert(this.parseData.message);
          }
        }

      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }

  }

  onSearchByName(event: any, name_value) {
    
    

    let postparms = "?search=" + name_value + '&type=name';
    if (this.utils.isOnline) {
       this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.search + postparms, token).subscribe((res) => {
        this.utils.dismissLoading();
        
        

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        if (this.parseData.status == true) {
          // this.utils.presentAlert(this.parseData.message); 
          
          this.dataByName = this.parseData.data.data;

        } else {
          this.utils.presentAlert(this.parseData.message);
        }

      }, (err) => {
        this.utils.dismissLoading();
        
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
  onCancel(event: any) {

  }
}
