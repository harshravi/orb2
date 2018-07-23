import {
    Component, OnInit, Input, ViewChild, AfterViewInit,
    EventEmitter, Output, ElementRef, OnChanges, SimpleChange, ChangeDetectorRef
} from '@angular/core';
import { CheckBoxService } from '../../../services';
declare var $: any;
declare var _: any;
@Component({
    selector: 'app-multiselect',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss'],
    providers: [CheckBoxService]
})
export class MultiselectComponent implements AfterViewInit, OnChanges, OnInit {
    @Output() selection = new EventEmitter<Object>();
    @Output() selectedAll = new EventEmitter<any>();
    @Output() unselectedAll = new EventEmitter<any>()
    /** Inputs for the Multiselect View */
    @Input() options: any;
    @Input() multiSelectIndex: any;
    @Input() planText: any;
    @Input() updatedData;
    @Input() listData;
    @Input() defaultName;
    @Input() removeOther: boolean;
    @Input() multiRigionselectCount: number;
    @Input() multiskillselectCount: number;
    @Input() changeRequestByCount: number;
    @Input() approvedByCount: number;
    @Input() userEligibleSkills: any;
    @Output() SearchTextFilter = new EventEmitter<string>();
    filterSearchText: string;
    _optionTextName: string;
    _optionChangeColor: string;
    _disabled: boolean;

    @Input('optionChangeColor')
    set setOptionChangeColor(value: string) {
        this._optionChangeColor = value;
        this._changeDetectorRef.detectChanges();
    }
    get getOptionChangeColor(): string {
        return this._optionChangeColor;
    }

    @Input('optionTextName')
    set setOptionTextName(value: string) {
        this._optionTextName = value;
        this._changeDetectorRef.detectChanges();
    }
    get getOptionTextName(): string {
        return this._optionTextName;
    }
    @Input('disabled')
    set setDisable(value: boolean) {
        this._disabled = value;
    }
    @ViewChild('item') private item: ElementRef;

    selected = {};
    selectedArray: boolean;
    obj: any;
    isCurrentItem: any = false;
    selectedValue;
    constructor(private _changeDetectorRef: ChangeDetectorRef, private _CheckBoxService: CheckBoxService) {
        this.removeOther = true;
    }
    ngOnInit() {
    }
    /** Perform the initialization after the view initializes */
    ngAfterViewInit() {
        /** Adding a Listener to the Click Event */
        this.item.nativeElement.addEventListener('click', (event) => {
            event.stopPropagation();

            /** Gather all the multiselect that have a class open attahced */
            const openMultiselects = document.querySelector('.multiselectdropdown.open');
            let openDropdown = document.querySelector('.custom-single-dropdown.open');
            if (openDropdown) {
                openDropdown.classList.remove('open');
            }
            if (openMultiselects) {
                openMultiselects.classList.remove('open');
            }

            // Adding a local referance to the element
            const element = this.item.nativeElement;

            /**
             * Toggling the classes to open and close the list of options.
             * Here the Open Class is coming from Bootstrap and is being used
             * in order to open the dropdown and close it.
             */
            if (element.classList.contains('open')) {
                element.classList.remove('open');
            } else {
                // element.classList.remove('open');
                element.classList.add('open');
                if (openMultiselects) {
                    if (event.currentTarget.id !== 'multiselect-dropdown-main' && event.target.id !== 'multiselect-dropdown') {
                        openMultiselects.classList.remove('open');
                    }

                    if (event.target.id === 'multiselect-dropdown') {
                        openMultiselects.classList.remove('open');
                    }
                }
            }

            document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
                openDropdown = document.querySelector('.custom-single-dropdown.open');
                element.classList.remove('open');
                if (openDropdown) {
                    openDropdown.classList.remove('open');
                }
            });
        });
    }

    selectedOption(data) {
        this._CheckBoxService.setCheckBoxData(data);
        this.selection.emit(data);
    }
    enterText(event) {
        this.filterSearchText = event.target.value;
        this.SearchTextFilter.emit(this.filterSearchText)

    }
    selectAll(options) {
        this.selectedAll.emit()
    }
    unselectAll(options) {
        this.unselectedAll.emit()
    }
    ngOnChanges(changes: { [propName: string]: SimpleChange }) {

        if (changes['listData'] !== undefined) {
            this.options = this.listData;
            if (this.options) {
                if (this.options.length > 0) {
                    if (this.options[0].hasOwnProperty('name')) {
                        const skills = [];
                        if (this.userEligibleSkills) {
                            for (let i = 0; i < this.userEligibleSkills.length; i++) {
                                for (let j = 0; j < this.userEligibleSkills[i].skillTeam.length; j++) {
                                    skills.push(this.userEligibleSkills[i].skillTeam[j])
                                }
                            }
                        }
                        for (let i = 0; i < this.options.length; i++) {
                            for (let j = 0; j < skills.length; j++) {
                                if (this.options[i].name === skills[j]) {
                                    this.options[i].userSkills = true;
                                } else {
                                    this.options[i].userSkills = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        _.forEach(this.options, (element) => {
            if (element.selected) {
                this.selectedArray = true;
                return false
            } else {
                this.selectedArray = false;
                // this.multiRigionselectCount = null;
            }
        })
        // this.selectedArray = this._CheckBoxService.selectedArray;
        // console.log(this.selectedArray);
        // if (changes['updatedData'] !== undefined) {
        //     if (this.updatedData) {
        //         this.selectedArray = this.updatedData;
        //     }
        // }
    }
}
