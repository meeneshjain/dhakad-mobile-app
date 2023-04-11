import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';


@Component({
  selector: 'app-marriage-menu',
  templateUrl: './marriage-menu.page.html',
  styleUrls: ['./marriage-menu.page.scss'],
})
export class MarriageMenuPage implements OnInit {

  btn1= "";
  btn2= "";
  btn3= "";
  successStories: any;
  marriagePackages: any;
  businessDirectories: any;
  parseData: any;
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private router: Router,
    public httpService: HttpService, private utils: UtilsService, private platform: Platform) {

    let id = this.route.snapshot.params['id'];
    
    
    this.select(id);

   }

   select(id) {
    if(id == "apka-menu") {
      this.btn1 = "selected"; this.btn2="", this.btn3="";
      this.getBusinessDirectory();
    } else if(id == "marriage-package") {
      this.btn1 = ""; this.btn2="selected", this.btn3="";
      this.getMarriagePackages();
    } else {
      this.btn1 = ""; this.btn2="", this.btn3="selected";
      this.getSuccessStories();
    }
   }

  error_image(img) {
    img.src = './assets/images/photo1.png'
  }

  ngOnInit() {
    
  }

  businessList(categoryId) {
    this.navCtrl.navigateForward('/business-list/'+categoryId);
  }

  getBusinessDirectory() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.businessDirectory).subscribe((res) => {
        this.utils.dismissLoading();
        

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.businessDirectories=this.parseData;//this.parseData.business_dir;
        
      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getMarriagePackages() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.marriagePackages).subscribe((res) => {
        this.utils.dismissLoading();
        

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.marriagePackages=this.parseData.data;
          // 
      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  getSuccessStories() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.successStories).subscribe((res) => {
        this.utils.dismissLoading();
        

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
          this.successStories=this.parseData.successstory.data;
          
      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }


  goToDetailStories(storydata){
    
    let navigationExtras: NavigationExtras = {
      state: {
          successStory: JSON.stringify(storydata)
      }
  };
  this.router.navigate(['our-success-story'],  navigationExtras);
  }
}
