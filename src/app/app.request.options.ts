import { Injectable } from '@angular/core';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';

//OpaqueToken, Inject
//export const WEBAPI_URL_TOKEN = new OpaqueToken('webApiBaseUrl');

@Injectable() 
export class AppRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
  }
  // constructor(@Inject(WEBAPI_URL_TOKEN) public webApiBaseUrl:string) {
  // 	super();
  //   this.webApiBaseUrl = 'http://localhost:8100/';
  // 	console.log('webApiBaseUrl = '+webApiBaseUrl);
  // }

  merge(options?:RequestOptionsArgs):RequestOptions {
    //options.url = this.webApiBaseUrl + options.url;
    return super.merge(options);
  }
}