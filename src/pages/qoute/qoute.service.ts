import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Qoute} from './qoute';
import { QOUTES } from './mock-qoutes';

@Injectable()
export class QouteService {
  constructor(public http: Http ) {}

  getQoutes(): Observable<Qoute[]> {
    return Observable.of(QOUTES)
      .delay(2000)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
