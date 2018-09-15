import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../core/user_service/user.service';
import { MessageService } from '../../../core/message/message.service';
import { Router,ActivatedRoute } from '@angular/router';
import {User} from '../../users/shared/user.model';
import * as moment from 'moment';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  receiverId : string;
  senderId: string;
  messageText: string; // message Value
  conversations: Array<any>;
  sender: any;
  receiver: any;
  navigationSubscription: any;
  constructor(
    private route: ActivatedRoute,
    public userService : UserService, 
    public auth: AuthService,
    public messageService: MessageService)
  { 
    
    this.navigationSubscription = this.route.params.subscribe((params) => {
      // If it is a NavigationEnd event re-initalise the component
      this.receiverId = this.route.snapshot.params['id'];
      this.messageService.getConversations(this.receiverId);
      this.initialiseState();
    });
  }

  ngOnInit() {
   
  }
  initialiseState(){
    setTimeout(()=>{
      this.scrollToBottom();
    }, 500);
    console.log('here');
    this.getUser();
    this.auth.getProfile()
    .valueChanges().subscribe(user =>{
      this.sender = user;
      console.log(this.sender);
    });
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
    const message = this.messageText;
    if(this.messageText.length > 0)
    this.messageService.createNewChatSession(this.receiverId, message);
    this.messageText = '';
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
   * getUserName
   * 
   */
  getUser(){
    this.userService.getUser(this.receiverId).subscribe(receiver =>{
      this.receiver = receiver;
    });
  }
  isVisableMsg(){
    return this.messageService.conversations.length?true:false;
  }
  isSender(senderId: string){
    if(!senderId.indexOf(this.sender.uid)){
      return true;
    }
    else{
     return false;
    }
  }
}
