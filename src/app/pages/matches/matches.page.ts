import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { SharedService } from './../../services/shared.service';
@Component({
	selector: 'app-matches',
	templateUrl: './matches.page.html',
	styleUrls: ['./matches.page.scss']
})
export class MatchesPage implements OnInit {
	@ViewChild(IonInfiniteScroll, { static: false })
	infinite: IonInfiniteScroll;
	btn1 = 'selected';
	btn2 = '';
	btn3 = '';
	btn4 = '';
	parseData: any;
	allProfiles: any = [];
	myMatches: any = [];
	nearme: any = [];
	public current_user_profile:any; 
	shortlisted: any = [];
	profileImgPath: string = 'https://dhakadmatrimony.shinebrandseeds.com/';
	currentPage = 0;
	constructor(
		private navCtrl: NavController,
		private httpService: HttpService,
		private shared_service: SharedService,
		private utils: UtilsService,
		private platform: Platform,
		private callNumber: CallNumber,
		private ActivatedRouter: ActivatedRoute,
		private route: Router,
	) {
		this.shared_service.PageReloadOption.subscribe((obj) => {
			if (obj == true) {
				
				this.currentPage = 0;
				if (this.btn1 == 'selected') {
					// this.getAllProfiles(false);
					this.getNearbyProfiles(false)
				}

				if (this.btn2 == 'selected') {
					this.getNearbyProfiles(false);
				}

				if (this.btn3 == 'selected') {
					this.getNearbyProfiles(false);
				}

				if (this.btn4 == 'selected') {
					this.getShortlistedProfiles(false);
				}
			}
		});
	}

	ngOnInit() {
		
		let token = localStorage.getItem("Dhakad_Token");
		let user = localStorage.getItem("Dhakad_Login_UserID");
		this.httpService.httpGetwithHeader(this.httpService.Url.userProfile + user, token).subscribe((res) => {

			let parseData: any
			if (this.platform.is('cordova')) {
				parseData = JSON.parse(res.data);
			} else {
				parseData = res;
			}
			//this.profileImgPath=this.parseData.imgpath;
			this.current_user_profile = parseData.profile_data;
			console.log('current_user_profile ', this.current_user_profile)
			this.btn1 = 'selected';
			// this.getAllProfiles(true);
			this.getNearbyProfiles(true)
		}, (err) => {
			console.log("My Profile fetch api error :", err);
		});
		
	}

	select(id) {
		if (this.infinite != undefined) { this.infinite.disabled = false; }
		this.currentPage = 0;
		if (id == 'all') {
			this.getAllProfiles(true);
			this.btn1 = 'selected';
			(this.btn2 = ''), (this.btn3 = '');
			this.btn4 = '';
		} else if (id == 'my') {
			this.btn1 = '';
			(this.btn2 = 'selected'), (this.btn3 = '');
			this.btn4 = '';
			this.getNearbyProfiles(true);
		} else if (id == 'near') {
			this.btn1 = '';
			(this.btn2 = ''), (this.btn3 = 'selected');
			this.btn4 = '';
			this.getNearbyProfiles(true);
		} else {
			this.btn1 = '';
			(this.btn2 = ''), (this.btn3 = '');
			this.btn4 = 'selected';
			this.getShortlistedProfiles(true);
		}
	}

	getAllProfiles(with_loader) {
		if (this.utils.isOnline) {
			let url = this.httpService.Url.allProfile;
			if (this.currentPage == 0) {
				this.allProfiles = [];
				if (with_loader) {
					this.utils.presentLoading();
				}
			} else {
				url = this.httpService.Url.allProfile + "?page=" + (this.currentPage + 1)
			}
			let token = localStorage.getItem('Dhakad_Token');
			this.httpService.httpGetwithHeader(url, token).subscribe(
				(res) => {
					console.log('All Profile  api :', res);
					this.infinite.complete();
					if (this.currentPage == 0) {
						if (with_loader) {
							this.utils.dismissLoading();
						}
					}
					this.currentPage++;
					if (this.platform.is('cordova')) {
						this.parseData = JSON.parse(res.data);
					} else {
						this.parseData = res;
					}

					this.parseData.profile_data.data.forEach(element => {
						element.loadImage = false;
						this.allProfiles.push(element);
					});

					if (this.parseData.profile_data.last_page == this.parseData.profile_data.current_page) {
						this.infinite.disabled = true;
					}
				},
				(err) => {
					if (with_loader) {
						this.utils.dismissLoading();
					}
					console.log('All Profile  fetch api error :', err);
				}
			);
		} else {
			this.utils.presentAlert(this.utils.appConfig.internetMsg);
		}
	}

