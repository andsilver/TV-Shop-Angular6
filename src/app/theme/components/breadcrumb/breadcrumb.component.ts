import { Component } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { Settings, AppSettings } from '../../../app.settings';
import { SidenavMenuService } from '../../../theme/components/sidenav-menu/sidenav-menu.service';
import { AppService } from 'app/app.service';
import { Store } from '@ngrx/store';
import { State } from 'app/store';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  providers: [ SidenavMenuService ]
})
export class BreadcrumbComponent {

    public pageTitle: string;
    public breadcrumbs: {
        name: string;
        url: string
    }[] = [];
    public categories;

    public settings: Settings;
    constructor(public appSettings: AppSettings,
                public router: Router,
                public activatedRoute: ActivatedRoute,
                public title: Title,
                public sidenavMenuService: SidenavMenuService,
                public store: Store<State>,
                public appService: AppService) {
            this.settings = this.appSettings.settings;
            this.store.select(state => state.categories)
                .pipe(
                    switchMap( res => {
                        this.categories = res.categories;
                        return this.router.events;
                    })
                )
                .subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        this.breadcrumbs = [];
                        this.parseRoute(this.router.routerState.snapshot.root);
                        this.pageTitle = '';
                        this.breadcrumbs.forEach(breadcrumb => {
                            this.pageTitle += ' > ' + breadcrumb.name;
                        });
                        this.title.setTitle(this.settings.name + this.pageTitle);
                    }
                });
    }

    private parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data['breadcrumb']) {
            if (node.url.length) {
                let urlSegments: UrlSegment[] = [];
                node.pathFromRoot.forEach(routerState => {
                    urlSegments = urlSegments.concat(routerState.url);
                });
                const url = urlSegments.map(urlSegment => {
                    return urlSegment.path;
                }).join('/');

                if (node.params.name) {
                    if (node.params.id) {
                        this.appService.getProductById(node.params.id)
                            .subscribe(p => {
                                const category = this.categories.find(c => c.id === p.categoryId);
                                urlSegments.pop();
                                urlSegments.pop();
                                this.breadcrumbs.push({
                                    name: category.name,
                                    url: '/products/' + category.name.toLowerCase()
                                });
                                this.breadcrumbs.push({
                                    name: node.params.name,
                                    url: '/' + url
                                });
                            });
                    }
                } else {
                    this.breadcrumbs.push({
                        name: node.data['breadcrumb'],
                        url: '/' + url
                    });
                }
            }
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

    public closeSubMenus() {
        if (window.innerWidth < 960) {
            this.sidenavMenuService.closeAllSubMenus();
        }
    }

}
