import { Component, OnInit, ViewChild, OnChanges, SimpleChange, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { CheckBoxService, ConfermationAlertService } from '../../../../services';
import { AddLumpSumModalContext } from './add-lump-sum-modal.context'
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { ToasterService } from 'angular2-toaster';
declare var $: any;
declare var _: any;
@Component({
  selector: 'app-add-lump-sum-modal',
  templateUrl: './add-lump-sum-modal.component.html',
  styleUrls: ['./add-lump-sum-modal.component.scss'],
  providers: [FeatureService, CheckBoxService, ConfermationAlertService]
})
export class AddLumpSumModalComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('multiselectSkillData') multiselectSkillData;
  context: AddLumpSumModalContext;
  form: FormGroup;
  allSkill: any;
  AllRegions: any;
  AllServices: any;
  allLegal: any;
  regionId: number;
  skillTeamId: number;
  serviceCatalogueId: number;
  legalEntities: any = [];
  legalEntitiesSelcName: any = [];
  updatedLegalEntity: Array<object>;
  legalEntityCollection: Array<object>;
  confermYearSelect: number;
  confermHilightYear: number;
  highlightedYearSelected: number;
  isDataLoading: boolean;
  comments: any;
  statusId: number;
  volume: number;
  lsYear: number;
  allStatusData: any;
  volumeUFM: any;
  disableSubmit: boolean;
  selectedYear: number;
  showSave: boolean;
  addVolumeDetails;
  showSaveLegal: boolean;
  legalEntitiesCount: number;
  selectStatus;
  textAreaTextCount: string;
  CommentMandatory: boolean;
  checkOldValueflag: boolean;
  constructor(public dialog: DialogRef<AddLumpSumModalContext>,
    private _fb: FormBuilder, private _toasterService: ToasterService,
    private _featureService: FeatureService, private _CheckBoxService: CheckBoxService,
    private _confermationAlertService: ConfermationAlertService,
    private _storage: LocalStorageService) {
    this.updatedLegalEntity = [];
    this.multiselectSkillData = [];
    this.selectStatus = 0;
    this.CommentMandatory = true;
    this.checkOldValueflag = true;
    this.context = dialog.context;
    this.addVolumeDetails = this.context.allyears;
    this.highlightedYearSelected = this.context.highlightYear;
    this.selectedYear = this.context.selectedYear;
    this.allSkill = this.context.allSkill;
    this.AllRegions = this.context.allRegionsData;
    this.AllServices = this.context.AllServices;
    this.allLegal = this.context.allLegal;
    this.showSave = false;
    this.showSaveLegal = true;
  }
  ngOnInit() {
    this.form = this._fb.group({
      // 'baseline': ['', Validators.required],
      'volume': ['', Validators.required],
      'comments': ['', Validators.required],
      'statusId': ['', Validators.required],
      'regionMap': ['', Validators.required],
      'skillsMap': ['', Validators.required],
      'serviceMap': ['']
    });
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
    this.allStatusData = [{
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
      id: 4,
      name: 'Rejected',
      units: null
    }, {
      id: 5,
      name: 'Committed',
      units: null
    }]
    this.allStatusData = _.sortBy(this.allStatusData, ['name']);
    _.remove(this.allStatusData, item => item.id === 0);
    if (this.context.imAdmin === false) {
      _.remove(this.allStatusData, item => item.id === 5);
      if (this.context.approveAccess === false) {
        _.remove(this.allStatusData, item => item.id === 3);
      }
    }
    if (this.context.edit === false) {
      _.remove(this.allStatusData, item => item.id === 4);
    } else {
      this.volumeUFM = this.context.selectedRowEdit['volumeUFM'];
      this.form.patchValue({
        'volume': this.context.selectedRowEdit['volume'],
        'comments': this.context.selectedRowEdit['comments'],
        'statusId': Number(this.context.selectedRowEdit['statusId']),
        'regionMap': Number(this.context.selectedRowEdit['regionId']),
        'skillsMap': Number(this.context.selectedRowEdit['skillTeamId']),
        'serviceMap': Number(this.context.selectedRowEdit['serviceCatalogueId'])
      });
      if (this.context.imAdmin === false) {
        if (this.context.approveAccess === false) {
          this.form.patchValue({
            'statusId': 2,
          });
        }
      }
      this.getEntityCollectionOnEdit(this.context.selectedRowEdit['legalEntities']);
      if (this.context.selectedRowEdit['legalEntities'].length > 0) {
        this.legalEntitiesCount = this.context.selectedRowEdit['legalEntities'].length;
      } else {
        this.legalEntitiesCount = null;
      }
    }
  }
  resetService() {
    this.form.controls['serviceMap'].reset();
  }
  selectedServiceDetails(selectedRow, selectedYear, alert) {
    this.confermYearSelect = selectedYear
    this.confermHilightYear = selectedRow
    if (this.context.heading === 'Edit Lump Sum') {
      this.showSave = false;
      this.highlightedYearSelected = selectedRow;
      this.selectedYear = selectedYear;
    } else {
      if (alert) {
        this.showSave = true;
      } else {
        this.showSave = false;
        // this.selectStatus = 0;
        this.highlightedYearSelected = selectedRow;
        this.selectedYear = selectedYear;
        // this.clearAddFormData();
        // this.clearAllSelected()
        // this.getSelectedYearData(selectedYear)
      }
    }
  }
  stay() {
    this.showSave = false;
  }
  leave() {
    this.selectedYear = this.confermYearSelect;
    this.highlightedYearSelected = this.confermHilightYear
    this.showSave = true;
    this.selectedServiceDetails(this.highlightedYearSelected, this.selectedYear, false);
    this.clearAddFormData();
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
    }
  }
  getEntityCollectionOnEdit(entityIdCollection) {
    _.forEach(entityIdCollection, (element, i) => {
      const getSelectedEntity = _.find(this.allLegal, data => {
        return data.id === element;
      });
      this.legalEntitiesSelcName.push(getSelectedEntity.name);
      this.legalEntities.push(getSelectedEntity.id)
    });
    if (this.legalEntities.length === 0) {
      this.showSaveLegal = true;
    } else {
      this.showSaveLegal = false;
    }
  }
  selectedLegalStatus(e) {
    if (e.selected) {
      const getSelectedEntity = _.find(this.legalEntities, (element) => {
        return element === e.id;
      });
      if (!getSelectedEntity) {
        this.legalEntities.push(e.id);
        this.legalEntitiesCount = this.legalEntities.length;
        this.legalEntitiesSelcName.push(e.name);
      }
      // this.legalEntityCollection.push(e);
    } else {
      _.remove(this.legalEntitiesSelcName, element => element === e.name);
      _.remove(this.legalEntities, element => element === e.id);
      this.legalEntitiesCount = this.legalEntities.length;
    }
    if (this.legalEntities.length === 0) {
      this.showSaveLegal = true;
    } else {
      this.showSaveLegal = false;
    }
  }
  removeSelectedRegion(item, legalentity) {
    this.checkOldValueflag = false;
    let ligalEntityName;
    let ligalEntityId;
    _.forEach(this.allLegal, (element) => {
      if (element.name === item) {
        ligalEntityName = element.name;
        ligalEntityId = element.id
      }
    })
    // const index = this.legalEntitiesSelcName.indexOf(item);
    _.remove(this.legalEntitiesSelcName, element => element === ligalEntityName);
    _.remove(this.legalEntities, element => element === ligalEntityId);
    // this.legalEntitiesSelcName.splice(index, 1);
    // const lastData = this.legalEntities[index];
    // this.legalEntities.splice(index, 1);
    if (this.legalEntities.length >= 1) {
      // _.forEach(this.legalEntities, (element) => {
      _.forEach(this.multiselectSkillData.listData, (list) => {
        if (ligalEntityId === list.id) {
          list.selected = false;
        }
      })
      // })
      this.legalEntitiesCount = this.legalEntities.length;
    } else {
      _.forEach(this.multiselectSkillData.listData, (list) => {
        list.selected = false;
      })
      this.legalEntitiesCount = null;
    }
    if (this.legalEntities.length === 0) {
      this.showSaveLegal = true;
    } else {
      this.showSaveLegal = false;
    }
  }
  volumeUnit(event, services) {
    // this.volumeUFM = _.find(services, {event});
    // this.volumeUFM = this.findObjectByKey(services, 'id', event)
    const sortedValue = _.find(services, { id: event });
    this.volumeUFM = sortedValue.units;
  }
  addlumsum(legalEntites) {
    this.isDataLoading = true;
    const formData = {
      'cdsId': this._storage.get('cdsId'),
      'comments': this.form.value.comments,
      'regionId': this.form.value.regionMap,
      'skillTeamId': this.form.value.skillsMap,
      'serviceCatalogueId': this.form.value.serviceMap,
      'legalEntities': this.legalEntities,
      'statusId': this.form.value.statusId,
      'volume': this.form.value.volume,
      'lsYear': this.selectedYear
    }
    if (!this.context.edit) {
      const reqData = [];
      reqData.push(formData);
      this._featureService.AddNewlumpsums(reqData).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        this.clearAddFormData();
        const toast = {
          type: 'success',
          title: 'Lump sum added successfully',
        };
        this._toasterService.pop(toast);
      }, error => {
        this.isDataLoading = false;
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
      });
    } else {
      this.isDataLoading = true;
      formData['lumpSumpsId'] = this.context.selectedRowEdit['lumpSumpsId']
      const reqData = [];
      reqData.push(formData);
      this._featureService.updateLumpSums(reqData).then(data => {
        this.isDataLoading = false;
        this.dialog.close(true);
        this.clearAddFormData();
        const toast = {
          type: 'success',
          title: 'Lump sum updated successfully',
        };
        this._toasterService.pop(toast);
      }, error => {
        this.isDataLoading = false;
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
      });
    }
  }
  clearCheckboxOfLigalentity() {
    _.forEach(this.multiselectSkillData.listData, (list) => {
      delete list.selected
    })
  }
  clearAddFormData() {
    this.clearCheckboxOfLigalentity();
    this.form.reset();
    this.legalEntitiesSelcName = [];
    this.updatedLegalEntity = []
    this.regionId = null;
    this.skillTeamId = null;
    this.serviceCatalogueId = null;
    this.textAreaTextCount = '0';
    this.legalEntitiesCount = null;
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    // if (changes['multiselectSkillData'] !== undefined) {
    //   if (this.context.selectedRowEdit['legalEntities'].length >= 1) {
    //     _.forEach(this.context.selectedRowEdit['legalEntities'], (element) => {
    //       _.forEach(this.multiselectSkillData.listData, (list) => {
    //         if (element === list.id) {
    //           list.selected = true;
    //           return false;
    //         }
    //       })
    //     })
    //     this.legalEntitiesCount = this.context.selectedRowEdit['legalEntities'].length
    //   }
    // }
  }
  ngAfterViewInit() {
    if (this.legalEntities.length >= 1 && this.checkOldValueflag) {
      _.forEach(this.context.selectedRowEdit['legalEntities'], (element) => {
        _.forEach(this.multiselectSkillData.listData, (list) => {
          if (element === list.id) {
            list.selected = true;
          }
        })
      })
    }
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
    // if (!this.context.edit) {
    //   this.clearCheckboxOfLigalentity();
    // }
  }
}
