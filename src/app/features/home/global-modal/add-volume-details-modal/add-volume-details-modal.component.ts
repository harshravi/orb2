import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { AddVolumeDetailsModalContext } from './add-volume-details-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;

@Component({
  selector: 'app-add-volume-details',
  templateUrl: './add-volume-details-modal.component.html',
  styleUrls: ['./add-volume-details-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class AddVolumeDetailsModalComponent implements OnInit {
  context: AddVolumeDetailsModalContext;
  heading: string;
  form: FormGroup;
  addVolumeDetails;
  textAreaTextCount: number;
  allStatusData: Array<object>;
  addVolumeStatusData: Array<object>;
  highlightedYearSelected;
  selectedYear: number;
  selectedRow: number;
  isDataLoading: boolean;
  selectedStatus: number;
  enablePO: boolean;
  enableLumpSumsService;
  selectedYeardetails: any;
  remainingQtyValid: string;
  qtyValidFlag: boolean;
  constructor(public dialog: DialogRef<AddVolumeDetailsModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _confermationAlertService: ConfermationAlertService,
    private _toasterService: ToasterService,
    private _featureService: FeatureService) {
    this.context = dialog.context;
    this.addVolumeDetails = this.context.addVolumeHeader;
    this.selectedRow = this.context.selectedRow;
    this.selectedYear = this.context.selectedYear;
    this.heading = 'Add Volume for';
    this.addVolumeStatusData = this.context.addVolumeStatusData;
    this.enableLumpSumsService = this.addVolumeDetails.header.enableLumpSumsService;
    this.qtyValidFlag = false;
  }

  ngOnInit() {
    this.form = this._fb.group({
      'statusId': [''],
      'changeReasonId': ['', Validators.required],
      'purchaseOrderId': [''],
      'volume': ['', Validators.compose([Validators.required, Validators.maxLength(18)])],
      'comments': ['', Validators.required]
    });
    if (this.enableLumpSumsService) {
      this.selectedServiceDetails(2, this.addVolumeDetails.year2);
    } else {
      this.selectedServiceDetails(this.selectedRow, this.selectedYear);
    }
    _.remove(this.addVolumeStatusData, item => item.id === 0);
    _.remove(this.addVolumeStatusData, item => item.id === 4);
    if (!this.context.approve) {
      _.remove(this.addVolumeStatusData, item => item.id === 3);
      _.remove(this.addVolumeStatusData, item => item.id === 4);
      // _.remove(this.addVolumeStatusData, item => item.id === 5);
    }
    const  userType  = this.addVolumeDetails['header'];
    if (!userType.adminUser) {
      _.remove(this.addVolumeStatusData, item  =>  item.id  ===  5);
    }
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
    this.selectedStatus = 2;
  }
  selectedServiceDetails(selectedRow, year) {
    this.highlightedYearSelected = selectedRow;
    this.selectedYear = year;
    this.getSelectedYearData(this.selectedYear)
  }
  getSelectedYearData(selectedYear) {
    this.selectedYeardetails = _.find(this.addVolumeDetails['volumeDetailsYearWiseList'], data => {
      return data.year === selectedYear;
    });
  }
  changeReason(event) {

  }
  selectedSataus(event) {

  }
  getTextCount(event) {
    this.textAreaTextCount = event.target.textLength;
  }
  clearModalData(event) {
    this.form.reset();
    this.textAreaTextCount = null;
  }
  addVolume(formValue) {
    this.isDataLoading = true;
    let requestData;

    requestData = {
      'itmsId': this.context.addVolumeHeader.navDetailsForVolume.itmsId,
      'cybudgetAmount': this.context.addVolumeHeader.cyBudgetAmount,
      'serviceCatalogId': this.context.addVolumeHeader.serviceCatalogId,
      'year': this.selectedYear,
      'budgetDetailId': this.context.budgetDetailId,
      'itmsNo': this.context.addVolumeHeader.navDetailsForVolume.itmsNo,
      'appName': this.context.addVolumeHeader.navDetailsForVolume.appName,
      'cdsId': this._storage.get('cdsId')
    }
    if (formValue.purchaseOrderId === '') {
      formValue.purchaseOrderId = null;
    }

    // this.form.controls['volume'].disable();
    // this.form.controls['comments'].disable();

    _.assign(requestData, formValue);
    const requestedDataForAdd = [];
    requestedDataForAdd.push(requestData);
    this._featureService.addVolumeForOpcost(requestedDataForAdd).then(data => {
      this.dialog.close(true);
      const toast = {
        type: 'success',
        title: 'Volume added successfully',

      };
      this._toasterService.pop(toast);
      this.isDataLoading = false;
      // if (data = sucess) {

      // } else {

      // }

    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  closeModal() {
    this.dialog.close(true);
  }
  checkValidQty(event) {
    this.remainingQtyValid = null;
    this.qtyValidFlag = false;
    if (this.selectedYeardetails.reminingQty > event.target.value) {
     this.remainingQtyValid = 'Volume cannot make budget negative, maximum reduction allowed is' + this.selectedYeardetails.reminingQty;
     this.qtyValidFlag = true;
    }
  }
}
