import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  defaultMessage: string;
  defaultDuration: number;
  defaultPosition: string;

  constructor(public toastCtrl: ToastController) {
    this.defaultMessage = "Something went wrong";
    this.defaultDuration = 3000;
    this.defaultPosition = 'bottom';
  }
  
  public showToast(message?: string, duration?: number, position?: string ) {

    let toast = this.toastCtrl.create({
      message: message || this.defaultMessage,
      duration: duration || this.defaultDuration,
      position: position || this.defaultPosition
    });
    toast.present();

  }
  
}
