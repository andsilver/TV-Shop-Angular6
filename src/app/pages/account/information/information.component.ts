import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { Subscription } from 'rxjs';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, OnDestroy {

  userInfo: any = {};
  userUpdated: Subscription;

  infoForm: FormGroup;
  passwordForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private account: AccountService) { }

  ngOnInit() {

    this.infoForm = this.formBuilder.group({
        'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'email': ['', Validators.compose([Validators.required, emailValidator])]});

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    }, {validator: matchingPasswords('newPassword', 'confirmNewPassword')});

    this.userUpdated = this.account.userUpdated.subscribe( user => this.setValuesOnForms( user ));
  }

  ngOnDestroy() {
    this.userUpdated.unsubscribe();
  }

  public onInfoFormSubmit(values: Object): void {
    if (this.infoForm.valid) {
      this.snackBar.open('Your account information updated successfully!',
      '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onPasswordFormSubmit(values: Object): void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  setValuesOnForms(user) {
    this.userInfo = user;
    this.infoForm.setValue({
      'firstName': this.userInfo.first_name,
      'lastName': this.userInfo.last_name,
      'email': this.userInfo.email
    });
  }
}
