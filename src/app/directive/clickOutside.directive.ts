import { Directive, ElementRef, Input, AfterViewInit, OnInit, EventEmitter, Renderer2, Output, HostListener} from '@angular/core';

@Directive({
    selector: '[appClickOutsideDirective]'
})
export class ClickOutsideDirective implements OnInit, AfterViewInit {
    @Output()
    public clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef, private renderer: Renderer2) {

    }
 
    ngOnInit() {  }

    ngAfterViewInit() {

    }

    @HostListener('document:click', ['$event']) clickedOutside($event) {
        // here you can hide your menu
        // this.renderer.addClass(this._elementRef.nativeElement, 'hide'); 
      }
}
