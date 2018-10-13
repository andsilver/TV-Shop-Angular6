import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  likeReviewItem(id) {
    return this.http.get(`/review?review_id=${id}&set_like=1`);
  }
}
