import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../shared/services/flickr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public flickrService: FlickrService
  ) { }

  ngOnInit() {
  }

}
