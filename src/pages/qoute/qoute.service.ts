import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Qoute} from './qoute';

@Injectable()
export class QouteService {
  constructor(public http: Http ) {}

  getQoutes(): Observable<Qoute[]> {
    return this.http.get('/qoutes/')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