	getShortlistedProfiles(with_loader) {
		if (this.utils.isOnline) {
			let url = this.httpService.Url.shortlistedProfiles;
			if (this.currentPage == 0) {
				this.shortlisted = [];
				if (with_loader) {
					this.utils.presentLoading();
				}
			} else {
				url = this.httpService.Url.shortlistedProfiles + "?page=" + (this.currentPage + 1)
			}
			let token = localStorage.getItem('Dhakad_Token');
			this.httpService.httpGetwithHeader(url, token).subscribe(
				(res) => {
					this.infinite.complete();
					if (this.currentPage == 0) {
						if (with_loader) {
							this.utils.dismissLoading();
						}
					}
					console.log('Shortlisted  api :', res);
					this.currentPage++;
					if (this.platform.is('cordova')) {
						this.parseData = JSON.parse(res.data);
					} else {
						this.parseData = res;
					}

					if (this.parseData.result != 0) {
						if (this.parseData.current_page == this.parseData.last_page) {
							this.infinite.disabled = true;
						}
						this.parseData.data.forEach(element => {
							element.loadImage = false;
							this.shortlisted.push(element);
						});
						// this.shortlisted = this.parseData.data;
					}
				},
				(err) => {
					if (with_loader) {
						this.utils.dismissLoading();
					}
					console.log('All Profile  fetch api error :', err);
				}
			);
		} else {
			this.utils.presentAlert(this.utils.appConfig.internetMsg);
		}
	}

	sendRequest(id) {
		if (this.utils.isOnline()) {
			let token = localStorage.getItem('Dhakad_Token');
			this.utils.presentLoading();

			this.httpService.httpPostwithHeader(this.httpService.Url.sendRequest + id, {}, token).subscribe(
				(res) => {
					this.utils.dismissLoading();

					if (this.platform.is('cordova')) {
						this.parseData = JSON.parse(res.data);
					} else {
						this.parseData = res;
					}
					console.log('send request  api :', this.parseData);
					if (this.parseData.status == true) {
						this.utils.presentAlert(this.parseData.message);
					} else {
						this.utils.presentAlert(this.parseData.errors);
					}
				},
				(err) => {
					this.utils.dismissLoading();
					console.log('send request error', err);
					this.utils.presentAlert('Unable to send Request. ');
				}
			);
		} else {
			this.utils.presentAlert(this.utils.appConfig.internetMsg);
		}
	}

	shortlist(id) {
		if (this.utils.isOnline()) {
			let token = localStorage.getItem('Dhakad_Token');
			this.utils.presentLoading();

			this.httpService.httpPostwithHeader(this.httpService.Url.addToShortlist + id, {}, token).subscribe(
				(res) => {
					this.utils.dismissLoading();

					if (this.platform.is('cordova')) {
						this.parseData = JSON.parse(res.data);
					} else {
						this.parseData = res;
					}
					console.log('add to shortlist  api :', this.parseData);
					this.utils.presentAlert(this.parseData.message);
				},
				(err) => {
					this.utils.dismissLoading();
					console.log('add to shortlist error', err);
					this.utils.presentAlert('Unable to process your request ');
				}
			);
		} else {
			this.utils.presentAlert(this.utils.appConfig.internetMsg);
		}
	}

	viewProfile(id) {
		this.httpService.setIsMyProfile(false);
		this.httpService.setUserId(id);
		this.navCtrl.navigateForward('my-profile');
	}

