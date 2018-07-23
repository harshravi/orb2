import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxComponent } from './check-box.component';
import { FormsModule } from '@angular/forms';
import { AppDirectiveModule } from '../../../directive/app.directive.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppDirectiveModule
  ],
  declarations: [
    CheckBoxComponent
  ],
  exports: [
    CheckBoxComponent
  ]
})
export class CheckBoxModule { }
