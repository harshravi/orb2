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
import { ApprovalConfirmationModalContext, ApprovalConfirmationModalComponent } from '../../home/global-modal';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import 'rxjs/add/operator/toPromise';



declare var $: any;
declare var _: any;
@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class ApprovalsComponent implements OnInit, OnChanges, AfterViewChecked {
  dashboardDeatils;
  isDataLoading: boolean;
  showActiveUser: boolean;
  rows: any;
  private currentComponentWidth;
  @ViewChild('myTable') table: DatatableComponent;
  @ViewChild('tableWrapper') tableWrapper;
  @ViewChild('searchedWordText') searchedWordText;
  // @Input()
  // usageRecords: Array<object>;
  // @Input()
  // volumeRecords: Array<object>;
  @Input()
  approvalTabularDetails: Array<object>;
  @Input()
  usageStagingID: number;
  @Input()
  stagingID: number;
  @Input()
  write: boolean;
  @Input()
  approve: boolean;
  @Output()
  goToVolumePage = new EventEmitter();
  columns: any;
  temp: any;
  yearSelection: any;
  onlyHeaderData: any;
  volumeDetails: Array<object>;
  allStatusData: any;
  showStaticTemp: boolean;
  volumeDetailsName: any;
  showStaticForSelection: boolean;
  selectedAppHeaderDetails: any;
  selectStatus: any;
  highlightedYearSelected: number;
  selectedDataItmsId: number;
  selectedItmsId;
  // allRegions: Array<object>;
  allPurchaseOrder: Array<object>;
  TempForNotAvailable: boolean;
  selectedYearData;
  selectedYear: number;
  isDataLoadingforSave: boolean;
  disableSingleDelete: boolean;
  showSaveRibon: boolean;
  showDeleteBtn: boolean;
  disableCheckBox: boolean;
  singleRowEdit: number;
  selected = [];
  allStatusforTable;
  sectionName: string;
  responseSection: string;
  setEditFlag: boolean;
  enableEdit: boolean;
  disableSingleEdit: boolean;
  isSelected: boolean;
  dropDownDefaultTextColor: boolean;
  checkChecked: boolean;
  userTypestatus: boolean;
  restrictedUsers;
  filteredData: Array<object>;
  noRows: boolean;

  constructor(private _modal: Modal, private http: Http,
    private _storage: LocalStorageService,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private changeDetectorRef: ChangeDetectorRef, private _featureService: FeatureService) {
    this.rows = [];
    this.showStaticTemp = true;
    this.disableSingleDelete = false;
    this.showSaveRibon = false;
    this.showStaticForSelection = true;
    this.highlightedYearSelected = 1;
    this.TempForNotAvailable = false;
    this.showDeleteBtn = false;
    this.volumeDetailsName = this._storage.get('volumeDetailsName')
    this.callOpCostVolumeDetails(true);
    this.getAllStatus();
    this.selectStatus = 'approved';
    this.showActiveUser = true;
    this.setEditFlag = false;
    this.disableSingleEdit = false;
    this.isSelected = false;
    this.restrictedUsers = [];
    this.noRows = false;
  }

  ngOnInit() {
    this.selectStatus = 3;
    this.isDataLoadingforSave = false;
    this.rows = []
    this.callOpCostVolumeDetails(this.showActiveUser);
  }
  showActive(showPannel) {
    // this.clearAllSelected();
    this.showActiveUser = showPannel;
    this.callOpCostVolumeDetails(this.showActiveUser);
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
  getRowClass(row) {
    return 'danger';
  }
  setFlag(selected) {
    this.disableCheckBox = false;
    if (selected.length === 1) {
      if (selected[0].enableEdit === true) {
        this.setEditFlag = false;
      } else {
        this.setEditFlag = true;
        this.disableCheckBox = true;
        this.showSaveRibon = false;
      }
    } else {
      let setEditFlag = false;
      _.forEach(selected, (element) => {
        if (element.enableEdit !== true) {
          setEditFlag = true;
          this.disableCheckBox = true;
          this.showSaveRibon = false;
        }
      });
      this.setEditFlag = setEditFlag;
    }
  }
  onSelect({ selected }) {
    if (this.showActiveUser) {
      this.disableSingleEdit = true;
      this.disableCheckBox = false;
      this.setFlag(selected);
      if (selected) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        if (this.selected.length === 0) {
          _.forEach(this.rows, function (item, j) {
            item[j + '-status'] = false;
          });
        } else {
        _.forEach(this.selected, element => {
          _.forEach(this.rows, function (item, j) {
            if (element.usageStagingID !== item.usageStagingID) {
              item[j + '-status'] = false;
              item.rowNo = j;
            }
            return false;
          })
        });
      }
        if (this.selected.length > 0) {
          this.disableSingleEdit = true;
          this.showSaveRibon = true;
        this.disableCheckBox = false;
        } else {
          this.disableSingleEdit = false;
          this.showSaveRibon = false;
        }
      }
    } else {
      this.disableSingleEdit = true;
      this.disableCheckBox = false;
      this.setFlag(selected);
      if (selected) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        if (this.selected.length === 0) {
          _.forEach(this.rows, function (item, j) {
            item[j + '-status'] = false;
          });
        } else {
        _.forEach(this.selected, element => {
          _.forEach(this.rows, function (item, j) {
            if (element.stagingID !== item.stagingID) {
              item[j + '-status'] = false;
            }
          })
        });
      }
        if (this.selected.length > 0) {
          this.disableSingleEdit = true;
          this.showSaveRibon = true;
        this.disableCheckBox = false;
        } else {
          this.disableSingleEdit = false;
          this.showSaveRibon = false;
        }
      }
    }
  }
  editRow(rowIndex, row) {
    $('.tooltip').fadeOut('fast', function() {
      $('.tooltip').remove();
      });
    if (this.showActiveUser) {
      this.disableCheckBox = true;
    this.singleRowEdit = rowIndex;
    _.forEach(this.rows, function (element, i) {
      if (i === rowIndex) {
        element[i + '-status'] = true;
      }
    });
    this.showSaveRibon = true;
    } else {
    this.singleRowEdit = rowIndex;
    this.disableCheckBox = true;
    _.forEach(this.rows, function (element, i) {
      if (i === rowIndex) {
        element[i + '-status'] = true;
      }
    });
    this.showSaveRibon = true;
   }
}
  updateValue(event, cell, rowIndex) {
    if (event.target.value.split('')[0] !== 0) {
      // this.editing[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }
  }
  saveEdit() {
    this.disableSingleEdit = false;
    this.disableCheckBox = false;
    let dataEdited = [];
    let selectedSingleEditData;
    selectedSingleEditData = [];
    if (this.selected.length > 0) {
      dataEdited = _.map(this.selected, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'bundleName', 'cyNegotiated', 'legalEntity',
          'incurredCodeService', 'lastModified', 'rowNo', 'skillTeamName', 'year', 'statusDescription', 'committedDate',
          'comments', 'changeRegion', 'committedDateString', 'lastModifiedDateString', 'approvedDateString',
          'approvedDateWithZone', 'committedDateWithZone', 'quantity', index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        // element.statusId = element.status;
        element.cdsId = this._storage.get('cdsId');
        // delete element.status;
        // delete element.rowNo;
        // delete element._.find()
        selectedSingleEditData.push(element);
      });
      this.callUpdateService(selectedSingleEditData);
    } else {
      dataEdited = _.map(this.rows, function (row, index) {
        return _.omit(row, ['changeBy', 'legalEntity', 'cyNegotiated',
          'comments', 'proposedNegotiated', index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        if (this.singleRowEdit === index) {
          // element.statusId = element.status;
          element.cdsId = this._storage.get('cdsId');
          // delete element.status;
          // delete element.rowNo;
          selectedSingleEditData.push(element);
        }
      });
      this.callUpdateService(selectedSingleEditData);
    }
  }
  callUpdateService(strippedRows) {
    this.isDataLoadingforSave = true;
    this.showSaveRibon = false;
    localStorage.setItem('showSaveRibon', 'false');
    let tableData;
    const usageData = [];
    if (this.sectionName === 'usage') {

      _.forEach(strippedRows, (element, index) => {
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
      tableData = {
        'cdsId': this._storage.get('cdsId'),
        'section': this.sectionName,
        'volumeRecords': [{
          'stagingID': strippedRows.stagingID,
          'status': strippedRows.status
        }]
      }
    }
    this._featureService.saveApprovals(tableData).then(data => {
      const toast = { type: 'success', title: 'Approval(s) Edited successfully' };
      this._toasterService.pop(toast);
      this.disableCheckBox = false;
      this.selected = [];
      this.isDataLoadingforSave = false;
      this.callOpCostVolumeDetails(this.sectionName);
      this.selectStatus = this.selectedStatus;
    });
  }
  callOpCostVolumeDetails(showActiveUser) {
    if (showActiveUser) {
      this.sectionName = 'usage';
    } else {
      this.sectionName = 'volume';
    }
    const reqData = {
      'section': this.sectionName,
      'cdsId': this._storage.get('cdsId'),
      'yearForVolume': this.selectedYear
    }
    this.volumeDetails = [];
    this.isDataLoadingforSave = true;
    this._featureService.getApprovalDetails(reqData).then(data => {
      this.responseSection = data.responseSection;
      if (this.responseSection === 'usage') {
        this.rows = data.usageRecords;
        this.volumeDetails = data.usageRecords;
        this.temp = _.cloneDeep(data.usageRecords);
      }else {
        this.rows = data.volumeRecords;
        this.volumeDetails = data.volumeRecords;
      }
      this.isDataLoadingforSave = false;
      this.showSaveRibon = false;
      // this.selectedStatus(3);
      // this.clearAllSelected();
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
    });
    this.getAllStatus();
  }

  add(reqData) {
    this.filteredData = reqData;
    this.dataLoadingStarted();
    this._featureService.getApprovalDetails(reqData).then(data => {
      this.approvalTabularDetails = _.cloneDeep(data);  
      if(this.showActiveUser)    {
        this.getSelectedYearData(null);
      }else{
        if (!this.selectedYear) {
          this.selectedYear = data.year1;
        }
        this.getSelectedYearData(this.selectedYear);
      }
      this.dataLoadingCompleted();
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error);      
    });
  }

  getSelectedYearData(selectedYear) {
    let data;
    data = _.cloneDeep(this.approvalTabularDetails);
    if (data.volumeRecords) {
      _.forEach(data.volumeRecords, (element, i) => {
        const getTimeZoneName = moment.tz.guess();
        const getApprovedDateInNumber = Date.parse(element.approveDateString);
        const getCommittedDateInNumber = Date.parse(element.commitedDateString);
        const getChangeDateInNumber = Date.parse(element.changeDateString);
        const getCommitedDataString = Date.parse(element.commitedDateString);
        element.approvedDateWithZone = moment.tz(getApprovedDateInNumber, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
        element.getCommitedDataWithZone = moment.tz(getCommitedDataString, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
        element.getChangeDateWithZone = moment.tz(getChangeDateInNumber, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
        element.committedDateWithZone = moment.tz(getCommittedDateInNumber, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
      });

      this.temp = _.cloneDeep(data.volumeRecords.filter((obj) => obj.lsYear === selectedYear));
      this.rows = _.cloneDeep(data.volumeRecords.filter((obj) => obj.lsYear === selectedYear));

    }else{
      this.temp = _.cloneDeep(data.usageRecords);
      this.rows = _.cloneDeep(data.usageRecords);
    }    
    if (this.rows.length === 0 || this.rows.length === null) {
      this.disableCheckBox = true;
      this.noRows = true;
    } else {
      this.noRows = false;
    }
  }
  selectedServiceDetails(selectedRow, selectedYear) {
    this.highlightedYearSelected = selectedRow;
    this.selectedYear = selectedYear;
    this.getSelectedYearData(selectedYear);
    this.selectedStatus(this.selectStatus);
    this.clearAllSelected();
    // if (this.showSaveRibon) {
    //   const that = this;
    //   that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page', function () {
    //     that.clearAllSelected();
    //     // that.selectStatus = 0;
    //     that.highlightedYearSelected = selectedRow;
    //     that.selectedYear = selectedYear;
    //     that.getSelectedYearData(selectedYear);
    //   }, function () {
    //     return true;
    //   })
    // } else {
    //   this.clearAllSelected();
    //   // this.selectStatus = 0;
    // this.highlightedYearSelected = selectedRow;
    // this.selectedYear = selectedYear;
    //   this.getSelectedYearData(selectedYear);
    // }
    if (this.rows.length === 0) {
      this.disableCheckBox = true;
    }else {
      this.disableCheckBox = false;
    }

  }
  selectAllChecked() {
    if (this.showActiveUser) {
    this.showSaveRibon = true;
    this.disableCheckBox = true;
    this.disableSingleEdit = false;
    localStorage.setItem('showSaveRibon', 'true');
    _.forEach(this.selected, element => {
      _.forEach(this.rows, function (item, j) {
        if (element.usageStagingID === item.usageStagingID) {
          item[j + '-status'] = true;
        }
      })
    })
  } else {
    this.showSaveRibon = true;
    this.disableCheckBox = true;
    this.disableSingleEdit = false;
    localStorage.setItem('showSaveRibon', 'true');
    _.forEach(this.selected, element => {
      _.forEach(this.rows, function (item, j) {
        if (element.stagigId === item.stagigId) {
          item[j + '-status'] = true;
        }
      })
    })
   }
}


exportExcel(response) {
  // if (showActiveUser) {
  //   this.sectionName = 'usage';
  // } else {
  //   this.sectionName = 'volume';
  // }
  // const response = {
  //   'section': this.sectionName,
  //   'cdsId': this._storage.get('cdsId')
  // }
    this._featureService.approvalDownload(response).then(data => {
      const headers = new Headers();
      // headers.append('Accept', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      headers.append('Content-Type',  'vnd.openxmlformats-officedocument.spreadsheetml.sheet' );
      // const contentDispositionHeader: string = response.headers.get('Content-Disposition');
      //           const parts: string[] = contentDispositionHeader.split(';');
      //           const filename = parts[1].split('=')[1];
                const blob = new Blob([response], { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                // saveAs(blob);

    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
    });
}

// private saveToFileSystem(response) {
//   const contentDispositionHeader: string = response.headers.get('Content-Disposition');
//   const parts: string[] = contentDispositionHeader.split(';');
//   const filename = parts[1].split('=')[1];
//   const blob = new Blob([response._body], { type: 'spreadsheet' });
//   saveAs(blob, filename);
// }


  clearAllSelected() {
    this.selected = [];
    this.disableSingleEdit = false;
    this.disableCheckBox = false;
    this.showSaveRibon = false;
    this.restrictedUsers = [];
    // if (this.checkChecked) {
    //   this.rows = this.restrictedUsers;
    //   _.forEach(this.rows, function (element, i) {
    //     element[i + '-status'] = false;
    //   });
    // }else {
    //   this.rows = this.volumeDetails;
    //   _.forEach(this.rows, function (element, i) {
    //     element[i + '-status'] = false;
    //   });
    // }
    _.forEach(this.rows, function (element, i) {
      element[i + '-status'] = false;
    });
}
  openActionModal(dataForAction, modalDetails) {
    let t;
    this._modal.open(ApprovalConfirmationModalComponent,
      overlayConfigFactory({
        approvalDetails: dataForAction,
        heading: modalDetails.heading,
        action: modalDetails.action,
        actionBtnText: modalDetails.actionBtnText,
        sectionName: this.sectionName
      }, ApprovalConfirmationModalContext)).then(d => {
        t = d.result.then(data => {
            this.selected = [];
            this.rows = [];
            this.callOpCostVolumeDetails(this.showActiveUser);
        });
      });
  }
  openApproveModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to approve the below user(s) ?',
      action: 'approve',
      actionBtnText: 'APPROVE'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  // approve all the user
  openCommitModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to commit the below user(s) ?',
      action: 'commit',
      actionBtnText: 'COMMIT'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  // unapprove all the user
  openUnapproveModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to unapprove the below user(s) ?',
      action: 'unapprove',
      actionBtnText: 'UN-APPROVE'
    }
    this.openActionModal(dataToDelete, modalDetails)
  };
  // reject all the user
  openRejectModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to reject the below user(s) ?',
      action: 'reject',
      actionBtnText: 'REJECT'
    }
    this.openActionModal(dataToDelete, modalDetails)
  };
  approveAllSelected() {
    this.openApproveModal(this.selected);
  };
  unapproveAllSelected() {
    this.openUnapproveModal(this.selected);
  };
  commitAllSelected() {
    this.openCommitModal(this.selected);
  };
  rejectAllSelected() {
    this.openRejectModal(this.selected);
  };
  dataLoadingStarted(): void {
    this.isDataLoading = true;
  }
  dataLoadingCompleted(): void {
    this.isDataLoading = false;
  }

  showDeafultPage(event) {
    this.showStaticTemp = event
  }

  getAllStatus() {
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]'
    });
    this._featureService.getFilterStatusData().then(data => {
      // this.dataLoadingCompleted();
      const selectAll = {
        id: 0,
        name: 'All',
        units: null
      }
      this.allStatusData = data;
      this.selectStatus = 3;
      this.allStatusData = _.sortBy(this.allStatusData, ['name']);
      this.allStatusData.unshift(selectAll)
      _.remove(this.allStatusData, item => item.id === 1);
      _.remove(this.allStatusData, item => item.id === 6);
      const statusTable = [{
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
      this.allStatusforTable = statusTable;
      this.allStatusforTable = _.sortBy(this.allStatusforTable, ['name']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };

  selectedStatus(id) {
    // this.clearAllSelected();
    let filteredData;
    filteredData = [];
    if (id !== 0) {
      this.selectStatus = id;
      _.find(_.cloneDeep(this.temp), data => {
        if (data.statusId === id) {
          if (data.changeType !== 'Remove' && data.statusId === 5) {
            filteredData.push(data);
          } else if (data.statusId !== 5) {
            filteredData.push(data);
          }
        };
      });
      this.rows = filteredData;
    } else {
      _.find(_.cloneDeep(this.temp), data => {
        if (data.changeType !== 'Remove') {
          filteredData.push(data)
        } else if (data.changeType === 'Remove' && data.statusId !== 5) {
          filteredData.push(data)
        }
      });
      this.rows = filteredData;
    }
      // if (this.searchedWordText !== undefined && this.searchedWordText.searchValue !== undefined) {
      //   const val =  this.searchedWordText.searchValue.toLowerCase();
      //   const temp = this.rows.filter(function (d) {
      //    return d.applicationDetailsId.toLowerCase().indexOf(val) !== -1 || !val;
      //  });
      //  this.rows = temp;
      // }
      // this.temp = this.rows;
  }

  showRestrictedUsers(event) {
    this.checkChecked = event.target.checked;
    this.getFilteredRestrictedUsers(this.rows);
  }

  getFilteredRestrictedUsers(data) {
    const restrictedUsersTemp = _.cloneDeep(data);
    this.restrictedUsers = restrictedUsersTemp.filter(obj => obj.restrictedLegalEntity === true);
    if (this.checkChecked) {
      this.rows = this.restrictedUsers;
    }else {
      this.rows = this.volumeDetails;
    }
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.selectedYearData = undefined;
    // this.selectedServiceDetails(1, this.volumeDetails['year1']);
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
