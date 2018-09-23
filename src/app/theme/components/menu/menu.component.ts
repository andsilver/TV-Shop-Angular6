import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Category } from 'app/app.models';

import { Store } from '@ngrx/store';
import { State } from 'app/store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  allCategories: Category[];

  categories: Category[];
  parentCategoryId = 0;
  selectedCategoryId = 0;

  subscriptions: Subscription[] = [];

  displaySubCategories = false;

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit() {

    this.categories = this.allCategories.filter( c => c.parentId === 0 );

    this.subscriptions = [
      this.store.select(state => state.category).subscribe( data => {
        this.selectedCategoryId = data.category ? data.category.id : 0;
        console.log(this.selectedCategoryId);
      })
    ];
  }

  triggerSubCategoryMenu(category, event) {
    if (!category.hasSubCategory) {
      return;
    }
    this.parentCategoryId = category.id;
    const sub = document.getElementById('subCategories');
    event.target.appendChild(sub);
    this.displaySubCategories = true;
  }

  hideSubCategoryMenu(event, openBottom: boolean = true) {
    const ele = event.target.getBoundingClientRect();
    const x = event.clientX, y = event.clientY;
    if ( openBottom && x >= ele.left && x <= ele.right && y >= ele.bottom) {
      return;
    }
    this.displaySubCategories = false;
  }

  public onChangeCategory(event) {
    this.displaySubCategories = false;
    this.router.navigate([event.permalink]);
  }

}
