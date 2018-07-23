import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { DeleteConfirmationModalContext } from './delete-confirmation-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;
@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class DeleteConfirmationModalComponent implements OnInit {
  context: DeleteConfirmationModalContext;
  heading: string;
  form: FormGroup;
  isDataLoading: boolean;
  actionBtnText: string;
  textAreaTextCount: string;
  selectedRowForDelete: Array<object>;
  CommentMandatory: boolean;
  constructor(public dialog: DialogRef<DeleteConfirmationModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
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
      'itmsId': this.context.itmsId,
      'cdsId': this._storage.get('cdsId')
    }
    if (this.context.action === 'delete') {
      commonData.comments =  this.form.value.comments
    }
    if (this.context.action === 'edit') {
      strippedRows = _.map(this.selectedRowForDelete, function (row, index) {
        return _.omit(row, ['comments', 'changeBy', 'legalEntityName', 'negotiatiatedAmount',
          index + '-comments', index + '-proposedNegotiatedAmount', index + '-status', 'read', 'rowNo',
          'proposedNegotiatedAmount', 'type']);
      });
    } else {
      strippedRows = _.map(this.selectedRowForDelete, function (row, index) {
        return _.omit(row, ['comments', 'changeBy', 'legalEntityName', 'negotiatiatedAmount',
          index + '-comments', index + '-status', 'read', 'rowNo', 'status', 'type']);
      });
    }

    _.forEach(strippedRows, function (data) {
      data.statusId = data.status;
      delete data.status;
      _.assign(data, commonData);
    })
    if (this.context.action === 'delete') {
      this.isDataLoading = true;
      this._featureService.deleteUser(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'User(s) Deleted successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });

    } else if (this.context.action === 'edit') {
      this.isDataLoading = true;
      this._featureService.updateUser(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'User(s) Edited successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
      // console.log(this.context.action);

    } else if (this.context.action === 'approve') {
      this.isDataLoading = true;
      _.forEach(strippedRows, data => {
        data.statusId = 3
      });
      this._featureService.updateUser(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'User(s) approved successfully' };
        this._toasterService.pop(toast);
        // console.log(data);
      }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
      // console.log(this.context.action)

    } else if (this.context.action === 'unapprove') {
      this.isDataLoading = true;
      _.forEach(strippedRows, data => {
        data.statusId = 2
      });
      this._featureService.updateUser(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'User(s) unapproved successfully' };
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
      });
      this._featureService.updateUser(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'User(s) rejected successfully' };
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
      });
      this._featureService.updateUser(strippedRows).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        const toast = { type: 'success', title: 'User(s) committed successfully' };
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
