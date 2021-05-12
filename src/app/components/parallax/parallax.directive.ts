// https://github.com/cwadrupldijjit/ng2-parallax
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('ratio') parallaxRatio = 1;
  initialTop = 0;

  // tslint:disable-next-line:no-input-rename
  @Input('horizontal') parallaxHorizontal = true;
  initialLeft = 0;

  constructor(private eleRef: ElementRef) {
    this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top;
    this.initialLeft = this.eleRef.nativeElement.getBoundingClientRect().left;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any): void {
    if (this.parallaxHorizontal) {
      this.eleRef.nativeElement.style.backgroundPosition = (this.initialLeft - (window.scrollY * this.parallaxRatio)) + 'px';
    } else {
      this.eleRef.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px';
    }
  }

}
