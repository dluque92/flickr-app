import { Component, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Photo, Photos } from '../core/interfaces/common.interface';
import { FlickrService } from '../shared/services/flickr.service';
import { StructureClass } from '../shared/classes/structure.class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends StructureClass implements OnInit {
  dataResult: Photo[];

  constructor(
    public flickrService: FlickrService
  ) {
    super();

    this.flickrService.$searchResult
      .pipe(
        takeUntil(this.cancelSubscription$)
      )
      .subscribe((data: Photos) => {
        if (data) {
          this.dataResult = data.photos.photo;
        }
      });
  }

  async ngOnInit() {
    try {
      const result = await this.flickrService.getRecents<Photos>();

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.error(e);
    }
  }
}
