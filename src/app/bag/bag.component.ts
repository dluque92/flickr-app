import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { Photo } from '../core/interfaces/common.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.scss']
})
export class BagComponent implements OnInit {
  bagState: Observable<{photos: Photo[]}>;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.bagState = this.storageService.getPhotos();
  }
}
