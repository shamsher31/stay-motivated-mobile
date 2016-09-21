import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { LoginService } from '../login/login.service';
import { StorageService } from '../login/storage.service';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [LoginService, StorageService]
})
export class ProfileComponent {
  constructor(
    private navCtrl: NavController,
    private loginService: LoginService) {}

  logout() {
    this.loginService.Logout();
  }
}