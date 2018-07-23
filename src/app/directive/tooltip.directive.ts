import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {

    _toolipsterContent = '';

    constructor(private el: ElementRef) {

        $(this.el.nativeElement).tooltipster({
            side: 'left',
            theme: 'tooltipster-shadow',
            contentAsHTML: true,
            interactive: true,
        });
    }

    @Input('toolipsterContent')
    set settoolipsterContent(value: string) {
        this._toolipsterContent = value;
        $(this.el.nativeElement).tooltipster('content', this._toolipsterContent);
    }
}
