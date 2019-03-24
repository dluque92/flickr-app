import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StorageService } from '../shared/services/storage.service';
import { Photo } from '../core/interfaces/common.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataResult: Observable<{photos: Photo[]}>;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.dataResult = this.storageService.getPhotos();
  }
}
