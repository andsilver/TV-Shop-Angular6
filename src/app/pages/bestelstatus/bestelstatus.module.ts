import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Route } from '@angular/router';

import { BestelStatusComponent } from './bestelstatus.component';
import { BestelStatusService } from './bestelstatus.service';

const routes: Route[] = [
  {
    path: '',
    component: BestelStatusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [BestelStatusComponent],
  providers: [BestelStatusService]
})
export class BestelStatusModule { }
