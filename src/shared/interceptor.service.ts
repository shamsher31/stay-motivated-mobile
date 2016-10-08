import {Injectable} from '@angular/core';
import {
  Http,
  ConnectionBackend,
  Request,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';

import {ErrorNotifierService} from './error.notifier';
import {Observable} from 'rxjs/Rx';

import { LoadingService } from './loading.service';
import { NetworkService } from './network.service';
import { LogService } from './log.service';

@Injectable()
export class InterceptorService extends Http {
  
  retryInterval: number;
  timeoutInterval: number;
  
  constructor(
    public backend: ConnectionBackend,
    public defaultOptions: RequestOptions,
    public errorService: ErrorNotifierService,
    public loadingService: LoadingService,
    public networkService: NetworkService,
    public logService: LogService) {
      super(backend, defaultOptions);
      this.retryInterval = 1000;
      this.timeoutInterval = 5000;
    }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    LogService.log('Before the request...');
    this.loadingService.showPreloader();
    this.networkService.checkNetwork();
    return super.request(url, options)
        .catch((err: any): any => {
          this.errorService.notifyError(err);
          return Observable.empty();
        })
        .retryWhen(error => error.delay(this.retryInterval))
        .timeout(this.timeoutInterval, new Error('delay exceeded'))
        .finally(() => {
          LogService.log('After the request...');
          this.loadingService.hidePreloader();
        });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    LogService.log('Before the request...');
    this.loadingService.showPreloader();
    this.networkService.checkNetwork();
    return super.get(url, options)
        .catch((err: any): any => {
          if (err.status === 400 || err.status === 422) {
            return Observable.throw(err);
          } else {
            this.errorService.notifyError(err);
            return Observable.empty();
          }
        })
        .retryWhen(error => error.delay(this.retryInterval))
        .timeout(this.timeoutInterval, new Error('delay exceeded'))
        .finally(() => {
          LogService.log('After the request...');
          this.loadingService.hidePreloader();
        });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    LogService.log('Before the request...');
    this.loadingService.showPreloader();
    this.networkService.checkNetwork();
    return super.post(url, body, options)
        .catch((err: any): any => {
          if (err.status === 400 || err.status === 422) {
            return Observable.throw(err);
          } else {
            this.errorService.notifyError(err);
            return Observable.empty();
          }
        })
        .finally(() => {
          LogService.log('After the request...');
          this.loadingService.hidePreloader();
        });
  }

}