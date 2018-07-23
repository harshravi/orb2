import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { AddLegalPhysicalEntityModalContext } from './add-legal-physical-entity-modal.context';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../../services/commonService';
declare var _: any;
declare var $: any;

@Component({
  selector: 'app-add-legal-physical-entity-modal',
  templateUrl: './add-legal-physical-entity-modal.component.html',
  styleUrls: ['./add-legal-physical-entity-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class AddLegalPhysicalEntityModalComponent implements OnInit {
  context: AddLegalPhysicalEntityModalContext;
  heading: string;
  form: FormGroup;
  ligialIntity;
  selectIntity;
  selectSkill;
  selectedIntityData: object;
  latestSeletedId: number;
  reservedLigialIntity: Array<object>;
  normalLigialIntity: Array<object>;
  restrictedLigialIntity: Array<object>;
  dropDownDefaultTextColor: boolean;
  selectedSkillData;
  latestSeletedSkillId;
  reservedNormalLigialIntity = [];
  reservedRestrictedLigialIntity = [];
  allLegalEntities;
  nonRestrictedLegalEntity;
  allLigalEntity: Array<object>;
  allSkill: Array<object>;
  dissableNegotiatedAmount: boolean;
  textAreaTextCount: string;
  isDataLoading: boolean;
  filteredLigalIntityData;
  filteredSkillData;
  disableDropdown: boolean;
  checkChecked: boolean;
  IntityCollection: any;
  disableSubmit: boolean;
  isSelected: boolean;
  nonRestictedLegalEntity;
  constructor(public dialog: DialogRef<AddLegalPhysicalEntityModalContext>,
    private _storage: LocalStorageService,
    private _fb: FormBuilder,
    private _confermationAlertService: ConfermationAlertService,
    private _toasterService: ToasterService,
    private _featureService: FeatureService) {
    this.IntityCollection = [];
    this.restrictedLigialIntity = [];
    this.normalLigialIntity = [];
    this.heading = 'Add Legal Entity';
    this.context = dialog.context;
    this.isSelected = true;
    this.dissableNegotiatedAmount = true;
    this.disableSubmit = true;
    this.disableDropdown = false;
    this.selectIntity = null;
    this.ligialIntity = this.context.allLigialIntity;
    this.allSkill = this.context.allSkills;
    this.nonRestictedLegalEntity = [];
    // this.selectSkill = this.context.addVolumeHeader['skillTeamName'];
  }

  ngOnInit() {
    this.form = this._fb.group({
      'legalEntityID': ['', Validators.required],
      'skillId': ['', Validators.required],
    });
   // this.getallLegalEntity();
    this.filterSkillData()
    // this.form.controls['negotiatedAmount'].disable();
    // if (this.context.addAgain) {
    // this.filteredLigalIntityData = this.ligialIntity;
    //   this.selectIntity = this.context.addUserId.legalEntityId;
    //   this.disableDropdown = true;
    //   this.disableSubmit = false;
    // }
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
  }

  getallLegalEntity() {
    this.isDataLoading = true;
    const reqst = {
      'itmsId': this.context.itmsId
    }
    this._featureService.getServiceLigialIntity(reqst).then(data => {
      this.isDataLoading = false;
      this.filteredLigalIntityData = data;
      this.filterLigalIntity();
    }, error => {
      console.log(error)
    });
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
    // this.filteredLigalIntityData = _.cloneDeep(this.normalLigialIntity);
    const allLegalEntity = _.concat(this.restrictedLigialIntity, this.normalLigialIntity);
    this.filteredLigalIntityData = _.sortBy(allLegalEntity, ['legalEntity']);
    this.nonRestrictedLegalEntity = _.cloneDeep(this.normalLigialIntity);
    // this.filteredLigalIntityData = _.sortBy(this.filteredLigalIntityData, ['legalEntityID'])
  }
  filterSkillData() {
    const reqst = {
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.getAllSkillTeam(reqst).then(data => {
      this.isDataLoading = false;
      this.filteredSkillData = data;
    }, error => {
      console.log(error)
    });
    // this.filteredSkillData = this.allSkill;
    // this.filteredSkillData = _.sortBy(this.filteredSkillData, ['name']);
  }
  addLegalEntity(value: any) {
    this.disableSubmit = true;
    this.isDataLoading = true;
    const reqData = _.map(this.IntityCollection, function (row, index) {
      return _.omit(row, ['id', 'skill_name', 'legalEntity']);
    });
    this._featureService.addServiceLegalEntity(reqData).then(data => {
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
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error);
    });
    // this.dialog.close(true);
  }
  onCheckboxChangeFn(event) {
    this.isSelected = !this.isSelected;
    this.selectIntity = null;
    this.form.controls['legalEntityID'].reset();
    this.textAreaTextCount = '0';
    this.dropDownDefaultTextColor = false;
    let checkedData;
    checkedData = [];
    this.checkChecked = event.target.checked;
    this.filteredLigalIntityData = this.allLigalEntity;
    this.getFilteredLegalEntity(this.selectSkill);
  }
  selectedIntity(id) {
    this.latestSeletedId = id;
    let selected;
    selected = _.find(this.filteredLigalIntityData, data => {
      return data.legalEntityID === id;
    });
    this.selectedIntityData = selected;
  }
  selectedSkill(id) {
    const reqst = {
      'serviceCatalogId': this.context.serviceCatalogId,
      'itmsNo' : this.context.itmsNo,
      'appName' : this.context.appName,
      'skillTeamId' : id
      }
    this._featureService.getServiceLigialIntity(reqst).then(data => {
      this.allLegalEntities = null;
      this.allLegalEntities = data;
      this.filteredLigalIntityData = null;
      this.form.controls['legalEntityID'].reset();
      this.filteredLigalIntityData = data;
      this.getFilteredLegalEntity(id);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
    this.latestSeletedSkillId = id;
    let selected;
    selected = _.find(this.filteredSkillData, data => {
      return data.id === id;
    });
    this.selectedSkillData = selected;
  }
  getIntityCollection() {
    if (this.selectedIntityData) {
      this.reservedNormalLigialIntity = [];
      this.reservedRestrictedLigialIntity = [];
      let dataCollection;
      dataCollection = {};
      dataCollection['cdsId'] = this._storage.get('cdsId');
      dataCollection['itmsId'] = this.context.itmsId;
      dataCollection['itmsNo'] = this.context.itmsNo;
      dataCollection['appName'] = this.context.appName;
      dataCollection['legalEntityId'] = this.selectedIntityData['legalEntityID'];
      dataCollection['skillTeamId'] = this.selectedSkillData['id'];
      dataCollection['skill_name'] = this.selectedSkillData['name'];
      dataCollection['legalEntity'] = this.selectedIntityData['legalEntity']
      dataCollection['serviceCatalogId'] = this.context.serviceCatalogId;
      dataCollection['year'] = this.context.selectedYear;
      dataCollection['restrictedLegalEntity'] = this.selectedIntityData['restrictedLegalEntity'];
      dataCollection['pick1Filter'] = this.selectedIntityData['pick1Filter'];
      this.IntityCollection.push(dataCollection);
      this.filteredLigalIntityData = this.allLegalEntities;
      this.getFilteredLegalEntity(this.selectSkill);
      this.selectIntity = null;
      dataCollection = {};
      this.selectedIntityData = [];
      this.dropDownDefaultTextColor = false;
      this.form.controls['legalEntityID'].reset();
       this.disableSubmit = false;
      }
    }
  removeFromSelected(legalEntityid, skillTeamid) {
    _.remove(this.IntityCollection, (obj => legalEntityid === obj.legalEntityId && skillTeamid === obj.skillTeamId));
    this.filteredLigalIntityData = this.allLegalEntities;
    this.getFilteredLegalEntity(skillTeamid);
    if (this.IntityCollection.length === 0) {
      this.disableSubmit = true;
    } else {
      this.disableSubmit = false;
    }
  }
  clearModalData() {
    this.form.controls['legalEntityID'].reset();
    this.form.controls['skillId'].reset();
    $('input[id=checkbox]').prop('checked', true);
    this.IntityCollection = [];
    this.selectIntity = null;
    this.filteredLigalIntityData = [];
    this.normalLigialIntity = [];
    this.restrictedLigialIntity = [];
    this.reservedNormalLigialIntity = [];
    this.reservedRestrictedLigialIntity = [];
    this.disableSubmit = true;
    this.filterLigalIntity();
  }
  saveUser() {

  }
  closeModal() {
    this.dialog.close(true);
  }
  getFilteredLegalEntity(id){
    if (this.IntityCollection.length > 0) {
      let intityCollectionTemp = _.cloneDeep(this.IntityCollection);
      intityCollectionTemp = intityCollectionTemp.filter(obj => id === obj.skillTeamId)
      for (let i = 0; i < intityCollectionTemp.length; i++) {
        this.filteredLigalIntityData = this.filteredLigalIntityData.filter
        ( obj => obj.legalEntityID !== intityCollectionTemp[i].legalEntityId);
      if (intityCollectionTemp[i].pick1Filter !== '') {
        this.filteredLigalIntityData = this.filteredLigalIntityData.filter
        (obj => obj.pick1Filter !== intityCollectionTemp[i].pick1Filter);
        }
      }
    }
    this.allLigalEntity = this.filteredLigalIntityData;
    this.nonRestictedLegalEntity = _.cloneDeep(this.filteredLigalIntityData);
      this.nonRestictedLegalEntity = this.nonRestictedLegalEntity.filter(obj => obj.restrictedLegalEntity !== true);
      this.nonRestictedLegalEntity = _.sortBy(this.nonRestictedLegalEntity, ['legalEntity']);
    if (!this.isSelected) {
      this.filteredLigalIntityData = this.nonRestictedLegalEntity;
    }else {
     this.filteredLigalIntityData = _.sortBy(this.filteredLigalIntityData, ['legalEntity']);
    }

  }
}

