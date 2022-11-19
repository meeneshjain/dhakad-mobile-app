import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.page.html',
  styleUrls: ['./testimonials.page.scss'],
})
export class TestimonialsPage implements OnInit {

  testimonials: any;
  parseData: any;
  constructor(private navCtrl: NavController, public httpService: HttpService, private utils: UtilsService,
     private platform: Platform) { }

  ngOnInit() {

    this.getTestimonials();
  }


  getTestimonials() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.testimonial).subscribe((res) => {
        this.utils.dismissLoading();
        console.log("Testimonials api :", res);

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
           this.testimonials=this.parseData.data;
          // this.testimonials = [];
          console.log("testimonial", this.testimonials);
      }, (err) => {
        this.utils.dismissLoading();
        console.log("Testimonials fetch api error :", err);
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }
  
  error_image(img) {
    img.src = './assets/images/photo1.png'
  }

}
