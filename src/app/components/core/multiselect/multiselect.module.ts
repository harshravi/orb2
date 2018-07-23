import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectComponent } from './multiselect.component';
import { SearchTextBoxModule } from '../search-text-box';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchTextBoxModule
  ],
  declarations: [
    MultiselectComponent
  ],
  exports: [
    MultiselectComponent
  ]
})
export class MultiselectModule { }
