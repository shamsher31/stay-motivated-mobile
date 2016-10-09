import { Injectable, OnDestroy } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import _ from 'lodash';

@Injectable()
export class LoadingService implements OnDestroy {
  public loading: any;
  public timer: any;
  public searchMsg: Array<string>;

  constructor(public loadingCtrl: LoadingController) {
    this.searchMsg = [
      'Fetching best Qoutes',
      'Fetching fresh Qoutes',
      'Getting top Qoutes',
      'Finding great Qoutes',
      'Searching selected Qoutes'
    ];
  }

  getRandomeMsg():string {
    return this.searchMsg[Math.floor(Math.random() * this.searchMsg.length)];
  }

  showPreloader(url?: string) {
    let loadingMsg = _.includes(url, 'qoutes') ? this.getRandomeMsg() : 'Loading...'; 
    this.loading = this.loadingCtrl.create({
      content: loadingMsg,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  hidePreloader() {
    this.loading.dismiss();
  }

  ngOnDestroy() {
    this.loading = null;
  }
}
