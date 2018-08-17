import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

}
