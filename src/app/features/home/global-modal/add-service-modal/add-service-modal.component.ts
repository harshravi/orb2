import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AddServiceModalContext } from './add-service-modal.context';
import { ConfermationAlertService } from '../../../../services';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { element } from 'protractor';
declare var _: any;
declare var $: any;

@Component({
  selector: 'app-add-service-modal',
  templateUrl: './add-service-modal.component.html',
  styleUrls: ['./add-service-modal.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class AddServiceModalComponent implements OnInit {
  context: AddServiceModalContext;
  heading: string;
  form: FormGroup;
  allServices;
  selectService;
  selectedServiceData;
  allSkillTeam;
  allLegalEntity;
  selectSkillTeam;
  selectLegalEntity;
  selectSkillTeamData;
  selectLegalEntityData;
  selectIntity;
  skillTeamReData;
  allocationMethodId: number;
  legalEntityIdCollection: Array<number>;
  latestSeletedId: number;
  isDataLoading: boolean;
  selectedRestrictedUser: boolean;
  reservedServiceData: Array<object>;
  restrictedLigialIntity: Array<object>;
  allLegalEntities: Array<object>;
  normalLigialIntity: Array<object>;
  nonRestrictedLegalEntity: Array<object>;
  filteredLigalIntityData;
  serviceCollection: any;
  serviceCollectionPhysical: any;
  disableSubmit: boolean;
  dropDownDefaultTextColor: boolean;
  checkChecked: boolean;
  reservedNormalLigialIntity = [];
  reservedRestrictedLigialIntity = [];
  textAreaTextCount: string;
  constructor(public dialog: DialogRef<AddServiceModalContext>,
    private _fb: FormBuilder,
    private _storage: LocalStorageService,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    this.serviceCollection = [];
    this.serviceCollectionPhysical = [];
    this.allLegalEntities = [];
    this.restrictedLigialIntity = [];
    this.nonRestrictedLegalEntity = [];
    this.normalLigialIntity = [];
    this.context = dialog.context;
    this.heading = 'Add Service';
    this.selectService = null;
    this.selectSkillTeam = null;
    this.selectLegalEntity = null;
    this.allocationMethodId = this.context.allocationMethodId;
    this.getallServiceDetails();
    this.getallSkillTeam();
    this.getallLegalEntity();
    this.disableSubmit = true;
    this.selectedRestrictedUser = true;
    this.selectIntity = null;
  }

  ngOnInit() {
    this.form = this._fb.group({
      'id': [''],
      'skillTeam': [''],
      'legalEntity': ['']
    });
    $('a[name=closeOpenModal]').click(function () {
      $('modal-overlay').remove();
    });
  }
  addVolume(value: any) {
    if (this.allocationMethodId === 1) {
      this.disableSubmit = true;
      this.isDataLoading = true;
      this.serviceCollection.forEach(element => {
        delete element.name;
        delete element.units;
      });
      this._featureService.addService(this.serviceCollection).then(data => {
        const toast = {
          type: 'success',
          title: 'Service(s) added successfully',
        };
        this._toasterService.pop(toast);
        this.dialog.close(true);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
      });
    } else {
      this.disableSubmit = true;
      this.isDataLoading = true;
      this.serviceCollectionPhysical.forEach(element => {
        delete element.name;
        delete element.units;
        delete element.skillTeam;
        delete element.legalEntity;
      });
      this._featureService.addVolumePhysicalService(this.serviceCollectionPhysical).then(data => {
        const toast = {
          type: 'success',
          title: 'Service(s) added successfully',
        };
        this._toasterService.pop(toast);
        this.dialog.close(true);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
      });
    }
  }

  getallSkillTeam() {
    this.isDataLoading = true;
    const reqst = {
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.getAllSkillTeam(reqst).then(data => {
      this.isDataLoading = false;
      this.allSkillTeam = data;
    }, error => {
      console.log(error)
    });
  }

  getallLegalEntity() {
    this.isDataLoading = true;
    const reqst = {
      'itmsId': this.context.addUserId
    }
    this._featureService.getServiceLigialIntity(reqst).then(data => {
      this.isDataLoading = false;
      this.allLegalEntity = data;
      // this.selectIntity = data.legalEntityID;
      this.filteredLigalIntityData = data;
      this.skillTeamReData = data;
      this.filterLigalIntity();
    }, error => {
      console.log(error)
    });
  }
  filterLigalIntity() {
    this.allLegalEntities = _.sortBy(this.allLegalEntity, ['legalEntity'])
    _.forEach(this.allLegalEntity, (data) => {
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
    let allLigalEntity;
    allLigalEntity = _.concat(this.restrictedLigialIntity, this.normalLigialIntity)
    this.filteredLigalIntityData = _.sortBy(allLigalEntity, ['legalEntity']);
    this.skillTeamReData = _.cloneDeep(this.normalLigialIntity);
    this.nonRestrictedLegalEntity = _.cloneDeep(this.normalLigialIntity);
    // this.filteredLigalIntityData = _.sortBy(this.filteredLigalIntityData, ['legalEntityID'])
  }
  onCheckboxChangeFn(event) {
    this.selectedRestrictedUser = !this.selectedRestrictedUser;
    this.selectIntity = null;
    // this.form.reset();
    this.textAreaTextCount = '0';
    this.dropDownDefaultTextColor = false;
    let checkedData;
    checkedData = [];
    this.checkChecked = event.target.checked;
    this.selectIntity = null;
    this.form.controls['legalEntity'].reset();
    if(this.allocationMethodId === 2){
     this.getFilteredLegalEntity(this.selectService,this.selectSkillTeam);
    }else{
    if (this.checkChecked) {
      let allLigalEntity
      if (this.reservedNormalLigialIntity.length > 0) {
        if (this.reservedRestrictedLigialIntity.length > 0) {
          allLigalEntity = _.concat(this.reservedNormalLigialIntity, this.reservedRestrictedLigialIntity)
        } else {
          allLigalEntity = _.concat(this.reservedNormalLigialIntity, this.restrictedLigialIntity)
        }
        this.filteredLigalIntityData = _.sortBy(allLigalEntity, ['legalEntity']);
        this.skillTeamReData = _.sortBy(allLigalEntity, ['legalEntity']);
      } else {
        this.filteredLigalIntityData = this.allLegalEntities;
        this.skillTeamReData = this.allLegalEntities;
      }
    } else {
      if (this.reservedNormalLigialIntity.length > 0) {
        this.filteredLigalIntityData = _.sortBy(this.reservedNormalLigialIntity, ['legalEntity']);
        this.skillTeamReData = _.sortBy(this.reservedNormalLigialIntity, ['legalEntity']);
      } else {
        this.filteredLigalIntityData = this.nonRestrictedLegalEntity;
        this.skillTeamReData = this.nonRestrictedLegalEntity;
      }
    }
  }
}

  getallServiceDetails() {
    this.isDataLoading = true;
    const reqst = {
      'cdsId': this._storage.get('cdsId'),
      'itmsNo': this.context.adduserNo,
      'appName': this.context.appName,
      'allocationMethodId': this.allocationMethodId
    }
    this._featureService.getAllServiceCatalog(reqst).then(data => {
      this.isDataLoading = false;
      if (this.context.serviceOwner) {
        this.allServices = [];
        const onlyForServiceOwner = _.cloneDeep(data);
        let selected;
        _.forEach(this.context.editableServiceCatalogIds, (element) => {
          selected = _.find(onlyForServiceOwner, list => {
            return list.id === element;
          });
          this.allServices.push(selected)
        })
        this.allServices = _.sortBy(this.allServices, ['name']);
      } else {
        const listData = _.cloneDeep(data)
        _.forEach(this.context.allServiceCatalogId, (element) => {
          _.remove(listData, item => item.id === element.serviceCatalogId);
        })
        this.allServices = _.cloneDeep(listData);
        this.reservedServiceData = _.cloneDeep(listData);
        this.allServices = _.sortBy(this.allServices, ['name']);
      }
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
    });
  }
  selectedService(id) {
    this.latestSeletedId = id;
    let selected;
    selected = _.find(this.allServices, data => {
      return data.id === id;
    });
    this.selectedServiceData = selected;
    if(this.allocationMethodId==2 && this.selectSkillTeam!=null){
      this.getFilteredLegalEntity(this.selectService,this.selectSkillTeam);
    }
  }
  selectedSkillTeam(id) {
    let selected;
    selected = _.find(this.allSkillTeam, data => {
      return data.id === id;
    });
    this.selectSkillTeamData = selected;
    let sampleFlag = false;
    if (this.serviceCollectionPhysical.length !== 0 && this.selectSkillTeamData !== undefined) {
    const forFlag = _.find(this.serviceCollectionPhysical, (data) => {
      return data.skillTeamId === this.selectSkillTeamData.id
    });
    if (forFlag !== undefined) {
      sampleFlag = true;
    } else {
      sampleFlag = false;
    }
  } else {
    sampleFlag = false;
  }
    if (sampleFlag) {
      _.forEach(this.serviceCollectionPhysical, (data2) => {
        _.remove(this.filteredLigalIntityData, item => item.legalEntityID === data2.legalEntityId);
      });
    } else {
      if (this.selectedRestrictedUser) {
        this.filteredLigalIntityData = this.allLegalEntity;
      } else  {
        this.filteredLigalIntityData = this.skillTeamReData;
      }
    }
    if(this.allocationMethodId === 2){
      this.getFilteredLegalEntity(this.selectService,this.selectSkillTeam);
    }
  }

  selectedLegalEntity(id) {
    let selected;
    selected = _.find(this.allLegalEntity, data => {
      return data.legalEntityID === id;
    });
    this.selectLegalEntityData = selected;
  }
  getserviceCollection() {
    if (this.selectedServiceData && this.allocationMethodId === 1) {
      let dataCollection;
      dataCollection = {};
      dataCollection.serviceCatalogId = this.selectedServiceData.id;
      dataCollection.itmsId = this.context.addUserId;
      dataCollection.itmsNo = this.context.adduserNo;
      dataCollection.appName = this.context.appName;
      dataCollection.cdsId = this._storage.get('cdsId');
      dataCollection.legalEntityId = null;
      dataCollection.setCybudgetAmount = 0;
      dataCollection.setVolume = 0;
      dataCollection.setStatusId = 3;
      dataCollection.name = this.selectedServiceData.name;
      dataCollection.units = this.selectedServiceData.units;
      this.serviceCollection.push(dataCollection);
      // this.legalEntityIdCollection = _.map(this.serviceCollection, 'id');
      _.remove(this.allServices, item => item.id === this.latestSeletedId);
      this.selectService = null;
      this.disableSubmit = false;
      // .splice(_.findIndex(this.allServices, data => {
      //   return data.id === this.latestSeletedId;
      // }));
    } else {
      let dataCollection;
      dataCollection = {};
      dataCollection.serviceCatalogId = this.selectedServiceData.id;
      dataCollection.skillTeamId = this.selectSkillTeamData.id;
      dataCollection.legalEntityId = this.selectLegalEntityData.legalEntityID;
      dataCollection.itmsId = this.context.addUserId;
      dataCollection.itmsNo = this.context.adduserNo;
      dataCollection.appName = this.context.appName;
      dataCollection.cdsId = this._storage.get('cdsId');
      // dataCollection.legalEntityId = null;
      dataCollection.setCybudgetAmount = 0;
      dataCollection.setVolume = 0;
      dataCollection.setStatusId = 3;
      dataCollection.name = this.selectedServiceData.name;
      dataCollection.units = this.selectedServiceData.units;
      dataCollection.skillTeam = this.selectSkillTeamData.name;
      dataCollection.legalEntity = this.selectLegalEntityData.legalEntity;
      dataCollection['restrictedLegalEntity'] = this.selectLegalEntityData['restrictedLegalEntity'];
      dataCollection['pick1Filter'] = this.selectLegalEntityData['pick1Filter'];
      this.serviceCollectionPhysical.push(dataCollection);
      // this.legalEntityIdCollection = _.map(this.serviceCollection, 'id');
      // _.remove(this.allServices, item => item.id === this.latestSeletedId);
      //this.selectService = null;
      //this.selectSkillTeam = null;
      this.form.controls['legalEntity'].reset();
     this.getFilteredLegalEntity(this.selectService,this.selectSkillTeam);
      this.selectLegalEntity = null;
      this.disableSubmit = false;
      if (dataCollection.pick1Filter !== '') {
        _.remove(this.filteredLigalIntityData, item => item.pick1Filter === dataCollection.pick1Filter);
      }
      // .splice(_.findIndex(this.allServices, data => {
      //   return data.id === this.latestSeletedId;
      // }));
    }
  }
  removeFromSelected(id, fulldata) {
    let addToRestrictedAgain;
    let addToNoramlAgain;
    let restrictedDataWithSamePickone;
    let normalDataWithSamePickone;
    let addToServiceAgain;
    let newData;
    addToRestrictedAgain = _.find(this.restrictedLigialIntity, data => {
      return data.legalEntityID === fulldata.legalEntityId;
    });
    addToNoramlAgain = _.find(this.normalLigialIntity, data => {
      return data.legalEntityID === fulldata.legalEntityId;
    });
    if (this.allocationMethodId === 1) {
      addToServiceAgain = _.find(this.serviceCollection, data => {
        return data.serviceCatalogId === id;
      });
      _.remove(this.legalEntityIdCollection, item => item === id);
      _.remove(this.serviceCollection, item => item.serviceCatalogId === id);
      const newPush = {
        id: id,
        name: addToServiceAgain.name,
        units: addToServiceAgain.units,
      }
      this.allServices.push(newPush);
      this.allServices = _.sortBy(this.allServices, ['name']);
      if (this.serviceCollection.length > 0) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    } else {
      addToServiceAgain = _.find(this.serviceCollectionPhysical, data => {
        return data.serviceCatalogId === id;
      });
      if (fulldata.pick1Filter !== '') {
      restrictedDataWithSamePickone = [];
      normalDataWithSamePickone = [];
      _.forEach(this.restrictedLigialIntity, data => {
        if (data.pick1Filter === fulldata.pick1Filter) {
          restrictedDataWithSamePickone.push(data)
        }
      });
      _.forEach(this.normalLigialIntity, data => {
        if (data.pick1Filter === fulldata.pick1Filter) {
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
      // _.remove(this.legalEntityIdCollection, item => item === id);
      _.remove(this.serviceCollectionPhysical, item => item === fulldata);
      // this.filteredLigalIntityData  = _.sortBy(this.reservedNormalLigialIntity, ['legalEntity']);
     // this.allLegalEntity = _.concat(this.filteredLigalIntityData, this.reservedNormalLigialIntity)
      
     newData = _.concat(this.skillTeamReData, newData);
    //this.form.reset();
      // const newPush = {
      //   id: id,
      //   name: addToServiceAgain.name,
      //   units: addToServiceAgain.units,
      // }
      // this.allServices.push(newPush);
     // this.allServices = _.sortBy(this.allServices, ['name']);
     if(this.allocationMethodId==2){
      this.getFilteredLegalEntity(id,fulldata.skillTeamId);
     }
      if (this.serviceCollectionPhysical.length > 0) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    }
  }


  // removeFromSelected(id) {
  //   let addToServiceAgain;
  //   addToServiceAgain = _.find(this.serviceCollection, data => {
  //     return data.setServiceCatalogId === id;
  //   });
  //   _.remove(this.legalEntityIdCollection, item => item === id);
  //   _.remove(this.serviceCollection, item => item.setServiceCatalogId === id);
  //   this.allServices.push(addToServiceAgain);
  //   this.allServices = _.sortBy(this.allServices, ['id'])
  //   console.log(this.allServices);
  // }
  clearModalData(event) {
    // this.allServices = this.reservedServiceData;
    this.getallServiceDetails();
    this.serviceCollection = [];
    this.serviceCollectionPhysical = [];
    this.selectService = null;
    this.form.reset();
    this.disableSubmit = true;
    // this.dialog.close(false);
  }
  closeModal() {
    this.dialog.close(true);
  }
  getFilteredLegalEntity(servicecatalaogId,skillTeamId){
    this.form.controls['legalEntity'].reset();
    this.allLegalEntities = _.sortBy(this.allLegalEntity, ['legalEntity'])
    this.restrictedLigialIntity = [];
    this.normalLigialIntity = [];
    _.forEach(this.allLegalEntity, (data) => {
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
   // this.form.controls['legalEntityID'].reset();
    let allLigalEntity;
    allLigalEntity = _.concat(this.restrictedLigialIntity, this.normalLigialIntity)
    this.filteredLigalIntityData = _.sortBy(allLigalEntity, ['legalEntity']);
    this.skillTeamReData = _.cloneDeep(this.normalLigialIntity);
    this.nonRestrictedLegalEntity = _.cloneDeep(this.normalLigialIntity);
    if (!this.selectedRestrictedUser) {
      this.filteredLigalIntityData = this.nonRestrictedLegalEntity;
    }else {
     this.filteredLigalIntityData = _.sortBy(this.filteredLigalIntityData, ['legalEntity']);
    }
    if (this.serviceCollectionPhysical.length > 0) {
      let intityCollectionTemp = _.cloneDeep(this.serviceCollectionPhysical);
      intityCollectionTemp = intityCollectionTemp.filter(obj => skillTeamId === obj.skillTeamId  && servicecatalaogId==obj.serviceCatalogId)
      for (let i = 0; i < intityCollectionTemp.length; i++) {
        this.filteredLigalIntityData = this.filteredLigalIntityData.filter
        ( obj => obj.legalEntityID !== intityCollectionTemp[i].legalEntityId);
      if (intityCollectionTemp[i].pick1Filter !== '') {
        this.filteredLigalIntityData = this.filteredLigalIntityData.filter
        (obj => obj.pick1Filter !== intityCollectionTemp[i].pick1Filter);
        }
      }
    }
    
    

  }
}
