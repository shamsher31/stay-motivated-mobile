import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {LoginComponent} from '../login/login';
import {ProfileComponent} from '../profile/profile';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  private isLoggedIn: boolean = false;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = LoginComponent;
    this.tab4Root = ProfileComponent;
  }

  onLogin($event) {
    console.log($event);
    this.isLoggedIn = $event.isLoggedIn;
  }
}
