import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../login/login.service';
import { ToastService } from '../../shared/toast.service';
import { StorageService} from '../../shared/storage.service';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [LoginService]
})

export class ProfileComponent {
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

  private goToHomePage() {
    // set HomePage as active tab
    this.navCtrl.parent.select(0);
  }

  private onLogoutSuccess(response) {
    console.log(JSON.stringify(response));
    this.toastService.showToast('Successfully Logout');
    this.storageService.clearAll();
    this.goToHomePage();
  }

  private onLogoutError(err) {
    console.log(JSON.stringify(err));
    this.toastService.showToast();
    this.storageService.clearAll();
    this.goToHomePage();
  }
}
