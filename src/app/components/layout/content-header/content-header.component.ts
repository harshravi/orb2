import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {
  @Input()
  dashboardHeader;
  @Input()
  addnewApplicationdHeader;
  @Input()
  approvalsHeader;
  @Input()
  usageHeader;
  @Input()
  lumpSums: boolean;
  @Input()
  addNew: boolean;
  @Input()
  headerDetails
  @Input()
  volumeDetailsHeader
  @Input()
  headerForVolumeDetails: any;
  @Input()
  btnRequire: boolean;
  @Input()
  buttonText: string;
  @Input()
  changePositionClass: string;
  @Output()
  openModal = new EventEmitter()
  @Output()
  backToVolumePage = new EventEmitter()
  constructor() {
    this.addNew = false;
  }

  ngOnInit() {
    $(document).ready(function (e) {
      // e.preventDefault();
      $('.show-user').on('click', function () {
        if ($(this).hasClass('show-active-user')) {
          return true;
        } else {
          $('.show-hide-usage').children().removeClass('show-active-user');
          $(this).addClass('show-active-user');
        }
      });
    });
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]'
    });
  }
  showModal() {
    this.openModal.emit(this.headerDetails.itmsId);
  }
  showModalForlegalEntity() {
    this.openModal.emit(this.headerForVolumeDetails.navDetailsForVolume.itmsId);
  }
  showModalForLumpsums() {
    this.openModal.emit();
  }
  backToVolumePageArrow(event) {
    this.backToVolumePage.emit(event)
  }
}
