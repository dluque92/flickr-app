import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { StructureClass } from '../shared/classes/structure.class';
import { FlickrService } from '../shared/services/flickr.service';
import { Photo, Photos } from '../core/interfaces/common.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [
    trigger('isOpen', [
      state('false', style({
        height: 0,
        opacity: 0
      })),
      state('true', style({
        height: '*',
        opacity: 1
      })),
      transition('false => true', animate(500)),
      transition('true => false', animate(500)),
    ])
  ]
})
export class ResultComponent extends StructureClass implements OnInit {
  openAdvance = false;
  dataResult: Photo[];
  size = 10;
  page = 0;
  total = 0;

  constructor(
    public flickrService: FlickrService,
    private activatedRoute: ActivatedRoute
  ) {
    super();

    this.flickrService.$searchResult
      .pipe(
        takeUntil(this.cancelSubscription$)
      )
      .subscribe((data: Photos) => {
        if (data) {
          this.dataResult = data.photos.photo;
          this.size = data.photos.perpages;
          this.page = data.photos.page - 1;
          this.total = data.photos.total;
        }
      });
  }

  async ngOnInit() {
    try {
      const result = await this.flickrService.search<Photos>({
        tags: this.activatedRoute.snapshot.paramMap.get('tag'),
        per_page: 10,
        page: 1,
        extras: 'description',
        format: 'json',
        nojsoncallback: 1
      });

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.log(e);
    }
  }

  async getData(event: PageEvent) {
    try {
      const result = await this.flickrService.search<Photos>({
        tags: this.activatedRoute.snapshot.paramMap.get('tag'),
        per_page: event.pageSize,
        page: event.pageIndex + 1,
        extras: 'description',
        format: 'json',
        nojsoncallback: 1
      });

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.log(e);
    }
  }
}
