import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavDetailsMenuComponent } from './nav-details-menu.component'
import { DropDownModule } from '../dropdown';
import { MultiselectModule } from '../multiselect'
import { SearchTextBoxModule } from '../search-text-box';
import { ButtonModule } from '../button'
import { Routes, RouterModule } from '@angular/router';
import {ProgressSpinnerModule} from '../progress-spinner';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SearchTextBoxModule,
    RouterModule,
    DropDownModule,
    MultiselectModule,
    ButtonModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavDetailsMenuComponent
  ],
  exports: [
    CommonModule,
    NavDetailsMenuComponent
  ],
  providers: []
})
export class NavDetailsMenuModule { }
