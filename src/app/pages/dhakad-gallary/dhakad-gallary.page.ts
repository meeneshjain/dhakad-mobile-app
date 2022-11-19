import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { NavController, Platform,IonRouterOutlet} from '@ionic/angular';

@Component({
  selector: 'app-dhakad-gallary',
  templateUrl: './dhakad-gallary.page.html',
  styleUrls: ['./dhakad-gallary.page.scss'],
})
export class DhakadGallaryPage implements OnInit {
  parseData: any;
  gallery : any;
  userImg: any = [];
  profileImgPath: string = "https://dhakadmatrimony.shinebrandseeds.com/";
  constructor(public httpService: HttpService, private utils: UtilsService,private platform: Platform) { }

  ngOnInit() {
    this.getGallaryData();
  }

  getGallaryData(){
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      let token = localStorage.getItem("Dhakad_Token");
      this.httpService.httpGetwithHeader(this.httpService.Url.dhakadGallary,token).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Dhakad gallary api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        this.gallery=this.parseData;
        console.log("gallary data",this.gallery);
        // this.gallery.forEach(i => this.userImg.push(this.profileImgPath+i.full));
        this.userImg = this.gallery.filter(obj => {
          obj.loadImage = false; 
          obj.full = this.profileImgPath + obj.full
          return obj
        })
         console.log("Images",this.userImg);
      }, (err) => {
        this.utils.dismissLoading();
        console.log("Dashboard fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }
  
  
}
