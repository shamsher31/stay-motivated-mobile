import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../login/login.service';
import { ToastService } from '../../shared/toast.service';
import { StorageService} from '../../shared/storage.service';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [LoginService]
})

export class ProfileComponent {

  private isLoggedIn: boolean;
  @Output() onLogout = new EventEmitter();

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private toastService: ToastService,
    private storageService: StorageService) {}

  logout() {
    this.loginService.Logout().then((response) => {
      this.onLogoutSuccess(response);
    }, (err) => {
      this.onLogoutError(err);
    });
  }

  private onLogoutSuccess(response) {
    console.log(JSON.stringify(response));
    this.toastService.showToast('Successfully Logout');
    this.afterLogout();
  }

  private onLogoutError(err) {
    console.log(JSON.stringify(err));
    this.toastService.showToast();
    this.afterLogout();
  }

  private afterLogout() {
    this.storageService.clearAll();
    this.isLoggedIn = false;
    this.onLogout.emit({isLoggedIn: this.isLoggedIn});
    this.goToHomePage();
  }

  private goToHomePage() {
    // set HomePage as active tab
    this.navCtrl.parent.select(0);
  }

}
