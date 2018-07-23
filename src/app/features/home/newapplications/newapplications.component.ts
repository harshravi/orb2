import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FeatureService } from '../../../../app/services/featureServices/feature.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../services';
declare var _: any;
@Component({
  selector: 'app-newapplications',
  templateUrl: './newapplications.component.html',
  styleUrls: ['./newapplications.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class NewapplicationsComponent implements OnInit {
  form: FormGroup;
  allRegions: Array<object>;
  allSkill: any;
  allLegal: any;
  reservedLigalEntity: any;
  nonRestrictedLegalEntities: any;
  allITMS: any;
  disableSubmit: boolean;
  selectedSkills: number;
  legalEntitiesCount: number;
  searchedData: any;
  typehead = false;
  allSkillList;
  addAppButtonStatus: boolean;
  @ViewChild('itmsapps') itmsapps: ElementRef;
  @ViewChild('legal') legal;
  @ViewChild('typeahead') typeahead;
  multiSelectedLegal = [];
  addedApp: boolean;
  selectedSkillID;
  selectedRegionID;
  typeheadNoResult: boolean;
  applicationID: number;
  validLegalEntity: boolean;
  applicationName: any;
  errorMessage: any;
  selectedLegalIDs = [];
  selectedLegalNames = [];
  selectedLegalEntity = [];
  actionPermission;
  noaccesspage: boolean;
  userSkilllist: any;
  constructor(private _featureService: FeatureService, private _fb: FormBuilder, private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _storage: LocalStorageService) {
    const authPermission = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.actionPermission = JSON.parse(authPermission);
    this.legalEntitiesCount = null;
    this.getCurrentSkillList();
    this.getLegal();
    this.getITMS();
    this.getSkill();
    this.nonRestrictedLegalEntities = [];
    this.validLegalEntity = false;
  }

  ngOnInit() {
    this.getRegions();
    this.form = this._fb.group({
      'applicationEntityID': ['', Validators.required],
      'skillEntityID': ['', Validators.required],
      'regionsEntityID': ['', Validators.required]
    });
    this.addAppButtonStatus = true;
    this.typeheadNoResult = false;
    this.addedApp = false;
    const noaccesspageobj = this.actionPermission.filter(obj => obj.name === 'Add New Application');
    this.noaccesspage = noaccesspageobj[0].approve;
    if (this.noaccesspage) {
      localStorage.setItem('showSaveRibon', 'true');
    } else {
      localStorage.setItem('showSaveRibon', 'false');
    }
  }

  getRegions() {
    this._featureService.getRegionList().then(data => {
      this.allRegions = data;
      this.allRegions = _.sortBy(this.allRegions, ['region']);
    }, error => {
      // this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }

  getSkill() {
    this._featureService.getSkillList().then(data => {
      this.allSkill = data;
      this.allSkill = _.sortBy(this.allSkill, ['name']);
    }, error => {
      // this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }

  getLegal() {
    this._featureService.getLegalEntity().then(data => {
      // console.log('data', data);
      _.forEach(_.cloneDeep(data), (element) => {
        if (element.restrictedLegalEntity !== true) {
          this.nonRestrictedLegalEntities.push(element);
        }
      })
      this.allLegal = _.sortBy(_.cloneDeep(this.nonRestrictedLegalEntities), ['legalEntity']);
      this.reservedLigalEntity = _.cloneDeep(this.allLegal);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }

  getITMS() {
    this._featureService.getITMSDetails().then(data => {
      if (data['_body'] === '') {
        this.allITMS = null;
      } else {
        this.allITMS = JSON.parse(data['_body']);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }

  getCurrentSkillList() {
    const tableData = {
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.getDashboardDetails(tableData).then(data => {
      const list = data.userDetails[0];
      this.userSkilllist = list.skillTeam;
      const dashboardSkilllist = this.allSkill;
      const newList = [];
      for (let i = 0; i < list.skillTeam.length; i++) {
        if (list.skillTeam[i] !== 'All') {
          const filteredlist = dashboardSkilllist.filter(obj => obj.name.toLocaleLowerCase() === list.skillTeam[i].toLocaleLowerCase());
          newList.push(filteredlist[0]);
          this.allSkillList = newList;
        } else {
          this.allSkillList = this.allSkill;
        }
      }
      console.log(this.allSkill)
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }

  updateApplicationName(x) {
    this.applicationID = x.app_No;
    this.itmsapps.nativeElement.value = x.app_No + ' ' + x.app_Name;
    this.form.value.applicationEntityID = x.app_No + ' ' + x.app_Name;
    this.applicationName = x.app_Name;
    if (this.typeahead) {
      this.typeahead.nativeElement.style.display = 'none';
    }
    this.AppButtonStatus();
  }
  AppButtonStatus() {
    this.addAppButtonStatus = this.applicationName && this.selectedSkillID &&
      this.selectedRegionID && this.selectedLegalIDs.length >= 1 ? false : true;
  }
  enableType(e) {
    const searchText = this.form.value.applicationEntityID;
    if (searchText) {
      if (e.code === 'Backspace' && this.applicationName !== undefined) {
        if (this.typeahead) {
          this.typeahead.nativeElement.style.display = 'none';
          this.typeahead = false;
        }
        this.form.controls['applicationEntityID'].reset();
      } else if (searchText.length >= 1) {
        if (this.typeahead) {
          this.typeahead.nativeElement.style.display = 'block';
        }
        this.typeheadNoResult = this.searchedData.length >= 1 ? false : true;
      } else {
        this.typehead = false;
        this.applicationName = '';
        this.AppButtonStatus();
      }
    }
  }

  autoSearch() {
    const searchText = this.form.value.applicationEntityID;
    if (searchText.length >= 1) {
      if (isNaN(searchText)) {
        const temp = this.allITMS.filter(function (d) {
          if (d.app_Name != null) {
            return d.app_Name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 || !searchText.toLocaleLowerCase();
          }
        });
        this.searchedData = temp;
      } else {
        const temp = this.allITMS.filter(d => d.app_No.toString().indexOf(searchText) !== -1 || !searchText);
        this.searchedData = temp;
      }
      this.typehead = true;
      this.typeheadNoResult = this.searchedData.length >= 1 ? false : true;

    } else {
      this.typeheadNoResult = false;
      this.searchedData.splice(0, this.searchedData.length);
    }
    this.AppButtonStatus();
  }

  selectedSkill(e) {
    this.typehead = false;
    this.selectedSkillID = e;
    this.AppButtonStatus();
  }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.typehead = false;
  }

  selectedRegion(e) {
    this.selectedRegionID = e;
    this.typehead = false;
    this.AppButtonStatus();
  }
  storeSelectedEntity(e, legal) {
    if (legal._CheckBoxService.selected.selected) {
      this.selectedLegalEntity.push(e.legalEntity)
      this.multiSelectedLegal.push(e);
      this.selectedLegalIDs.push(e.legalEntityID);
    } else {
      const index = this.selectedLegalEntity.indexOf(e.legalEntity);
      this.selectedLegalEntity.splice(index, 1);
      this.multiSelectedLegal.splice(index, 1);
      const Idindex = this.selectedLegalIDs.indexOf(e.legalEntityID);
      this.selectedLegalIDs.splice(Idindex, 1);
    }
    if (this.selectedLegalIDs.length > 0) {
      this.legalEntitiesCount = this.selectedLegalIDs.length;
    } else {
      this.legalEntitiesCount = null;
    }
    this.AppButtonStatus();
  }

  onLegalSelection(e, legal) {
    this.validLegalEntity = false;
    this.typehead = false;
    // if (this.multiSelectedLegal.length > 0 && e.pick1Filter !== '') {
    if (e.selected && e.pick1Filter !== '') {
      _.remove(this.allLegal, item => ((item.pick1Filter === e.pick1Filter) && (item.legalEntityID !== e.legalEntityID)));
      this.allLegal = _.sortBy(this.allLegal, ['legalEntity']);
      this.storeSelectedEntity(e, legal)
    } else if (e.pick1Filter !== '') {
      const allEntityOfSamePickone = _.remove(_.cloneDeep(this.reservedLigalEntity), data => {
        return ((data.legalEntityID !== e.legalEntityID) && (data.pick1Filter === e.pick1Filter))
      });
      this.allLegal = _.concat(this.allLegal, allEntityOfSamePickone);
      this.allLegal = _.sortBy(this.allLegal, ['legalEntity']);
      this.storeSelectedEntity(e, legal)
    } else {
      this.storeSelectedEntity(e, legal)
    }
  }
  getLigalentityWithSearch(event) {
    console.log(event)
  }
  addUsage(legal) {
    /*for (let i=0 ; i < this.multiSelectedLegal.length ; i++ ) {
      this.selectedLegalIDs.push(this.multiSelectedLegal[i].legalEntityID)
    }*/
    this.addedApp = true;
    this.addAppButtonStatus = true;
    const reqData = {
      applicationNo: this.applicationID,
      applicationName: this.applicationName,
      skillTeamId: this.selectedSkillID,
      region: this.selectedRegionID,
      legalEntityId: this.selectedLegalIDs,
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.addNewApplication(reqData).then(data => {
      const toast = {
        type: 'success',
        title: 'Application added successfully',
      };
      this.addedApp = false;
      this.typehead = false;
      this._toasterService.pop(toast);
      this.clearModalData(legal);
      this.getITMS();
    }, error => {
      this.errorMessage = error.json();
      this.addedApp = false;
      const toast = {
        type: 'error',
        title: this.errorMessage.responseMsg,
      };
      // this._confermationAlertService.callToasterMsg('error', this.errorMessage.responseMsg);
      this.multiSelectedLegal = [];
      this._toasterService.pop(toast);
      this.selectedLegalEntity = [];
      // this.clearModalData(legal)
      this.validLegalEntity = true;
    });
  }

  removeentry(legal, legalentity) {
    console.log(legal, legalentity);
    _.forEach(legalentity.listData, (element) => {
      if (element.legalEntityID === legal) {
        element.selected = false
      }
    })
    const checkForPickone = _.find(this.multiSelectedLegal, (element) => {
      return (element.legalEntityID === legal)
    })
    // if (checkForPickone.pick1Filter !== '') {
    _.forEach(this.multiSelectedLegal, (element, i) => {
      if (element.legalEntityID === legal) {
        this.selectedLegalIDs.splice(i, 1);
        this.selectedLegalEntity.splice(i, 1);
        const allEntityOfSamePickone = _.remove(_.cloneDeep(this.reservedLigalEntity), data => {
          return ((data.legalEntityID !== legal) && (data.pick1Filter === element.pick1Filter))
        });
        if (checkForPickone.pick1Filter !== '') {
          this.allLegal = _.concat(this.allLegal, allEntityOfSamePickone);
        }
        this.allLegal = _.sortBy(this.allLegal, ['legalEntity']);
      }
    })
    _.remove(this.multiSelectedLegal, item => item.legalEntityID === legal);
    if (this.selectedLegalIDs.length > 0) {
      this.legalEntitiesCount = this.selectedLegalEntity.length;
    } else {
      this.legalEntitiesCount = null;
    }
    this.AppButtonStatus();
    // }
  }

  clearModalData(legal) {
    this.form.reset();
    if (this.selectedLegalIDs.length >= 1) {
      legal.listData.map(obj => (obj.selected === true) && (obj.selected = false));
    }
    this.selectedLegalIDs = [];
    this.selectedLegalEntity = [];
    this.multiSelectedLegal = [];
    this.validLegalEntity = false;
    this.legalEntitiesCount = null;
  }

}
