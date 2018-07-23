import {
  Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output,
  EventEmitter, OnChanges, SimpleChange
} from '@angular/core';

@Component({
  selector: 'app-dropdown-custom',
  templateUrl: './dropdown-custom.component.html',
  styleUrls: ['./dropdown-custom.component.scss']
})
export class DropdownCustomComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('item') private item: ElementRef;

  @Input() listItems;
  @Input() options;
  @Input() dropdownDefaultText;
  @Output() slectedOption = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  /** Perform the initialization after the view initializes */
  ngAfterViewInit() {

    /** Adding a Listener to the Click Event */
    this.item.nativeElement.addEventListener('click', (event) => {

      event.stopPropagation();
      // Adding a local referance to the element
      const element = this.item.nativeElement;
      // element.classList.remove('open');

      // Toggling the classes to open and close the list of options.
      // Here the Open Class is coming from Bootstrap and is being used
      // in order to open the dropdown and close it.
      if (element.classList.contains('open')) {
        element.classList.remove('open');
      } else {
        element.classList.add('open');
      }

      document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
        element.classList.remove('open');
        e.stopPropagation();
      });
    });

    this.item.nativeElement.lastElementChild.addEventListener('focusout', (e) => {
      // Adding a local referance to the element
      const element = this.item.nativeElement;

      // Toggling the classes to open and close the list of options
      if (element.classList.contains('open')) {
        element.classList.remove('open');
      }
    });
  }

  clicked(list) {
    this.slectedOption.emit(list);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['options'] !== undefined) {
      this.listItems = changes['options'].currentValue;
    }
  }
}
