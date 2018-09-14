import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { AuthService } from '../../../auth/auth.service';
import {UserService} from '../../../core/user_service/user.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {User} from '../../users/shared/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  password: any;
  email: any;
  username: any = "testUser3";
  errorMessage : string = '';
  formFieldEmail: any;
  formFieldPwd: any;
  formFieldUserName: any;
  userFrom: FormGroup;
  isLogin: any = true;

  constructor(
      public settings: SettingsService, 
      public auth: AuthService, 
      fb: FormBuilder,
      public route: ActivatedRoute,
      public router: Router,
      public userService: UserService
    ) {

    this.formFieldEmail = new FormControl(
      this.email,
      [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
      ]
    );
    this.formFieldPwd = new FormControl(
      this.password, 
      [
        Validators.required, 
        Validators.minLength(6)
      ]
    );
    this.formFieldUserName = new FormControl(
      this.username, 
      [
        Validators.required, 
        Validators.minLength(6)
      ]
    );
    this.userFrom = fb.group({
      email: this.formFieldEmail,
      password: this.formFieldPwd,
      username: !this.isLogin?this.formFieldUserName : null
    });
  }

  ngOnInit() {

  }
  signIn(){
    this.auth.login(this.email, this.password)
    .then(res =>{
      if(res){
        if(!res.hasOwnProperty('uid')){
          return false;
        }
        const user: User = {
          uid: res['uid'],
          email: this.email,
          password: this.password,
          username:this.username,
          avatar :'http://localhost:4200/assets/img/user/05.jpg',
          status : 'online',
          unreadMessage: 0
        }
        localStorage.setItem('user',  JSON.stringify(res));
        this.userService.currentUser = res;
        this.router.navigate(['/chat']);
        return true;
      }
    }, err =>{
        if(err){
          this.errorMessage = err.message;
          return false;
        }
    });
  }
  signUp(){
    // const user: User = {
    //   email: this.email,
    //   password: this.password,
    //   username:this.username,
    //   avatar :'http://localhost:4200/assets/img/user/02.jpg',
    //   status : 'online',
    //   unreadMessage: 0
    // }

  }
  changePopUpStatus(){
    this.email = this.password= '';
    this.isLogin?this.isLogin = false: this.isLogin = true;
    return true;
  }
}


