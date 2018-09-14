import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class MessageService {
  conversationId: string;
  conversations: Array<any>;
  currentUserId: string;
  msgLength : Number;
  constructor(
    public route: ActivatedRoute, 
    public fireAuth: AngularFireAuth, 
    public auth: AuthService,
    public fireDB: AngularFireDatabase)
    { 
      let user = JSON.parse(localStorage.getItem('user'));
      this.currentUserId = user.uid;
      this.conversations = [];
    }
    /**
     * Create new chat session with receiverID
     * @param receiverID 
     */
    createNewChatSession(receiverID: string, message: string){
      let messages= [{
        created_at: new Date().toString(),
        message: message,
        sender: this.currentUserId
      }];
      if(!this.conversationId){
          this.fireDB.list('conversations').push(
            {
              created_at: new Date().toString(),
              messages: messages,
              user:{
                sender: this.currentUserId,
                receiver: receiverID
            }
          }).then((success)=>{
            console.log(success);
            this.conversationId = success.key;
            this.fireDB.object('/users/'+this.currentUserId+'/conversations/'+receiverID)
            .update({
              conversationId: this.conversationId,
              messageRead: 1
            })
            this.fireDB.object('/users/'+receiverID+'/conversations/'+this.currentUserId)
            .update({
              conversationId: this.conversationId,
              messageRead: 0
            });
          })
      
      }else{
        // if conversation Id not exist, then create new on for the current receiver Id.
          this.fireDB.object('/conversations/'+this.conversationId+'/messages/'+this.msgLength).set({
            created_at: new Date().toString(),
            message: message,
            sender: this.currentUserId,
          });
        }
  }
    /**
     * get conversations with receiverID
     * @param receiverID
     */
    getConversations(receiverID: string){
      this.fireDB.object('/users/'+this.currentUserId+'/conversations/'+
      receiverID).valueChanges().subscribe(res =>{
        if(res == null){return false}
        this.conversationId = res['conversationId'];
        console.log(this.conversationId);
        this.fireDB.object('/conversations/'+this.conversationId+'/messages').valueChanges()
        .subscribe(conversations =>{
          if(conversations.constructor == Array && Array(conversations).length >0){
            let temp = conversations;
            if(this.conversations.length >0){
              this.conversations = [];
            }
            for (let i in temp) {
              this.conversations.push(temp[i]);
              console.log(this.conversations);
            }
          }
          this.msgLength = this.conversations.length;
        });
      });    
    }
    /**
     *  return conversations
     */
    userConversations(){
      return this.conversations; 
    }

}
