import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-business-list-view',
  templateUrl: './business-list-view.page.html',
  styleUrls: ['./business-list-view.page.scss'],
})
export class BusinessListViewPage implements OnInit {

  businessDetail: any;
  constructor(private route: ActivatedRoute, private navCtrl: NavController, 
    private httpService: HttpService, private utils: UtilsService, private platform: Platform) {
      this.businessDetail = this.httpService.getBusinessDetail();
      console.log(this.businessDetail);
   }

  ngOnInit() {
  }

}
