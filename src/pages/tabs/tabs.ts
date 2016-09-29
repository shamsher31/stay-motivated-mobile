import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {LoginComponent} from '../login/login';
import {ProfileComponent} from '../profile/profile';
import { BroadcastService } from '../../shared/broadcast.service';
import { LogService } from '../../shared/log.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;

  isLoggedIn: boolean;

  constructor(public broadcaster: BroadcastService) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = LoginComponent;
    this.tab4Root = ProfileComponent;

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

  onLogin(isLoggedIn) {
    LogService.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }

  onLogout(isLoggedIn) {
    LogService.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }
}
