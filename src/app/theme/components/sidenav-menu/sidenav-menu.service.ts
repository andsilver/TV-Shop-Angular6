import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { TreeMenuNode } from './tree-menu-node.model';
import { mainMenuItems } from './sidenav-menu';

@Injectable()
export class SidenavMenuService {
    dataChange = new BehaviorSubject<TreeMenuNode[]>([]);

    constructor() {
    }

    get data(): TreeMenuNode[] {
        return this.dataChange.value;
    }

    getMainItems() {
        return mainMenuItems;
    }

    buildTreeMenu(items: any[]) {
        const data = this.buildTree(items, 0);
        this.dataChange.next(data);
    }

    buildTree(arr: any[], level: number): TreeMenuNode[] {
        return arr.reduce<TreeMenuNode[]>((accumulator, item) => {
            const node = new TreeMenuNode();
            node.id = item.id;
            node.name = item.name;
            node.link = item.permalink;

            if (item.children && item.children.length) {
                node.children = this.buildTree(item.children, level + 1);
            }

            return accumulator.concat(node);
            }, []);
    }

}
