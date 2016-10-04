import { Injectable } from '@angular/core';
import { SocialSharing } from 'ionic-native';
import { Qoute } from '../pages/qoute/qoute';

@Injectable()
export class SocialShareService {
  constructor() {}
  
  shareQoute(qoute: Qoute) {
    SocialSharing.share(
      qoute.title +' - '+ qoute.author, 
      null, null, null)
    .then(() => {
      // Success
    }).catch(() => {
      // Error!
    });
  }
  
  inviteFriends() {
    SocialSharing.share(
      'Stay Motivated App', 
      'Share', 
      null, 
      'https://github.com/shamsher31/stay-motivated-mobile')
    .then(() => {
      // Success
    }).catch(() => {
      // Error!
    });
  }
} 