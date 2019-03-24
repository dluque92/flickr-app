import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Photos } from '../../../core/interfaces/common.interface';
import { FlickrService } from '../../services/flickr.service';
import {SizeOption} from '../../../core/interfaces/common-types.enum';

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
      const tag = this.form.get('dataToSearch').value;

      const result = await this.flickrService.search<Photos>({
        tags: tag,
        per_page: 10,
        page: 1,
        extras: 'description, date_taken',
        format: 'json',
        nojsoncallback: 1
      });

      this.form.reset();

      this.flickrService.setSearchResult(result, SizeOption.Medium);

      this.router.navigateByUrl(`result/${tag}`);
    } catch (e) {
      console.log(e);
    }
  }
}
