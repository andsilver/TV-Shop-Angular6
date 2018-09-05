import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'app/store';

import { Settings, AppSettings } from '../../../app.settings';
import { Title } from '@angular/platform-browser';
import { SidenavMenuService } from '../../../theme/components/sidenav-menu/sidenav-menu.service';

@Component({
  selector: 'app-crumb-path',
  templateUrl: './crumb-path.component.html',
  styleUrls: ['./crumb-path.component.scss']
})
export class CrumbPathComponent implements OnInit {

  breadcrumbs = [];
  subscription: Subscription;

  constructor(
    private store: Store<State>,
    public router: Router,
    public title: Title,
    public sidenavMenuService: SidenavMenuService,
    public appSettings: AppSettings
  ) {}

  ngOnInit() {
    this.subscription =
      this.store.select(state => state.crumbPath).subscribe(data => {
        const paths = data.crumbPath ? data.crumbPath : [];
        if (paths.length) {
          this.title.setTitle(paths[paths.length - 1].name);
        }
        let url = '';
        this.breadcrumbs = paths.map(path => {
          url += '/' + path.name.toLowerCase().replace(/ |\'|\(|\)|\/|\+/g, '-');
          return {
            name: path.name,
            url: url
          };
        });
        console.log(this.breadcrumbs);
      });
  }

  public closeSubMenus() {
    if (window.innerWidth < 960) {
        this.sidenavMenuService.closeAllSubMenus();
    }
  }

}
