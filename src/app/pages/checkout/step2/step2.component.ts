import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var imgix: any;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component extends CheckoutStep implements OnInit {

  form: FormGroup;
  methodRadio: FormGroup;
  pickupLocationFormRadio: FormGroup;

  widget: any;
  arrived = false;

  currentMethod: string;
  altDeliver: false;

  body = {
    shipping_selected: 'AFHALEN_Nijmegen',
    customers_delivery_time: '',
    delivery_on_sunday: '0',
    alt_customers_delivery_time: '',
    afhalen_parent: '',
    payment: '',
    issuer_bank: '',
    creditcard_type: ''
  };

  constructor(
    checkoutService: CheckoutService,
    router: Router,
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar) {
    super(checkoutService, router, route);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.checkoutService.getMethodsWidget().subscribe(res => {

        console.log(res);
        this.widget = res;

        this.form = this.formBuilder.group({
          shipping_selected: '',
          customers_delivery_time: '',
          delivery_on_sunday: '0',
          alt_customers_delivery_time: '',
          afhalen_parent: '',
          payment: '',
          issuer_bank: '',
          creditcard_type: ''
        });

        this.currentMethod = this.pickupMethod.input_value;
        this.arrived = true;
        setTimeout(() => imgix.init(), 1);
      })
    );
  }

  get pickupMethod() {
    return this.widget['methods'][0];
  }

  get deliverMethod() {
    return this.widget['methods'][1];
  }

  submit() {
    console.log(this.form.value);
    this.checkoutService.setMethod(this.form.value).subscribe(res => {
      if (res['status'] === 'NOTOK') {
        this.snackbar.open(res['error_msg'], '×',
              { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
        return;
      }
      this.gotoNextStep();
    });
  }

  methodChange(event) {
    console.log(event);
    this.currentMethod = event.value;
  }

}
