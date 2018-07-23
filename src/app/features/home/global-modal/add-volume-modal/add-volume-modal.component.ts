import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { AddVolumeModalContext } from './add-Volume-modal.context';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;
@Component({
  selector: 'app-add-volume-modal',
  templateUrl: './add-volume-modal.component.html',
  styleUrls: ['./add-volume-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class AddVolumeModalComponent implements OnInit {
  // context: AddVolumeModalContext;
  heading: string;
  form: FormGroup;
  constructor(
    // public dialog: DialogRef<AddVolumeModalContext>,
    private _fb: FormBuilder,
    private _storage: LocalStorageService,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    // this.context = dialog.context;
    this.heading = 'Add Volume for';
  }

  ngOnInit() {
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
  }
  closeModal() {
    // this.dialog.close(true);
  }
  addVolume() {

  }
}
