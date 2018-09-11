import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-zoom',
  templateUrl: './product-zoom.component.html',
  styleUrls: ['./product-zoom.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductZoomComponent implements OnInit {

  public count = 10;
  public maxWidth = 60;

  @ViewChild('zoomImage') zoomImage;

  constructor(public dialogRef: MatDialogRef<ProductZoomComponent>,
              @Inject(MAT_DIALOG_DATA) public image: any) { }

  ngOnInit() { }

  public close(): void {
    this.dialogRef.close();
  }

  public zoomIn() {
    if (this.count < 60) {
      this.maxWidth = this.maxWidth + this.count;
      this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
      this.count = this.count + 10;
    }
  }

  public zoomOut() {
    if (this.count > 10) {
      this.count = this.count - 10;
      this.maxWidth = this.maxWidth - this.count;
      this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
    }
  }
}
