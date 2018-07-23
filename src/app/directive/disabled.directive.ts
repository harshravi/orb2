import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appDisabled]'
})
export class AppDisabledDirective {

    _appDisabledValue: boolean;

    constructor(private el: ElementRef) {
    }

    @Input('appDisabled')
    set settoolipsterContent(value: boolean) {
        this._appDisabledValue = value;
        if (this._appDisabledValue) {
            this.el.nativeElement.setAttribute('disabled', this._appDisabledValue);
        } else {
            this.el.nativeElement.removeAttribute('disabled');
        }
    }
}
