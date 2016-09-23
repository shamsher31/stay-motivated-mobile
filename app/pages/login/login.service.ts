import { Injectable } from '@angular/core';
import { GooglePlus, Facebook, TwitterConnect } from 'ionic-native';
import { StorageService} from '../../shared/storage.service';
import { LoginConfig } from '../../shared/login-config';

@Injectable()
export class LoginService {

  private loginVia: number;

  constructor(private storageService: StorageService) {
      this.loginVia = 0;
    }

  public loginGoogle() {
    return GooglePlus.login();
  }

  public loginFacebook() {
    return Facebook.login(['public_profile']);
  }

  public loginTwitter() {
    return TwitterConnect.login();
  }

  public Logout() :Promise<any> {
    return this.storageService.getValue('loginVia').then((loginVia) => {
      this.loginVia = parseInt(loginVia);

      if (this.loginVia == LoginConfig.GOOGLE) {
        return GooglePlus.logout();
      }
      if (this.loginVia == LoginConfig.FACEBOOK) {
        return Facebook.logout();
      }
      if (this.loginVia == LoginConfig.TWITTER) {
        return TwitterConnect.logout();
      }

    }).catch((err) => {
      console.log(err);
    });
  }
}
