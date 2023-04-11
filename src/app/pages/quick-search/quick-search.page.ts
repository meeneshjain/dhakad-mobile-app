import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { forkJoin, Subscription } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.page.html',
  styleUrls: ['./quick-search.page.scss'],
})
export class QuickSearchPage implements OnInit {
  parseData: any;
  maritial_status: any;
  education_Field: any;
  education_level: any;
  caste: any;
  state: any;
  age: any;
  city: any;
  Education: string;
  Caste: string;
  CityData: string;
  Marital: string;
  Membership: string;
  Age: string;
  State: string;
  subscription: Subscription;

  constructor(private platform: Platform, private httpService: HttpService, private navCtrl: NavController, private utils: UtilsService, private ActivatedRouter: ActivatedRoute, private route: Router,) { }

  ngOnInit() {
    this.getDropDownData();
    this.getData();
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
  getDropDownData() {
    if (this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");//marital_status
      this.httpService.httpGetwithHeader(this.httpService.Url.dropDownAPI, token).subscribe((res) => {
        this.utils.dismissLoading();
        

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        

        this.education_Field = this.parseData.eduction_field;
        this.education_level = this.parseData.eduction_level;
        this.maritial_status = this.parseData.marritial_status;
        this.age = this.parseData.age;
        this.caste = this.parseData.cast;

      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getCity(event: any) {
    

    if (this.utils.isOnline) {
      let postData = {
        "state_id": event
      }
      this.httpService.httpGet(this.httpService.Url.getCity + event).subscribe((res) => {

        

        if (this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        this.city = this.parseData;

      }, (err) => {

        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getAdvanceSearch() {
    if (this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      let filters = {
        "education": this.Education,
        "caste": this.Caste,
        "city": this.CityData,
        "Marital": this.Marital,
        "ispurches": this.Membership,
        "age": this.Age,
        "manglik": "",
        "state": this.State
      }
      
      setTimeout(() => {
        this.httpService.httpPostwithHeader(this.httpService.Url.advanceSearch, filters, token).subscribe((res) => {
          this.utils.dismissLoading();
          

          if (this.platform.is('cordova')) {
            this.parseData = JSON.parse(res.data);
          } else {
            this.parseData = res;
          }
          
          if (this.parseData.status == true) {
            if (this.parseData.message != undefined && this.parseData.message != '') {
              this.utils.presentAlert(this.parseData.message);
            }
            const navigationExtras: NavigationExtras = {
              state: [{
                SearchedData: this.parseData.data
              }]
            };

            setTimeout(() => {
              this.navCtrl.navigateForward(['searched-results'], navigationExtras);
            }, 500);
          } else {
            this.utils.presentAlert(this.parseData.message);
          }



        }, (err) => {
          this.utils.dismissLoading();
          
        });
      }, 200);
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }

  }

  getData() {
    if (this.utils.isOnline) {

      // const getCaste = this.httpService.httpGet(this.httpService.Url.caste);
      this.httpService.httpGet(this.httpService.Url.getState)
        .subscribe((res) => {
          // 

          if (this.platform.is('cordova')) {
            this.parseData = JSON.parse(res.data);

          } else {
            this.parseData = res;

          }
          this.state = this.parseData;
          

        }, (err) => {
          
        });

    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  navigate_back() {
    this.route.navigateByUrl('/search');
  }
}
