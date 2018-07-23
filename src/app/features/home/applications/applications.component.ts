import {
  Component, OnInit, ViewChild, AfterViewChecked, OnChanges, SimpleChange,
  ChangeDetectorRef, ViewEncapsulation, HostListener
} from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser'
import { Action } from 'rxjs/scheduler/Action';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { FormsModule } from '@angular/forms';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AddUserModalComponent, AddUserModalContext } from '../../home/global-modal';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { CommonUtil } from '../../../utils/common.util';
import { DeleteConfirmationModalContext, DeleteConfirmationModalComponent } from '../../home/global-modal';
import { FeatureService } from '../../../../app/services/featureServices/feature.service';
import { ConfermationAlertService } from '../../../services/commonService';
import { ApplicationService } from './applications.component.service';
// import * as _ from "lodash";
declare var $: any;
declare var _: any;
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  providers: [FeatureService, ConfermationAlertService],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationsComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('tableWrapper') tableWrapper;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private currentComponentWidth;
  // @ViewChild('myTable') table: DatatableComponent;
  // @ViewChild('tableWrapper') tableWrapper;
  @ViewChild('searchedWordText') searchedWordText;
  rows: any;
  columns: any;
  editing = {
    proposedNegotiatedAmount: Number,
    comments: String,
    status: String
  };
  authorizername: any;
  showNavDetails
  selected = [];
  showNavFor: string;
  selectStatus;
  loadingIndicator = false;
  showStaticTemp: boolean;
  showStaticForSelection: boolean;
  selectedAppHeaderDetails: any;
  defaultSelection: number;
  allStatusforTable: any;
  onlyHeaderData: any;
  disableSingleDelete: boolean;
  isDataLoadingforSave: boolean;
  disableCheckBox: boolean;
  singleRowEdit: number;
  ligialIntity: Array<object>;
  removedDataForRow: Array<object>;
  allLigalEntity: Array<object>;
  removedDataForFilter: Array<object>;
  reservedRowsData: Array<object>;
  // editing = {};
  temp = [];
  // selected = [];
  deleteOneRow = [];
  allStatusData: any;
  itmsId: number;
  showActiveUser: boolean;
  isDataLoading: boolean;
  showSaveRibon: boolean;
  checkForChangeInApp: boolean;
  write: boolean;
  // read: boolean;
  CommentMandatory: boolean;
  setEditFlag: boolean;
  setDeleteFlag: boolean;
  canEdit: boolean;
  deletable: boolean;
  selectedDropdown: boolean;
  approve: boolean;
  disableNewUser: boolean;
  adminCommit: boolean;
  actionPermission;
  accessToUsage;
  accessToAll;
  selectedItmsId;
  TempForNotAvailable: boolean;
  showPhysicalApplicationError: boolean;
  enableNegotiatedAmount: boolean;
  localRows:any;
  negotiateAmtError: boolean;
  constructor(private _modal: Modal, private changeDetectorRef: ChangeDetectorRef,
    private _storage: LocalStorageService,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private _featureService: FeatureService) {
    this.showActiveUser = true;
    this.selectStatus = 0;
    this.showNavDetails = true;
    this.showNavFor = 'Usage';
    this.showStaticTemp = true;
    this.disableCheckBox = false;
    this.showStaticForSelection = true;
    this.disableNewUser = true;
    this.setDeleteFlag = false;
    this.CommentMandatory = false;
    this.adminCommit = true;
    this.setEditFlag = false;
    this.disableSingleDelete = false;
    this.TempForNotAvailable = false;
    this.showSaveRibon = false;
    localStorage.setItem('showSaveRibon', 'false');
    this.enableNegotiatedAmount = true;
    this.selectedDropdown = false;
    this.showPhysicalApplicationError = false;
    const authPermission = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.actionPermission = JSON.parse(authPermission);
    const autorisationFor = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.authorizername = JSON.parse(autorisationFor);
    // this.getallIntityDetails()
    this.getAllSkills();
    this.negotiateAmtError = false;
  }

  // onSelect({ selected }) {
  //   console.log('Select Event', selected, this.selected);

  //   this.selected.splice(0, this.selected.length);
  //   this.selected.push(...selected);
  // }
  // @HostListener('window:resize')
  // onResize() {
  //   this.table.recalculate()
  // }

  ngOnInit() {
    $(document).ready(function () {
      // $('.show-user').on('click', function () {
      //   if ($(this).hasClass('show-active-user')) {
      //     return true;
      //   } else {
      //     $('.show-hide-usage').children().removeClass('show-active-user');
      //     $(this).addClass('show-active-user');
      //   }
      // });
      $('.datatable-header-cell[title]').on('mouseenter', function (e) {
        e.preventDefault();
      });

      // $('.show-user').on('click', function () {
      //   if ($(this).hasClass('show-active-user')) {
      //     return true;
      //   } else {
      //     $('.show-hide-usage').children().removeClass('show-active-user');
      //     $(this).addClass('show-active-user');
      //   }
      // });
      // $('#edit-row').mouseenter(function () {
      //     $(this).removeClass('edit-btn');
      //     $(this).addClass('edit-btn-on-hover');
      // });
      // $('#edit-row').mouseleave(function () {
      //     $(this).removeClass('edit-btn');
      //     $(this).addClass('edit-btn-on-hover');
      // });
      // $('#delete-row').mouseenter(function () {
      //     $(this).removeClass('delete-btn');
      //     $(this).addClass('delete-btn-on-hover');
      // });
      // $('#delete-row').mouseleave(function () {
      //     $(this).removeClass('delete-btn');
      //     $(this).addClass('delete-btn-on-hover');
      // });
    });
    this.authorisationPermission()
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
  authorisationPermission() {
    _.forEach(this.actionPermission, (data, index) => {
      if (data.name === 'AllScreens') {
        this.accessToAll = data
      }
      // if (data.name === 'Admin') {
      //   this.accessToAll = data
      // }
      if (data.name === 'Usage') {
        this.accessToUsage = data
      } else {
        if (this.accessToAll) {
          this.write = this.accessToAll.write;
          this.approve = this.accessToAll.approve;
        }
      }
      if (this.accessToUsage) {
        if (this.accessToUsage.write === false) {
          this.write = false;
        } else {
          this.write = true;
        }
        if (this.accessToUsage.approve === false) {
          this.approve = false;
        } else {
          this.approve = true;
        }
      }
    })

  }
  updateFilterForRemoved(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.removedDataForFilter.filter(function (d) {
      return d['legalEntityName'].toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.removedDataForRow = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp1 = this.rows;
    // filter our data
    let selectedData;
    selectedData = [];
    _.forEach(_.cloneDeep(this.temp), item => {
      if (item.status === this.selectStatus || this.selectStatus === 0) {
        if (item.type !== 'Remove' && item.status === 5) {
          selectedData.push(item)
        } else if (item.status !== 5) {
          selectedData.push(item)
        }
      } else {
        if (item.status === this.selectStatus) {
          if (item.type !== 'Remove' && item.status === 5) {
            selectedData.push(item)
          } else if (item.status !== 5) {
            selectedData.push(item)
          }
        }
      }

    });
    const temp = selectedData.filter(function (d) {
      return d.legalEntityName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  showActive(showPannel) {
    this.clearAllSelected();
    if (!showPannel) {
      this.getRemovedData();
  }
    this.showActiveUser = showPannel
  }
  toCheckForAppChange() {
    if (this.checkForChangeInApp === true) {
      this.checkForChangeInApp = undefined;
    } else {
      this.checkForChangeInApp = true;
    }
  }
  setFlag(selected) {
    if (selected.length === 1) {
      if (selected[0].canEdit === true) {
        this.setEditFlag = false;
      } else {
        this.setEditFlag = true;
      }
      if (selected[0].enableDropDown === true) {
        this.selectedDropdown = false;
      } else {
        this.selectedDropdown = true;
      }
      if (selected[0].deletable === true) {
        this.setDeleteFlag = false;
      } else {
        this.setDeleteFlag = true;
      }
    } else {
      let selectedDropdown = false;
      let setEditFlag = false;
      let setDeleteFlag = false;
      _.forEach(selected, (element) => {
        if (element.canEdit !== true) {
          setEditFlag = true;
        }
        if (element.deletable !== true) {
          setDeleteFlag = true;
        }
        if (element.enableDropDown !== true) {
          selectedDropdown = true;
        }
      });
      this.setEditFlag = setEditFlag;
      this.setDeleteFlag = setDeleteFlag;
      this.selectedDropdown = selectedDropdown;
    }
  }
  onSort(event) {
    // const val = event.target.value.toLowerCase();
    // const temp = this.temp.filter(function(d) {
    //   return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    // });
    // this.rows = temp;
    // this.sorts = [...this._sorts];
    // console.log(event);
    const sortProp = event.column.prop;
    this.localRows = _.cloneDeep(this.rows);
    // tslint:disable-next-line:radix
    this.localRows = _.orderBy([...this.localRows], [rows => parseInt(rows[sortProp]) ? rows[sortProp] : rows[sortProp].toLowerCase()], [event.newValue]);
    this.rows = [];
    this.rows = _.cloneDeep(this.localRows);
  }
  onSelect({ selected }) {
    this.setFlag(selected);
    if (selected) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      if (this.selected.length === 0) {
        _.forEach(this.rows, function (item, j) {
          item[j + '-proposedNegotiatedAmount'] = false;
          item[j + '-comments'] = false;
          item[j + '-status'] = false;
        });
      }
      _.forEach(this.selected, element => {
        _.forEach(this.rows, function (item, j) {
          if (element.usageId !== item.usageId) {
            item[j + '-proposedNegotiatedAmount'] = false;
            item[j + '-comments'] = false;
            item[j + '-status'] = false;
          }
        })
      })
      if (this.selected.length > 0) {
        this.disableSingleDelete = true;
        this.showSaveRibon = false;
        localStorage.setItem('showSaveRibon', 'false');
      } else {
        this.showSaveRibon = false;
        this.disableSingleDelete = false;
        localStorage.setItem('showSaveRibon', 'false');
      }
    }
  }
  onCheckboxChange(event, asd) {
  }
  selectAllChecked() {
    this.showSaveRibon = true;
    localStorage.setItem('showSaveRibon', 'true');
    this.disableSingleDelete = false;
    _.forEach(this.selected, element => {
      _.forEach(this.rows, function (item, j) {
        if (element.usageId === item.usageId) {
          item[j + '-proposedNegotiatedAmount'] = true;
          item[j + '-comments'] = true;
          item[j + '-status'] = true;
        }
      })
    })
  }
  deleteAllSelected() {
    if (this.selected.length === 1) {
      this.openDeleteModal(this.selected);
    } else {
      this.selected.splice(0, 1);
      this.openDeleteModal(this.selected);
    }
  };
  editAllSelected() {
    this.openEditModal(this.selected);
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
  clearAllSelected() {
    this.selected = [];
    this.disableSingleDelete = false;
    this.disableCheckBox = false;
    this.showSaveRibon = false;
    this.negotiateAmtError = false;
    localStorage.setItem('showSaveRibon', 'false');
    this.selectedStatus(this.selectStatus);
    // _.forEach(this.temp, item => {
      if (this.localRows) {
        this.rows = [...this.localRows];
      } else if (this.reservedRowsData) {
        this.rows = [...this.reservedRowsData];
      }
    _.forEach(this.rows, function (element, i) {
      element[i + '-proposedNegotiatedAmount'] = false;
      element[i + '-comments'] = false;
      element[i + '-status'] = false;
    });
  }
  // call update service to update the data
  callUpdateService(strippedRows) {
    this.isDataLoadingforSave = true;
    this.showSaveRibon = false;
    localStorage.setItem('showSaveRibon', 'false');
    this._featureService.updateUser(strippedRows).then(data => {
      const toast = { type: 'success', title: 'User(s) Edited successfully' };
      this._toasterService.pop(toast);
      this.disableCheckBox = false;
      this.selected = [];
      this.isDataLoadingforSave = false;
      this.toCheckForAppChange();
      this.getApplicationDetails(this.selectedItmsId);
    });
  }
  // selected row to edit the data
  saveEdit() {
    let dataEdited = [];
    let selectedSingleEditData;
    selectedSingleEditData = [];
    if (this.selected.length > 0) {
      dataEdited = _.map(this.selected, function (row, index) {
        return _.omit(row, ['changeBy', 'legalEntityName', 'rowNo', 'negotiatiatedAmount', 'type',
          index + '-comments', index + '-proposedNegotiatedAmount', index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        element.statusId = element.status;
        element.cdsId = this._storage.get('cdsId');
        delete element.status;
        delete element.rowNo;
        // delete element._.find()
        selectedSingleEditData.push(element);
      });
      this.callUpdateService(selectedSingleEditData);
    } else {
      dataEdited = _.map(this.rows, function (row, index) {
        return _.omit(row, ['changeBy', 'read', 'legalEntityName', 'negotiatiatedAmount', 'type',
          index + '-comments', index + '-proposedNegotiatedAmount',
          (index + 1) + '-comments', (index + 1) + '-proposedNegotiatedAmount',
          index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        if (this.singleRowEdit === index) {
          element.statusId = element.status;
          element.cdsId = this._storage.get('cdsId');
          Number(element.proposedNegotiatedAmount);
          delete element.status;
          delete element.rowNo;
          selectedSingleEditData.push(element);
        }
      });
      this.callUpdateService(selectedSingleEditData)
    }
  }
  getallIntityDetails() {
    const reqst = {
      'itmsId': this.selectedItmsId.itmsId,
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.getLigialIntityModified(reqst).then(data => {
      this.allLigalEntity = data;
      const legalEntity = data
      _.forEach(this.rows, element => {
        _.remove(legalEntity, item => item.legalEntityID === element.legalEntityId);
      })
      this.ligialIntity = legalEntity;
      this.ligialIntity = _.sortBy(this.ligialIntity, ['legalEntityID']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
    });
  }
  showDeafultPage(event) {
    this.showStaticTemp = event
  }
  // onActivate(event) {
  //   if (event.type === 'click') {
  //     // this.deleteOneRow = [];
  //     // if (this.selected.length > 0) {
  //     //   _.find(this.selected, data => {
  //     //     if (data.legalEntityId !== event.row.legalEntityId) {
  //     //       this.deleteOneRow.push(event.row);
  //     //     }
  //     //     this.selected = this.deleteOneRow;
  //     //     console.log('Activate Event', this.selected);
  //     //   });
  //     // } else {
  //     //   this.deleteOneRow.push(event.row);
  //     // }
  //   }
  // }
  openAddUseModal(item, showAddBtn, addAgain) {
    let legalEntity;
    if (item) {
      legalEntity = item;
    }
    let t;
    this._modal.open(AddUserModalComponent,
      overlayConfigFactory({
        addUserDetails: 'UserDetails', allLigialIntity: this.ligialIntity, allLigalEntityWithoutFilter: this.allLigalEntity,
        addUserId: this.itmsId, addBtn: showAddBtn, addAgain: addAgain, legalEntity: legalEntity
      }, AddUserModalContext)).then(d => {
        t = d.result.then(data => {
          if (this.selectedItmsId) {
            this.getApplicationDetails(this.selectedItmsId)
            this.toCheckForAppChange();
            this.showActive(true);
          }
        });
      });
  }
  openActionModal(dataForAction, modalDetails) {
    let t;
    this._modal.open(DeleteConfirmationModalComponent,
      overlayConfigFactory({
        deleteServiceDetails: dataForAction,
        heading: modalDetails.heading,
        action: modalDetails.action,
        actionBtnText: modalDetails.actionBtnText,
        itmsId: this.selectedItmsId.itmsId
      }, DeleteConfirmationModalContext)).then(d => {
        t = d.result.then(data => {
          if (this.selectedItmsId) {
            this.getApplicationDetails(this.selectedItmsId);
            this.selected = [];
            this.disableSingleDelete = false;
            this.toCheckForAppChange();
          }
        });
      });
  }
  // delete all the user
  openDeleteModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to remove the below user(s) ?',
      action: 'delete',
      actionBtnText: 'REMOVE'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  // edit all the user
  openEditModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to edit the below user(s) ?',
      action: 'edit',
      actionBtnText: 'SAVE'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  // approve all the user
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
  deleteApplication(item) {
    let selectedData;
    selectedData = [];
    selectedData.push(item)
    this.openDeleteModal(selectedData);
  }
  getApplication() {
    this.dataLoadingStarted();
    // this.rows = [];
    const appRequest = {
      cdsId: 'ALL'
    }
    this._featureService.getAppliationTabular(appRequest).then(data => {
      this.dataLoadingCompleted();
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
      this.dataLoadingCompleted();
    });
  }
  getAllSkills() {
    this._featureService.getFilterStatusData().then(data => {
      // this.dataLoadingCompleted();
      const selectAll = {
        id: 0,
        name: 'All',
        units: null
      }
      this.allStatusData = _.sortBy(this.allStatusData, ['name']);
      this.allStatusData = data
      // this.selectStatus = 0;
      this.allStatusData.unshift(selectAll)
      _.remove(this.allStatusData, item => item.id === 1);
      _.remove(this.allStatusData, item => item.id === 5);
      _.remove(this.allStatusData, item => item.id === 4);
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
      }]
      this.allStatusforTable = statusTable;
      _.find(this.authorizername, (element, index) => {
        if (element.name === 'Admin') {
          this.adminCommit = false;
          const commentStatus = {
            id: 5,
            name: 'Committed',
            units: null
          }
          this.allStatusforTable.push(commentStatus);
        }
      });
      this.allStatusforTable = _.sortBy(this.allStatusforTable, ['name']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      // this.dataLoadingCompleted();
    });
  }
  getRemovedData() {
    let removedData;
    removedData = [];
    _.find(_.cloneDeep(this.temp), data => {
      if (data.type === 'Remove' && data.status === 5) {
        removedData.push(data)
      };
    });
    this.removedDataForRow = removedData;
    this.removedDataForFilter = removedData;
  }
  selectedStatus(id) {
    let filteredData;
    filteredData = []
    if (this.searchedWordText !== undefined) {
      this.searchedWordText.searchValue = '';
    }
    if (id !== 0) {
      this.selectStatus = id;
      _.find(_.cloneDeep(this.temp), data => {
        if (data.status === id) {
          if (data.type !== 'Remove' && data.status === 5) {
            filteredData.push(data)
          } else if (data.status !== 5) {
            filteredData.push(data)
          }
        };
      });
      this.rows = filteredData;
    } else {
      _.find(_.cloneDeep(this.temp), data => {
        if (data.type !== 'Remove') {
          filteredData.push(data)
        }
        // tslint:disable-next-line:one-line
        else if (data.type === 'Remove' && data.status !== 5) {
          filteredData.push(data)
        }
      });
      this.rows = filteredData;
    }
  }
  getSearchedText(item) {
  }
  callGetApplication(reqData) {
    this.clearAllSelected();
    this.dataLoadingStarted();
    this.showSaveRibon = false;
    localStorage.setItem('showSaveRibon', 'false');
    this.selectedAppHeaderDetails = undefined;
    this.showStaticTemp = undefined;
    this._featureService.getAppliationUsageDetails(reqData).then(data => {
      this.dataLoadingCompleted();
      _.forEach(data.usageDetails, (element) => {
        const getTimeZoneName = moment.tz.guess();

        if (element.approveDate) {
          const getApprovedDateInNumber = Date.parse(element.approveDateString);
          element.approvedDateWithZone = moment.tz(getApprovedDateInNumber, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');

        }
        if (element.committedDate) {
          const getCommittedDateInNumber = Date.parse(element.committedDate);
          element.committedDateWithZone = moment.tz(getCommittedDateInNumber, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
        }
        if (element.changeDate) {
          const getLastModifiedDateInNumber = Date.parse(element.changeDateString)
          element.lastModifiedDateWithZone = moment.tz(getLastModifiedDateInNumber, getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
        }
      })
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
      if (data.usageDetails) {
        this.temp = _.cloneDeep(data.usageDetails);
        this.reservedRowsData = _.cloneDeep(data.usageDetails)
        this.rows = _.cloneDeep(data.usageDetails);
      }
      // this.read = this.rows[0].read;
      this.selectedAppHeaderDetails = data.header;
      if (this.selectedAppHeaderDetails.showContent) {
        this.showStaticTemp = false;
        this.TempForNotAvailable = false;
        this.showPhysicalApplicationError = false;
        this.showStaticForSelection = true;
        this.onlyHeaderData = this.selectedAppHeaderDetails;
      } else {
        this.showStaticTemp = true;
        this.defaultSelection = null;
        this.TempForNotAvailable = true;
        this.showPhysicalApplicationError = this.selectedAppHeaderDetails.showPhysicalApplicationError;
        this.showStaticForSelection = false;
        this.onlyHeaderData = this.selectedAppHeaderDetails;
      }

      this.getallIntityDetails()
      _.forEach(this.rows, (element, i) => {
        element.rowNo = i;
        element.cdsId = this._storage.get('cdsId');
      });
      if (this.rows.length === 0) {
        this.disableCheckBox = true;
      }
      this.selectedStatus(this.selectStatus);
      this.getRemovedData();
    }, error => {
      console.log(error);
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      this.dataLoadingCompleted();
    });
  }
  // onActivate(event) {
  //   console.log('Activate Event', event);
  // }
  remove(event) {
    event.confirm.resolve();
  }

  // editing(event) {
  //   event.newData['row'] += ' ';
  //   event.confirm.resolve(event.newData);
  //   console.log(event.newData);
  // }
  callGetApplicationDetais(reqData) {
    // this.selectStatus = 0;
    this.selectedItmsId = reqData
    this.rows = [];
    this.itmsId = reqData.itmsId;
    const tableData = {
      'itmsId': reqData.itmsId,
      'cdsId': this._storage.get('cdsId')
    }
    if (!reqData.fromAppList) {
      this.defaultSelection = null;
    }
    if (reqData.selectionOn === 'usageApp' || reqData.selectionOn === 'usageFilteredApp') {
      this.callGetApplication(tableData);
      this.showStaticTemp = false;
    } else {
      let result;
      let idPresent;
      result = _.some(reqData.userAppData, function (topic) {
        idPresent = topic.itmsId === reqData.itmsId;
      });
      if (idPresent) {
        this.callGetApplication(tableData);
      } else {
        this.showStaticTemp = true;
        this.TempForNotAvailable = true;
        this.showPhysicalApplicationError = true;
        this.showStaticForSelection = false;
        delete reqData.userAppData;
        this.onlyHeaderData = reqData;
      }
      this.callGetApplication(tableData);
      // let result;
      // let idPresent;
      // result = _.some(reqData.userAppData, function (topic) {
      //   idPresent = topic.itmsId === reqData.itmsId;
      // });
      // console.log(result);
      // if (idPresent) {
      //   this.callGetApplication(tableData);
      // } else {
      //   this.callGetApplication(tableData);
      // }
    }
  }
  getApplicationDetails(reqData) {
    if (this.showSaveRibon) {
      const that = this;
      // setTimeout(function () {
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page', function () {
        // ACTION: Do this If user says YES
        // that['name'] = 'Yes clicked';
        that.callGetApplicationDetais(reqData);
      }, function () {
        // ACTION: Do this if user says NO
        // that['name'] = 'No clicked';
        return true;
      })

      // }, 2000)
    } else {
      this.callGetApplicationDetais(reqData);
    }
  };
  // getRowClass(row) {
  //   return 'danger';
  // }
  ngAfterViewChecked() {
    if (this.table && this.table.recalculate && (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth)) {
      this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
      this.table.recalculate();
      // this.changeDetectorRef.detectChanges();
      window.dispatchEvent(new Event('resize'));
    }
  }
  // }
  dataLoadingStarted(): void {
    this.isDataLoading = true;
  }
  dataLoadingCompleted(): void {
    this.isDataLoading = false;
  }
  editRow(rowIndex, row) {
    $('.tooltip').fadeOut('fast', function() {
      $('.tooltip').remove();
      });
    if (row.legalEntityType === 'Restricted') {
      if(row.status === 6){
        row.status = 2;
      }
      if (!row.proposedNegotiatedAmount === null || !row.comments === null || row.proposedNegotiatedAmount === '' || row.comments === '') {
        this.CommentMandatory = true;
      } else {
        this.CommentMandatory = false;
      }
    } else {
      if (row.comments === null || row.comments === '') {
        this.CommentMandatory = true;
      } else {
        this.CommentMandatory = false;
      }
    };

    this.disableCheckBox = true;
    this.singleRowEdit = rowIndex;
    _.forEach(this.rows, function (element, i) {
      if (i === rowIndex) {
        element[rowIndex + '-proposedNegotiatedAmount'] = true;
        element[rowIndex + '-comments'] = true;
        element[rowIndex + '-status'] = true;
      }
    });
    this.disableSingleDelete = false;
    this.showSaveRibon = true;
    localStorage.setItem('showSaveRibon', 'true');

  }
  updateValue(event, cell, rowIndex) {
    //if (event.target.value.split('')[0] != 0) {
      // this.editing[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
      if (this.rows[rowIndex]['proposedNegotiatedAmount'] !== null) {
        const negotiatiatedvalue = this.rows[rowIndex]['proposedNegotiatedAmount'];
        const commentField = this.rows[rowIndex]['comments'].trim();
        if (negotiatiatedvalue.length === 0 || commentField.length === 0) {
          this.CommentMandatory = true;
        } else {
          this.CommentMandatory = false;
        };
      } else {
        const commentField = this.rows[rowIndex]['comments'].trim();
        if (commentField.length === 0) {
          this.CommentMandatory = true;
        } else {
          this.CommentMandatory = false;
        };
      }
    //}
    
    const negotiate = event.target.value.trim();
    this.negotiateAmtError = false;
    if(cell === "proposedNegotiatedAmount" && negotiate != "" ){
      if(negotiate === "0" || negotiate === 0){
        this.negotiateAmtError = true;
      }
      if(Math.floor(negotiate) == negotiate && negotiate.match("^[0-9]{0,7}?$") === null){
        this.negotiateAmtError = true;
      }  
      if(negotiate.match("^[0-9]{0,7}(?:\.[0-9]{0,6})?$") === null){
        this.negotiateAmtError = true;
      }      
    }
    
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['showSaveRibon'] !== undefined) {
      this._storage.set('showSaveRibon', this.showSaveRibon);
    }
  }
  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0 || event.charCode === 46) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}


