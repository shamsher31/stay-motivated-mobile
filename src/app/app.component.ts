import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { BroadcastService } from '../shared/broadcast.service';
import { LogService } from '../shared/log.service';

@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  isLoggedIn: boolean;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public broadcaster: BroadcastService) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Profile', component: ProfilePage, icon: 'person' },
      { title: 'About', component: AboutPage, icon: 'information-circle' }
    ];

    this.isLoggedIn = false;

    this.broadcaster.on<string>('onLogin')
      .subscribe(isLoggedIn => {
        this.onLogin(isLoggedIn);
      });

    this.broadcaster.on<string>('onLogout')
      .subscribe(isLoggedIn => {
        this.onLogout(isLoggedIn);
      });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  onLogin(isLoggedIn) {
    LogService.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }

  onLogout(isLoggedIn) {
    LogService.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }
}
