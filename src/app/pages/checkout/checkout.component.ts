import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { CheckoutService } from './checkout.service';
import { CheckoutStep } from './step';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';

const steps = [
  {
    title: 'Uw Gegevens',
    index: 1,
    url: 'customers-info'
  },
  {
    title: 'Bezorg/Betaalmethode',
    index: 2,
    url: 'methods'
  },
  {
    title: 'Overzicht',
    index: 3,
    url: 'order-overviews'
  },
  {
    title: 'Afgerond',
    index: 4,
    url: 'order-processing'
  }
];

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends CheckoutStep implements OnInit {

  currentStep: any;

  constructor(
    route: ActivatedRoute,
    router: Router,
    checkoutService: CheckoutService,
    public appService: AppService,
    private store: Store<State>) {
      super(checkoutService, router, route);
    }

  ngOnInit() {

    this.store.dispatch(new CrumbActions.SaveCrumbPath([{
      name: 'Checkout',
      permalink: `/checkout`,
      static: true,
      default_title: true
    }]));
  }

}
