import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { EditPhysicalGroupModalContext } from './edit-physical-group-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;

@Component({
  selector: 'app-edit-physical-modal-group',
  templateUrl: './edit-physical-group-modal.component.html',
  styleUrls: ['./edit-physical-group-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class EditPhysicalGroupModalComponent implements OnInit {
  context: EditPhysicalGroupModalContext;
  heading: string;
  form: FormGroup;
  disableYearSelection: boolean;
  disableSubmit: boolean;
  isDataLoading: boolean;
  selectYear: number;
  currentGroupName: any;
  currentYear: any;
  isGroupNameEdited: boolean;
  duplicateEntry:  boolean;
  deleteDisable: boolean;
  deleteTooltip: string;
  constructor(public dialog: DialogRef<EditPhysicalGroupModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    this.heading = 'Edit Group'
    this.context = dialog.context;
    this.selectYear = this.context.year;
    this.disableSubmit = true;
    this.isGroupNameEdited =  false;
    this.currentGroupName =  this.context.groupName;
    this.currentYear = this.selectYear;
    this.duplicateEntry = false;
    this.deleteDisable = this.context.disableDeleteGroup;
    // this.ligialIntity = this.context.allLigialIntity;
    // this.allSkill = this.context.allSkills;
  }

  ngOnInit() {
    this.form = this._fb.group({
      'groupName': ['', Validators.required],
      'year': ['', Validators.required]
    });
    this.changeGroup(false);
    this.form.patchValue({
      groupName: this.context.groupName
    });
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
    if (!this.deleteDisable) {
      this.deleteTooltip = 'This will delete the group and all legal entities under the group.';
    }else {
      this.deleteTooltip = 'Only group containing all legal entities with quantity as 0 and status is Pending can be deleted.';
    }
  }
  changeGroup(checkChange) {
    this.disableYearSelection = checkChange;
    this.context.year = this.currentYear;
    this.selectYear = this.currentYear;
    if (this.currentYear === this.selectYear && this.form.value.groupName === this.currentGroupName) {
      this.disableSubmit =  true;
    }else if ((this.currentYear !== this.selectYear ||  (this.form.value.groupName !== ''
      && this.form.value.groupName !== this.currentGroupName))
      || (this.form.value.groupName !== '' && this.disableYearSelection === true)) {
      this.disableSubmit =  false;
    }else {
      this.disableSubmit =  true;
    }
  }

  groupNameChange(event) {
    this.disableSubmit =  false;
    this.duplicateEntry = false;
    if (this.currentYear === this.selectYear && this.form.value.groupName === this.currentGroupName) {
      this.disableSubmit =  true;
    }else {
      this.disableSubmit =  false;
    }
  }

  selectedIntity(event) {
  }
  // checkGroupName(event) {
  //   console.log(event.target.value);
  //   const checkEventValue = event.target.value;
  //   if (checkEventValue.trim() !== '') {
  //     this.disableSubmit = false;
  //   } else {
  //     this.disableSubmit = true;
  //   }
  // }
  clearModalData() {
    // this.ligialIntity = this.reservedLigialIntity;
    // this.getallIntityDetails();
    this.form.reset();
    $('input[id=test2]').prop('checked', true);
    this.changeGroup(false);
    // this.textAreaTextCount = '0';
  }

  selectedYear(selectedYear) {
    this.selectYear = selectedYear;
    if (this.currentYear === this.selectYear && this.form.value.groupName === this.currentGroupName) {
      this.disableSubmit =  true;
    }else {
      this.disableSubmit =  false;
    }
  }

  editPhysicalGroup(formValue) {
    this.isDataLoading = true;
    const physicalGroup = {
      groupName: formValue.groupName,
      cdsId: this.context.cdsId,
      year: this.selectYear,
      volumeStagingIds: this.context.editGroupStagingIdCollection,
      serviceCatalogId: this.context.serviceCatalogId,
      itmsNo: this.context.itmsNo,
      appName: this.context.appName
    }
    this._featureService.updateGroup(physicalGroup).then(data => {
      this.isDataLoading = false;
      let res=data['_body'];
      if (res  === "Bundle Name already exists") {
        this.duplicateEntry = true;
      }else {
        const toast = {
          type: 'success',
          title: 'Group updated successfully',

        };
        this._toasterService.pop(toast);
        this.dialog.close(true);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  closeModal() {
    this.dialog.close(true);
  }

  deleteSelectedGroup(formValue) {
      this.isDataLoading = true;
      const physicalGroup = {
        groupName: formValue.groupName,
        cdsId: this.context.cdsId,
        year: this.selectYear,
        volumeStagingIds: this.context.editGroupStagingIdCollection,
        serviceCatalogId: this.context.serviceCatalogId,
        itmsNo: this.context.itmsNo,
        appName: this.context.appName
      }
      this._featureService.deleteGroup(physicalGroup).then(data => {
        this.isDataLoading = false;
        const toast = {
          type: 'success',
          title: 'Group Deleted successfully'
        };
        this._toasterService.pop(toast);
        this.dialog.close(true);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });
    }
}

