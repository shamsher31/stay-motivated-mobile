import { Injectable } from '@angular/core';
import { GooglePlus, Facebook, TwitterConnect } from 'ionic-native';
import { StorageService} from './storage.service';

@Injectable()
export class LoginService {

  constructor(private storageService: StorageService) {}

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
    GooglePlus.logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });

    Facebook.logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });

    TwitterConnect.logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  private onLogoutSuccess(response) {
    console.log(JSON.stringify(response));
    this.storageService.clearData();
  }

  private onLogoutError(err) {
    console.log(JSON.stringify(err));
    this.storageService.clearData();
  }
}