import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-static-temp',
  templateUrl: './static-temp.component.html',
  styleUrls: ['./static-temp.component.scss']
})
export class StaticTempComponent implements OnInit {
@Input()
appNotSelected: boolean;
@Input()
showFailure: boolean;
@Input()
showHeading: string;
@Input()
showDetails: string;
@Input()
selectedAppHeaderDetails
@Input()
noBtnRequire: boolean;
@Input()
showHeader
  constructor() {
    this.appNotSelected = false;
    this.showFailure = false;
   }

  ngOnInit() {
  }

}
