import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { ToastService } from './toast.service';
 
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
      this.toastService.showToast(states[networkState]);
    });
  }
}
