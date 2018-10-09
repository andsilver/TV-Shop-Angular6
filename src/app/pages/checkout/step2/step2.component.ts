import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutStep } from '../step';
import { CheckoutService } from '../checkout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var imgix: any;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component extends CheckoutStep implements OnInit {

  form: FormGroup;
  methodRadio: FormGroup;
  pickupLocationFormRadio: FormGroup;

  widget: any;
  arrived = false;

  currentMethod: string;
  altDeliver: false;

  constructor(
    checkoutService: CheckoutService,
    router: Router,
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar) {
    super(checkoutService, router, route);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.checkoutService.getMethodsWidget().subscribe(res => {

        console.log(res);
        this.widget = res;

        let shipping_selected = '-';
        let customers_delivery_time = '';
        let payment = '';
        let bank = '';
        let card = '';

        if (this.pickupMethod.input_selected) {

          this.currentMethod = this.pickupMethod.input_value;
          shipping_selected = '';
          const selectedLocation = this.pickupMethod.pickup_location.find(l => l.input_selected );
          shipping_selected = selectedLocation ? selectedLocation.input_value : shipping_selected;

        } else if ( this.deliverMethod.input_selected ) {

          this.currentMethod = this.deliverMethod.input_value;
          shipping_selected = this.deliverMethod.input_value;

          const selectedDeliveryTime = this.deliverMethod.available_delivery_dates.input_value.find(d => d.selected);
          customers_delivery_time = selectedDeliveryTime ? selectedDeliveryTime.value : '';

          const selectedPayment = this.deliverMethod.payments.find(p => p.input_selected);
          payment = selectedPayment ? selectedPayment.input_value : '';

          if ( selectedPayment.banks_list ) {
            const selectedBank = selectedPayment.banks_list.input_value.find(b => b.selected);
            bank = selectedBank ? selectedBank.value : '';
          }

          if ( selectedPayment.cards_list ) {
            const selectedCard = selectedPayment.cards_list.input_value.find(b => b.selected);
            card = selectedCard ? selectedCard.value : '';
          }
        }

        this.form = this.formBuilder.group({
          shipping_selected: shipping_selected,
          customers_delivery_time: customers_delivery_time,
          delivery_on_sunday: '0',
          alt_customers_delivery_time: '',
          afhalen_parent: '',
          payment: payment,
          issuer_bank: bank,
          creditcard_type: card,
          delivery_by_urgently: '0',
          have_delivery_time: '1'
        });
        this.arrived = true;
        setTimeout(() => imgix.init(), 1);
      })
    );
  }

  get pickupMethod() {
    return this.widget['methods'][0];
  }

  get deliverMethod() {
    return this.widget['methods'][1];
  }

  submit() {
    console.log(this.form.value);
    this.checkoutService.setMethod(this.form.value).subscribe(res => {
      if (res['status'] === 'NOTOK') {
        this.snackbar.open(res['error_msg'], '×',
              { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
        return;
      }
      this.gotoNextStep();
    });
  }

  methodChange(event) {
    console.log(event);
    this.currentMethod = event.value;
  }

}
