import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../login/login.service';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [LoginService]
})

export class ProfileComponent {
  constructor(
    private navCtrl: NavController,
    private loginService: LoginService) {}

  logout() {
    this.loginService.Logout();
  }
}
