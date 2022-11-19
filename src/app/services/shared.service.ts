import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
   providedIn: 'root'
})
export class SharedService {
   private reload_page_event = new BehaviorSubject(false);
   private hide_premium = new BehaviorSubject(false);
   private set_logged_in = new BehaviorSubject(false);
   
   
   PageReloadOption = this.reload_page_event.asObservable();
   hidePremiumOption = this.hide_premium.asObservable();
   loggedInOption = this.set_logged_in.asObservable();

   load_reload_matches(flag) {
      this.reload_page_event.next(flag);
   }
   
   hide_show_premium(flag) {
      this.hide_premium.next(flag);
   }
   
   toggle_loggged_on(flag) {
      this.set_logged_in.next(flag);
   }
}