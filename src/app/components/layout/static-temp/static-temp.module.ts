import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticTempComponent} from './static-temp.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '../../core/button/button.module';
import { ContentHeaderModule } from '../../layout/content-header/content-header.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ContentHeaderModule
  ],
  declarations: [
    StaticTempComponent
  ],
  exports: [
    StaticTempComponent
  ],
  providers: []
})
export class StaticTempModule { }