	getNearbyProfiles(with_loader) {
		if (this.utils.isOnline()) {
			let token = localStorage.getItem('Dhakad_Token');
			let url = this.httpService.Url.preferredMatch;
			if (this.currentPage == 0) {
				this.nearme = [];
				this.myMatches = [];
				if (with_loader) {
					this.utils.presentLoading();
				}
			} else {
				url = this.httpService.Url.preferredMatch + "?page=" + (this.currentPage + 1)
			}
			this.httpService.httpGetwithHeader(url, token).subscribe(
				(res) => {
					this.infinite.complete();
					if (this.currentPage == 0) {
						if (with_loader) {
							this.utils.dismissLoading();
						}
					}
					if (this.platform.is('cordova')) {
						this.parseData = JSON.parse(res.data);
					} else {
						this.parseData = res;
					}
					this.currentPage++;
					if (this.parseData.result != 0) {
						if (this.btn1 == 'selected') {
							if (this.parseData.latestmatch.current_page == this.parseData.latestmatch.last_page) {
								this.infinite.disabled = true;
							}
							this.parseData.latestmatch.data.forEach(element => {
								element.loadImage = false;
								this.allProfiles.push(element);
							});
						}
						if (this.btn2 == 'selected') {
							if (this.parseData.mymatches.current_page == this.parseData.mymatches.last_page) {
								this.infinite.disabled = true;
							}
							this.parseData.mymatches.data.forEach(element => {
								element.loadImage = false;
								this.myMatches.push(element);
							});
						}

						if (this.btn3 == 'selected') {
							this.infinite.disabled = true;
							this.nearme = this.parseData.nearby.data;
						}

					} else {
						this.infinite.disabled = true;
					}
				},
				(err) => {
					if (with_loader) {
						this.utils.dismissLoading();
					}
					console.log('add to shortlist error', err);
					this.utils.presentAlert('Unable to process your request ');
				}
			);
		} else {
			this.utils.presentAlert(this.utils.appConfig.internetMsg);
		}
	}

	goToChat(virtualID, DeviceGcm) {
		console.log('virtual ID', virtualID);
		localStorage.setItem('Dhakad_Partner_Virtual_id', virtualID);
		localStorage.setItem('gcmTocken', DeviceGcm);
		
		if (this.current_user_profile?.Purchase_plan != null && this.current_user_profile?.Purchase_plan != '' && this.current_user_profile?.Purchase_plan != undefined && this.current_user_profile?.Purchase_plan != 0){
			this.navCtrl.navigateForward('/chat');
		} else {
			this.navCtrl.navigateForward('/offers');
		}
	}
	goToCall(contact: any) {
		if (this.current_user_profile?.Purchase_plan != null && this.current_user_profile?.Purchase_plan != '' && this.current_user_profile?.Purchase_plan != undefined && this.current_user_profile?.Purchase_plan != 0) {
			console.log('contact number', contact);
			var regrex = '/^[6-9]d{9}$/';
			console.log('Valid contact number', regrex.match(contact));
			if (contact != null && contact.length == 10) {
				this.callNumber
					.callNumber(contact, true)
					.then((res) => console.log('Launched dialer!', res))
					.catch((err) => console.log('Error launching dialer', err));
			} else this.utils.presentAlert('Incorrect Mobile Number!!');
			
		} else {
			this.navCtrl.navigateForward('/offers');
		}
	}

	callApi() {
		if (this.btn1 == 'selected') {
			//this.getAllProfiles(true);
			this.getNearbyProfiles(true);
		} else if (this.btn2 == 'selected') {
			this.getNearbyProfiles(true);
		} else if (this.btn3 == 'selected') {
			this.getNearbyProfiles(true);
		} else if (this.btn4 == 'selected') {
			this.getShortlistedProfiles(true);
		}


	}

	navigate_back() {
		this.route.navigateByUrl('/home');
	}

	error_image(img) {
		img.src = './assets/images/photo1.png'
	}
}
