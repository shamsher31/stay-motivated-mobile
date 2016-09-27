import {Component, enableProdMode} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {StorageService} from './shared/storage.service';
import {ToastService} from './shared/toast.service';
import {BroadcastService} from './shared/broadcast.service';
import {LogService} from './shared/log.service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

// remove comment to enable production mode
//enableProdMode();

ionicBootstrap(MyApp, [
  LogService,
  StorageService,
  ToastService,
  BroadcastService
]);
