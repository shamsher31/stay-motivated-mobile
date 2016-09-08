import { Component, OnInit } from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginComponent implements OnInit {
  constructor(private navCtrl: NavController) { }

  ngOnInit() { }
}