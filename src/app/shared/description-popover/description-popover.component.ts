import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-description-popover',
  templateUrl: './description-popover.component.html',
  styleUrls: ['./description-popover.component.scss']
})
export class DescriptionPopoverComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  permalink: string;

  constructor(private appService: AppService) { }

  ngOnInit() {
    if (this.permalink) {
      this.appService.getExtraInfoContent(this.permalink).subscribe((res) => {
        this.title = res[0]['title'];
        this.content = res[0]['content'];
      });
    }
  }

}
