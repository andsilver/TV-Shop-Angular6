import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppService } from 'app/app.service';
import { State } from 'app/store';
import { TreeFilterNode } from './tree-filter-node.model';
import { TreeFilterFlatNode } from './tree-filter-flat-node.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { TreeFiltersService } from './tree-filters.service';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-sidenav-filters-list',
  templateUrl: './sidenav-filters-list.component.html',
  styleUrls: ['./sidenav-filters-list.component.scss'],
  providers: [TreeFiltersService],
  encapsulation: ViewEncapsulation.None
})

export class SideNavFiltersListComponent implements OnInit, OnDestroy {

  brands = [];
  filtersList: any = [];
  subscriptions = [];

  treeControl: FlatTreeControl<TreeFilterFlatNode>;
  treeFlattener: MatTreeFlattener<TreeFilterNode, TreeFilterFlatNode>;
  dataSource: MatTreeFlatDataSource<TreeFilterNode, TreeFilterFlatNode>;

  constructor(private appService: AppService,
              private router: Router,
              public store: Store<State>,
              public treeService: TreeFiltersService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<TreeFilterFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    treeService.dataChange.subscribe(data => this.dataSource.data = data);
  }

  transformer = (node: TreeFilterNode, level: number) => {
    return new TreeFilterFlatNode(node.children && node.children.length > 0, node.name, level);
  }

  private _getLevel = (node: TreeFilterFlatNode) => node.level;

  private _isExpandable = (node: TreeFilterFlatNode) => node.expandable;

  private _getChildren = (node: TreeFilterNode): Observable<TreeFilterNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: TreeFilterFlatNode) => _nodeData.expandable;

  ngOnInit() {
    this.subscriptions = [
      this.store.select(store => store.brands).subscribe(data => this.brands = data.manufacturer),
      this.store.select(store => store.categories).subscribe(data => console.log(data))
    ];

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
