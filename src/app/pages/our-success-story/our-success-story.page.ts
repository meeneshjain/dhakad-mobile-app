import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-our-success-story',
  templateUrl: './our-success-story.page.html',
  styleUrls: ['./our-success-story.page.scss'],
})
export class OurSuccessStoryPage implements OnInit {
  storyData :any;
  profileImgPath: string = "https://dhakadmatrimony.shinebrandseeds.com/";
  constructor(private route: ActivatedRoute,private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.storyData = state.successStory ? JSON.parse(state.successStory) : '';
      console.log("my Story Data"+JSON.stringify( this.storyData));
    }
   }

  ngOnInit() {
  }

  error_image(img) {
    img.src = './assets/images/photo1.png'
  }
}
