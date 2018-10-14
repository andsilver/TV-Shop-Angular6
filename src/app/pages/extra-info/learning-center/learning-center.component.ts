import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';
// import * as mock from './mock.json';

@Component({
  selector: 'app-learning-center',
  templateUrl: './learning-center.component.html',
  styleUrls: ['./learning-center.component.scss']
})
export class LearningCenterComponent implements OnInit {

  learningList = [];
  contacts = [];

  widgets: any;

  constructor(private store: Store<State>, private appService: AppService) { }

  ngOnInit() {
    this.store.dispatch(new CrumbActions.SaveCrumbPath([
      {
        name: 'Learning center',
        permalink: `/extrainfo/learning-center`,
        static: true,
        default_title: true
      }
    ]));

    // this.learningList = mock['data']['learning'];
    // this.contacts = mock['data']['contacts'];

    this.appService.getExtraInfoContent('/extrainfo/installatie-op-maat-learning-center').subscribe(res => {
      this.widgets = res;
    });
  }

}
