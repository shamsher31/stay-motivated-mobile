import { Injectable } from '@angular/core';
import { Toast } from 'ionic-native';

@Injectable() 
export class ToastService {
  public static defaultMessage: string = "Something went wrong";
  public static defaultDuration: string = '3000';
  public static defaultPosition: string = 'bottom';
  
  public static showToast(message?: string, duration?: string, position?: string ) {

    if (!message) {
      message = ToastService.defaultMessage;
    }
    if (!duration) {
      duration = ToastService.defaultDuration;
    }
    if (!position) {
      position = ToastService.defaultPosition;
    }

    Toast.show(message, duration, position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  public static hideToast() {
    Toast.hide();
  }
  
}
