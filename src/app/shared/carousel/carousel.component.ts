import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  public slides: Slide[];
  public activeSlide: Slide;
  constructor() { }

  ngOnInit() {
    this.slides = this.getSlides();
  }

  public getSlides(): Slide[] {
    const tempSlides: Slide[] = [];
    tempSlides.push(new Slide('./assets/images/1.jpg', 'Header 1', 'Text 1', true));
    tempSlides.push(new Slide('./assets/images/2.jpg', 'Header 2', 'Text 2', false));
    tempSlides.push(new Slide('./assets/images/3.jpg', 'Header 3', 'Text 3', false));
    tempSlides.push(new Slide('./assets/images/4.jpg', 'Header 4', 'Text 4', false));
    tempSlides.push(new Slide('./assets/images/5.jpg', 'Header 5', 'Text 5', false));
    return tempSlides;
  }

  public selectSlide(slide: Slide) {
    this.activeSlide = slide;
  }

  public prev() {
  }
  public next() {

  }
  public ngOnDestroy() {
  }



}

export enum Direction {UNKNOWN, NEXT, PREV }

export class Slide {
  imagePath: string;
  imageHeader: string;
  imageText: string;
  isActive: boolean;

  constructor(
    imagePath: string,
    imageHeader: string,
    imageText: string,
    isActive: boolean) {

      this.imagePath = imagePath;
      this.imageHeader = imageHeader;
      this.imageText = imageText;
      this.isActive = isActive;
  }
}
