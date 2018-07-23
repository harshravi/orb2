import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideNavComponent} from './side-nav.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SideNavComponent
  ],
  exports: [
    CommonModule,
    SideNavComponent
  ],
  providers: []
})
export class SideNavModule { }
