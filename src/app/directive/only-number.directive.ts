

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appOnlyNumber]'
})
export class AppOnlyNumbersDirective {

    @Input() appOnlyNumber: string;

    constructor(private el: ElementRef) {

    }

    @HostListener('keypress', ['$event']) onKeyDown(event) {
        const e = <KeyboardEvent>event;
        if (this.appOnlyNumber) {
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode === 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+V
                (e.keyCode === 86 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            const keyCode = (typeof event.which === 'number') ? event.which : event.keyCode, ch = String.fromCharCode(keyCode);
            const regEx = new RegExp(this.appOnlyNumber);

            if (regEx.test(ch)) {
                return;
            } else {
                e.preventDefault();
            }
        }
    }
}
