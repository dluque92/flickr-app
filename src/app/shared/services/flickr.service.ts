import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Photo, Photos } from '../../core/interfaces/common.interface';
import { SizeOption } from '../../core/interfaces/common-types.enum';
import { HttpUtils } from './utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private static KEY = `8fa254190ec943ff6dd2558a1dbbbe74`;
  private static URL = `https://api.flickr.com/services/rest/?method=flickr.photos`;
  private static URL_SEARCH = `${FlickrService.URL}.search&api_key=${FlickrService.KEY}`;
  private static URL_RECENT = `${FlickrService.URL}.getRecent&api_key=${FlickrService.KEY}`

  $searchResult: BehaviorSubject<Photos> = new BehaviorSubject<Photos>(this.firstSearch);
  $sizeSelected: BehaviorSubject<SizeOption> = new BehaviorSubject<SizeOption>(SizeOption.Medium);

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtils
  ) { }

  get firstSearch(): Photos {
    return null;
  }

  setSizeSelected(size: SizeOption) {
    this.$sizeSelected.next(size);
  }

  setSearchResult(result: Photos) {
    result.photos.photo.map( photo => this.generateUrl(photo, this.$sizeSelected.value));

    this.$searchResult.next(result);
  }

  async getRecents<T>(): Promise<T> {
    const searchParams = this.httpUtils.searchParamsFrom({
      format: 'json',
      extras: 'description, date_taken',
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

  generateUrl(photo: Photo, size?: string): Photo {
    photo.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}${size}.jpg`;
    return photo;
  }
}
