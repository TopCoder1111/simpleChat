import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {User} from '../shared/user.model';
@Injectable()
export class UserService {

  constructor(public fireDB: AngularFireDatabase) { }
  /**
   * create new user into firestore
   * @param user 
   */
  createNewUser(user: User){
    let currentUser = firebase.auth().currentUser;
    return new Promise((resolve, reject) =>{
      if(currentUser != null && currentUser != undefined){
        this.fireDB.object('/users/'+currentUser.uid).update({
          email: currentUser.email,
          username: 'user_'+Math.random(),
        });
      }
    })
  }
}
