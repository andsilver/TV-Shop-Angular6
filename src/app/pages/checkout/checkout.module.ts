import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';

import { DisableControlDirective } from './disable-control.directive';
import { CheckoutService } from './checkout.service';

const routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'customers-info',
        component: Step1Component
      },
      {
        path: 'methods',
        component: Step2Component
      },
      {
        path: 'order-overviews',
        component: Step3Component
      },
      {
        path: 'order-processing',
        component: Step4Component
      },
      {
        path: '',
        redirectTo: 'customers-info',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatStepperModule
  ],
  declarations: [
    CheckoutComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    DisableControlDirective
  ],
  providers: [
    CheckoutService
  ]
})
export class CheckoutModule { }
