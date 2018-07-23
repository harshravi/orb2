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
import {
  AddLumpSumModalComponent, AddLumpSumModalContext,
  LumpSumActionModalComponent, LumpSumActionModalContext
} from '../../home/global-modal';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../services';
declare var $: any;
declare var _: any;

@Component({
  selector: 'app-lump-sums',
  templateUrl: './lump-sums.component.html',
  styleUrls: ['./lump-sums.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class LumpSumsComponent implements OnInit, OnChanges, AfterViewChecked {
  private currentComponentWidth;
  @ViewChild('myTable') table: DatatableComponent;
  @ViewChild('tableWrapper') tableWrapper;
  @ViewChild('searchedWordText') searchedWordText;


  @Input()
  volumeDetailsData: Array<object>;
  @Input()
  budgetDetailId: number;
  @Input()
  volumeTabularDetails: Array<object>;
  @Input()
  write: boolean;
  @Input()
  approve: boolean;
  @Output()
  goToVolumePage = new EventEmitter();
  rows: any;
  columns: any;
  temp: any;
  yearSelection: any;
  onlyHeaderData: any;
  volumeDetails: Array<object>;
  allRegionsData: Array<object>;
  AllServices: Array<object>;
  allSkill: Array<object>;
  allLegal: Array<object>;
  allStatusData: any;
  showStaticTemp: boolean;
  volumeDetailsName: any;
  showStaticForSelection: boolean;
  selectedAppHeaderDetails: any;
  isDataLoading: boolean;
  selectStatus: number;
  highlightedYearSelected: number;
  selectedDataItmsId: number;
  selectedItmsId;
  allRegions: Array<object>;
  allPurchaseOrder: Array<object>;
  TempForNotAvailable: boolean;
  selectedYearData;
  selectedYear: number;
  disableSingleDelete: boolean;
  showSaveRibon: boolean;
  showDeleteBtn: boolean;
  canEdit: boolean;
  disableCheckBox: boolean;
  filteredData: Array<object>;
  filteredSkill: Array<object>;
  filteredService: Array<object>;
  singleRowEdit: number;
  CommentMandatory: boolean;
  dashboardDetails: any;
  selected = [];
  allStatusforTable;
  actionPermission;
  authorizername;
  accessToLumpsum;
  accessToAll;
  imAdmin: boolean;
  noRows: boolean;
  totalQuantity;
  totalCost;
  units;
  currency;

  constructor(private _modal: Modal,
    private _storage: LocalStorageService,
    private _toasterService: ToasterService,
    private _confermationAlertService: ConfermationAlertService,
    private changeDetectorRef: ChangeDetectorRef, private _featureService: FeatureService) {
    this.rows = [];
    this.showStaticTemp = true;
    this.disableSingleDelete = false;
    this.imAdmin = false;
    this.showSaveRibon = false;
    this.showStaticForSelection = true;
    this.highlightedYearSelected = 1;
    this.TempForNotAvailable = false;
    this.CommentMandatory = true;
    this.showDeleteBtn = false;
    this.canEdit = true;
    this.volumeDetailsName = this._storage.get('volumeDetailsName')
    this.getAllStatus();
    this.getChangeRegions();
    this.getPurchaseOrder();
    this.getLumpsumDetails();
    this.getRegions();
    this.getLegal();
    this.selectStatus = 0;
    const authPermission = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.actionPermission = JSON.parse(authPermission);
    const autorisationFor = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.authorizername = JSON.parse(autorisationFor);
    this.noRows = false;
  }
  authorisationPermission() {
    _.forEach(this.actionPermission, (data, index) => {
      if (data.name === 'AllScreens') {
        this.accessToAll = data
      }
      // if (data.name === 'Admin') {
      //   this.accessToAll = data
      // }
      if (data.name === 'Admin') {
        this.imAdmin = true;
        this.approve = true
      }
      if (data.name === 'Lump Sum') {
        this.accessToLumpsum = data
      } else {
        if (this.accessToAll) {
          this.write = this.accessToAll.write;
          this.approve = this.accessToAll.approve;
        }
      }
      if (this.accessToLumpsum) {
        if (this.accessToLumpsum.write === false) {
          this.write = false;
        } else {
          this.write = true;
        }
        if (this.accessToLumpsum.approve === false) {
          this.approve = false;
        } else {
          this.approve = true;
        }
      }
    })

  }
  gerDashboardData(data) {
    this.dashboardDetails = data
    this.getSkill();
    this.getAllServiceList();
  }
  getLumpsumDetails() {
    /*for (let i=0 ; i < this.multiSelectedLegal.length ; i++ ) {
      this.selectedLegalIDs.push(this.multiSelectedLegal[i].legalEntityID)
    }*/
    const reqData = {
      'cdsId': this._storage.get('cdsId')
    }
    this.dataLoadingStarted()
    this._featureService.getAlllumpsums(reqData).then(data => {
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
      this.dataLoadingCompleted();
      this.volumeTabularDetails = _.cloneDeep(data);
      if (!this.selectedYear) {
        this.selectedYear = data.year1;
      }
      this.currency = data.currency;
      this.getSelectedYearData(this.selectedYear);
      // this.rows = data.filter((obj) => obj.lsYear === data.year1);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  selectedServiceDetails(selectedRow, selectedYear) {
    // this.selectStatus = 0;
    this.highlightedYearSelected = selectedRow;
    this.selectedYear = selectedYear;
    this.clearAllSelected();
    this.getSelectedYearData(selectedYear);
    this.selectedStatus(this.selectStatus);
  }
  getSelectedYearData(selectedYear) {
    let data;
    data = _.cloneDeep(this.volumeTabularDetails);
    if (data.lumpSumsDTOs) {
      _.forEach(data.lumpSumsDTOs, (element, i) => {
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
    }
    this.temp = _.cloneDeep(data.lumpSumsDTOs.filter((obj) => obj.lsYear === selectedYear));
    this.rows = _.cloneDeep(data.lumpSumsDTOs.filter((obj) => obj.lsYear === selectedYear));
    if (this.rows.length === 0) {
      this.disableCheckBox = true;
      this.noRows = true;
    } else {
      this.noRows = false;
    }
  }

  add(reqData) {
    this.filteredData = reqData;
    this.dataLoadingStarted();
    this._featureService.getAlllumpsums(reqData).then(data => {
      this.volumeTabularDetails = _.cloneDeep(data);
      if (!this.selectedYear) {
        this.selectedYear = data.year1;
      }
      this.getSelectedYearData(this.selectedYear);
      this.dataLoadingCompleted();
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  onSelect({ selected }) {
    if (selected) {

      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      if (this.selected.length > 0) {
        this.disableSingleDelete = true;
        this.showSaveRibon = false;
      } else {
        this.showSaveRibon = false;
        this.disableSingleDelete = false;
      }
      if (this.selected.length > 1) {
        this.canEdit = false;
      } else  {
        this.canEdit =  true;
      }
    }
  }
  ngOnInit() {
    this.authorisationPermission();
    // this.gerDashboardData();
  }
  getRowClass(row) {
    return 'danger';
  }
  getAllStatus() {
    this._featureService.getFilterStatusData().then(data => {
      // this.dataLoadingCompleted();
      const selectAll = {
        id: 0,
        name: 'All',
        units: null
      }
      this.allStatusData = data
      this.selectStatus = 0;
      this.allStatusData.unshift(selectAll)
      _.remove(this.allStatusData, item => item.id === 1);
      // _.remove(this.allStatusData, item => item.id === 4);
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
        id: 5,
        name: 'Committed',
        units: null
      }, {
        id: 4,
        name: 'Rejected',
        units: null
      }]
      if (!this.approve) {
        _.remove(statusTable, item => item.id === 3);
        _.remove(statusTable, item => item.id === 4);
        _.remove(statusTable, item => item.id === 5);
        // _.remove(this.allStatusData, item => item.id === 3);
      }
      this.allStatusforTable = statusTable;
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  getPurchaseOrder() {
    this._featureService.getPurchaseOrderList().then(data => {
      // this.dataLoadingCompleted();
      this.allPurchaseOrder = data
    }, error => {
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  getChangeRegions() {
    this._featureService.getChangeRegionList().then(data => {
      // this.dataLoadingCompleted();
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
      this.allRegions = data
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  selectedStatus(id) {
    let filteredData;
    filteredData = []
    this.selectStatus = id;
    let tempTotalQuantity = 0;
    let tempTotalCost = 0;
    let tempUnits;
    tempUnits = [];
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
        }
        // tslint:disable-next-line:one-line
        else if (data.type === 'Remove' && data.statusId !== 5) {
          filteredData.push(data)
        }
      });
      this.rows = filteredData;
    }
      this.totalQuantity = 0 ;
    if (this.rows !== '' && this.rows !== undefined) {
      _.forEach(this.rows, function (item, j) {
        if (item.statusId !== 4) {
          tempTotalQuantity = Number(tempTotalQuantity) + item.volume;
          tempTotalCost = Number(tempTotalCost) + (item.volume * item.rate);
          tempUnits.push(item.volumeUFM);
        }
      })
    }
    this.totalCost = tempTotalCost;
    tempUnits =  Array.from(new Set(tempUnits));
    this.units = '';
    if (tempUnits.length === 1) {
      this.totalQuantity = tempTotalQuantity;
      this.units = tempUnits[0];
    }
    if (this.searchedWordText !== undefined && this.searchedWordText.searchValue !== undefined) {
      const val =  this.searchedWordText.searchValue.toLowerCase();
      const temp = this.rows.filter(function (d) {
       return d.lumpSumpsId.toLowerCase().indexOf(val) !== -1 || !val;
     });
     // update the rows
     this.rows = temp;
     }
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.lumpSumpsId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    let filteredData;
    filteredData = [];
    if (this.selectStatus !== 0) {
      _.find(temp, data => {
        if (data.statusId === this.selectStatus) {
          filteredData.push(data)
        };
      });
      this.rows = filteredData;
    } else {
      _.find(temp, data => {
        if (data.type !== 'Remove') {
          filteredData.push(data)
        }
        // tslint:disable-next-line:one-line
        else if (data.type === 'Remove' && data.statusId !== 5) {
          filteredData.push(data)
        }
      });

      this.rows = filteredData;

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
    }
  }
  clearAllSelected() {
    this.selected = [];
    this.disableSingleDelete = false;
    this.disableCheckBox = false;
    this.showSaveRibon = false;
    this.canEdit = true;
    // _.forEach(this.temp, item => {
  }
  getRegions() {
    this._featureService.getRegionList().then(data => {
      this.allRegionsData = data;
      this.allRegionsData = _.sortBy(this.allRegionsData, ['region']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  getAllServiceList() {
    this._featureService.getAllService().then(data => {
      this.filteredService = []
      this.AllServices = _.cloneDeep(data);
      this.AllServices = _.sortBy(_.cloneDeep(this.AllServices), ['name']);
      if (this.dashboardDetails) {
        if (this.dashboardDetails.accessToAllServiceCatalogs) {
          this.filteredService = [...this.AllServices]
        } else {
          _.forEach(this.dashboardDetails.serviceCatalogList, element => {
            _.find(_.cloneDeep(this.AllServices), item => {
              if (item.id === element) {
                this.filteredService.push(item)
                this.filteredService = _.sortBy(this.filteredService, ['name']);
              };
            });
          })
        }
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  getSkill() {
    this._featureService.getSkillList().then(data => {
      this.filteredSkill = [];
      this.allSkill = _.cloneDeep(data);
      this.allSkill = _.sortBy(_.cloneDeep(this.allSkill), ['name']);
      if (this.dashboardDetails) {
        if (this.dashboardDetails.accessToAllSkillTeams) {
          this.filteredSkill = [...this.allSkill]
        } else {
          _.forEach(this.dashboardDetails.skillTeamList, element => {
            _.find(this.allSkill, item => {
              if (item.id === element) {
                this.filteredSkill.push(item);
                this.filteredSkill = _.sortBy(this.filteredSkill, ['name']);
              };
            });
          })
        }
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  getLegal() {
    this._featureService.getLegalEntityList().then(data => {
      this.allLegal = data;
      this.allLegal = _.sortBy(this.allLegal, ['name']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  openEditRowModal(row, rowIndex) {
    let t;
    _.forEach(this.allLegal, (list) => {
      delete list.selected
    })
    this._modal.open(AddLumpSumModalComponent,
      overlayConfigFactory({
        selectedYear: this.selectedYear,
        allyears: this.volumeTabularDetails,
        highlightYear: this.highlightedYearSelected,
        selectedRowEdit: row,
        allLegal: this.allLegal,
        allRegionsData: this.allRegionsData,
        allSkill: this.filteredSkill,
        AllServices: this.filteredService,
        heading: 'Edit Lump Sum',
        imAdmin: this.imAdmin,
        approveAccess: this.approve,
        edit: true
      }, AddLumpSumModalContext)).then(d => {
        t = d.result.then(data => {
          // if (this.selectedItmsId) {
            if (this.filteredData === undefined) {
              this.getLumpsumDetails();
            } else {
              this.add(this.filteredData);
            }
          this.clearAllSelected()
          // }
        });
      });
  }
  saveEdit() { }
  // approve all the user
  openApproveModal(dataForAction) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to approve the below Lump Sums ?',
      action: 'approve',
      actionBtnText: 'APPROVE'
    }
    this.openActionModal(dataForAction, modalDetails)
  }
  // unapprove all the user
  openUnapproveModal(dataForAction) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to unapprove the below Lump Sums ?',
      action: 'unapprove',
      actionBtnText: 'UN-APPROVE'
    }
    this.openActionModal(dataForAction, modalDetails)
  };
  // reject all the user
  openRejectModal(dataForAction) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to reject the below Lump Sums ?',
      action: 'reject',
      actionBtnText: 'REJECT'
    }
    this.openActionModal(dataForAction, modalDetails)
  };
  openCommitModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to commit the below Lump Sums ?',
      action: 'commit',
      actionBtnText: 'COMMIT'
    }
    this.openActionModal(dataToDelete, modalDetails)
  }
  commitAllSelected() {
    this.openCommitModal(this.selected);
  };
  openActionModal(dataForAction, modalDetails) {
    let t;
    this._modal.open(LumpSumActionModalComponent,
      overlayConfigFactory({
        deleteServiceDetails: dataForAction,
        heading: modalDetails.heading,
        action: modalDetails.action,
        actionBtnText: modalDetails.actionBtnText,
        // itmsId: this.selectedItmsId.itmsId
      }, LumpSumActionModalContext)).then(d => {
        t = d.result.then(data => {
          // this.getApplicationDetails(this.selectedItmsId);
          this.rows = [];
          this.getLumpsumDetails();
          this.selected = [];
          this.disableSingleDelete = false;
        });
      });
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
  showModal(selectedYear) {
    _.forEach(this.allLegal, (list) => {
      delete list.selected
    })
    let t;
    this._modal.open(AddLumpSumModalComponent,
      overlayConfigFactory({
        addVolumeDetails: this.volumeDetails,
        addVolumeHeader: this.volumeDetailsData,
        allRegions: this.allRegions,
        allPurchaseOrderList: this.allPurchaseOrder,
        selectedRow: this.highlightedYearSelected,
        selectedYear: this.selectedYear,
        approve: this.approve,
        allyears: this.volumeTabularDetails,
        allStatusData: this.allStatusData,
        highlightYear: this.highlightedYearSelected,
        allLegal: this.allLegal,
        allRegionsData: this.allRegionsData,
        allSkill: this.filteredSkill,
        AllServices: this.filteredService,
        imAdmin: this.imAdmin,
        approveAccess: this.approve,
        heading: 'Add Lump Sum',
        edit: false
      }, AddLumpSumModalContext)).then(d => {
        t = d.result.then(data => {
          // if (this.selectedItmsId) {
          if (this.filteredData === undefined) {
            this.getLumpsumDetails();
          } else {
            this.add(this.filteredData);
          }
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
    if (changes['volumeTabularDetails'] !== undefined) {
      this.selectedServiceDetails(this.highlightedYearSelected, this.selectedYear);
    }
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
