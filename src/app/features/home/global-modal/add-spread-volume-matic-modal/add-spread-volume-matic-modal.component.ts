import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { AddSpreadVolumeMaticModalContext } from './add-spread-volume-matic-modal.contex';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;

@Component({
  selector: 'app-add-spread-volume-modal-matic',
  templateUrl: './add-spread-volume-matic-modal.component.html',
  styleUrls: ['./add-spread-volume-matic-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class AddSpreadVolumeMaticModalComponent implements OnInit {
  context: AddSpreadVolumeMaticModalContext;
  heading: string;
  form: FormGroup;
  addVolumeHeader;
  textAreaTextCount: number;
  allStatusData: Array<object>;
  highlightedYearSelected;
  selectedYear: number;
  isDataLoading: boolean;
  selectedStatus: number;
  percentage: boolean;
  enablePO: boolean;
  itmsNo;
  appName;
  approve;
  disableSubmit: boolean;
  constructor(public dialog: DialogRef<AddSpreadVolumeMaticModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    this.context = dialog.context;
    this.addVolumeHeader = this.context.addVolumeHeader;
    this.heading = 'Spread O Matic';
    this.getAllStatus();
    this.itmsNo = this.context['addVolumeHeader']['header'].itmsNo;
    this.appName = this.context['addVolumeHeader']['header'].appName;
    this.approve = this.context.approve;
  }

  ngOnInit() {
    this.form = this._fb.group({
      'statusId': ['', Validators.required],
      'changeReason': ['', Validators.required],
      'purchanseOrder': [''],
      'quantity': ['', Validators.compose([Validators.required, Validators.maxLength(18)])],
      'comments': ['', Validators.required]
    });
    this.percentage = false;
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
    // this.selectedStatus = 2;
  }
  getAllStatus() {
    this._featureService.getFilterStatusData().then(data => {
      // this.dataLoadingCompleted();
      this.allStatusData = data
      const statusTable = [{
        id: 0,
        name: 'All',
        units: null
      }, {
        id: 2,
        name: 'Pending',
        units: null
      }, {
        id: 3,
        name: 'Approved',
        units: null
      }, {
        id: 5,
        name: 'Committed',
        units: null
      }]
      // this.allStatusforTable = statusTable;
      // this.selectStatus = 0;
      this.allStatusData.unshift(statusTable)
      _.remove(this.allStatusData, item => item.id === 1);
      _.remove(this.allStatusData, item => item.id === 4);
       if (!this.addVolumeHeader.header.adminUser) {
      _.remove(this.allStatusData, item => item.id === 5);
      }
      _.remove(this.allStatusData, item => item.id === 6);

      if (!this.approve) {
        _.remove(this.allStatusData, item => item.id === 3);
        _.remove(this.allStatusData, item => item.id === 4);
        _.remove(this.allStatusData, item => item.id === 5);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  changeGroup(data) {
    this.form.reset();
    this.percentage = data;
  }
  getTextCount(event) {
    this.textAreaTextCount = event.target.textLength;
  }
  clearModalData(event) {
    this.form.reset();
    this.textAreaTextCount = null;
  }
  addSpreadVolume(formValue) {
    this.isDataLoading = true;
    let requestData;
    requestData = {
      'itmsId': this.context.itmsId,
      'year': this.context.selectedYear,
      'bundleName': this.context.bundleName,
      'percentageTrue': this.percentage,
      'itmsNo': this.itmsNo,
      'appName': this.appName,
      'serviceCatalogId': this.context.serviceCatalogId,
      'cdsId': this._storage.get('cdsId')
    }
    if (this.percentage === true) {
      let formData = JSON.stringify(formValue);
      formData = formData.replace(/quantity/g, 'percentage');
      _.assign(requestData, JSON.parse(formData));
      Number(requestData.percentage);
    }else {
      _.assign(requestData, formValue);
      Number(requestData.quantity);
    }
    this._featureService.addSpreadVolume(requestData).then(data => {
      this.dialog.close(data);
      const toast = {
        type: 'success',
        title: 'Spread volume added successfully',

      };
      this._toasterService.pop(toast);
      this.isDataLoading = false;
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  closeModal() {
    this.dialog.close(true);
  }
  // onlyNumberKey(event) {
  //   return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  // }
}


