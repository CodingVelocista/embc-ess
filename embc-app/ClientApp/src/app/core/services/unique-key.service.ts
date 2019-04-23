import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueKeyService {
  // this represents a single key to look up.
  // this service just holds a key and is subscribed to in the app component
  // This is an alternate to putting the GUID into the routing
  key: string = null;

  constructor() { }

  setKey(key: string) {
    this.key = key;
  }
  getKey(): string {
    return this.key;
  }
  clearKey() {
    this.key = null;
  }
}
