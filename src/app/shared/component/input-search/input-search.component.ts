import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FlickrService } from '../../services/flickr.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private flickrService: FlickrService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dataToSearch: ['']
    });
  }

  async searchData() {
    try {
      const result = await this.flickrService.search(this.form.value);

      this.form.reset();

      this.flickrService.setSearchResult(result);
    } catch (e) {
      console.log(e);
    }
  }
}
