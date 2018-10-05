import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'app/app.service';

declare var imgix: any;

@Component({
  selector: 'app-outdoor-opportunity-dialog',
  templateUrl: './outdoor-opportunity-dialog.component.html',
  styleUrls: ['./outdoor-opportunity-dialog.component.scss']
})
export class OutdoorOpportunityDialogComponent implements OnInit, OnDestroy {

  subscription: any;
  widget: any;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OutdoorOpportunityDialogComponent>) { }

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
    this.appService.addToCartApi({item_id: product.unit_id}).subscribe(res => {
      localStorage.setItem('cart_id', res.cart_id);
      this.dialogRef.close();
    });
  }

}
