import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable() 
export class ToastService {

  private defaultMessage: string;
  private defaultDuration: number;
  private defaultPosition: string;

  constructor(private toastCtrl: ToastController) {
    this.defaultMessage = "Something went wrong";
    this.defaultDuration = 3000;
    this.defaultPosition = 'bottom';
  }
  
  public showToast(message?: string, duration?: number, position?: string ) {

    if (!message) {
      message = this.defaultMessage;
    }
    if (!duration) {
      duration = this.defaultDuration;
    }
    if (!position) {
      position = this.defaultPosition;
    }

    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();

  }
  
}
