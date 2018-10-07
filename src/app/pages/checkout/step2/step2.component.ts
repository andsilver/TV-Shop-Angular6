import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component extends CheckoutStep implements OnInit {

  form: FormGroup;

  constructor(
    checkoutService: CheckoutService,
    router: Router,
    route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    super(checkoutService, router, route);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.checkoutService.getMethodsWidget().subscribe(res => {
        console.log(res);
      })
    );
  }

}
