import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CartActions from 'app/store/actions/cart.action';

declare var imgix: any;

@Component({
  selector: 'app-outdoor-opportunity-dialog',
  templateUrl: './outdoor-opportunity-dialog.component.html',
  styleUrls: ['./outdoor-opportunity-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OutdoorOpportunityDialogComponent implements OnInit, OnDestroy {

  subscription: any;
  widget: any;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OutdoorOpportunityDialogComponent>,
    private store: Store<State>,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.appService.getDemoUnitProduct(this.data.id).subscribe(res => {
      this.widget = res;
      setTimeout(() => imgix.init());
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(product) {
    this.appService.addToCartApi({item_id: product.unit_id}, true).subscribe(res => {
      localStorage.setItem('cart_id', res.cart_id);
      this.store.dispatch(new CartActions.SetCartId(res.cart_id));
      this.router.navigate(['/cart']);
      this.dialogRef.close();
    });
  }

  integer(str: string) {
    return str.split(',')[0] + ',';
  }

  float(str: string) {
    const v = str.split(',')[1];
    return Number(v) === 0 ? '-' : v;
  }
}
