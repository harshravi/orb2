import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appCarousel]'
})
export class AppCarouselDirective implements AfterViewInit {

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {

    }
}
