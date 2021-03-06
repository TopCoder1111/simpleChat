import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { AuthService } from '../../../auth/auth.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
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
        localStorage.setItem('user',  JSON.stringify(res));
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
  /**
   * Do Sign up process
   * @todo
   */
  signUp(){}
  /**
   * chang the popup status
   */
  changePopUpStatus(){
    this.email = this.password= '';
    this.isLogin?this.isLogin = false: this.isLogin = true;
    return true;
  }
}


