import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Importing Components Necessary for the module */
import { ErrorMessagesModule } from '../../components/core/error-messages';

import { AuthRoutingModule, routingComponents } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import {
  ProgressSpinnerModule
} from '../../components';
import { AdfsComponent } from './adfs/adfs.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    // ErrorMessagesModule,
    AuthRoutingModule
  ],
  declarations: [AuthComponent, LoginComponent, AdfsComponent]
})
export class AuthModule { }
