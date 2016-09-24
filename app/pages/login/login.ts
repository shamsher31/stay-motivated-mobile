import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';
import { StorageService } from '../../shared/storage.service';
import { LoginConfig } from '../../shared/login-config';
import { BroadcastService } from '../../shared/broadcast.service';
import { ProfileComponent } from '../profile/profile';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [LoginService]
})

export class LoginComponent {

  private isLoggedIn: boolean;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private storageService: StorageService,
    private broadcaster: BroadcastService) {
      this.isLoggedIn = false;
    }

  signinWithGoogle() {
    this.loginService.loginGoogle().then((response) => {
      this.onSuccess(response, LoginConfig.GOOGLE);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithFacebook() {
    this.loginService.loginFacebook().then((response) => {
      this.onSuccess(response, LoginConfig.FACEBOOK);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithTwitter() {
    this.loginService.loginTwitter().then((response) => {
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
    this.broadcaster.broadcast('onLogin', this.isLoggedIn);
    this.navCtrl.push(ProfileComponent);
  }

  private onError(err) {
    console.log(err);
    this.storageService.clearAll();
    this.isLoggedIn = false;
    this.broadcaster.broadcast('onLogin', this.isLoggedIn);
  }

}
