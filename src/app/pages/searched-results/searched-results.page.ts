import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-searched-results',
  templateUrl: './searched-results.page.html',
  styleUrls: ['./searched-results.page.scss'],
})
export class SearchedResultsPage implements OnInit {
  state: any;
  searchedData : any;
  public base_url:any = '';
  
		
  constructor(private router: Router, private httpService: HttpService, private navCtrl: NavController) {
    this.base_url = this.httpService.Base_url;
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state as { SearchedData: any};
    console.log("state"+JSON.stringify(this.state));
    if(this.state != undefined)
      this.searchedData = this.state[0].SearchedData.data;
    console.log("searchedData"+JSON.stringify(this.searchedData));
   }

  ngOnInit() {
  }
  
  
  navigate_back() {
    this.router.navigateByUrl('/home');
  }
  
  viewProfile(id) {
    this.httpService.setIsMyProfile(false);
    this.httpService.setUserId(id);
    this.navCtrl.navigateForward('my-profile');
  }

}
