import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements DoCheck {
  @Input() ratingsCount: number;
  @Input() ratingsValue: number;
  @Input() direction: string;
  @Input() review = null;
  avg: number;
  stars: Array<any>;
  constructor() { }

  ngDoCheck() {
    if (this.ratingsCount && this.ratingsValue && !this.avg) {
      this.calculateAvgValue();
    }
  }

  rate(value) {
    // value = (value + 1)*20;
    // this.ratingsCount++;
    // this.ratingsValue = this.ratingsValue + value;
    // this.calculateAvgValue();
  }

  calculateAvgValue() {
    const fullStar = ['fas', 'star'];
    const halfStar = ['fas', 'star-half-alt'];
    const emptyStar = ['far', 'star'];
    this.avg = this.ratingsValue;
    switch (true) {
      case this.avg > 0 && this.avg < 20 : {
          this.stars = [halfStar, emptyStar, emptyStar, emptyStar, emptyStar];
          break;
      }
      case this.avg === 20 : {
          this.stars = [fullStar, emptyStar, emptyStar, emptyStar, emptyStar];
          break;
      }
      case this.avg > 20 && this.avg < 40 : {
          this.stars = [fullStar, halfStar, emptyStar, emptyStar, emptyStar];
          break;
      }
      case this.avg === 40 : {
        this.stars = [fullStar, fullStar, emptyStar, emptyStar, emptyStar];
          break;
      }
      case this.avg > 40 && this.avg < 60 : {
          this.stars = [fullStar, fullStar, halfStar, emptyStar, emptyStar];
          break;
      }
      case this.avg === 60 : {
          this.stars = [fullStar, fullStar, fullStar, emptyStar, emptyStar];
          break;
      }
      case this.avg > 60 && this.avg < 80 : {
          this.stars = [fullStar, fullStar, fullStar, halfStar, emptyStar];
          break;
      }
      case this.avg === 80 : {
          this.stars = [fullStar, fullStar, fullStar, fullStar, emptyStar];
          break;
      }
      case this.avg > 80 && this.avg < 100 : {
          this.stars = [fullStar, fullStar, fullStar, fullStar, halfStar];
          break;
      }
      case this.avg >= 100 : {
          this.stars = [fullStar, fullStar, fullStar, fullStar, fullStar];
          break;
      }
      default: {
          this.stars = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar];
          break;
      }
    }
  }

}
