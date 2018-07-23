import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProgressSpinnerComponent
  ],
  exports: [
    ProgressSpinnerComponent
  ]
})
export class ProgressSpinnerModule { }
