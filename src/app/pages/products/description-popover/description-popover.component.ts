import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
