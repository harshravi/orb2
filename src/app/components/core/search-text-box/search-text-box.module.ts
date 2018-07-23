import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SearchTextBoxComponent} from './search-text-box.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchTextBoxComponent
  ],
  exports: [
    CommonModule,
    SearchTextBoxComponent
  ],
  providers: []
})
export class SearchTextBoxModule { }
