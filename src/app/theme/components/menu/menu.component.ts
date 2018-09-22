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

  allCategories: Category[];
  categories: Category[];
  parentCategory: Category;
  selectedCategoryId = 0;

  subscriptions: Subscription[] = [];

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit() {
    this.subscriptions = [
      this.store.select(state => state.category).subscribe( data => {
        this.selectedCategoryId = data.category ? data.category.id : 0;
      }),
      this.store.select(state => state.categories).subscribe( data => {
        this.allCategories = data.categories;
        this.categories = this.allCategories.filter( c => c.parentId === 0 );
      })
    ];
  }

  // openMegaMenu() {
  //   const pane = document.getElementsByClassName('cdk-overlay-pane');
  //   [].forEach.call(pane, function (el) {
  //       if (el.children.length > 0) {
  //         if (el.children[0].classList.contains('mega-menu')) {
  //           el.classList.add('mega-menu-pane');
  //         }
  //       }
  //   });
  // }

  triggerSubCategoryMenu(category, event) {
    if (!category.hasSubCategory) {
      return;
    }
    const ele = event.target.getBoundingClientRect();
    this.parentCategory = category;
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
    this.parentCategory = null;
    const sub = document.getElementById('subCategories');
    sub.style.display = 'none';
  }

  public onChangeCategory(event) {
    this.parentCategory = null;
    const sub = document.getElementById('subCategories');
    sub.style.display = 'none';
    this.router.navigate([event.permalink]);
  }

}
