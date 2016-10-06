import { NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { StorageService } from '../shared/storage.service';
import { BroadcastService } from '../shared/broadcast.service';
import { LogService } from '../shared/log.service';
import { ToastService } from '../shared/toast.service';
import { SocialShareService } from '../shared/social-share.service';
import { LoadingService } from '../shared/loading.service';
import { LoginService} from '../pages/login/login.service';
import { QouteService} from '../pages/qoute/qoute.service';

// remove comment to enable production mode
enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    ProfilePage
  ],
  providers: [
    StorageService,
    BroadcastService,
    LogService,
    LoginService,
    QouteService,
    ToastService,
    SocialShareService,
    LoadingService
  ]
})
export class AppModule {}
