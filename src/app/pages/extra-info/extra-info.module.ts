import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { ContactComponent } from './contact/contact.component';
import { ForBusinessComponent } from './for-business/for-business.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { LayoutComponent } from './layout/layout.component';
import { DynamicComponent } from './dynamic/dynamic.component';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'advies-contact',
        component: ContactComponent
      },
      {
        path: 'advies-contact/klantenservice',
        component: ContactComponent
      },
      {
        path: 'zakelijk',
        component: ForBusinessComponent
      },
      {
        path: 'vacatures',
        component: VacanciesComponent
      },
      {
        path: ':id',
        component: DynamicComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ContactComponent, ForBusinessComponent, VacanciesComponent, LayoutComponent, DynamicComponent]
})
export class ExtraInfoModule { }
