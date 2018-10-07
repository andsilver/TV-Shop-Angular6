import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';
import * as data from '../countries.json';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component extends CheckoutStep implements OnInit {

  form: FormGroup;
  businessForm: FormGroup;
  addressForm: FormGroup;

  countries = [];

  submitted: any;

  constructor(
    private formBuilder: FormBuilder,
    checkoutService: CheckoutService,
    router: Router,
    route: ActivatedRoute) {
      super(checkoutService, router, route);
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      customer_type: ['private', Validators.required],
      customer_gender: ['mrs', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      street_address: ['', Validators.required],
      house_number: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      telephone: ['', Validators.required],
      email_address: ['', Validators.required],
      delivery_address: [false, Validators.required]
    });

    this.businessForm = this.formBuilder.group({
      company_name: '',
      tax_id: ''
    });

    this.addressForm = this.formBuilder.group({
      delivery_street_address: ['', Validators.required],
      delivery_house_number: ['', Validators.required],
      delivery_postcode: ['', Validators.required],
      delivery_city: ['', Validators.required],
      delivery_country: ['', Validators.required]
    });

    this.countries = data['countries'];
  }

  get fc() { return this.form.controls; }
  get afc() { return this.addressForm.controls; }

  submit() {

    this.submitted = true;

    if ( this.form.invalid ) {
      return;
    } else if (this.form.value.customer_type === 'for_business' && this.businessForm.invalid) {
      return;
    } else if (this.form.value.delivery_address && this.addressForm.invalid) {
      return;
    }

    const body = Object.assign({}, this.form.value, this.businessForm.value, this.addressForm.value);
    console.log(body);

    this.checkoutService.checkoutCustomer(body).subscribe(r => {
      console.log(r);
      this.gotoNextStep();
    });
  }
}
