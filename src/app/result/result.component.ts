import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { takeUntil } from 'rxjs/operators';

import { StructureClass } from '../shared/classes/structure.class';
import { FlickrService } from '../shared/services/flickr.service';
import { Photo } from '../core/interfaces/common.interface';

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

  constructor(
    public flickrService: FlickrService
  ) {
    super();

    this.flickrService.$searchResult
      .pipe(
        takeUntil(this.cancelSubscription$)
      )
      .subscribe((data: Array<any>) => {
        this.dataResult = data;
      });
  }

  ngOnInit() {
  }

}
