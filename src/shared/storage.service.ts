import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageService {
  storage: Storage = null;
  
  constructor() {
    this.storage = new Storage();
  }
  
  public setObject(key: string, value: any) {
    this.storage.set(key, value);
  }

  public getObject(key: string) :Promise<any> {
    return this.storage.get(key);
  }

  public setValue(key: string, value: any) {
    this.storage.set(key, value); 
  }

  public getValue(key: string) :Promise<any> {
    return this.storage.get(key);
  }

  public remove(key: string) {
    this.storage.remove(key);
  }
  
  public clearAll() {
    this.storage.clear(); 
  }
  
}