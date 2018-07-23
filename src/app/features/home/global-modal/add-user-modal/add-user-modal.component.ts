import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { AddUserModalContext } from './add-user-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services';
declare var _: any;
declare var $: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class AddUserModalComponent implements OnInit {
  context: AddUserModalContext;
  heading: string;
  form: FormGroup;
  ligialIntity;
  selectIntity;
  selectedIntityData: object;
  latestSeletedId: number;
  reservedLigialIntity: Array<object>;
  normalLigialIntity: Array<object>;
  restrictedLigialIntity: Array<object>;
  reservedNormalLigialIntity = [];
  reservedRestrictedLigialIntity = [];
  dissableNegotiatedAmount: boolean;
  textAreaTextCount: string;
  isDataLoading: boolean;
  filteredLigalIntityData;
  disableDropdown: boolean;
  IntityCollection: any;
  dropDownDefaultTextColor: boolean;
  disableSubmit: boolean;
  isSelected: boolean;
  removeAdd: boolean;
  checkChecked: boolean;
  CommentMandatory: boolean;
  nonRestrictedLegalEntity: Array<object>;
  allLegalEntities: Array<object>;
  enableAddRemoved: boolean;
  negotiateAmtError: boolean;
  constructor(public dialog: DialogRef<AddUserModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    this.IntityCollection = [];
    this.restrictedLigialIntity = [];
    this.normalLigialIntity = [];
    this.heading = 'Add New User';
    this.context = dialog.context;
    this.nonRestrictedLegalEntity = [];
    this.allLegalEntities = [];
    this.isSelected = false;
    this.dissableNegotiatedAmount = true;
    this.disableSubmit = true;
    this.disableDropdown = false;
    this.selectIntity = null;
    this.ligialIntity = this.context.allLigialIntity;
    this.removeAdd = true;
    this.CommentMandatory = true;
    this.enableAddRemoved = false;
    this.negotiateAmtError = false;
  }

  ngOnInit() {
    this.form = this._fb.group({
      'legalEntityID': ['', Validators.required],
      'negotiatedAmount': ['', Validators.required],
      'comments': ['', Validators.required]
    });
    this.filterLigalIntity();
    this.form.controls['negotiatedAmount'].disable();
    if (this.context.addAgain) {
      // this.filteredLigalIntityData = this.context.allLigalEntityWithoutFilter;
      this.filteredLigalIntityData = [{
        legalEntityID: this.context.legalEntity.legalEntityId,
        legalEntity: this.context.legalEntity.legalEntityName,
      }];
      if (this.context.legalEntity.legalEntityType === 'Restricted') {
        this.form.controls['negotiatedAmount'].enable();
      }
      this.selectIntity = this.context.legalEntity.legalEntityId;
      this.disableDropdown = true;
      this.disableSubmit = false;
    }
    // function simulateESCKeyPress() {
    //   $.event.trigger({ type: 'keypress', which: 27 });
    // }
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
      // const e = $.Event('keyup'); // or keypress/keydown
      // e.keyCode = 27; // for Esc
      // $(document).trigger(e); // trigger it on document
    });
    // Esc key action
    // $(document).keyup(function (e) {
    //   if (e.keyCode === 27) { // Esc
    //     window.close(); // or whatever you want
    //   }
    // });
  }
  filterLigalIntity() {
    this.allLegalEntities = _.sortBy(this.ligialIntity, ['legalEntity'])
    _.forEach(this.ligialIntity, (data) => {
      if (data.restrictedLegalEntity === true) {
        this.restrictedLigialIntity.push(data)
        this.restrictedLigialIntity = _.sortBy(this.restrictedLigialIntity, ['legalEntity']);
        // this.reservedRestrictedLigialIntity = _.cloneDeep(this.normalLigialIntity);
      } else if (data.restrictedLegalEntity === false) {
        this.normalLigialIntity.push(data)
        this.normalLigialIntity = _.sortBy(this.normalLigialIntity, ['legalEntity']);
        // this.reservedNormalLigialIntity = _.cloneDeep(this.normalLigialIntity);
      }
    });
    this.filteredLigalIntityData = _.cloneDeep(this.normalLigialIntity);
    this.nonRestrictedLegalEntity = _.cloneDeep(this.normalLigialIntity);
    // this.filteredLigalIntityData = _.sortBy(this.filteredLigalIntityData, ['legalEntityID'])
  }

  updateValue(event, cell) {
    const negotiate = event.target.value.trim();
    this.negotiateAmtError = false;
    if(cell === "negotiatedAmount" && (negotiate === "0" || negotiate === 0)){
      this.negotiateAmtError = true;
    }
  }

  onCheckboxChangeFn(event) {
    this.selectIntity = null;
    this.form.reset();
    this.form.controls['negotiatedAmount'].disable();
    this.form.controls['negotiatedAmount'].reset();
    this.textAreaTextCount = '0';
    this.dropDownDefaultTextColor = false;
    let checkedData;
    checkedData = [];
    this.checkChecked = event.target.checked;
    if (this.checkChecked) {
      let allLigalEntity
      // _.forEach(this.restrictedLigialIntity, item => {
      //   this.filteredLigalIntityData.push(item);
      // })
      if (this.reservedNormalLigialIntity.length > 0) {
        if (this.reservedRestrictedLigialIntity.length > 0) {
          allLigalEntity = _.concat(this.reservedNormalLigialIntity, this.reservedRestrictedLigialIntity)
        } else {
          allLigalEntity = _.concat(this.reservedNormalLigialIntity, this.restrictedLigialIntity)
        }
        this.filteredLigalIntityData = _.sortBy(allLigalEntity, ['legalEntity']);
      } else {
        this.filteredLigalIntityData = this.allLegalEntities;
      }
    } else {
      if (this.reservedNormalLigialIntity.length > 0) {
        this.filteredLigalIntityData = _.sortBy(this.reservedNormalLigialIntity, ['legalEntity']);
      } else {
        this.filteredLigalIntityData = this.nonRestrictedLegalEntity;
      }
      // this.filteredLigalIntityData = _.sortBy(this.filteredLigalIntityData, ['legalEntity'])
    }
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
  addUsage(value: any) {
    if (this.context.addAgain) {
      this.getIntityCollection();
    }
    this.disableSubmit = true;
    this.isDataLoading = true;
    this.enableAddRemoved = true;
    this.form.controls['comments'].disable();
    if (this.context.addAgain) {
      this._featureService.updateUser(this.IntityCollection).then(data => {
        this.dialog.close(true);
        const toast = {
          type: 'success',
          title: 'User(s) added successfully',

        };
        this._toasterService.pop(toast);
        this.IntityCollection.forEach(element => {
          delete element.legalEntity;
        });
        this.isDataLoading = true;
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });
    } else {
      this._featureService.addUsage(this.IntityCollection).then(data => {
        this.dialog.close(true);
        const toast = {
          type: 'success',
          title: 'User(s) added successfully',

        };
        this._toasterService.pop(toast);
        this.IntityCollection.forEach(element => {
          delete element.legalEntity;
        });
        this.isDataLoading = true;
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });
    }
    // this.dialog.close(true);
  }
  // getallIntityDetails() {
  //   this._featureService.getLigialIntity().then(data => {
  //     this.ligialIntity = data
  //     this.reservedLigialIntity = data;
  //     this.ligialIntity = _.sortBy(this.ligialIntity, ['legalEntityID']);
  //     console.log(data);
  //   }, error => {
  //     console.log(error)
  //   });
  // }
  selectedIntity(id) {
    this.latestSeletedId = id;
    let selected;
    selected = _.find(this.filteredLigalIntityData, data => {
      return data.legalEntityID === id;
    });
    this.selectedIntityData = selected;
    if (this.selectedIntityData) {
      if (this.selectedIntityData['restrictedLegalEntity'] === true) {
        this.form.controls['negotiatedAmount'].enable();
      } else if (this.context.addUserId !== undefined && this.context.addUserId.legalEntityType === 'Restricted') {
        this.form.controls['negotiatedAmount'].enable();
      } else {
        this.form.controls['negotiatedAmount'].disable();
        this.form.controls['negotiatedAmount'].reset();
      }
    }
  }
  getIntityCollection() {
    if (this.selectedIntityData) {
      this.reservedNormalLigialIntity = [];
      this.reservedRestrictedLigialIntity = [];
      let dataCollection;
      dataCollection = {};
      dataCollection['cdsId'] = this._storage.get('cdsId');
      dataCollection['negotiatedAmount'] = this.form.value.negotiatedAmount;
      dataCollection['comments'] = this.form.value.comments;
      if (this.context.addAgain) {
        dataCollection['itmsId'] = this.context.legalEntity.itmsId;
        dataCollection['usageId'] = this.context.legalEntity.usageId;
        dataCollection['statusId'] = null;
        this.removeAdd = false;
      } else {
        dataCollection['itmsId'] = this.context.addUserId;
        this.removeAdd = true;
      }
      dataCollection['legalEntityId'] = this.selectedIntityData['legalEntityID'];
      dataCollection['legalEntity'] = this.selectedIntityData['legalEntity'];
      dataCollection['restrictedLegalEntity'] = this.selectedIntityData['restrictedLegalEntity'];
      dataCollection['pick1Filter'] = this.selectedIntityData['pick1Filter'];

      this.IntityCollection.push(dataCollection);
      _.remove(this.filteredLigalIntityData, item => item.legalEntityID === this.latestSeletedId);
      if (dataCollection.pick1Filter !== '') {
        _.remove(this.filteredLigalIntityData, item => item.pick1Filter === dataCollection.pick1Filter);
      }
      _.forEach(this.filteredLigalIntityData, (data) => {
        if (data.restrictedLegalEntity === true) {
          this.reservedRestrictedLigialIntity.push(data);
          this.reservedRestrictedLigialIntity = _.sortBy(this.reservedRestrictedLigialIntity, ['legalEntity']);
        } else if ((data.restrictedLegalEntity === false)) {
          this.reservedNormalLigialIntity.push(data);
          this.reservedNormalLigialIntity = _.sortBy(this.reservedNormalLigialIntity, ['legalEntity']);
        }
      });
      this.filteredLigalIntityData = this.reservedNormalLigialIntity;
      this.selectIntity = null;
      dataCollection = {};
      this.selectedIntityData = [];
      this.form.reset();
      this.isSelected = false;
      this.disableSubmit = false;
      this.dropDownDefaultTextColor = false;
      this.form.controls['negotiatedAmount'].disable();
      this.textAreaTextCount = null;
      $('input[id=checkbox]').prop('checked', false);
    }
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]'
    });
  }
  removeFromSelected(removedData) {
    this.form.reset();
    let addToRestrictedAgain;
    let addToNoramlAgain;
    let restrictedDataWithSamePickone;
    let normalDataWithSamePickone;
    addToRestrictedAgain = _.find(this.restrictedLigialIntity, data => {
      return data.legalEntityID === removedData.legalEntityId;
    });
    addToNoramlAgain = _.find(this.normalLigialIntity, data => {
      return data.legalEntityID === removedData.legalEntityId;
    });
    if (removedData.pick1Filter !== '') {
      restrictedDataWithSamePickone = [];
      normalDataWithSamePickone = [];
      _.forEach(this.restrictedLigialIntity, data => {
        if (data.pick1Filter === removedData.pick1Filter) {
          restrictedDataWithSamePickone.push(data)
        }
      });
      _.forEach(this.normalLigialIntity, data => {
        if (data.pick1Filter === removedData.pick1Filter) {
          normalDataWithSamePickone.push(data)
        }
      });
    }
    if (addToRestrictedAgain && restrictedDataWithSamePickone) {
      this.reservedRestrictedLigialIntity = _.concat(this.reservedRestrictedLigialIntity, restrictedDataWithSamePickone);
    } else if (addToRestrictedAgain) {
      this.reservedRestrictedLigialIntity.push(addToRestrictedAgain);
    }
    if (addToNoramlAgain && normalDataWithSamePickone) {
      this.reservedNormalLigialIntity = _.concat(this.reservedNormalLigialIntity, normalDataWithSamePickone);
    } else if (addToNoramlAgain) {
      this.reservedNormalLigialIntity.push(addToNoramlAgain);
    }
    _.remove(this.IntityCollection, item => item.legalEntityId === removedData.legalEntityId);
    this.filteredLigalIntityData = _.sortBy(this.reservedNormalLigialIntity, ['legalEntity']);
    // not a proper way work on it again
    $('input[id=checkbox]').prop('checked', false);
    if (this.IntityCollection.length === 0) {
      this.disableSubmit = true;
    } else {
      this.disableSubmit = false;
    }
    // this.IntityCollection  =  this.IntityCollection.filter(function ( obj ) {
    //   return  obj.legalEntityId  !==  id;
    // })
    // _.remove(this.normalLigialIntity, item => item.legalEntityId === id);
    // this.filterLigalIntity();
    // console.log(this.ligialIntity);
  }
  clearModalData() {
    // this.ligialIntity = this.reservedLigialIntity;
    // this.getallIntityDetails();
    this.form.controls['negotiatedAmount'].reset();
    this.form.controls['negotiatedAmount'].disable();
    this.form.controls['comments'].reset();
    this.textAreaTextCount = '0';
    $('input[id=checkbox]').prop('checked', false);
    if (!this.context.addAgain) {
      this.form.controls['legalEntityID'].reset();
      this.selectIntity = null;
      this.IntityCollection = [];
      this.filteredLigalIntityData = [];
      this.normalLigialIntity = [];
      this.restrictedLigialIntity = [];
      this.reservedNormalLigialIntity = [];
      this.reservedRestrictedLigialIntity = [];
      this.filterLigalIntity();
    }
  }
  closeModal() {
    this.dialog.close(true);
  }
}
