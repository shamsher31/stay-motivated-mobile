import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialShareService } from '../../shared/social-share.service';
import { LoadingService } from '../../shared/loading.service';
import { QouteService } from '../qoute/qoute.service';
import { Qoute } from '../qoute/qoute';
import _ from 'lodash';

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  qoutes: Qoute[];
  public timer: any;

  constructor(
    public navCtrl: NavController, 
    public qouteService: QouteService,
    public socialShareService: SocialShareService,
    public loadingService: LoadingService) {}

  ngOnInit() {
    this.getQoutes();
  }

  getQoutes() {
    this.loadingService.showSearchLoader();
    this.qouteService.getQoutes()
        .then(qoutes => {
          this.qoutes = _.shuffle(qoutes);
          this.loadingService.hideSearchLoader();
        });
  }

  getItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.qoutes = this.qoutes.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    if (val == '') {
      this.getQoutes();
    }
  }

   refreshQoutes(refresher) {
    this.timer = setTimeout(() => {
      this.qouteService.getQoutes()
        .then(qoutes => {
          this.qoutes = _.shuffle(qoutes);
          refresher.complete();
        });
    }, 2000);
  }

  trackByQoutesId(index: number, qoute: Qoute) {
    return qoute.id;
  }

  openSharingOptions(qoute: Qoute) {
    this.socialShareService.shareQoute(qoute);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
