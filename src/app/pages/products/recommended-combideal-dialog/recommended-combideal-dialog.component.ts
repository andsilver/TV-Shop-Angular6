import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-combideal-dialog',
  templateUrl: './recommended-combideal-dialog.component.html',
  styleUrls: ['./recommended-combideal-dialog.component.scss']
})
export class RecommendedCombidealDialogComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<RecommendedCombidealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public combideal: any) {
  }

  ngOnInit() {
    console.log(this.combideal);
    setTimeout(() => imgix.init(), 1);
  }

  navigateToDetail(permalink) {
    this.router.navigate([permalink]);
    this.dialogRef.close();
  }

  navigateToCartList() {
    setTimeout(() => {
      this.router.navigate(['/cart']);
      this.dialogRef.close();
    }, 2000);
  }

  isNumber(price) {
    return Number(price) ? true : false;
  }

  integer(str: string) {
    return str.split(',')[0] + ',';
  }

  float(str: string) {
    const v = str.split(',')[1];
    return Number(v) === 0 ? '-' : v;
  }

}
