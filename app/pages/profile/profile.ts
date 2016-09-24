import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../login/login.service';
import { ToastService } from '../../shared/toast.service';
import { StorageService} from '../../shared/storage.service';
import { BroadcastService } from '../../shared/broadcast.service';
import { LogService } from '../../shared/log.service';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [LoginService]
})

export class ProfileComponent {

  private isLoggedIn: boolean;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private toastService: ToastService,
    private storageService: StorageService,
    private broadcaster: BroadcastService) {}

  logout() {
    this.loginService.Logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  private onLogoutSuccess(response) {
    LogService.log(JSON.stringify(response));
    this.toastService.showToast('Successfully Logout');
    this.afterLogout();
  }

  private onLogoutError(err) {
    LogService.log(JSON.stringify(err));
    this.toastService.showToast();
    this.afterLogout();
  }

  private afterLogout() {
    this.storageService.clearAll();
    this.isLoggedIn = false;
    this.broadcaster.broadcast('onLogout', this.isLoggedIn);
    this.goToHomePage();
  }

  private goToHomePage() {
    // set HomePage as active tab
    this.navCtrl.parent.select(0);
  }

}
