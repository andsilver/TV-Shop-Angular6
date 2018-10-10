import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'app/app.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';
import * as mock from './mock.json';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  @ViewChild('customer_service')
  customerServiceElement: ElementRef;

  subscriptions = [];
  stores = [];
  customerServices = [];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private store: Store<State>) { }

  ngOnInit() {
    this.subscriptions = [
      this.appService.getStores().subscribe(res => {
        console.log(res);
        this.stores = res;
        setTimeout(() => imgix.init(), 1);
      }),
      this.route.url.subscribe((paths: UrlSegment[]) => {
        if (paths.length > 1) {
          setTimeout(() => this.scrollToElement(this.customerServiceElement.nativeElement), 500);
          this.store.dispatch(new CrumbActions.SaveCrumbPath([
            {
              name: 'Advies & Contact',
              permalink: `/extrainfo/advies-contact/klantenservice`,
              static: true,
              default_title: true
            }
          ]));
        } else {
          this.store.dispatch(new CrumbActions.SaveCrumbPath([
            {
              name: 'Advies & Contact',
              permalink: `/extrainfo/advies-contact`,
              static: true,
              default_title: true
            }
          ]));
        }
      })
    ];

    this.customerServices = mock['data']['customer_services'];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

}
