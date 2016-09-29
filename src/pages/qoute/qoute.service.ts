import { Injectable } from '@angular/core';
import { Qoute} from './qoute';
import { QOUTES } from './mock-qoutes';

@Injectable()
export class QouteService {
  getQoutes() :Promise<Qoute[]> {
    return Promise.resolve(QOUTES);
  }
}
