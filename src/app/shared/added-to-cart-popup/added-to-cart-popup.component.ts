import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'app/app.models';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-added-to-cart-popup',
  templateUrl: './added-to-cart-popup.component.html',
  styleUrls: ['./added-to-cart-popup.component.scss']
})
export class AddedToCartPopupComponent implements OnInit {
  // appService: AppService;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AddedToCartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product) {
    // console.log(this.appService)
  }

  ngOnInit() {

  }

  navigateToDetail() {
    this.router.navigate([this.product.permalink]);
    this.dialogRef.close({});
  }

  navigateToCartList() {
    this.router.navigate(['/cart']);
    this.dialogRef.close({ isAddTocart: true });
  }

}
