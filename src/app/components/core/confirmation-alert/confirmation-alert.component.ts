import { Component, OnInit } from '@angular/core';
import {ConfermationAlertService} from '../../../services/commonService';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss']
})
export class ConfirmationAlertComponent implements OnInit {

    message: any;
    constructor(
      private alertService: ConfermationAlertService
   ) { }
   ngOnInit() {
    // this function waits for a message from alert service, it gets 
    // triggered when we call this from any other component
    this.alertService.getMessage().subscribe(message => {
        this.message = message;
    });
  }

}
