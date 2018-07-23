import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationAlertComponent } from './confirmation-alert.component'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ConfirmationAlertComponent
    ],
    exports: [
        ConfirmationAlertComponent
    ],
    providers: []
})
export class ConfirmationAlertModule { }
