import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  getTopBanner() {
    return this.http.get('/rotating-banner?type=homepage');
  }

  getMiddleBanner() {
    return this.http.get('/cms?cms_type=home');
  }

  getMostPopular() {
    return this.http.get('/products/listing?mode=most-popular');
  }
}
