import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { HttpUtils } from './utils/http-utils';
import { Photos, Photo } from '../../core/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private static KEY = `8fa254190ec943ff6dd2558a1dbbbe74`;
  private static URL = `https://api.flickr.com/services/rest/?method=flickr.photos`;
  private static URL_SEARCH = `${FlickrService.URL}.search&api_key=${FlickrService.KEY}`;
  private static URL_RECENT = `${FlickrService.URL}.getRecent&api_key=${FlickrService.KEY}`

  $searchResult: BehaviorSubject<Photos> = new BehaviorSubject<Photos>(this.firstSearch);

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtils
  ) { }

  get firstSearch(): Photos {
    return null;
  }

  setSearchResult(result: Photos) {
    result.photos.photo.map( photo => this.generateUrl(photo));

    this.$searchResult.next(result);
  }

  async getRecents<T>(): Promise<T> {
    const searchParams = this.httpUtils.searchParamsFrom({
      format: 'json',
      extras: 'description',
      nojsoncallback: 1
    });

    try {
      return await this.http.get<T>(FlickrService.URL_RECENT, {params: searchParams}).toPromise();
    } catch (error) {
      throw (error as HttpErrorResponse).message;
    }
  }

  async search<T>(filter?: Record<string, any>): Promise<T> {
    const searchParams = this.httpUtils.searchParamsFrom(filter);

    try {
      return await this.http.get<T>(FlickrService.URL_SEARCH, {params: searchParams}).toPromise();
    } catch (error) {
      throw (error as HttpErrorResponse).message;
    }
  }

  generateUrl(photo: Photo): Photo {
    photo.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    return photo;
  }
}
