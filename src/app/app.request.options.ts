import { Injectable, Inject, OpaqueToken} from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';

export const WEBAPI_URL_TOKEN = new OpaqueToken('webApiBaseUrl');

@Injectable() 
export class AppRequestOptions extends BaseRequestOptions {
  constructor(@Inject(WEBAPI_URL_TOKEN) public webApiBaseUrl:string) {
    super();
  }

  merge(options?:RequestOptionsArgs):RequestOptions {
    options.url = (this.webApiBaseUrl ? this.webApiBaseUrl :
      'http://localhost:8003') + options.url;
    return super.merge(options);
  }
}