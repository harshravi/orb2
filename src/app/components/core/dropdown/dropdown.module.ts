import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from './dropdown.component';
import { StopPropagationEmitterService } from '../../../services/EventEmitter/stop-propagation-emitter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropDownComponent
  ],
  exports: [
    DropDownComponent
  ],
  providers: [
    { provide: StopPropagationEmitterService, useValue: window.stopPropagationEmitterService }
  ]
})
export class DropDownModule { }
