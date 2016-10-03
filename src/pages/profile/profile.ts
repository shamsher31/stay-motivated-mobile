import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../shared/toast.service';
import { StorageService} from '../../shared/storage.service';
import { BroadcastService } from '../../shared/broadcast.service';
import { LogService } from '../../shared/log.service';
import { LoginService } from '../login/login.service';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'profile.html'
})

export class ProfilePage {

  isLoggedIn: boolean;

  constructor(
    public navCtrl: NavController,
    public loginService: LoginService,
    public toastService: ToastService,
    public storageService: StorageService,
    public broadcaster: BroadcastService) {}

  logout() {
    this.loginService.Logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  onLogoutSuccess(response) {
    LogService.log(JSON.stringify(response));
    this.toastService.showToast('Successfully Logout');
    this.afterLogout();
  }

  onLogoutError(err) {
    LogService.log(JSON.stringify(err));
    this.toastService.showToast();
    this.afterLogout();
  }

  afterLogout() {
    this.storageService.clearAll();
    this.isLoggedIn = false;
    this.broadcaster.broadcast('onLogout', this.isLoggedIn);
    this.navCtrl.setRoot(HomePage);
  }

}
