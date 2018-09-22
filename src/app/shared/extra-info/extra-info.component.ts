import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

declare var imgix: any;

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
    setTimeout(() => imgix.init(), 1);
  }

}
