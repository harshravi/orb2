import {
  Component, OnInit, OnChanges, ViewChild, Input, SimpleChange,
  Output, AfterViewChecked, ChangeDetectorRef, EventEmitter
} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Action } from 'rxjs/scheduler/Action';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AddVolumeDetailsModalComponent, AddVolumeDetailsModalContext } from '../../home/global-modal';
import { FeatureService } from '../../../../app/services/featureServices/feature.service';
import { UpdateVolumeOpcostModalContext, UpdateVolumeOpcostModalComponent } from '../../home/global-modal';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../services/commonService';

declare var $: any;
declare var _: any;

@Component({
  selector: 'app-volume-details',
  templateUrl: './volume-details.component.html',
  styleUrls: ['./volume-details.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class VolumeDetailsComponent implements OnInit, OnChanges, AfterViewChecked {
  private currentComponentWidth;
  @ViewChild('myTable') table: DatatableComponent;
  @ViewChild('tableWrapper') tableWrapper;
  @Input()
  volumeDetailsData: Array<object>;
  @Input()
  budgetDetail: Array<object>;
  @Input()
  budgetDetailId: number;
  @Input()
  itmsNo: any;
  @Input()
  appName: any;
  @Input()
  ServiceCatalogId: number;
  @Input()
  volumeTabularDetails: Array<object>;
  @Input()
  volumeHeaderDetails: Array<object>;
  @Input()
  write: boolean;
  @Input()
  approve: boolean;
  @Input()
  selectedServiceCatalogId: number;
  @Input()
  selectedItmsId: number;
  @Output()
  goToVolumePage = new EventEmitter();
  @Output()
  checkSaveRibon = new EventEmitter();
  userTypestatus: boolean;
  rows: any;
  columns: any;
  temp: any;
  yearSelection: any;
  onlyHeaderData: any;
  volumeDetails: Array<object>;
  allStatusData: any;
  showStaticTemp: boolean;
  setEditFlag: boolean;
  selectedDropdown: boolean;
  volumeDetailsName: any;
  showStaticForSelection: boolean;
  selectedAppHeaderDetails: any;
  isDataLoading: boolean;
  selectStatus: any;
  highlightedYearSelected: number;
  selectedDataItmsId: number;
  allRegions: Array<object>;
  allPurchaseOrder: Array<object>;
  TempForNotAvailable: boolean;
  selectedYearData;
  selectedYear: number;
  isDataLoadingforSave: boolean;
  disableSingleEdit: boolean;
  showSaveRibon: boolean;
  showDeleteBtn: boolean;
  disableCheckBox: boolean;
  singleRowEdit: number;
  reservedRowsData: Array<object>;
  CommentMandatory: boolean;
  selected = [];
  allStatusforTable;
  NoRows;
  canEdit: boolean;
  disableSave: boolean;
  enableLumpSumsService: boolean;
  orgTotalQuantity: number;
  orgTotalCost: number;
  allStatusIds;
  localRows;
  selectedRowIndex;
  isVolumeDataLoading;
  constructor(private _modal: Modal,
    private _storage: LocalStorageService,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private changeDetectorRef: ChangeDetectorRef, private _featureService: FeatureService) {
    this.rows = [];
    this.showStaticTemp = true;
    this.disableSingleEdit = false;
    this.showSaveRibon = false;
    this.showStaticForSelection = true;
    this.highlightedYearSelected = 1;
    this.TempForNotAvailable = false;
    this.CommentMandatory = true;
    this.showDeleteBtn = false;
    this.selectedDropdown = false;
    this.setEditFlag = false;
    this.volumeDetailsName = this._storage.get('volumeDetailsName')
    this.getAllStatus();
    this.getChangeRegions();
    this.getPurchaseOrder();
    this.selectStatus = 'all';
    this.NoRows = false;
    this.canEdit = false;
    this.disableSave = false;
    this.disableCheckBox = false;
    this.allStatusIds = [];
  }
  confirmationAlert() {
    const that = this;
    setTimeout(function () {
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page', function () {
        // ACTION: Do this If user says YES
        // that['name'] = 'Yes clicked';
      }, function () {
        // ACTION: Do this if user says NO
        // that['name'] = 'No clicked';
      })

    }, 2000)
  }
  backToVolumePage(event) {
    if (this.showSaveRibon) {
      console.log('Inside condition pass');
      const that = this;
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page', function () {
        that.clearAllSelected();
        that.goToVolumePage.emit(event)
      }, function () {
        return true;
      })
    } else {
        this.goToVolumePage.emit(event)
    }
  }
  setFlag(selected) {
    if (selected.length === 1) {
      if (selected[0].enableEditButton === true) {
        this.setEditFlag = false;
      } else {
        this.setEditFlag = true;
      }
      if (selected[0].enableApproveDropDown === true) {
        this.selectedDropdown = false;
      } else {
        this.selectedDropdown = true;
      }
    } else {
      let selectedDropdown = false;
      let setEditFlag = false;
      _.forEach(selected, (element) => {
        if (element.enableEditButton !== true) {
          setEditFlag = true;
        }
        if (element.enableApproveDropDown !== true) {
          selectedDropdown = true;
        }
      });
      this.setEditFlag = setEditFlag;
      this.selectedDropdown = selectedDropdown;
    }
  }

  onSelect({ selected }) {
    this.disableSingleEdit = false;
    this.disableCheckBox = false;
    if (selected) {
      this.setFlag(selected);
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      if (this.selected.length === 0) {
        _.forEach(this.rows, function (item, j) {
          item[j + '-quantity'] = false;
          item[j + '-comments'] = false;
          item[j + '-status'] = false;
          item[j + '-changeRegion'] = false;
          item[j + '-purchageOrder'] = false;
          item.rowNo = j;
        });
      } else {
        _.forEach(this.selected, element => {
          _.forEach(this.rows, function (item, j) {
            if (element.stagigId === item.stagigId) {
              item[j + '-quantity'] = false;
              item[j + '-comments'] = false;
              item[j + '-status'] = false;
              item[j + '-changeRegion'] = false;
              item[j + '-purchageOrder'] = false;
              item.rowNo = j;
            }
          });
        });
      }
      if (this.selected.length > 0) {
        this.disableSingleEdit = true;
        this.showSaveRibon = true;
        this.disableCheckBox = false;
        this.checkSaveRibonn(this.showSaveRibon);
      } else {
        this.showSaveRibon = false;
        this.checkSaveRibonn(this.showSaveRibon);
        this.disableSingleEdit = false;
      }
    }
  }
  checkSaveRibonn(event) {
    this.checkSaveRibon.emit(event);
  }
  updateValue(event, cell, rowIndex) {
    // this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    const commentField = this.rows[rowIndex]['comments'].trim();
    const quantity = this.rows[rowIndex]['quantity'];
    const statusId = this.rows[rowIndex]['statusId'];
    if (commentField.length === 0 || parseFloat(quantity) === 0 || quantity === '' 
    || this.allStatusIds.indexOf(parseInt(statusId)) < 0) {
      this.disableSave = true;
      // this.showSaveRibon = false;
      this.CommentMandatory = true;
    } else {
      this.disableSave = false;
      // this.showSaveRibon = true;
      this.CommentMandatory = false;
    };
    _.forEach(this.selected, (element) => {
      if(this.allStatusIds.indexOf(parseInt(element.statusId)) < 0){
        this.disableSave = true;
        return false;
      }
    });
  }
  getSelectedYearData(selectedYear) {
    let selected;
    selected = _.find(this.volumeTabularDetails['volumeDetailsYearWiseList'], data => {
      return data.year === selectedYear;
    });
    // _.forEach(this.volumeTabularDetails['volumeDetailsYearWiseList'], (list) => {
    _.forEach(selected.volumeDetailDTOs, (element) => {
      const getTimeZoneName = moment.tz.guess();

      if (element.approvedDate) {
        const getApprovedDateInNumber = Date.parse(element.approvedDate);
        element.approvedDateWithZone = moment(getApprovedDateInNumber).tz(getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');

      }
      if (element.committedDate) {
        const getCommittedDateInNumber = Date.parse(element.committedDate);
        element.committedDateWithZone = moment(getCommittedDateInNumber).tz(getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
      }
      if (element.lastModifiedDateString) {
        const getLastModifiedDateInNumber = Date.parse(element.lastModifiedDateString)
        element.lastModifiedDateWithZone = moment(getLastModifiedDateInNumber).tz(getTimeZoneName)
          .format('MM/DD/YYYY HH:mm:SS z');
      }
    })
    // })
    this.selectedYearData = _.cloneDeep(selected);
    this.rows = _.cloneDeep(this.selectedYearData.volumeDetailDTOs);
    this.reservedRowsData = _.cloneDeep(this.selectedYearData.volumeDetailDTOs);
    this.temp = _.cloneDeep(this.selectedYearData.volumeDetailDTOs);
    // if (this.rows) {
    //   _.forEach(this.rows, (element, i) => {
    //     const getApprovedZoneName = moment.tz.guess(element.approvedDate);
    //     const getApprovedDateInNumber = Date.parse(element.approvedDate);
    //     element.approvedDateWithZone = moment(getApprovedDateInNumber).tz(getApprovedZoneName).format('MM/DD/YYYY HH:mm:SS z');
    //     const getCommittedZoneName = moment.tz.guess(element.committedDate);
    //     const getCommittedDateInNumber = Date.parse(element.committedDate);
    //     element.committedDateWithZone = moment(getCommittedDateInNumber)
    //       .tz(getCommittedZoneName).format('MM/DD/YYYY HH:mm:SS z');
    //   });
    // }
  }
  selectedServiceDetails(selectedRow, selectedYear) {
    if (this.showSaveRibon) {
      const that = this;
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page', function () {
        that.clearAllSelected();
        // that.selectStatus = 0;
        that.highlightedYearSelected = selectedRow;
        that.selectedYear = selectedYear;
        that.getSelectedYearData(selectedYear);
        that.selectedStatus(that.selectStatus);
      }, function () {
        return true;
      })
    } else {
      this.clearAllSelected();
      // this.selectStatus = 0;
      this.highlightedYearSelected = selectedRow;
      this.selectedYear = selectedYear;
      this.getSelectedYearData(selectedYear);
      this.selectedStatus(this.selectStatus);
    }
    this.enableLumpSumsService = false;
    if (selectedRow === 1) {
      this.enableLumpSumsService = this.volumeTabularDetails['header']['enableLumpSumsService'];
    }
    if (this.rows.length === 0) {
      this.disableCheckBox = true;
      this.NoRows = true;
    }else {
      this.NoRows = false;
    }
  }

  onSort(event) {  
    const sortProp = event.column.prop;
    this.localRows = _.cloneDeep(this.rows);
    // tslint:disable-next-line:radix    
    this.localRows = _.orderBy([...this.localRows], [rows => parseInt(rows[sortProp]) ? rows[sortProp] : rows[sortProp].toLowerCase()], [event.newValue]);
    this.rows = [];
    this.rows = _.cloneDeep(this.localRows);
  }

  ngOnInit() {
    this.isDataLoadingforSave = false;
    this.isVolumeDataLoading = false;
    // this.rows = []
    // this.getOpCostVolumeDetails();
    // this.volumeTabularData = this.volumeTabularDetails;
    // if (this.volumeTabularDetails['volumeDetailsYearWiseList'].length > 0) {
    //   _.forEach(this.volumeTabularDetails['volumeDetailsYearWiseList'], (list) => {
    //     _.forEach(list.volumeDetailDTOs, (element) => {

    //     })
    //   })
    // }
    // this.rows = this.volumeDetailsData.


  }
  getRowClass(row) {
    return 'danger';
  }
  callOpCostVolumeDetails() {
    const reqData = {
      'budgetDetailId': this.budgetDetailId,
      'cdsId': this._storage.get('cdsId'),
      'itmsNo': this.volumeDetailsData['navDetailsForVolume']['applicationNumber'],
      'appName': this.volumeDetailsData['navDetailsForVolume']['applicationName'],
      'serviceCatalogId': this.selectedServiceCatalogId
    }
    this.volumeTabularDetails = [];
    this.isDataLoadingforSave = true;

    this._featureService.getOpCostVolumeDetails(reqData).then(data => {
      this.volumeTabularDetails = data;
      this.isDataLoadingforSave = false;
      this.showSaveRibon = false;
      this.selectedServiceDetails(this.highlightedYearSelected, this.selectedYear);
      this.clearAllSelected()
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
      this.dataLoadingCompleted();
      // $(document).ready(function(){
      //   $('[data-toggle="tooltip"]').tooltip();
      //   });
    });
    this.getAllStatus();
  }
  getAllStatus() {
    this._featureService.getFilterStatusData().then(data => {
      // this.dataLoadingCompleted();
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
      const selectAll = {
        id: 0,
        name: 'All',
        units: null
      }
      const  userType =  this.volumeTabularDetails['header'];
      this.userTypestatus = userType.adminUser;
      if (userType.adminUser) {
        this.allStatusData = data
        this.selectStatus = 0;
        this.allStatusData.unshift(selectAll)
        _.remove(this.allStatusData, item => item.id === 1);
        // _.remove(this.allStatusData, item => item.id === 4);
        _.remove(this.allStatusData, item => item.id === 6);
      } else {
        this.allStatusData =  data;
        this.selectStatus =  0;
        this.allStatusData.unshift(selectAll)
        _.remove(this.allStatusData,  item => item.id === 1);
        // _.remove(this.allStatusData,  item => item.id === 5);
        _.remove(this.allStatusData,  item => item.id === 6);
      }
      const statusTable = [{
        id: 2,
        name: 'Pending',
        units: null
      }, {
        id: 3,
        name: 'Approved',
        units: null
      }, {
        id: 5,
        name: 'Committed',
        units: null
      }, {
        id: 4,
        name: 'Rejected',
        units: null
      }]
      if (!userType.adminUser) {
        _.remove(statusTable, item => item.id === 5);
      }
      if (!this.approve) {
        _.remove(statusTable, item => item.id === 3);
        _.remove(statusTable, item => item.id === 4);
        _.remove(statusTable, item => item.id === 5);
        // _.remove(this.allStatusData, item => item.id === 3);
      }
      this.allStatusforTable = statusTable;
      this.allStatusforTable.forEach(element => {
        this.allStatusIds.push(element.id);
      });
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  getPurchaseOrder() {
    this._featureService.getPurchaseOrderList().then(data => {
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
      // this.dataLoadingCompleted();
      this.allPurchaseOrder = data
    }, error => {
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  getChangeRegions() {
    this._featureService.getChangeRegionList().then(data => {
      // $(document).ready(function(){
      //   $('[data-toggle="tooltip"]').tooltip();
      //   });
      // this.dataLoadingCompleted();
      this.allRegions = data
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  showDeafultPage(event) {
    this.showStaticTemp = event
  }
  selectedStatus(id) {
    this.clearAllSelected();
    let filteredData;
    let tempTotalQuantity = 0;
    let tempTotalCost = 0;
    let tempOrgTotalQuantity = 0;
    let tempOrgTotalCost = 0;
    filteredData = []
    if (id !== 0) {
      _.find(this.temp, data => {
        if (data.statusId === id) {
          filteredData.push(data)
        };
      });
      this.rows = filteredData;
    } else {
      _.find(this.temp, data => {
        if (data.type !== 'Remove') {
          filteredData.push(data)
        } else if (data.type === 'Remove' && data.statusId !== 5) {
          filteredData.push(data)
        }
      });
      this.rows = filteredData;
    }
    if (this.rows !== '' && this.rows !== undefined) {
      _.forEach(this.rows, function (item, j) {
        if (item.statusDescription !== 'Rejected') {
          tempTotalQuantity = Number(tempTotalQuantity) + Number(item.quantity);
          tempOrgTotalQuantity = Number(tempOrgTotalQuantity) + Number(item.orgQuantity);
        }
      })
    }
    this.selectedYearData.totalQuantity = tempTotalQuantity;
    this.selectedYearData.totalCost = tempTotalQuantity * this.selectedYearData.rate;
    this.orgTotalQuantity = tempOrgTotalQuantity;
    this.orgTotalCost = tempOrgTotalQuantity * this.selectedYearData.rate;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.incurredCodeService.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  clearAllSelected() {
    this.selected = [];
    //this.rows = _.cloneDeep(this.reservedRowsData);
    this.disableSingleEdit = false;
    this.disableCheckBox = false;
    this.showSaveRibon = false;
    this.checkSaveRibonn(this.showSaveRibon);
    localStorage.setItem('showSaveRibon', 'false');
    // _.forEach(this.temp, item => {
      this.rows = [];
      if (this.localRows) {
        this.rows = [...this.localRows];
      } else if (this.reservedRowsData) {
        this.rows = [...this.reservedRowsData];
      }
    _.forEach(this.rows, function (element, i) {
      element[i + '-quantity'] = false;
      element[i + '-comments'] = false;
      element[i + '-status'] = false;
      element[i + '-changeRegion'] = false;
      element[i + '-purchageOrder'] = false;
    });
  }
  callUpdateService(strippedRows) {
    this.isVolumeDataLoading = true;
    localStorage.setItem('showSaveRibon', 'false');
    this.checkSaveRibonn(this.showSaveRibon);
    this._featureService.updateVolumeOpcost(strippedRows).then(data => {
      this.isVolumeDataLoading = false;
      const res = data['_body'];
      if (res  === 'Volume Updated Successfully') {
      this.volumeDetails = undefined;
      const toast = { type: 'success', title: 'Volume Edited successfully' };
      this._toasterService.pop(toast);
      this.disableCheckBox = false;
      this.selected = [];
      this.showSaveRibon = false
      this.callOpCostVolumeDetails();
      // this.getApplicationDetails(this.selectedItmsId);
      } else {
        const toast = { type: 'success', title: res };
        this._toasterService.pop(toast);
       // this.callOpCostVolumeDetails();
       // this.selectAllChecked();
        this.editRow(this.selectedRowIndex);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  editRow(rowIndex) {
    $('.tooltip').fadeOut('fast', function () {
      $('.tooltip').remove();
    });
    this.selectedRowIndex = rowIndex;
    // this.rows[rowIndex] = event.target.value;
    this.rows = [...this.rows];
    const commentField = this.rows[rowIndex]['comments'].trim();
    const quantity = this.rows[rowIndex]['quantity'];
    const statusId = this.rows[rowIndex]['statusId'];
    if (parseFloat(quantity) === 0 || quantity === '' || commentField === null 
    || commentField === undefined || commentField.length === 0 || this.allStatusIds.indexOf(statusId) < 0) {
      this.disableSave = true;
      this.CommentMandatory = true;
    }
    this.disableCheckBox = true;
    this.singleRowEdit = rowIndex;
    _.forEach(this.rows, function (element, i) {
      if (i === rowIndex) {
        element[i + '-quantity'] = true;
        element[i + '-comments'] = true;
        element[i + '-status'] = true;
        element[i + '-changeRegion'] = true;
        element[i + '-purchageOrder'] = true;
      }
    });
    this.disableSingleEdit = false;
    this.showSaveRibon = true;
    this.checkSaveRibonn(this.showSaveRibon);
    localStorage.setItem('showSaveRibon', 'true');
  }
  saveEdit() {
    this.disableSingleEdit = false;
    this.disableCheckBox = false;
    let dataEdited = [];
    let selectedSingleEditData;
    selectedSingleEditData = [];
    if (this.selected.length > 0) {
      dataEdited = _.map(this.selected, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'bundleName', 'purchaseOrderName', 'enablePO', 'cyBudgetAmount',
          'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year', 'statusDescription', 'committedDate',
          index + '-comments', index + '-changeRegion', 'committedDateString', 'lastModifiedDateString', 'approvedDateString',
          'approvedDateWithZone', 'committedDateWithZone', index + '-purchageOrder', index + '-quantity', index + '-status']);

      });

      _.forEach(dataEdited, (element, index) => {
        const selectedResion = _.find(this.allRegions, data => {
          return data.name === element.changeReason;
        });
        element.changeReasonId = selectedResion.id
        element.volume = Number(element.quantity);
        element.vStagingId = element.stagigId;
        element.purchaseOrderId = Number(element.purchaseOrderId);
        element.itmsId = this.volumeDetailsData['navDetailsForVolume']['itmsId'];
        element.itmsNo = this.volumeDetailsData['navDetailsForVolume']['applicationNumber'];
        element.appName = this.volumeDetailsData['navDetailsForVolume']['applicationName'];
        element.cdsId = this._storage.get('cdsId');
        delete element.quantity;
        delete element.rowNo;
        delete element.stagigId;
        delete element.status;
        delete element.changeReason;
        selectedSingleEditData.push(element);
      });
      this.callUpdateService(selectedSingleEditData);
    } else {
      dataEdited = _.map(this.rows, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'bundleName', 'purchaseOrderName', 'enablePO', 'cyBudgetAmount',
          'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year', 'statusDescription', 'committedDate',
          index + '-comments', index + '-changeRegion', 'committedDateString', 'lastModifiedDateString', 'approvedDateString',
          'approvedDateWithZone', 'committedDateWithZone', index + '-purchageOrder', index + '-quantity', index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        if (this.singleRowEdit === index) {
          const selectedResion = _.find(this.allRegions, data => {
            return data.name === element.changeReason;
          });
          element.changeReasonId = selectedResion.id
          element.volume = Number(element.quantity);
          element.vStagingId = element.stagigId;
          element.purchaseOrderId = Number(element.purchaseOrderId);
          element.itmsId = this.volumeDetailsData['navDetailsForVolume']['itmsId'];
          element.itmsNo = this.volumeDetailsData['navDetailsForVolume']['applicationNumber'];
          element.appName = this.volumeDetailsData['navDetailsForVolume']['applicationName'];
          element.cdsId = this._storage.get('cdsId');
          delete element.quantity;
          delete element.rowNo;
          delete element.stagigId;
          delete element.status;
          delete element.changeReason;
          selectedSingleEditData.push(element);
        }
      });
      this.callUpdateService(selectedSingleEditData)
    }
  }
  selectAllChecked() {
    this.showSaveRibon = true;
    this.disableCheckBox = true;
    this.checkSaveRibonn(this.showSaveRibon);
    localStorage.setItem('showSaveRibon', 'true');
    this.disableSingleEdit = false;
    let saveDisableFlag = false;
    _.forEach(this.selected, element => { 
      _.forEach(this.rows, function (item, j) {
        if (element.stagigId === item.stagigId) {
          item[j + '-quantity'] = true;
          item[j + '-comments'] = true;
          item[j + '-status'] = true;
          item[j + '-changeRegion'] = true;
          item[j + '-purchageOrder'] = true;
        }
      })
      if(this.allStatusIds.indexOf(parseInt(element.statusId)) < 0 && !saveDisableFlag){
        this.disableSave = true;
        saveDisableFlag=true;
      }
    })
  }
  openActionModal(dataForAction, modalDetails) {
    let t;
    this._modal.open(UpdateVolumeOpcostModalComponent,
      overlayConfigFactory({
        deleteServiceDetails: dataForAction,
        heading: modalDetails.heading,
        action: modalDetails.action,
        allRegions: this.allRegions,
        actionBtnText: modalDetails.actionBtnText,
        itmsId: this.volumeDetailsData['navDetailsForVolume']['itmsId'],
        itmsNo: this.volumeDetailsData['navDetailsForVolume']['applicationNumber'],
        appName: this.volumeDetailsData['navDetailsForVolume']['applicationName'],
      }, UpdateVolumeOpcostModalContext)).then(d => {
        t = d.result.then(data => {
          // this.getApplicationDetails(this.selectedItmsId);
          this.rows = [];
          this.callOpCostVolumeDetails();
          this.selected = [];
          this.disableSingleEdit = false;
        });
      });
  }
  // approve all the user
  openApproveModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to approve the below Volumes ?',
      action: 'approve',
      actionBtnText: 'APPROVE'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  // unapprove all the user
  openUnapproveModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to unapprove the below Volumes ?',
      action: 'unapprove',
      actionBtnText: 'UN-APPROVE'
    }
    this.openActionModal(dataToDelete, modalDetails)
  };
  // reject all the user
  openRejectModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to reject the below Volumes ?',
      action: 'reject',
      actionBtnText: 'REJECT'
    }
    this.openActionModal(dataToDelete, modalDetails)
  };
  openCommitModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to commit the below users ?',
      action: 'commit',
      actionBtnText: 'COMMIT'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  approveAllSelected() {
    this.openApproveModal(this.selected);
  };
  unapproveAllSelected() {
    this.openUnapproveModal(this.selected);
  };
  rejectAllSelected() {
    this.openRejectModal(this.selected);
  };
  commitAllSelected() {
    this.openCommitModal(this.selected);
  };
  showModal() {
    let t;
    this._modal.open(AddVolumeDetailsModalComponent,
      overlayConfigFactory({
        addVolumeDetails: this.volumeDetails,
        addVolumeHeader: this.volumeDetailsData,
        allRegions: this.allRegions,
        allPurchaseOrderList: this.allPurchaseOrder,
        selectedRow: this.highlightedYearSelected,
        selectedYear: this.selectedYear,
        approve: this.approve,
        addVolumeStatusData: _.cloneDeep(this.allStatusData),
        budgetDetailId: this.budgetDetailId,
        itmsId: this.selectedItmsId,
        itmsNo: this.itmsNo,
        appName: this.appName,
      }, AddVolumeDetailsModalContext)).then(d => {
        t = d.result.then(data => {
          // if (this.selectedItmsId) {
          this.callOpCostVolumeDetails();
          // }
        });
      });
  }
  dataLoadingStarted(): void {
    this.isDataLoading = true;
  }
  dataLoadingCompleted(): void {
    this.isDataLoading = false;
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.selectedYearData = undefined;
    if (changes['volumeTabularDetails'] !== undefined) {
      //   this.volumeDetails = this.volumeTabularDetails;
      // }
      // if (this.volumeDetails) {
      this.selectedServiceDetails(1, this.volumeTabularDetails['year1']);
    }
  }
  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 45 && event.charCode <= 57;
  }

  ngAfterViewChecked() {
    if (this.table && this.table.recalculate && (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth)) {
      this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
      this.table.recalculate();
      this.changeDetectorRef.detectChanges();
      window.dispatchEvent(new Event('resize'));
    }
  }
}
