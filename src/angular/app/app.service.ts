import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }

  getMessage(): string {
    return 'a'
  }
}
