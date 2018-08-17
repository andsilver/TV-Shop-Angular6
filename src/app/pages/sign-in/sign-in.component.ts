import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
