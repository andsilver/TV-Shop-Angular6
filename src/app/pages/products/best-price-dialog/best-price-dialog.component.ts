import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-best-price-dialog',
  templateUrl: './best-price-dialog.component.html',
  styleUrls: ['./best-price-dialog.component.scss']
})
export class BestPriceDialogComponent implements OnInit {

  requestForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BestPriceDialogComponent>) { }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      salutation: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required])],
      allow: [false],
      residence: [''],
      description: [''],
    });
    setTimeout(() => imgix.init(), 1);
  }

  formSubmit() {
    console.log(this.requestForm.value);
  }

}
