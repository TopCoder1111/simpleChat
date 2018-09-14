import { Component, OnInit } from '@angular/core';
import { UserblockService } from './userblock.service';
import { AuthService } from '../../../auth/auth.service';
@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    profile: any;
    constructor(public userblockService: UserblockService, public auth: AuthService) {
    }

    async ngOnInit() {
        this.profile = await this.auth.getProfile().valueChanges()
        .subscribe(me =>{
            this.profile = me;
            console.log(me);
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
