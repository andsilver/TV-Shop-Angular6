import { Component, OnInit} from '@angular/core';
import { AppService } from 'app/app.service';
import { Category } from 'app/app.models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: Category[];
  allCategories: Category[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getCategories().subscribe( categories => {
      this.allCategories = categories;
      this.categories = categories.filter( c => c.parentId === 0 );
    });
  }

  openMegaMenu() {
    const pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if (el.children.length > 0) {
          if (el.children[0].classList.contains('mega-menu')) {
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }

  triggerSubCategoryMenu(category) {
    console.log(category);
  }

}
