import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-match',
  templateUrl: './not-match.component.html',
  styleUrls: ['./not-match.component.scss']
})
export class NotMatchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['404']);
  }

}
