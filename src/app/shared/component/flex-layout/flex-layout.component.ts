import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Photo } from '../../../core/interfaces/common.interface';

@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.scss']
})
export class FlexLayoutComponent  {
  @Input() data: Photo[] = [];
  @Input() hasPagination = false;
  @Input() length = 0;
  @Input() pageSize = 0;
  @Input() pageIndex = 0;
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  getPage(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
