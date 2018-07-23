import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppDisabledDirective } from './disabled.directive';
import { AppCarouselDirective } from './carousel.directive';
import { ClickOutsideDirective } from './clickOutside.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        AppDisabledDirective,
        AppCarouselDirective,
        ClickOutsideDirective
    ],
    exports: [
        AppDisabledDirective,
        AppCarouselDirective,
        ClickOutsideDirective
    ]
})
export class AppDirectiveModule { }
