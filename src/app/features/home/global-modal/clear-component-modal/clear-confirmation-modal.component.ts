import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { ClearConfirmationModalContext } from './clear-confirmation-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;
@Component({
  selector: 'app-clear-confirmation-modal',
  templateUrl: './clear-confirmation-modal.component.html',
  styleUrls: ['./clear-confirmation-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class ClearConfirmationModalComponent implements OnInit {
  context: ClearConfirmationModalContext;
  heading: string;
  isDataLoading: boolean;
  description: string;
  clearVolumeData: any;
  isDataLoadingforSave: boolean;
  content;
  constructor(public dialog: DialogRef<ClearConfirmationModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    // "Would you like to remove the below users'?"
    this.context = dialog.context;
    this.heading = this.context.heading;
    this.description = this.context.description;
    this.clearVolumeData = this.context.clearVolumeList;
    this.isDataLoadingforSave = false;
    this.content = this.context.content;
  }

  ngOnInit() {
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
  }

  closeModal() {
   // this.dialog.close(true);
   $('modal-overlay').remove();
  }

  submitRemove() {
    this.isDataLoading = true;
    this.isDataLoadingforSave = true;
    this._featureService.updateVolumePhysical(this.clearVolumeData).then(data => {
      const toast = { type: 'success', title: 'Volume Cleared successfully' };
      this._toasterService.pop(toast);
      this.dialog.close(true);
      this.isDataLoading = false;
    this.isDataLoadingforSave = false;
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
    });
  }
}
