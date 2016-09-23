import { Injectable } from '@angular/core';
import { GooglePlus, Facebook, TwitterConnect } from 'ionic-native';
import { StorageService} from '../../shared/storage.service';
import { LoginConfig } from '../../shared/login-config';
import { ToastService } from '../../shared/toast.service';

@Injectable()
export class LoginService {

  private loginVia: number;

  constructor(
    private storageService: StorageService,
    private toastService: ToastService) {
      this.loginVia = 0;
    }

  public Google() {
    return GooglePlus.login();
  }

  public Facebook() {
    return Facebook.login(['public_profile']);
  }

  public Twitter() {
    return TwitterConnect.login();
  }

  public Logout() {
    this.storageService.getValue('loginVia').then((loginVia) => {
      this.loginVia = parseInt(loginVia);

      if (this.loginVia == LoginConfig.GOOGLE) {
        this.logoutGoogle();
      }
      if (this.loginVia == LoginConfig.FACEBOOK) {
        this.logoutFacebook();
      }
      if (this.loginVia == LoginConfig.TWITTER) {
        this.logoutTwitter();
      }

    }).catch((err) => {
      this.onLogoutError(err);
    });
  }

  private logoutGoogle() {
    GooglePlus.logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  private logoutFacebook() {
    Facebook.logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  private logoutTwitter() {
    TwitterConnect.logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  private onLogoutSuccess(response) {
    console.log(JSON.stringify(response));
    this.toastService.showToast('Successfully Logout');
    this.storageService.clearAll();
  }

  private onLogoutError(err) {
    console.log(JSON.stringify(err));
    this.toastService.showToast();
    this.storageService.clearAll();
  }
}
