import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';

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
      customer_gender: ['mr', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      street_address: ['', Validators.required],
      house_number: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['NL', Validators.required],
      telephone: ['', Validators.required],
      email_address: ['', Validators.required],
      delivery_address: [ false, Validators.required]
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
      delivery_country: ['NL', Validators.required]
    });

    this.countries = [
        {name: 'Netherlands', code: 'NL'},
        {name: 'Belgium', code: 'BE'}
    ];

    if (localStorage.getItem('customer_id')) {
      this.checkoutService.getCheckoutCustomer().subscribe(res => {
        console.log(res);
        if ( !res['customers_info'] ) {
          return;
        }
        this.form.setValue({
          customer_type: res['customers_info'].customer_type,
          customer_gender: res['customers_info'].customer_gender,
          first_name: res['customers_info'].billing_first_name,
          last_name: res['customers_info'].billing_last_name,
          street_address: res['customers_info'].billing_street_address,
          house_number: res['customers_info'].billing_house_number,
          postcode: res['customers_info'].billing_postcode,
          city: res['customers_info'].billing_city,
          country: res['customers_info'].billing_country,
          telephone: res['customers_info'].billing_telephone,
          email_address: res['customers_info'].billing_email_address,
          delivery_address: res['customers_info'].delivery_address ? true : false
        });

        this.businessForm.setValue({
          company_name: res['customers_info'].company_name,
          tax_id: res['customers_info'].company_tax_id
        });

        this.addressForm.setValue({
          delivery_street_address: res['customers_info'].delivery_street_address,
          delivery_house_number: res['customers_info'].delivery_house_number,
          delivery_postcode: res['customers_info'].delivery_postcode,
          delivery_city: res['customers_info'].delivery_city,
          delivery_country: res['customers_info'].delivery_country
        });
      });
    }
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

    body.delivery_address = body.delivery_address ? 1 : 0;

    this.checkoutService.setCheckoutCustomer(body).subscribe(r => {
      console.log(r);
      localStorage.setItem('customer_id', r['customer_id']);
      this.gotoNextStep();
    });
  }
}
