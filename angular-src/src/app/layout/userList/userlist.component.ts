import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { UserService } from '../../core/user_service/user.service';
import { SettingsService } from '../../core/settings/settings.service';

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

    userlists: Array<any> = [];
    router: Router;
    sbclickEvent = 'click.sidebar-toggle';
    $doc: any = null;

    constructor (
        public userService: UserService, 
        public settings: SettingsService, 
        public injector: Injector
        ) {
            this.userlists = [];
            this.userlists =  userService.userList();
    }

    ngOnInit() {
        this.router = this.injector.get(Router);
        this.router.events.subscribe((val) => {
            // scroll view to top
            window.scrollTo(0, 0);
            // close sidebar on route change
            this.settings.layout.asideToggled = false;
        });

        // enable sidebar autoclose from extenal clicks
        this.anyClickClose();

    }

    anyClickClose() {
        this.$doc = $(document).on(this.sbclickEvent, (e) => {
            if (!$(e.target).parents('.aside').length) {
                this.settings.layout.asideToggled = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.$doc) {
            this.$doc.off(this.sbclickEvent);
        }
    }
    /**
     * @todo
     * @param receiverId 
     */
    getConversation(receiverId: string){
        console.log(receiverId);
    }
    /**
     * Indentify user online status.
     * @param status 
     */
    statusColor(status: string){
        let color = '';
        if(!status.length){return false;}
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
