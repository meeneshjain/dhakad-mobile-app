import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Camera } from '@ionic-native/camera/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DatePipe } from '@angular/common';
import { SharedService } from './services/shared.service';

import { AppRate } from '@ionic-native/app-rate/ngx'; 

@NgModule({
	declarations: [ AppComponent ],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireDatabaseModule
	],
	providers: [
		StatusBar,
		AppRate,
		SplashScreen,
		Network,
		HTTP,
		Camera,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		Facebook,
		Geolocation,
		GooglePlus,
		SocialSharing,
		FCM,
		CallNumber,
		DatePipe,
		SharedService,
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
