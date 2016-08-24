import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import { Qoute } from './qoute';
import { QouteService } from './qoute.service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [QouteService]
})
export class HomePage implements OnInit {

  private searchQuery: string = '';
  public qoutes: Qoute[];

  constructor(private navCtrl: NavController, private qouteService: QouteService) {}

  getQoutes() {
    this.qouteService.getQoutes().then(qoutes => this.qoutes = qoutes);
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
  }
}
