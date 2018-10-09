import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';

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
    route: ActivatedRoute) {
      super(checkoutService, router, route);
    }

  ngOnInit() {
    this.subscriptions.push(
      this.checkoutService.getOrderView().subscribe(res => {
        this.arrived = true;
        this.widget = res;
        console.log(res);
      })
    );
  }

  placeOrder() {
    this.checkoutService.placeOrder().subscribe(res => {
      console.log(res);
      this.gotoNextStep();
    });
  }

}
