import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import {FirebaseService, Message} from '../../../core/firebase/firebase.service';
import {ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import { UsernameDialogComponent } from '../username-dialog/username-dialog.component';
import { ThrowStmt } from '../../../../../node_modules/@angular/compiler';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  groupId : string;
  senderId: string;
  messageText: string; // message Value
  conversations = [];
  currentUser: any;
  loggedInUser: any;
  userInfo: any;
  firstJoined: boolean = false;
  navigationSubscription: any;
  constructor(
    private route: ActivatedRoute,
    private firebase : FirebaseService,
    public auth: AuthService,
    public dialog: MatDialog
  )
  { 
    
    this.navigationSubscription = this.route.params.subscribe((params) => {
      // If it is a NavigationEnd event re-initalise the component
      
      this.groupId = this.route.snapshot.params['id'];
      this.initialiseState();
    });
  }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.firebase.getUserOfGroup(this.groupId, this.loggedInUser.uid)
    .subscribe(response =>{
      this.currentUser = response;
      console.log(this.currentUser);
      if(!this.currentUser){
        setTimeout(() =>{
          this.openDialog();
        }, 400);
        return true;
      }
      this.getUser(this.loggedInUser.uid);
      this.getMessages();
    });
  }
  initialiseState(){
   
    setTimeout(()=>{
      this.scrollToBottom();
    }, 500);
    
    
  }
  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }
  sendMessage(){
    console.log(this.currentUser);
    if(this.messageText){
      let messages: Message = {
        message: this.messageText,
        sender : {
          id: this.loggedInUser.uid,
          tempUser: this.currentUser.userName,
          avatar: this.userInfo.avatar
        },
        created_at: new Date(),
        type: 'text'
      }
      this.firebase.createNewMessage(this.groupId, this.conversations.length+1)
      .update(messages)
      .then(response =>{
        console.log(response);
        this.messageText = '';
      });
    }
  }
  /**
   * Format date string into readable time.
   * @param created_at 
   */
  formateTime(created_at: string){
    let date = new Date(created_at);
    let hour = date.getHours();
    let min = date.getMinutes();
    let when;
    if(hour >12){
      when = 'PM'
    }
    else{
      when = "AM";
    }
    return hour+' : '+min+when;
  }
  /**
   * Show new Popup to create new UserName
   */
  openDialog():void{
    const dialogRef = this.dialog.open(UsernameDialogComponent,{
      disableClose: true,
      width: '500px',
      data:{
        action: 'Add',
        model: {
          tempUserName: '',
          id: this.auth.getProfile().uid
        }
      }
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('result' +result);
      if(result && result.model){
        this.currentUser = result.model;
        this.firebase.addNewUserToGroup(this.groupId, result.model.id, result.model.tempUserName)
        .then(response =>{
          this.firstJoined = true;
          console.log(response);
          if(response){
            let messages: Message = {
              message: "Joined",
              sender : {
                id: this.loggedInUser.uid,
                tempUser: this.currentUser.userName,
                avatar: this.userInfo.avatar
              },
              created_at: new Date(),
              type: 'alert'
            }
            this.firebase.createNewMessage(this.groupId, this.conversations.length+1)
              .update(messages)
              .then(response =>{
                console.log(response);
              });
          }
        }); 
      }
    });
  }
  isSender(sender: any){
    let senderId = sender.id;
    if(!senderId.indexOf(this.loggedInUser.uid)){
      return true;
    }
    else{
     return false;
    }
  }
  
  /**
   * get Messages for this group
   */

   getMessages(){
     console.log(this.currentUser);
     this.firebase.getGroupConversations(this.groupId)
     .subscribe(messages =>{
      console.log(messages);
      if(messages){
        console.log(messages);
        if(this.conversations.length >0){
          this.conversations = [];
        }
        for (let i in messages){
          this.conversations.push(messages[i]);
        }
      }
      console.log(this.conversations);
     });
   }
   /**
    * get User Avatar
    * @param uid
    */
   getUser(uid: string){
     if(uid == undefined || uid == null){
       return false;
     }
     this.firebase.getUser(uid).subscribe(response =>{
      if(response){
       this.userInfo = response;
      }
     });
   }
   /**
    * statusColor
    * @param status
    */
   statusColor(status: string){
    let color = '';
    if(status == undefined || status == null){return false;}
    if(!status.indexOf('online')){
        color = 'primary';
    }
    else if(!status.indexOf('away')){
        color = 'accent';
    }else{
        color = '';
    }
    return color;
}
}
