import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { LumpSumActionModalContext } from './lump-sum-action-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';

declare var _: any;
declare var $: any;
@Component({
  selector: 'app-lump-sum-action-modal',
  templateUrl: './lump-sum-action-modal.component.html',
  styleUrls: ['./lump-sum-action-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class LumpSumActionModalComponent implements OnInit {
  context: LumpSumActionModalContext;
  heading: string;
  form: FormGroup;
  isDataLoading: boolean;
  actionBtnText: string;
  textAreaTextCount: string;
  selectedRowForDelete: Array<object>;
  CommentMandatory: boolean;
  constructor(public dialog: DialogRef<LumpSumActionModalContext>,
    private _confermationAlertService: ConfermationAlertService,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _featureService: FeatureService) {
    // "Would you like to remove the below users'?"
    this.context = dialog.context;
    this.heading = this.context.heading;
    this.actionBtnText = this.context.actionBtnText;
    this.CommentMandatory = true;
  }

  ngOnInit() {
    this.selectedRowForDelete = this.context.deleteServiceDetails;
    this.form = this._fb.group({
      'comments': ['']
    });
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
  }
  closeModal() {
    // this.dialog.close(true);
    $('modal-overlay').remove();
  }
  getTextCount(event) {
    this.textAreaTextCount = event.target.textLength;
    const commentField = event.target.value.trim();
    if (commentField.length === 0) {
      // this.showSaveRibon = false;
      this.CommentMandatory = true;
    } else {
      // this.showSaveRibon = true;
      this.CommentMandatory = false;
    };
  }
  submitRemove() {
    let commonData;
    let strippedRows;
    commonData = {
      'cdsId': this._storage.get('cdsId')
    }

    strippedRows = _.map(this.selectedRowForDelete, function (row, index) {
      return _.omit(row, ['approveBy', 'approveDateString', 'canEdit', 'cdsId',
        'changeBy', 'changeDateString', 'regionName', 'serviceCatalogue', 'skillTeam', 'baseLine']);
    });
    if (this.context.action === 'approve') {
      this.isDataLoading = true;
      _.forEach(strippedRows, data => {
        data.statusId = 3
        _.assign(data, commonData);
      });
      this._featureService.updateLumpSums(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'Lump sums approved successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });

    } else if (this.context.action === 'unapprove') {
      this.isDataLoading = true;
      _.forEach(strippedRows, data => {
        data.statusId = 2
        _.assign(data, commonData);
      });
      this._featureService.updateLumpSums(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'Lump sums unapproved successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });

    } else if (this.context.action === 'reject') {
      this.isDataLoading = true;
      _.forEach(strippedRows, data => {
        data.statusId = 4
        _.assign(data, commonData);
      });
      this._featureService.updateLumpSums(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'Lump sums rejected successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });
    } else if (this.context.action === 'commit') {
      this.isDataLoading = true;
      _.forEach(strippedRows, data => {
        data.statusId = 5
        _.assign(data, commonData);
      });
      this._featureService.updateLumpSums(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'Lump sums committed successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });
    }
  }
}
