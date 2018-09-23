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

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit() {

    this.categories = this.allCategories.filter( c => c.parentId === 0 );

    this.subscriptions = [
      this.store.select(state => state.category).subscribe( data => {
        this.selectedCategoryId = data.category ? data.category.id : 0;
      })
    ];
  }

  triggerSubCategoryMenu(category, event) {
    if (!category.hasSubCategory) {
      return;
    }
    const ele = event.target.getBoundingClientRect();
    this.parentCategoryId = category.id;
    const sub = document.getElementById('subCategories');
    sub.style.position = 'absolute';
    event.target.appendChild(sub);
    sub.style.display = 'block';
  }

  hideSubCategoryMenu(event, openBottom: boolean = true) {
    const ele = event.target.getBoundingClientRect();
    const x = event.clientX, y = event.clientY;
    if ( openBottom && x >= ele.left && x <= ele.right && y >= ele.bottom) {
      return;
    }
    this.parentCategoryId = 0;
    const sub = document.getElementById('subCategories');
    sub.style.display = 'none';
  }

  public onChangeCategory(event) {
    console.log(event.permalink);
    this.parentCategoryId = 0;
    const sub = document.getElementById('subCategories');
    sub.style.display = 'none';
    this.router.navigate([event.permalink]);
  }

}
