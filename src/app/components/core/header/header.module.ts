import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import { Routes, RouterModule } from '@angular/router';
import { ArrowRibonModule } from '../arrow-ribon'

@NgModule({
  imports: [
    CommonModule,
    ArrowRibonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    CommonModule,
    HeaderComponent
  ],
  providers: []
})
export class HeaderModule { }
