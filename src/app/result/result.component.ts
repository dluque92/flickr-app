import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { StructureClass } from '../shared/classes/structure.class';
import { FlickrService } from '../shared/services/flickr.service';
import { Photo, Photos } from '../core/interfaces/common.interface';
import { SizeOption } from '../core/interfaces/common-types.enum';

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
  sizes = [
    {
      value: SizeOption.Square,
      text: 'Square'
    },
    {
      value: SizeOption.LargeSquare,
      text: 'Large Square'
    },
    {
      value: SizeOption.Thumbnail,
      text: 'Thubnail'
    },
    {
      value: SizeOption.Small,
      text: 'Small'
    },
    {
      value: SizeOption.Small320,
      text: 'Small 320'
    },
    {
      value: SizeOption.Medium,
      text: 'Medium'
    },
    {
      value: SizeOption.Medium640,
      text: 'Medium 640'
    },
    {
      value: SizeOption.Medium800,
      text: 'Medium 800'
    },
    {
      value: SizeOption.Large,
      text: 'Large'
    }
  ];

  size = 10;
  page = 0;
  total = 0;
  sizeSelected = SizeOption.Medium;

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
          this.size = data.photos.perpage;
          this.page = data.photos.page - 1;
          this.total = data.photos.total;
        }
      });

    this.flickrService.$sizeSelected
      .pipe(
        takeUntil(this.cancelSubscription$)
      )
      .subscribe((data: SizeOption) => {
        this.sizeSelected = data;
      });
  }

  async ngOnInit() {
    try {
      const result = await this.flickrService.search<Photos>({
        tags: this.activatedRoute.snapshot.paramMap.get('tag'),
        per_page: 10,
        page: 1,
        extras: 'description, date_taken',
        format: 'json',
        nojsoncallback: 1
      });

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.error(e);
    }
  }

  async changeSize(value: any) {
    this.flickrService.setSizeSelected(value);

    try {
      const result = await this.flickrService.search<Photos>({
        tags: this.activatedRoute.snapshot.paramMap.get('tag'),
        per_page: 10,
        page: 1,
        extras: `description, date_taken, ${value ? 'url' + value : value}`,
        format: 'json',
        nojsoncallback: 1
      });

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.error(e);
    }
  }

  async getData(event: PageEvent) {
    try {
      const result = await this.flickrService.search<Photos>({
        tags: this.activatedRoute.snapshot.paramMap.get('tag'),
        per_page: event.pageSize,
        page: event.pageIndex + 1,
        extras: `description, date_taken, ${this.sizeSelected ? 'url' + this.sizeSelected : this.sizeSelected}`,
        format: 'json',
        nojsoncallback: 1
      });

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.error(e);
    }
  }
}
