import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  btnColor: string;
  @Input()
  btnText: string;
  @Input()
  btnType: string;
  @Input()
  icon: string;
  @Input()
  btnDisabled: boolean;
  @Input()
  smallBtn: string;
  @Output()
  getData = new EventEmitter();
  constructor() {
    this.btnDisabled = false;
    this.btnType = 'text;'
  }

  ngOnInit() {
  }
  openmodal(item) {
    this.getData.emit(item);
  }
}
