import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CategoriesActions from 'app/store/actions/categories.action';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit, OnDestroy {

  brands = [];

  categories = [];

  filtersList: any = [];

  subscriptions = [];

  constructor(private appService: AppService, private store: Store<State>, private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.store.dispatch(new CategoriesActions.SuccessGetCategories([])), 5000);

      this.store.select(store => store.categories).subscribe(res => console.log('categories'));
      this.appService.getFiltersList().subscribe(res => {
        this.filtersList = res;
        this.filtersList.forEach(f => {
          // f.content = f.content.replace(/href="#"/g, '');
        });
      });
      this.appService.getBrands(20).subscribe(res => this.brands = res.manufacturer);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigate(event) {
    console.log(event);
    const ele = event.target;
    const catId = ele.getAttribute('data-catid');
    console.log(ele, catId);
    const category = this.categories.find(c => c.id === catId);
    if (category) {
      this.router.navigate([category.permalink]);
    }
  }

}
