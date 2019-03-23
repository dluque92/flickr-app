import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private static KEY = '8fa254190ec943ff6dd2558a1dbbbe74';
  private static SECRET = 'ef495f1c60b8fa14';

  constructor() { }
}
