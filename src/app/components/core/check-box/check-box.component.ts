import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
  forwardRef, ChangeDetectorRef, AfterViewInit,
  HostListener
} from '@angular/core';
import { ICustomCheckboxOptions } from './model/checkbox.model';
import { IControlValueAccessor } from '../../../models/common.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: IControlValueAccessor<CheckBoxComponent> = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true
};
const noop = () => {
};

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class CheckBoxComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {

  /** Variable carries the name of the Label */
  @Input() checkLabel: string;

  @Input() labelClass: string;

  @Input() inputClass: string;

  @Input() disabled: boolean;

  checkId: string;

  /** Variable contains the id for the checkbox */
  @Input('checkId')
  set setCheckId(value: string) {
    this.checkId = 'check_id_' + Math.ceil(Math.random() * 1000000) + new Date().getTime();
  }
  get getCheckId(): string {
    return this.checkId;
  }

  /** Whether the variable is checked or not */
  @Input() checkChecked;

  /** Event Emitter emits when checked or unchecked */
  @Output()
  checkedOrnot = new EventEmitter<boolean>();

  /** Boolean vairable defining the status of the checkbox */
  isChecked = false;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (val: boolean) => void = noop;

  innerValue: boolean;

  constructor() { }

  ngOnInit() {
    this.setCheckId = '';
  }

  /** Function that captures change and emits the output */
  onChange(event) {
    this.writeValue(this.isChecked);
    //this.checkedOrnot.emit(this.isChecked);
  }

  /** Change listener. Checkes whether the variable changes over time */
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['checkChecked']) {
      this.isChecked = (changes['checkChecked'].currentValue) ? changes['checkChecked'].currentValue : this.isChecked;
    }
  }

  onTouchedCallbackFn() {

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
      this.checkedOrnot.next(v);
    }
  }

  setSelected(value: boolean) {
    this.isChecked = value;
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.setSelected(value);
      this.onChangeCallback(value);
      this.checkedOrnot.next(value);
    }
  }

  ngAfterViewInit() {

  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }
}
