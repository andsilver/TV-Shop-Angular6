import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-accept',
  templateUrl: './payment-accept.component.html',
  styleUrls: ['./payment-accept.component.scss']
})
export class PaymentAcceptComponent implements OnInit {

  widgets = [];

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.paymentService.getPaymentContent('accepturl').subscribe(res => {
      console.log(res);
      this.widgets = res ? res : [];
    });
  }

}
