import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';
import * as data from '../countries.json';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  form: FormGroup;
  countries = [];

  constructor(private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      customer_type: ['private', Validators.required],
      company_name: '',
      tax_id: '',
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
      delivery_address: [false, Validators.required],
      delivery_street_address: ['', Validators.required],
      delivery_house_number: ['', Validators.required],
      delivery_postcode: ['', Validators.required],
      delivery_city: ['', Validators.required],
      delivery_country: ['', Validators.required]
    });

    this.countries = data['countries'];
  }

  formSubmit() {
    console.log(this.form.value);
  }

}
