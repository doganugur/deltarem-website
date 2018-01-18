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


  public select(nextSlideIndex, direction: Direction = Direction.UNKNOWN) {
      const nextIndex = nextSlideIndex;
      if (direction === Direction.UNKNOWN) {
          direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
      }

      // Prevent this user-triggered transition from occurring if there is already one in progress
      if (nextSlideIndex !== this.currentSlideIndex) {
          this.goNext(nextSlideIndex, direction);
      }
  }

  private goNext(slideIndex: number, direction: Direction) {
      if (this.destroyed) {
          return;
      }

      this.currentSlideIndex = slideIndex;
  }

  private getSlideByIndex(index: number) {
      const len = this.slides.length;
      for (let i = 0; i < len; ++i) {
          if (this.slides[i].index === index) {
              return this.slides[i];
          }
      }
  }

  private getCurrentIndex() {
      return !this.currentSlideIndex ? 0 : this.currentSlideIndex;
  }

  private next() {
      const newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

      if (newIndex === 0 && this.noWrap) {
          return;
      }

      return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  private prev() {
    const newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

      if (this.noWrap && newIndex === this.slides.length - 1) {
          return;
      }

      return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }


}

export enum Direction {UNKNOWN, NEXT, PREV }
