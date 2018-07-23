import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentHeaderComponent} from './content-header.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '../../core/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [
    ContentHeaderComponent
  ],
  exports: [
    ContentHeaderComponent
  ],
  providers: []
})
export class ContentHeaderModule { }
