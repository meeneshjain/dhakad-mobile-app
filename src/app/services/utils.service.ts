import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, AlertController, LoadingController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  onDevice: boolean;
  isLoading: boolean = false;
  appConfig = {
    version : 0.1,
    release : "UAT",
    internetMsg : "Please check your network connection",
    apiError: "Unable to process your request, please try later"
  }

  constructor(public network: Network, public platform: Platform, public alertController: AlertController,
    public loadingController: LoadingController) { 
      this.onDevice = this.platform.is('cordova');
    }

  //Network check
  isOnline(): boolean {
    if(this.onDevice && this.network.type) {
      console.log(this.network.type);
     
      return this.network.type !== "none";
    } else {
      console.log(navigator.onLine);
      return navigator.onLine; 
    }
  }

  // alert message
  async presentAlert(msg) {
    const alert = await this.alertController.create({
     // header: 'Alert',
     // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK'],
      cssClass: 'custom-alert',
      backdropDismiss: false
    });

    await alert.present();
    
  }

  

  async presentCustomAlert(message: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
       message: message,
        buttons: [
         {
            text: 'OK',
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }

  //loader
  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: "Please wait",
      duration: 8000,
    }).then(a => {
      a.present().then(() => {
        
        if (!this.isLoading) {
          a.dismiss().then(() => '' );
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => '' );
  }
}
