import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  gallary :any;
  constructor(private route: ActivatedRoute,private router: Router) { 
  //   this.route.queryParams.subscribe(params => {
    
  //     this.gallary = JSON.parse(params["gallaryPics"]);
  //     console.log("Img from my profile"+JSON.stringify(this.gallary));
  // });

  if (this.router.getCurrentNavigation().extras.state) {
    const state = this.router.getCurrentNavigation().extras.state;
    this.gallary = state.gallaryPics ? JSON.parse(state.gallaryPics) : '';
    console.log("Img from my profile"+JSON.stringify(this.gallary));
  }
 
  }

  ngOnInit() {
  }
 

}
