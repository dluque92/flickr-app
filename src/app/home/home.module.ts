import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from '../search/search.component';
import { ResultComponent } from '../result/result.component';
import { BagComponent } from '../bag/bag.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      },
      {
        path: 'bag',
        component: BagComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    ResultComponent,
    BagComponent
  ],
  entryComponents: [
    HomeComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
