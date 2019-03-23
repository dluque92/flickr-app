import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Photos } from '../../../core/interfaces/common.interface';
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
    private flickrService: FlickrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dataToSearch: ['']
    });
  }

  async searchData() {
    try {

      const result = await this.flickrService.search<Photos>({
        tags: this.form.get('dataToSearch').value,
        per_page: 48,
        format: 'json',
        nojsoncallback: 1
      });

      this.form.reset();

      this.flickrService.setSearchResult(result);

      this.router.navigateByUrl('result');
    } catch (e) {
      console.log(e);
    }
  }
}
