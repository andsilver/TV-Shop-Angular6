import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { TreeFilterNode } from './tree-filter-node.model';

@Injectable()
export class TreeFiltersService {
    dataChange = new BehaviorSubject<TreeFilterNode[]>([]);

    constructor() {
        const obj = [
            { id: null, children: [{
                id: 1, parentId: 0, name: 'Test'
            }], name: 'Category' },
            { id: null, children: [], name: 'Conditions' }
        ];

        const data = this.buildTree(obj, 0);

        this.dataChange.next(data);
    }

    get data(): TreeFilterNode[] {
        return this.dataChange.value;
    }

    buildTree(arr: any[], level: number): TreeFilterNode[] {
        return arr.reduce<TreeFilterNode[]>((accumulator, filter) => {
            const node = new TreeFilterNode();
            node.id = filter.id;
            node.name = filter.name;

            if (filter.children && filter.children.length) {
                node.children = this.buildTree(filter.children, level + 1);
            }

            return accumulator.concat(node);
            }, []);
    }

}
