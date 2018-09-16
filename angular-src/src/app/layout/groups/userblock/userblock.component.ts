import { Component, OnInit } from '@angular/core';
import { UserblockService } from './userblock.service';
import { AuthService } from '../../../auth/auth.service';
import {FirebaseService} from '../../../core/firebase/firebase.service';
@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    profile: any;
    constructor(public userblockService: UserblockService, public auth: AuthService, public firebase: FirebaseService) {
    }

    async ngOnInit() {
        const loggedInUser = this.auth.getProfile();
        this.firebase.getUser(loggedInUser.uid)
        .subscribe(response =>{
            this.profile = response;
        });
    }
    userStatus() {
        
        return this.userblockService.getVisibility();
    }
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
