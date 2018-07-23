import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-text-box',
  templateUrl: './search-text-box.component.html',
  styleUrls: ['./search-text-box.component.scss']
})
export class SearchTextBoxComponent implements OnInit {
  @Input()
  smallSearch: string;
  @Input()
  placeHolder: string;
  @Input()
  showSearchIcon: boolean;
  @Input()
  searchValue;
  @Input()
  disableSearch: boolean;
  @Output()
  appsearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.showSearchIcon = true;
  }
  enteredText(item) {
    this.appsearch.emit(item);
  }
}
