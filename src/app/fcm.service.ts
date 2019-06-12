import { Injectable } from '@angular/core';
//import {FCM} from '@ionic-native/fcm/ngx'


@Injectable({
  providedIn: 'root'
})
export class FCMService {
  private token: string="";
  
  constructor(/*private fcm:FCM */) {
   /* fcm.getToken().then((token)=>{
      this.token=token;
    });
    fcm.onTokenRefresh().subscribe(token=>{this.token=token});
    */
    //TODO: subscribe to topic.
    //fcm.subscribeToTopic()
    
    //TODO use output and eventemmiter to trigger refresh on the notification.
    //fcm.onNotification()
   }

   public getToken():string
   {
     return this.token;
   }
}
