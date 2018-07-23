import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCheckBoxComponent } from './custom-check-box.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CustomCheckBoxComponent
  ],
  exports: [
    CustomCheckBoxComponent
  ]
})
export class CustomCheckBoxModule { }
