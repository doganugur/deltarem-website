import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  private slides: any[];

  constructor() { }

  ngOnInit() {
    this.slides = this.getSlides();
  }

  public getSlides() {
      return [ { imagePath: './assets/images/1.jpg', imageHeader: 'Header 1', imageText: 'Text 1'},
      { imagePath: './assets/images/2.jpg', imageHeader: 'Header 2', imageText: 'Text 2'},
      { imagePath: './assets/images/3.jpg', imageHeader: 'Header 3', imageText: 'Text 3'},
      { imagePath: './assets/images/4.jpg', imageHeader: 'Header 4', imageText: 'Text 4'},
      { imagePath: './assets/images/5.jpg', imageHeader: 'Header 5', imageText: 'Text 5'}
      ];
  }
  public ngOnDestroy() {
  }



}

export enum Direction {UNKNOWN, NEXT, PREV }
