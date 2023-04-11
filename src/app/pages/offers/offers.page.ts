import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpService } from './../../services/http.service';
import { UtilsService } from './../../services/utils.service';
import { SharedService } from './../../services/shared.service';
/* declare module '*'; */
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  parseData: any;
  offers: any;
  paymentAmount :Number = 100;
  currency: string = 'INR';
  razor_key: string = 'rzp_test_VBbqGcdarCZORS';
  paymentID : any;
  paymentStatus : string = '';
  planID : Number ;
  constructor(private navCtrl: NavController, private httpService: HttpService, private utils: UtilsService, private shared_service: SharedService,
    private platform: Platform) {

      this.getOffers();
     }

  ngOnInit() {
  }


  getOffers() {
    if(this.utils.isOnline) {
      this.utils.presentLoading();
      this.httpService.httpGet(this.httpService.Url.offers).subscribe((res) => {
        this.utils.dismissLoading();
        

        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
           this.offers=this.parseData.data;
      
          
      }, (err) => {
        this.utils.dismissLoading();
        
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
  }

  // payWithRazor() {
  //   var options = {
  //     description: 'Premium Membership',
  //     image: '',
  //     currency: this.currency, // your 3 letter currency code
  //     key: this.razor_key, // your Key Id from Razorpay dashboard
  //     amount: this.paymentAmount, // Payment amount in smallest denomiation e.g. cents for USD
  //     name: 'Dhakad Matrimony',
  //     prefill: {
  //       email: '',
  //       contact: '',
  //       name: ''
  //     },
  //     theme: {
  //       color: '#f10558'
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         alert('dismissed')
  //       }
  //     }
  //   };

  //   var successCallback = function (payment_id) {
  //     alert('payment_id: ' + payment_id);
  //     
  //   };

  //   var cancelCallback = function (error) {
  //     alert(error.description + ' (Error ' + error.code + ')');
  //     
  //   };
  //   this.platform.ready().then(() => {
  //     RazorpayCheckout.open(options, successCallback, cancelCallback);
  //   })
  //  // RazorpayCheckout.open(options, successCallback, cancelCallback);
  // //  RazorpayCheckout.on('payment.success', successCallback);
  // //  RazorpayCheckout.on('payment.cancel', cancelCallback);
  // //  RazorpayCheckout.open(options);
  // }


  payWithRazor(actualPrice, planID, planName){
     this.planID = planID;
    this.paymentAmount = (actualPrice*100)
    
    var options = {
    description: 'Premium Membership',
    image: '',
    order_id: '',
    currency: this.currency,
    key:this.razor_key,
    amount:this.paymentAmount.toFixed(2),
    name: 'Dhakad Matrimony',
    theme: {
      color: '#f10558'
        },
   
  //  handler:  (response)=>{
  //    
  //    alert("Handler called");
  //       this.sendPaymetID(response);
  //       }
    }
var successCallback = (success) => {
//alert('payment_id: ' + success.razorpay_payment_id + ' success obj'+ JSON.stringify(success));
var orderId = success.razorpay_order_id;
var signature = success.razorpay_signature;
if(success.org_name == undefined)
   this.paymentStatus = "Failed";
else
this.paymentStatus = "Success";
this.paymentID = success.razorpay_payment_id;
  

alert('Transcation is Successful With Payment ID'+success.razorpay_payment_id);

this.sendPaymetID(success);

}
var cancelCallback = (error)=> {
  //alert(error.description + ' (Error '+error.code+')')
  this.paymentID = "";
  this.paymentStatus = "Failed";
  alert('Transcationis is Failed.');
  this.sendPaymetID(error);

}
RazorpayCheckout.on('payment.success', successCallback)
RazorpayCheckout.on('payment.cancel', cancelCallback)
RazorpayCheckout.open(options)

}

sendPaymetID(response){
   
  //  alert("Sendpayment Function called");
  //  alert(JSON.stringify(response));
   
    if(this.utils.isOnline()) {
      let token = localStorage.getItem("Dhakad_Token");
      let UserId = localStorage.getItem("Dhakad_Login_UserID");
      this.utils.presentLoading();
      let postParams ={
      "order_id": this.paymentID,
      "bank_ref_no":"test" ,
      "profile_id": UserId,
      "amount": this.paymentAmount,
      "plan_id": this.planID,
      "order_status": this.paymentStatus
      }
      //alert("Post Params"+JSON.stringify(postParams));
      this.httpService.httpPostwithHeader(this.httpService.Url.payment,postParams , token).subscribe((res) => {
        this.utils.dismissLoading();
        
        this.shared_service.hide_show_premium(true);
        if(this.platform.is('cordova')) {
          this.parseData = JSON.parse(res.data);
        } else {
          this.parseData = res;
        }
        
        this.utils.presentAlert(this.parseData.message);
        

      }, (err) => {
        this.utils.dismissLoading();
        
        this.utils.presentAlert("Unable to process your request "); 
      });
    } else {
      this.utils.presentAlert(this.utils.appConfig.internetMsg);
    }
    } 

}
