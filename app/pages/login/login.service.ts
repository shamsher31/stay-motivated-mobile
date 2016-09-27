import { Injectable } from '@angular/core';
import { GooglePlus, Facebook, TwitterConnect } from 'ionic-native';
import { StorageService} from '../../shared/storage.service';
import { LogService} from '../../shared/log.service';
import { oAuthConfig } from '../../shared/oauth-config';

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

      if (this.loginVia == oAuthConfig.Google) {
        return GooglePlus.logout();
      }
      if (this.loginVia == oAuthConfig.Facebook) {
        return Facebook.logout();
      }
      if (this.loginVia == oAuthConfig.Twitter) {
        return TwitterConnect.logout();
      }

    }).catch((err) => {
      LogService.log(err);
    });
  }
}
