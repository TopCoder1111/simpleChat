import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import {AngularFireDatabase} from '@angular/fire/database';
export interface Group {
  id: string,
  name: string,
  created_at: string
}
export interface Message{
  message: string,
  sender:{
    id: string,
    tempUser: string,
    avatar: any;
  },
  created_at: Date,
  type: string,
  
}
@Injectable()
export class FirebaseService {
  constructor(
    private angularFiredb : AngularFireDatabase,
  ) {}
  
  /**
   * get All groups which is related with user
   * @param user // disable for now.
   */
  getGroups(){
    return this.angularFiredb.object('/group').valueChanges();
  }
  /**
   * Get User from Id
   * @param groupId
   */
  getUserOfGroup(groupId: string, uid: string){
    return this.angularFiredb.object('/group/'+groupId+'/users/'+uid).valueChanges();
  }
  /**
   * Get conversations from Group Id
   * @param groupId
   */
  getGroupConversations(groupId: string){
    return this.angularFiredb.object('/conversations/'+groupId+'/messages/')
    .valueChanges();
  }
  /**
   * Create new message into Group
   * @param groupId
   * @param length
   */    
  createNewMessage(groupId: string, length: Number){
    return this.angularFiredb.object('/conversations/'+groupId+"/messages/"+length);
  }
  /**
   * Add new user to Group
   * @param groupId
   * @param userId
   * @param tempUserName
   */
  addNewUserToGroup(groupId, userId, tempUserName){
    return this.angularFiredb.object('/group/'+groupId+'/users/'+userId)
    .update({
      userName: tempUserName,
      created_at: new Date()
    });
  }
  /**
   * get user
   * @param uid
   */
  getUser(uid: string){
    return this.angularFiredb.object('/users/'+uid).valueChanges();
  }
}

