import { Injectable } from '@angular/core';
import { TwitterConnect, Facebook } from 'ionic-native';

@Injectable()
export class LoginService {

  public Twitter() {
    TwitterConnect.login().then(this.onSuccess, this.onError);
  }

  public Facebook() {
    Facebook.login(['public_profile']).then(this.onSuccess, this.onError);
  }

  public Logout() {
    TwitterConnect.logout().then(this.onSuccess, this.onError);
    Facebook.logout().then(this.onSuccess, this.onError);
  }

  private onSuccess(response) {
    alert(JSON.stringify(response));
  }

  private onError(err) {
    alert(JSON.stringify(err));
  }
}