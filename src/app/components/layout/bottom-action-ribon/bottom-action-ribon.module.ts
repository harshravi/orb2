import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BottomActionRibonComponent} from './bottom-action-ribon.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '../../core/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [
    BottomActionRibonComponent
  ],
  exports: [
    BottomActionRibonComponent
  ],
  providers: []
})
export class BottomActionRibonModule { }
