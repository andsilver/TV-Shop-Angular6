import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.scss']
})
export class PaymentCancelComponent implements OnInit {

  widgets = [];

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.paymentService.getPaymentContent('cancelurl').subscribe(res => {
      console.log(res);
      this.widgets = res;
    });
  }

}
