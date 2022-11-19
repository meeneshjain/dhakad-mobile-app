import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    autoplay: {
      delay: 2000,
    },
    speed: 1000
  };

  constructor(private nav:NavController) { 

   

  }

  ngOnInit() {
  }

  login() {
    this.nav.navigateForward('/login');
  }

  signup() {
    this.nav.navigateForward('/sign-up');
  }

}
