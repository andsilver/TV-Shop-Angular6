import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Observable, of as observableOf, combineLatest } from 'rxjs';

import { AppService } from 'app/app.service';
import { State } from 'app/store';
import { TreeMenuNode } from './tree-menu-node.model';
import { TreeMenuFlatNode } from './tree-menu-flat-node.model';
import { SidenavMenuService } from './sidenav-menu.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [SidenavMenuService],
  encapsulation: ViewEncapsulation.None
})

export class SidenavMenuComponent implements OnInit, OnDestroy {

  brands = [];
  filtersList: any = [];
  subscriptions = [];

  treeControl: FlatTreeControl<TreeMenuFlatNode>;
  treeFlattener: MatTreeFlattener<TreeMenuNode, TreeMenuFlatNode>;
  dataSource: MatTreeFlatDataSource<TreeMenuNode, TreeMenuFlatNode>;

  private getLevel = (node: TreeMenuFlatNode) => node.level;
  private isExpandable = (node: TreeMenuFlatNode) => node.expandable;
  private getChildren = (node: TreeMenuNode): Observable<TreeMenuNode[]> => observableOf(node.children);
  hasChild = (_: number, nodeData: TreeMenuFlatNode) => nodeData.expandable;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private store: Store<State>,
              private sidenavService: SidenavMenuService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TreeMenuFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.sidenavService.dataChange.subscribe(data => this.dataSource.data = data);
  }

  transformer = (node: TreeMenuNode, level: number) => {
    return new TreeMenuFlatNode(node.children && node.children.length > 0, node.name, level, node.link);
  }

  ngOnInit() {
    const combined = combineLatest(this.store.select(store => store.brands), this.store.select(store => store.categories));

    this.subscriptions = [
      combined.subscribe(([brandData, categoryData]) => {
        const menuItems = this.sidenavService.getMainItems(this.locale);
        console.log(categoryData.categories);
        menuItems[0].children = categoryData.categories;
        menuItems[2].children = brandData.manufacturer;
        this.sidenavService.buildTreeMenu(menuItems);
      })
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
