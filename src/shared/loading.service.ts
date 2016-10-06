import { Injectable, OnDestroy } from '@angular/core';
import { LoadingController } from 'ionic-angular';

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

  showSearchLoader() {
    this.loading = this.loadingCtrl.create({
      content: this.getRandomeMsg(),
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  hideSearchLoader() {
    this.timer = setTimeout(() => {
      this.loading.dismiss();
    }, 4000);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
