import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {User} from '../routes/users/shared/user.model';
import { Subscription } from 'rxjs/Subscription'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/filter';
@Injectable()
export class AuthService {
  userId: string; // current User ID 
  mouseEvents:  Subscription
  timer:  Subscription;
  connectionStatus: any;
  constructor(
    public router: Router,  
    public fireAuth: AngularFireAuth,
    public fireDb: AngularFireDatabase
    ) { 
      // Check user connecion status the real time based.
      this.fireAuth.authState
            .do(user => {
              if (user) {
                 this.userId = user.uid
                 this.updateOnConnect();
                 this.updateOnDisconnect();
                 this.updateOnIdle() 
              }

            })
        .subscribe();
    }
    
  /**
   * Do login action into firebase account.
   * @param user 
   */
  login(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response =>{
        resolve(response.user);
      }, err =>{
        reject(err);
      });
    });
  }
  /**
   * handle authentication
   * @todo
   */
  handleAuthentication(){
    // todo
    // 
  }
  /**
   * Do logout action for user
   * @param user 
   * @todo
   */
  logout(user: User){
  
  }
  /**
   * check the login status of user
   * @return boolean
   */
  isAuthenticated(): boolean {
   //check the user logged in
   const user = JSON.parse(localStorage.getItem('user'));
    return user != null?true:false;
  }
  /**
   * get LoggedIn User Info.
   * @todo
   */
  getProfile(){
    const user = JSON.parse(localStorage.getItem('user'));
    return  this.fireDb.object('/users/'+user.uid);
  }
  /**
   * do Sign up to firebase data store.
   * @param user 
   */
  signUp(user: User){
    return new Promise((resolve, reject)=>{
      this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(response =>{
        resolve(response);
      }, err =>{
        reject(err);
      })
    });
  }
  updateStatus(status: string) {
    if (!this.userId) return

    this.fireDb.object(`/users/` + this.userId).update({ status: status })
  }
  // set Online Status to Chat
  updateOnConnect() {
    return this.fireDb.object('.info/connected')
                .valueChanges().do(connected => {
                    this.connectionStatus = connected;
                    let status = connected? 'online' : 'offline'
                    this.updateStatus(status)
                })
                .subscribe()
  }
  // Set User offline Status
  updateOnDisconnect() {
    firebase.database().ref().child(`/users/${this.userId}`)
            .onDisconnect()
            .update({status: 'offline'})
  }
  // set User status away 
  updateOnIdle() {
    this.mouseEvents = Observable.
                         fromEvent(document, 'mousemove')
                         .throttleTime(2000)
                         .do(() => {
                            this.updateStatus('online')
                            this.resetTimer()
                         })
                         .subscribe()
  }
  
  // set Away Timer
  resetTimer() {
    if (this.timer) this.timer.unsubscribe();
    this.timer = Observable.timer(5000)
                .do(() => {
                      this.updateStatus('away')
                })
                .subscribe()
  }

}
