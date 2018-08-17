import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() ratingsCount:number;
  @Input() ratingsValue:number;
  @Input() direction:string;
  avg:number;
  stars:Array<string>;
  constructor() { }

  ngDoCheck() {
    if(this.ratingsCount && this.ratingsValue && !this.avg) {
      this.calculateAvgValue();      
    }
  }

  rate(value){
    // value = (value + 1)*20;
    // this.ratingsCount++;
    // this.ratingsValue = this.ratingsValue + value;
    // this.calculateAvgValue();
  }

  calculateAvgValue(){
    this.avg = this.ratingsValue / this.ratingsCount;
    switch (true) {
      case this.avg > 0 && this.avg < 20 : {
          this.stars = ['star_half', 'star_border', 'star_border', 'star_border', 'star_border'];
          break;
      }      
      case this.avg == 20 : {
          this.stars = ['star', 'star_border', 'star_border', 'star_border', 'star_border'];
          break;
      }      
      case this.avg > 20 && this.avg < 40 : {
          this.stars = ['star', 'star_half', 'star_border', 'star_border', 'star_border'];
          break;
      }      
      case this.avg == 40 : {
        this.stars = ['star', 'star', 'star_border', 'star_border', 'star_border'];
          break;
      } 
      case this.avg > 40 && this.avg < 60 : {
          this.stars = ['star', 'star', 'star_half', 'star_border', 'star_border'];
          break;
      }
      case this.avg == 60 : {
          this.stars = ['star', 'star', 'star', 'star_border', 'star_border'];
          break;
      }
      case this.avg > 60 && this.avg < 80 : {
          this.stars = ['star', 'star', 'star', 'star_half', 'star_border'];
          break;
      }
      case this.avg == 80 : {
          this.stars = ['star', 'star', 'star', 'star', 'star_border'];
          break;
      } 
      case this.avg > 80 && this.avg < 100 : {
          this.stars = ['star', 'star', 'star', 'star', 'star_half'];
          break;
      } 
      case this.avg >= 100 : {
          this.stars = ['star', 'star', 'star', 'star', 'star'];
          break;
      }   
      default: {
          this.stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
          break;
      }
    }
  }

}
