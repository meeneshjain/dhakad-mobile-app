import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Get a reference to the database 


// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/messaging';
// import 'firebase/database';
// import 'firebase/firestore';
export interface User {
  uid: string;
  email: string;
  displayName:string;
  
}

export interface Message {
 createdAt: firebase.firestore.FieldValue; //firebase.firestore.FieldValue;//
  id: string;
  from: string;
  msg: string;
  to : string;
  fromName: string;
  myMsg: boolean;
  displayName:string;
}



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
 
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,private http: HttpClient) { 
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;    
    });
  }

  async signup({ email, contact, password,userName }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const uid = credential.user.uid;
    console.log('uid ', uid )
    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      phoneNumber :contact,
      email: credential.user.email,
      displayName : userName
    })
  }
 
   signIn({ email, password }) {
     return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
    //return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
 
  addChatMessage(msg, name) {	
    // let key = this.generateRandomString(16);	
    let user1=localStorage.getItem("Dhakad_User_Virtual_id");	
    let user2=localStorage.getItem("Dhakad_Partner_Virtual_id");	
    let roomName = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);	
      console.log(user1+', '+user2+' => '+ roomName);    //collection('messages')	
  console.log('this.currentUser.uid ', this.currentUser.uid )
    return this.afs.collection('messages').doc(roomName).collection('chats').add({
      msg: msg,	
      from: this.currentUser.uid,	
      fromName: name,
      username: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()	
    });	
    
  }

  generateRandomString(length) {	
    let text = "";	
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";	
    for (let i = 0; i < length; i++){	
      text += possible.charAt(Math.floor(Math.random() * possible.length));	
    }	
    return text;	
  }

  getChatMessages() {
    let users = [];
    let user1=localStorage.getItem("Dhakad_User_Virtual_id");	
    let user2=localStorage.getItem("Dhakad_Partner_Virtual_id");	
    let roomName = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log("get users",users);
       // var msg = this.afs.collection('messages', ref =>  ref.orderBy('createdAt'));
       var msg = this.afs.collection('messages').doc(roomName).collection('chats', ref =>  ref.orderBy('createdAt'));
        console.log("get messages",msg);
        return this.afs.collection('messages').doc(roomName).collection('chats', ref =>  ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        // Get the real name for each user
        console.log("messages recieved",messages);
        for (let m of messages) {          
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }        
        return messages
      })
    )
  }
   
  getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  private getUserForMsg(msgFromId, users: User[]): string {    
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.displayName;
      }
    }
    return 'Deleted';
  }
 
  sendNotificationForChat(){
    let gcmToken = localStorage.getItem('gcmTocken');
   
    const headers = new HttpHeaders()
      .set("Authorization", "key=AAAAo0bohRA:APA91bH-Vf-UVn-YlxWCxN10kXodCQoD49IJda77FeDXGytRkhuMZB7g76f6W1y0C80M-6g1z91e1r8FzJ4j84_aSR1MAz773RHTTLNXO3aRhGjH0gBw5VHoAqZGNglruavWfX0du4Bq");
    let postData= {
      "to":gcmToken,// "deR_xehvR96LiybJ8Lnyc_:APA91bH-llzNt6KJp1TFcU7Om70ZSYcHGEAmOZfMTDRF-rthmEqGEhnvcvholkv9PvgqeDFXRTp3GXelkeompVZApnKqt0c8sYyqB0wfsd5YnPz1f3zL0zY_quDHYCNaxj-DyYrejUSx",
       "notification" : {
          "body" : "You got chat message.",
          "title" : "Hey!!"
        }
    }
   
    this.http.post('https://fcm.googleapis.com/fcm/send',postData,{headers : headers})
    .subscribe(res => console.log("Response came!!!"));
    
  }
}
