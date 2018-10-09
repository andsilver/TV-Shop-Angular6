import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component extends CheckoutStep implements OnInit {

  constructor(
    checkoutService: CheckoutService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(checkoutService, router, route);
  }

  ngOnInit() {
  }

}
