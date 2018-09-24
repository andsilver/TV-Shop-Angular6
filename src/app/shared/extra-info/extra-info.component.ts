import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

library.add(faShoppingCart, faEnvelope, faComment, faPhone, faWhatsapp);

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
