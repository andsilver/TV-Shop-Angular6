import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { Subscription } from 'rxjs/Subscription';

import { AppSettings } from '../../../app.settings';
import { SidenavMenuService } from '../../../theme/components/sidenav-menu/sidenav-menu.service';

library.add(faHome);

@Component({
  selector: 'app-crumb-path',
  templateUrl: './crumb-path.component.html',
  styleUrls: ['./crumb-path.component.scss']
})
export class CrumbPathComponent implements OnInit, OnDestroy {

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

        if (paths.length && !paths[paths.length - 1].default_title) {
          this.title.setTitle(paths[paths.length - 1].name);
        } else {
          this.title.setTitle(this.appSettings.settings.name);
        }

        this.breadcrumbs = paths.map(path => {
          return {
            name: path.name,
            url: path.permalink
          };
        });

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
