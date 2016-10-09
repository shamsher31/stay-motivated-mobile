import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { ToastService } from './toast.service';
import _ from 'lodash';
 
declare var navigator: any;
declare var Connection: any;

@Injectable()
export class NetworkService {
  constructor(
    public toastService: ToastService,
    public platform: Platform) { }

  checkNetwork() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.NONE]     = 'No network connection';
      if (!_.isEmpty(states[networkState])) {
        this.toastService.showToast(states[networkState]);
      }
    });
  }
}
