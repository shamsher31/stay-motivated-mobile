import { Injectable } from '@angular/core';

import { QOUTES } from './mock-qoutes';

@Injectable()
export class QouteService {
  getQoutes() {
    return Promise.resolve(QOUTES);
  }
}
