import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';
import { StorageService} from './storage.service';
import { LoginConfig } from '../../shared/login-config';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [LoginService, StorageService]
})
export class LoginComponent {

  public isLoggedIn: boolean = false;
  @Output() onLogin = new EventEmitter;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private storageService: StorageService) { }

  signinWithGoogle() {
    this.loginService.Google().then((response) => {
      this.onSuccess(response, LoginConfig.GOOGLE);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithFacebook() {
    this.loginService.Facebook().then((response) => {
      this.onSuccess(response, LoginConfig.FACEBOOK);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithTwitter() {
    this.loginService.Twitter().then((response) => {
      this.onSuccess(response, LoginConfig.TWITTER);
    }, (err) => {
      this.onError(err);
    });
  }

  private onSuccess(response, loginVia) {
    console.log(response);
    this.storageService.setObject('profile', response);
    this.storageService.setValue('loginVia', loginVia);
    this.isLoggedIn = true;
    this.onLogin.emit({isLoggedIn: this.isLoggedIn});
  }

  private onError(err) {
    console.log(err);
    this.storageService.clearAll();
    this.isLoggedIn = false;
    this.onLogin.emit({isLoggedIn: this.isLoggedIn});
  }

}
