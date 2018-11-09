import { Component, OnInit, Input } from '@angular/core';

/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  @Input()
  lat: number;

  @Input()
  lng: number;

  constructor() { }

  ngOnInit() {}

}
