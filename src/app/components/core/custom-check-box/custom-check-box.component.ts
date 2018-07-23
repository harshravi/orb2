import {
  Component, OnInit, Input, Output, EventEmitter,
  OnChanges, SimpleChange, forwardRef
} from '@angular/core';

import { ICustomCheckboxOptions } from './model/custom-checkbox.model';
import { IControlValueAccessor } from '../../../models/common.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';

const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: IControlValueAccessor<CustomCheckBoxComponent> = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomCheckBoxComponent),
  multi: true
};

@Component({
  selector: 'app-custom-check-box',
  templateUrl: './custom-check-box.component.html',
  styleUrls: ['./custom-check-box.component.scss'],
  providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class CustomCheckBoxComponent implements ControlValueAccessor, OnInit {

  innerValue: boolean;
  /** Variable carries the name of the Label */
  @Input() checkLabel: string;

  /** Variable contains the id for the checkbox */
  @Input() checkId;

  /** Event Emitter emits when checked or unchecked */
  @Output()
  changed = new EventEmitter<boolean>();

  /** Boolean vairable defining the status of the checkbox */
  public isChecked = false;
  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (val: boolean) => void = noop;

  constructor() {
    this.checkId = new Date().getTime();
  }

  // get accessor
  get value(): boolean {
    return this.innerValue;
  };

  // set accessor including call the onchange callback
  set value(v: boolean) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.changed.next(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  onChange(val: boolean) {
    this.writeValue(val);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.setSelected(value);
      this.onChangeCallback(value);
      this.changed.next(value);
    }
  }

  setSelected(val: boolean): void {
    this.isChecked = val;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit() { }

}
