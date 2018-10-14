import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit, OnDestroy {

  brands = [];

  filtersList: any = [];

  subscriptions = [];

  showMore = {
    show_more: {
      text: 'Toon meer',
      icon: 'caret-down',
      count: 10
    },
    show_less: {
      text: 'Toon minder',
      icon: 'caret-up',
      count: 9999
    }
  };

  brandShow = 'show_more';

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.getFiltersList().subscribe(res => {
      this.filtersList = res;
      console.log(res);
    });
    this.appService.getBrands(100).subscribe(res => this.brands = res.manufacturer);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigate(event) {
    console.log(event);
    const ele = event.target;
    const permalink = ele.getAttribute('data-routerlink');
    if (permalink) {
      this.router.navigate([permalink]);
    }
  }

}
