import {
    Component, OnInit, ViewChild, ElementRef, AfterViewInit,
    Input, Output, EventEmitter, OnChanges, SimpleChange, forwardRef, ChangeDetectorRef,
    HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ICustomDropdownOptions } from './model/dropdown.model';
import { IControlValueAccessor } from '../../../models/common.model';
import { StopPropagationEmitterService } from '../../../services/EventEmitter/stop-propagation-emitter.service';
import * as _ from 'lodash';


const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: IControlValueAccessor<DropDownComponent> = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true
};

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})

export class DropDownComponent implements ControlValueAccessor, AfterViewInit {
    @ViewChild('item') private item: ElementRef;
    // The internal data model
    innerValue: string;

    _optionValueName: string;
    _optionTextName: string;
    _data: Dictionary<string>;
    _disabled: boolean;
    _optionChangeColor: string;
    @Input() checkRestricted: boolean;
    @Input() option: ICustomDropdownOptions;
    @Input() changeBgColor: string;
    @Input() labelText: string;
    @Input() classObj: { [key: string]: string };
    @Output() change = new EventEmitter();

    @Input('optionValueName')
    set setOptionValueName(value: string) {
        this._optionValueName = value;
        this._changeDetectorRef.detectChanges();
    }
    get getOptionValueName(): string {
        return this._optionValueName;
    }

    @Input('optionTextName')
    set setOptionTextName(value: string) {
        this._optionTextName = value;
        this._changeDetectorRef.detectChanges();
    }
    get getOptionTextName(): string {
        return this._optionTextName;
    }
    @Input('optionChangeColor')
    set setOptionChangeColor(value: string) {
        this._optionChangeColor = value;
        this._changeDetectorRef.detectChanges();
    }
    get getOptionChangeColor(): string {
        return this._optionChangeColor;
    }
    @Input('setSelectedText')
    set setSelectedText(value: string) {
        this.selectedText = value;
        this._changeDetectorRef.detectChanges();
    }

    @Input('data')
    set setData(value: Dictionary<string>) {
        this._data = value;
        this._changeDetectorRef.detectChanges();
    }
    get getData(): Dictionary<string> {
        return this._data;
    }

    @Input('disabled')
    set setDisable(value: boolean) {
        this._disabled = value;
    }

    @Input() isSimpleData: boolean;

    // Placeholders for the callbacks which are later providesd
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (val: string) => void = noop;
    isDropdownOpen: boolean;

    selectedValue: string;
    selectedText: string;
    propagationStoppedId: number;

    constructor(private _changeDetectorRef: ChangeDetectorRef, private _stopPropagationEmitterService: StopPropagationEmitterService) {
        if (!this.option) {
            this.option = {};
        }

        this.innerValue = '';
        this.selectedValue = 'Select';
        this.selectedText = 'Select';
        this._stopPropagationEmitterService = (<any>window).stopPropagationEmitterService;
        this._stopPropagationEmitterService.propagationStoppedObservable.subscribe(subPropagationStoppedId => {

            if (subPropagationStoppedId !== this.propagationStoppedId) {
                this.isDropdownOpen = false;
            }
        });
    }

    ngAfterViewInit() {
        this.propagationStoppedId = new Date().getTime();
        const eleDropdown = this.item.nativeElement;
    }

    dropdownClick(evt) {
        const openMultiselects = document.querySelector('.multiselectdropdown.open');
        const openDropdown = document.querySelector('.custom-single-dropdown.open');
        if (openMultiselects) {
            openMultiselects.classList.remove('open');
        }
        if (openDropdown) {
            openDropdown.classList.remove('open');
        }
        this.isDropdownOpen = !this.isDropdownOpen;
        const ele = evt.srcElement || evt.target;
        if (ele.parentElement.closest('.dropdown')) {
            event.stopPropagation();
            this._stopPropagationEmitterService.propagationStoppedEvent(this.propagationStoppedId);
        }
    }

    optionSelected(data: Dictionary<string> | string) {
        this.innerValue = this.selectedValue = (this.isSimpleData ? data : data[this._optionValueName]);
        this.selectedText = (this.isSimpleData ? data : data[this._optionTextName]);
        if (this._optionChangeColor) {
            this.checkRestricted = (this.isSimpleData ? data : data[this._optionChangeColor]);
        }
        this.isDropdownOpen = false;
        this.onChangeCallback(this.selectedValue);
        this.change.next(this.innerValue);
    }

    setSelected(value: string) {
        if (this.isSimpleData) {
            this.selectedText = this.selectedValue = value;
        } else {
            const selectedData = _.find(this._data, val => val[this._optionValueName] === value);
            if (selectedData) {
                this.optionSelected(selectedData);
            } else {
                this.selectedValue = 'Select';
                this.selectedText = 'Select';
            }
        }
    }

    @HostListener('document:click', ['$event'])
    documentClick(event) {
        const ele = event.srcElement || event.target;
        if (ele.closest('.dropdown')) {
            //event.stopPropagation();

        } else {
            this.isDropdownOpen = false;
        }
    }

    onTouchedCallbackFn() {

    }

    // get accessor
    get value(): string {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    set value(v: string) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
            this.change.next(v);
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.setSelected(value);
            this.onChangeCallback(value);
            this.change.next(value);
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}
