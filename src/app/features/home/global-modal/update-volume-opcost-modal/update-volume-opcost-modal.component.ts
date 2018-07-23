import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { UpdateVolumeOpcostModalContext } from './update-volume-opcost-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;
@Component({
  selector: 'app-update-volume-opcost-modal',
  templateUrl: './update-volume-opcost-modal.component.html',
  styleUrls: ['./update-volume-opcost-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class UpdateVolumeOpcostModalComponent implements OnInit {
  context: UpdateVolumeOpcostModalContext;
  heading: string;
  form: FormGroup;
  isDataLoading: boolean;
  actionBtnText: string;
  selectedRowForDelete: Array<object>;
  constructor(public dialog: DialogRef<UpdateVolumeOpcostModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    // "Would you like to remove the below users'?"
    this.context = dialog.context;
    this.heading = this.context.heading;
    this.actionBtnText = this.context.actionBtnText;
    // console.log(this.context.deleteServiceDetails);
  }

  ngOnInit() {
    this.selectedRowForDelete = this.context.deleteServiceDetails;
    this.form = this._fb.group({
      // 'comments': ['']
    });
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
  }
  closeModal() {
    this.dialog.close(true);
  }
  submitRemove() {
    let commonData;
    let strippedRows;
    commonData = {
      // 'comments': this.form.value.comments,
      // 'itmsId': this.context.itmsId,
      'cdsId': this._storage.get('cdsId')
    }
    // if (this.context.action === 'edit') {
    //   strippedRows = _.map(this.selectedRowForDelete, function (row, index) {
    //     return _.omit(row, ['approvedBy', 'approvedDate', 'bundleName', 'enablePO', 'cyBudgetAmount',
    //       'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year', 'statusDescription',
    //       index + '-comments', index + '-changeRegion',
    //       index + '-quantity', index + '-status']);
    //   });
    // } else {
    // }
    if (this.context.physicalUpdate) {
      strippedRows = _.map(this.selectedRowForDelete, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'enablePO', 'cyBudgetAmount',
          'incurredCodeService', 'lastModified', 'poId', 'skillTeamName', 'year', 'statusDescription', row.rowNo + '-purchageOrder',
          row.rowNo + '-comments', row.rowNo + '-changeRegion', 'itmsId', 'cdsId', 'approvedDateString', 'purchaseOrderName',
          'approvedDateWithZone', 'committedDateWithZone', 'lastModifiedDate',
          'committedDate', 'committedDateString', 'lastModifiedDateString', row.rowNo + '-quantity', row.rowNo + '-status']);
      });
      _.forEach(strippedRows, element => {
        const selectedResion = _.find(this.context.allRegions, data => {
          return data.name === element.changeReason;
        });
        _.assign(element, commonData);
        if (selectedResion) {
          element.changeReasonId = selectedResion.id
        }
        element.volume = Number(element.quantity);
        element.volumeStagingId = element.stagigId;
        element.year = this.context.selectedYear;
        element.bundleName = element.bundleName;
        // element.budgetDetailId = this.context.budgetDetailId; // same bundleID is passed for multi select records
        delete element.quantity;
        delete element.rowNo;
        delete element.stagigId;
        delete element.legalEntityId;
        delete element.status;
        delete element.changeReason;
        delete element.legalEntityName;
      })
      if (this.context.action === 'approve') {
        this.isDataLoading = true;
        _.forEach(strippedRows, data => {
          data.statusId = 3
        });
        this._featureService.updateVolumePhysical(strippedRows).then(data => {
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
      } else if (this.context.action === 'unapprove') {
        this.isDataLoading = true;
        _.forEach(strippedRows, data => {
          data.statusId = 2
        });
        this._featureService.updateVolumePhysical(strippedRows).then(data => {
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
        this._featureService.updateVolumePhysical(strippedRows).then(data => {
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
        this._featureService.updateVolumePhysical(strippedRows).then(data => {
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

    } else {
      strippedRows = _.map(this.selectedRowForDelete, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'bundleName', 'enablePO', 'cyBudgetAmount',
          'incurredCodeService', 'lastModified', 'poId', 'skillTeamName', 'year', 'statusDescription', (index) + '-purchageOrder',
          row.rowNo + '-comments', row.rowNo + '-changeRegion', 'itmsId', 'cdsId', 'purchaseOrderName',
          'approvedDateString', 'approvedDateWithZone', 'committedDateWithZone', 'lastModifiedDate',
          'committedDate', 'committedDateString', 'lastModifiedDateString', row.rowNo + '-quantity', row.rowNo + '-status']);
      });
      _.forEach(strippedRows, element => {
        const selectedResion = _.find(this.context.allRegions, data => {
          return data.name === element.changeReason;
        });
        _.assign(element, commonData);
        if (selectedResion) {
          element.changeReasonId = selectedResion.id;
        }
        element.volume = Number(element.quantity);
        element.vStagingId = element.stagigId;
        delete element.quantity;
        delete element.rowNo;
        delete element.stagigId;
        delete element.status;
        delete element.changeReason;
      })
      if (this.context.action === 'approve') {
        this.isDataLoading = true;
        _.forEach(strippedRows, data => {
          data.statusId = 3
        });
        this._featureService.updateVolumeOpcost(strippedRows).then(data => {
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
      } else if (this.context.action === 'unapprove') {
        this.isDataLoading = true;
        _.forEach(strippedRows, data => {
          data.statusId = 2
        });
        this._featureService.updateVolumeOpcost(strippedRows).then(data => {
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
        this._featureService.updateVolumeOpcost(strippedRows).then(data => {
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
        this._featureService.updateVolumeOpcost(strippedRows).then(data => {
          this.isDataLoading = false;
          this.dialog.close(true);
          const toast = { type: 'success', title: 'User(s) commited successfully' };
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
}
