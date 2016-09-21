import { Injectable } from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';

@Injectable()
export class StorageService {
  storage: Storage = null;
  
  constructor() {
    this.storage = new Storage(SqlStorage);
  }
  
  public setData(key: string, value: any) {
    this.storage.set(key, value); 
  }
  
  public getData(key: string) {
    this.storage.get(key)
  }
  
  public removeData(key: string) {
    this.storage.remove(key);
  }
  
  public clearData() {
    this.storage.clear(); 
  }
  
}