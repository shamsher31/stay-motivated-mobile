import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import * as _ from 'lodash';

import { Qoute } from '../qoute/qoute';
import { QouteService } from '../qoute/qoute.service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [QouteService]
})
export class HomePage implements OnInit {

  public qoutes: Qoute[];

  constructor(private navCtrl: NavController, private qouteService: QouteService) {}

  getQoutes() {
    this.qouteService.getQoutes().then(qoutes => this.qoutes = _.shuffle(qoutes));
  }

  ngOnInit() {
    this.getQoutes();
  }
  
  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
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
    setTimeout(() => {
      this.getQoutes();
      refresher.complete();
    }, 2000);
  }

  trackByQoutesId(index: number, qoute: Qoute) {
    return qoute.id;
  }

  openSharingOptions(qoute) {
    SocialSharing.share(qoute.title +' - '+ qoute.author, null, null, null).then(() => {
      // Success
    }).catch(() => {
      // Error!
    });
  }
}
