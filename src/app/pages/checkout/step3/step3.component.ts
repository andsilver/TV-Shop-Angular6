import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CartActions from 'app/store/actions/cart.action';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component extends CheckoutStep implements OnInit {

  widget: any;
  arrived = false;

  constructor(
    checkoutService: CheckoutService,
    router: Router,
    route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any,
    private store: Store<State>) {
      super(checkoutService, router, route);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.checkoutService.getOrderView().subscribe(res => {

        if (!res || !res['order_details']) {
          return;
        }

        this.arrived = true;
        this.widget = res;
        console.log(res);
      })
    );
  }

  placeOrder() {
    this.checkoutService.placeOrder().subscribe(res => {
      console.log(res);
      localStorage.removeItem('cart_id');
      this.store.dispatch(new CartActions.SetCartId(''));
      if (res && res['pay_link']) {
        this.document.location.href = res['pay_link'];
      } else {
        this.gotoNextStep();
      }
    });
  }

}
