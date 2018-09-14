import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {User} from '../../routes/users/shared/user.model';
import {AuthService} from '../../auth/auth.service';
@Injectable()
export class UserService {

    userItems: Array<any>;
    currentUser: any;
    loading: boolean = false;
    constructor(
        public auth: AuthService,
        public angularFireDb: AngularFireDatabase,
    ) {
        this.userItems = [];
        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    /**
     * 
     * @param user 
     */
    createNewUser(user: User){
    
        return new Promise((resolve, reject) =>{
          if(this.currentUser != null && this.currentUser != undefined){
            this.angularFireDb.object('/users/'+this.currentUser.uid).update({
              email: this.currentUser.email,
              username: 'user_'+Math.random(),
            });
          }
        })
    }
    getUserList(){
        this.loading = true;
        this.angularFireDb.object('/users')
            .valueChanges()
            .subscribe(res=>{
                console.log(res);
                if(res){
                    let keys = Object.keys(res);
                    let lastLength = this.userItems.length;
                    // let newLength = this.userItems.length;
                    if(lastLength >0){
                        this.userItems = [];
                    }
                    keys.map(key =>{
                       if(res[key].uid != this.currentUser.uid){
                           this.userItems.push(res[key]);
                       }
                    });
                    this.loading = false;
                }
            });  
    }
    getUser(uid: string){
        return this.angularFireDb.object('/users/'+uid).valueChanges();
    }
    userList(){
        return this.userItems;
    }
}
