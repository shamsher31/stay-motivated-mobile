import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../shared/storage.service';
import { oAuthConfig } from '../../shared/oauth-config';
import { BroadcastService } from '../../shared/broadcast.service';
import { LogService } from '../../shared/log.service';
import { LoginService} from './login.service';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage {

  isLoggedIn: boolean;

  constructor(
    public navCtrl: NavController,
    public loginService: LoginService,
    public storageService: StorageService,
    public broadcaster: BroadcastService) {
      this.isLoggedIn = false;
    }

  signinWithGoogle() {
    this.loginService.loginGoogle().then((response) => {
      this.onSuccess(response, oAuthConfig.Google);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithFacebook() {
    this.loginService.loginFacebook().then((response) => {
      this.onSuccess(response, oAuthConfig.Facebook);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithTwitter() {
    this.loginService.loginTwitter().then((response) => {
      this.onSuccess(response, oAuthConfig.Twitter);
    }, (err) => {
      this.onError(err);
    });
  }

  onSuccess(response: any, loginVia: number) {
    LogService.log(response);
    this.storeLoginResponse(response, loginVia);
    this.broadcastOnLogin(true);
  }

  onError(err) {
    LogService.log(err);
    this.storageService.clearAll();
    this.broadcastOnLogin(false);
  }

  storeLoginResponse(res: any, loginVia: number) {
    this.storageService.setObject('profile', res);
    this.storageService.setValue('loginVia', loginVia);
  }

  broadcastOnLogin(val: boolean) {
    this.isLoggedIn = val;
    this.broadcaster.broadcast('onLogin', this.isLoggedIn);
  }

}
