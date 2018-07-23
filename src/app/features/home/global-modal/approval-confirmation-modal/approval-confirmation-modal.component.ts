import {Component, OnInit} from '@angular/core';
import {FeatureService} from '../../../../../app/services/featureServices/feature.service';
import {DialogRef, ModalComponent, CloseGuard} from 'angular2-modal';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import {LocalStorageService} from 'angular-2-local-storage';
import {ApprovalConfirmationModalContext} from './approval-confirmation-modal.context';
import {ToasterService} from 'angular2-toaster';
import {ConfermationAlertService} from '../../../../services';

declare var _: any;
declare var $: any;

@Component({
  selector: 'app-approval-confirmation-modal',
  templateUrl: './approval-confirmation-modal.component.html',
  styleUrls: ['./approval-confirmation-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})

export class ApprovalConfirmationModalComponent implements OnInit {

  context: ApprovalConfirmationModalContext;
  heading: string;
  form: FormGroup;
  isDataLoading: boolean;
  actionBtnText: string;
  textAreaTextCount: string;
  selectedRowForSave: Array < object > ;
  CommentMandatory: boolean;
  sectionName: string;

  constructor(public dialog: DialogRef < ApprovalConfirmationModalContext > ,
      private _storage: LocalStorageService,
      private _fb: FormBuilder,
      private _toasterService: ToasterService,
      private _confermationAlertService: ConfermationAlertService,
      private _featureService: FeatureService) {

      this.context = dialog.context;
      this.heading = this.context.heading;
      this.actionBtnText = this.context.actionBtnText;
      this.CommentMandatory = true;
  }

  ngOnInit() {
      this.selectedRowForSave = this.context.approvalDetails;
      this.sectionName = this.context.sectionName;
      this.form = this._fb.group({
          'comments': ['']
      });
      $('a[name=closeOpenModal]').click(function() {
          $('modal-overlay').remove();
      });
      $('body').tooltip({
          selector: '[data-toggle="tooltip"]'
      });
  }

  closeModal() {
      $('modal-overlay').remove();
  }
  getTextCount(event) {
      this.textAreaTextCount = event.target.textLength;
      const commentField = event.target.value.trim();
      if (commentField.length === 0) {
          this.CommentMandatory = true;
      } else {
          this.CommentMandatory = false;
      };
  }
  submitRemove() {
      let commonData;
      let strippedRows;
      let tableData;
      const usageData = [];
      const volumeData = [];

      commonData = {
          'itmsId': this.context.itmsId,
          'cdsId': this._storage.get('cdsId'),
          'section': this.sectionName
      }

      strippedRows = _.map(this.selectedRowForSave, function(row, index) {
          return _.omit(row, ['applicationName', 'changeRequestedBy', 'changeRequestedDate', 'changeType', 'changedBy', 'changedDate',
          'commitBy', 'commitDate', 'cyNegotiated', 'enableEdit', 'proposedNegotiated', 'remove',
          'restrictedLegalEntity', index + 'usageStagingID', index + '-statusId'
          ]);
      });

    if (this.sectionName === 'usage') {
        _.forEach(strippedRows, (element) => {
            const data = {
                'usageStagingID': element.usageStagingID,
                'statusId': element.statusId
            };
            usageData.push(data);
        })
        tableData = {
            'cdsId': this._storage.get('cdsId'),
            'section': this.sectionName,
            'usageRecords': usageData
        }
    } else {
        _.forEach(strippedRows, (element) => {
            const data = {
                'stagingID': strippedRows.stagingID,
                'status': strippedRows.status
            };
            volumeData.push(data);
        })
        tableData = {
            'cdsId': this._storage.get('cdsId'),
            'section': this.sectionName,
            'volumeRecords': volumeData
        }
    }


      if (this.context.action === 'edit') {
          this.isDataLoading = true;
          this._featureService.saveApprovals(tableData).then(data => {
              this.isDataLoading = false;
              this.dialog.close(true);
              const toast = {
                  type: 'success',
                  title: 'User(s) Edited successfully'
              };
              this._toasterService.pop(toast);
          }, error => {
              this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
              console.log(error);
          });

      } else if (this.context.action === 'approve') {
          this.isDataLoading = true;
          _.forEach(strippedRows, data => {
              data.statusId = 3
          });
          this._featureService.saveApprovals(tableData).then(data => {
              this.isDataLoading = false;
              this.dialog.close(true);
              const toast = {
                  type: 'success',
                  title: 'User(s) approved successfully'
              };
              this._toasterService.pop(toast);
          }, error => {
              this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
              console.log(error);
          });

      } else if (this.context.action === 'unapprove') {
          this.isDataLoading = true;
          _.forEach(strippedRows, data => {
              data.statusId = 2
          });
          this._featureService.saveApprovals(tableData).then(data => {
              this.isDataLoading = false;
              this.dialog.close(true);
              const toast = {
                  type: 'success',
                  title: 'User(s) unapproved successfully'
              };
              this._toasterService.pop(toast);
          }, error => {
              this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
              console.log(error);
          });

      } else if (this.context.action === 'reject') {
          this.isDataLoading = true;
          _.forEach(strippedRows, data => {
              data.statusId = 4
          });
          this._featureService.saveApprovals(tableData).then(data => {
              this.isDataLoading = false;
              this.dialog.close(true);
              const toast = {
                  type: 'success',
                  title: 'User(s) rejected successfully'
              };
              this._toasterService.pop(toast);
          }, error => {
              this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
              console.log(error);
          });
      } else if (this.context.action === 'commit') {
          this.isDataLoading = true;
          _.forEach(strippedRows, data => {
              data.statusId = 5
          });
          this._featureService.saveApprovals(tableData).then(data => {
              this.isDataLoading = false;
              this.dialog.close(true);
              const toast = {
                  type: 'success',
                  title: 'User(s) committed successfully'
              };
              this._toasterService.pop(toast);
          }, error => {
              this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
              console.log(error);
          });
      }
  }
}
