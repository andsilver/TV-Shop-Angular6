import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-cms-content-dialog',
  templateUrl: './cms-content-dialog.component.html',
  styleUrls: ['./cms-content-dialog.component.scss']
})
export class CmsContentDialogComponent implements OnInit {

  widget: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<CmsContentDialogComponent>,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getExtraInfoContent(this.data).subscribe(res => {
      this.widget = res[0];
      console.log(res);
    });
  }

}
