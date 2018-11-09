import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Route } from '@angular/router';

import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PaymentAcceptComponent } from './payment-accept/payment-accept.component';
import { PaymentComponent } from './payment.component';

import { PaymentService } from './payment.service';

const routes: Route[] = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      {
        path: 'accept',
        component: PaymentAcceptComponent
      },
      {
        path: 'cancel',
        component: PaymentCancelComponent
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
  declarations: [PaymentCancelComponent, PaymentAcceptComponent, PaymentComponent],
  providers: [PaymentService]
})
export class PaymentModule { }
