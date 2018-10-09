import { Inject, Component, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var imgix: any;

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  exchangeForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ExchangeComponent>) { }

  ngOnInit() {
    this.exchangeForm = this.formBuilder.group({
      salutation: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required])],
      allow: [false],
      residence: [''],
      description: [''],
      purchase_items: [''],
      exchange_items: ['']
    });
    setTimeout(() => imgix.init(), 1);
  }

  formSubmit() {
    console.log(this.exchangeForm.value);
  }

}
