import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscriptions = [
      this.appService.getFiltersList().subscribe(res => this.filtersList = res),
      this.appService.getBrands(20).subscribe(res => this.brands = res.manufacturer)
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigate(event) {
    console.log(event);
  }

}
