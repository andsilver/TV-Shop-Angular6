import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';
import { AppService } from 'app/app.service';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnDestroy {

  widgets: any;
  subscription: any;

  constructor(
    private router: Router,
    private appService: AppService,
    private store: Store<State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.subscription =
      this.route.url
        .pipe(
          switchMap(() => this.appService.getExtraInfoContent(this.router.url))
        )
        .subscribe(res => {
          console.log(res);
          this.widgets = res;
          this.store.dispatch(new CrumbActions.SaveCrumbPath([
            {
              name: this.widgets[0].title,
              permalink: '',
              static: true,
              default_title: true
            }
          ]));
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigate(event) {
    console.log(event);
    const link = event.srcElement.parentElement.getAttribute('data-routerlink');
    if (link) {
      this.router.navigate([link]);
    }
  }

}
