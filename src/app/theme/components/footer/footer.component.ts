import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public lat = 51.779547;
  public lng = 5.129953;
  public zoom = 6;

  constructor() { }

  ngOnInit() { }

  subscribe() { }

}
