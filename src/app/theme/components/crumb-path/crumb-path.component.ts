import { Component, OnInit,  OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'app/store';

import { AppSettings } from '../../../app.settings';
import { Title } from '@angular/platform-browser';
import { SidenavMenuService } from '../../../theme/components/sidenav-menu/sidenav-menu.service';

import { Category } from 'app/app.models';

@Component({
  selector: 'app-crumb-path',
  templateUrl: './crumb-path.component.html',
  styleUrls: ['./crumb-path.component.scss']
})
export class CrumbPathComponent implements OnInit, OnDestroy {

  @Input()
  categories: Category[];

  breadcrumbs = [];
  subscription: Subscription;

  constructor(
    private store: Store<State>,
    public title: Title,
    public sidenavMenuService: SidenavMenuService,
    public appSettings: AppSettings,
    public router: Router
  ) {}

  ngOnInit() {
    this.subscription =
      this.store.select(state => state.crumbPath).subscribe(data => {
        const paths = data.crumbPath ? data.crumbPath : [];
        if (paths.length) {
          this.title.setTitle(paths[paths.length - 1].name);
        } else {
          this.title.setTitle(this.appSettings.settings.name);
        }
        this.breadcrumbs = paths.map(path => {
          const s = this.categories.find( c => c.id === path.id );
          return {
            name: path.name,
            url: s ? s.permalink : ''
          };
        });
        console.log(this.breadcrumbs);
      });
  }

  ngOnDestroy() {
    this.title.setTitle(this.appSettings.settings.name);
    this.subscription.unsubscribe();
  }

  public closeSubMenus() {
    if (window.innerWidth < 960) {
        this.sidenavMenuService.closeAllSubMenus();
    }
  }

}
