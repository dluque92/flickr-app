import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { HttpUtils } from './utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private static KEY = '8fa254190ec943ff6dd2558a1dbbbe74';
  private static SECRET = 'ef495f1c60b8fa14';

  $searchResult: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.firstSearch);

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtils
  ) { }

  get firstSearch(): Array<any> {
    return [];
  }

  setSearchResult(result: Array<any>) {
    this.$searchResult.next(result);
  }

  async search<T>(filter?: Record<string, any>): Promise<Array<T>> {
    const searchParams = this.httpUtils.searchParamsFrom(filter);
    const url = ``;

    try {
      return await this.http.get<Array<T>>(url, {params: searchParams}).toPromise();
    } catch (error) {
      throw (error as HttpErrorResponse).message;
    }
  }
}
