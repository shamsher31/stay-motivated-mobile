import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  public static isProduction: boolean = true;

  public static log(...args: any[]): void {
    if (!LogService.isProduction) {
      for (let arg of args) {
        console.log(arg);
      }
    }
  }
}
