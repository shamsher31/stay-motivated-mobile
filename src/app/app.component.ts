import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import _ from 'lodash';
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

    this.isLoggedIn = false;
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'About', component: AboutPage, icon: 'information-circle' },
      { title: 'Login', component: LoginPage, icon: 'log-in' }
    ];

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
    this.handleMenuItem(this.isLoggedIn);
  }

  onLogout(isLoggedIn) {
    LogService.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
    this.handleMenuItem(this.isLoggedIn);
  }

  handleMenuItem(isLoggedIn: boolean) {
    if (isLoggedIn == false) {
      this.pages = _.pullAllBy(this.pages, [{ title : 'Profile'}], 'title');
      this.pages.push({ title: 'Login', component: LoginPage, icon: 'log-in' })
      this.nav.setRoot(HomePage);
    }

    if (isLoggedIn == true) {
      this.pages = _.pullAllBy(this.pages, [{ title : 'Login'}], 'title');
      this.pages.push({ title: 'Profile', component: ProfilePage, icon: 'person' });
      this.nav.setRoot(ProfilePage);
    }
  }
}
