import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as BagActions from '../../bag/store/bag.actions';
import { Photo } from '../../core/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  bagState: Observable<{photos: Photo[]}>;

  constructor(
    private store: Store<{bag: {photos: Photo[]}}>
  ) { }

  getPhotos() {
    this.bagState = this.store.select('bag');

    return this.bagState;
  }

  addPhoto(photo: Photo) {
    this.store.dispatch(new BagActions.AddPhoto(photo));
  }

  removePhoto(id: string) {
    this.store.dispatch(new BagActions.RemovePhoto(id));
  }
}
