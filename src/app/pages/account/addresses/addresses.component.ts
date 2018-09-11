import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AppService } from '../../../app.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  userInfo = {};
  userUpdated: Subscription;
  billingForm: FormGroup;
  shippingForm: FormGroup;
  countries = [];
  constructor(
    public appService: AppService,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private account: AccountService) { }

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.billingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'middleName': '',
      'company': '',
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'country': ['', Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required]
    });
    this.shippingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'middleName': '',
      'company': '',
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'country': ['', Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required]
    });
    this.userUpdated = this.account.userUpdated.subscribe( user => this.setValuesOnForms(user));
  }

  public onBillingFormSubmit(values: Object): void {
    if (this.billingForm.valid) {
      this.snackBar.open('Your billing address information updated successfully!', '×',
        { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onShippingFormSubmit(values: Object): void {
    if (this.shippingForm.valid) {
      this.snackBar.open('Your shipping address information updated successfully!', '×',
      { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public setValuesOnForms(user) {
    this.billingForm.setValue({
      'firstName': user.first_name,
      'lastName': user.last_name,
      'middleName': user.middle_name,
      'company': user.company,
      'email': user.email,
      'phone': user.telephone,
      'country': this.titleCaseWord(user.country),
      'city': user.city,
      'state': user.province,
      'zip': user.zip,
      'address': user.address
    });
  }

  public titleCaseWord(word: string) {
    if (!word) { return word; }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
