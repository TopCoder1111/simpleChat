import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import {FirebaseService, Group} from '../../core/firebase/firebase.service'
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  sbclickEvent = 'click.sidebar-toggle';
  $doc: any = null;
  chatGroups: any= [];
  isLoading: boolean = true;
  constructor(
    public settings: SettingsService,
    private firebase: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getGroups();
    this.router.events.subscribe((val) => {
      // scroll view to top
      window.scrollTo(0, 0);
      // close sidebar on route change
      this.settings.layout.asideToggled = false;
       // enable sidebar autoclose from extenal clicks
       this.anyClickClose();
    });
  }

  anyClickClose() {
    this.$doc = $(document).on(this.sbclickEvent, (e) => {
        if (!$(e.target).parents('.aside').length) {
            this.settings.layout.asideToggled = false;
        }
    });
  }
  /**
   * get Groups
   */
  getGroups(){
    console.log(this.isLoading);
    this.firebase.getGroups().subscribe(response =>{
      if(response){
        let keys = Object.keys(response);
        console.log(response);
        this.isLoading = false;
        let lastLength: any = this.chatGroups.length;
        let newlength: any = keys.length; 
        
        if(typeof response == 'object'){
          if(lastLength != 0){
            Object.assign(this.chatGroups[0], response);
            return true;
          }
          this.chatGroups.push(response);
        }
        else{
          for (let i in response){
            if((newlength - lastLength) > 0 && lastLength != 0 ){
              if(parseInt(i, 10) > (newlength - lastLength)){
                this.chatGroups.push(response[i]);
              }
            }else if(!lastLength){
              this.chatGroups.push(response[i]);
            }
            console.log(this.chatGroups);
          }
        }
      }
    });
  }
} 
