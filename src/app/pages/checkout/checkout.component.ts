import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AppService } from '../../app.service';
import * as data from './countries.json';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;

  steps = [
    {
      title: 'Uw Gegevens',
      index: 1
    },
    {
      title: 'Bezorg/Betaalmethode',
      index: 2
    },
    {
      title: 'Overzicht',
      index: 3
    },
    {
      title: 'Afgerond',
      index: 4
    }
  ];

  stepNow: any;

  constructor(public appService: AppService, public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.stepNow = this.steps[0];

    this.appService.Data.cartList.forEach(product => {
      this.grandTotal += product.newPrice;
    });
    this.countries = data['countries'];
    this.months = data['months'];
    this.years = data['years'];
    this.deliveryMethods = [
        { value: 'free', name: 'Gratis levering via PostNL', desc: '$0.00 / Vandaag besteld, morgen in huis' },
        { value: 'express', name: 'Spoedlevering via PostNL', desc: '$29.99 / Vandaag besteld, dezelfde dag bezorgd' }
    ];
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  public placeOrder() {
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;
  }

}
