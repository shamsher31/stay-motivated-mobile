import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private loginService: LoginService) {}

  ngOnInit() { }

  signinWithTwitter() {
    this.loginService.Twitter();
  }

  signinWithFacebook() {
    this.loginService.Facebook();
  }

}