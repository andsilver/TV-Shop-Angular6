import { Component, Input, DoCheck, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnChanges {

  @Input() categories;
  @Input() categoryParentId;
  @Input() selectedCategory;
  @Output() change: EventEmitter<any> = new EventEmitter();
  mainCategories;

  constructor() { }

  public ngOnChanges() {
    // console.log(this.categoryParentId);
    if (this.categories) {
      this.mainCategories = this.categories.filter(category => category.parentId === this.categoryParentId);
      console.log(this.mainCategories);
    }
  }

  public stopClickPropagate(event: any) {
    if (window.innerWidth < 960) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public changeCategory(event) {
    this.change.emit(event);
  }

}
