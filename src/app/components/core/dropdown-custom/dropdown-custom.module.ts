import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownCustomComponent } from './dropdown-custom.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownCustomComponent
  ],
  exports: [
    DropdownCustomComponent
  ]
})

export class DropDownCustomModule { }