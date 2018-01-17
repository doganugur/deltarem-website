import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  public noWrap: boolean;
  public noPause: boolean;
  public noTransition: boolean;
  private slides: any[];
  private currentInterval: any;
  private isPlaying: boolean;
  private destroyed = false;
  private currentSlideIndex: number;
  private _interval: number;
  private NextPhotoInterval = 5000;
  private noLoopSlides = true;
  constructor() { }

  ngOnInit() {
  }

  public ngOnDestroy() {
      this.destroyed = true;
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

      // every time you change slides, reset the timer
      this.restartTimer();
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
          this.pause();
          return;
      }

      return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  private prev() {
    const newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

      if (this.noWrap && newIndex === this.slides.length - 1) {
          this.pause();
          return;
      }

      return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  private restartTimer() {
      this.resetTimer();
      const interval = +this.interval;
      if (!isNaN(interval) && interval > 0) {
          this.currentInterval = setInterval(() => {
              let nInterval = +this.interval;
              if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
                  this.next();
              } else {
                  this.pause();
              }
          }, interval);
      }
  }

  private resetTimer() {
      if (this.currentInterval) {
          clearInterval(this.currentInterval);
          this.currentInterval = null;
      }
  }

  public play() {
      if (!this.isPlaying) {
          this.isPlaying = true;
          this.restartTimer();
      }
  }

  public pause() {
      if (!this.noPause) {
          this.isPlaying = false;
          this.resetTimer();
      }
  }

  public addSlide(slide:Slide) {
      slide.index = this.slides.length;
      this.slides.push(slide);
      if (this.slides.length === 1 || slide.active) {
          this.select(this.slides[this.slides.length - 1]);
          if (this.slides.length === 1) {
              this.play();
          }
      } else {
          slide.active = false;
      }
  }

  public removeSlide(slide:Slide) {
      this.slides.splice(slide.index, 1);

      if (this.slides.length === 0) {
          this.currentSlide = null;
          return;
      }

      for (let i = 0; i < this.slides.length; i++) {
          this.slides[i].index = i;
      }
  }
}

export enum Direction {UNKNOWN, NEXT, PREV}