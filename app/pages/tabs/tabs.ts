import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {LoginComponent} from '../login/login';
import {ProfileComponent} from '../profile/profile';
import { BroadcasteService } from '../../shared/broadcast.service';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  private isLoggedIn: boolean;

  constructor(private broadcaster: BroadcasteService) {
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
    console.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }

  onLogout(isLoggedIn) {
    console.log(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }
}
