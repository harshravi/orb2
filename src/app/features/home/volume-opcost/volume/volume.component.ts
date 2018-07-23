import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Action } from 'rxjs/scheduler/Action';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AddServiceModalComponent, AddServiceModalContext } from '../../../home/global-modal';
import { FeatureService } from '../../../../../app/services/featureServices/feature.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ConfermationAlertService } from '../../../../services/commonService';
import { Input } from '@angular/core/src/metadata/directives';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;
declare var _: any;

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class VolumeComponent implements OnInit, AfterViewChecked {
  private currentComponentWidth;
  @ViewChild('myTable') table: DatatableComponent;
  @ViewChild('tableWrapper') tableWrapper;
  rows: any;
  accessRights: boolean;
  columns: any;
  temp: any;
  dataForBox: any;
  onlyHeaderData: any;
  applicationServiceDetailsToDisplay: Array<object>;
  applicationServiceDetailsAll: Array<object>;
  applicationServiceDetailsApproved: Array<object>;
  applicationServiceDetailsCommitted: Array<object>;
  applicationServiceDetailsPending: Array<object>;
  applicationTotalAll: Array<object>;
  applicationTotalAllApproved: Array<object>;
  applicationTotalAllCommitted: Array<object>;
  applicationTotalAllPending: Array<object>;
  applicationTotalData: Array<object>;
  applicationTotalToDisplay: Array<object>;
  volumeDataDetail: Array<object>;
  allStatusData: any;
  showStaticTemp: boolean;
  volumeDetailsName: any;
  showStaticForSelection: boolean;
  showVolume: boolean;
  selectedAppHeaderDetails: any;
  isDataLoading: boolean;
  selectStatus: number;
  budgetDetailId: number;
  serviceCatalogId: number;
  defaultSelection: number;
  budgetDetail: Array<object>;
  AccessreadOnly: boolean;
  itmsNo;
  appName;
  serviceOwner: boolean;
  editableServiceCatalogIds: any;
  volumeDetailsData: any;
  volumeSummaryData: any;
  selectedDataItmsId: number;
  selectedServiceRow: number;
  selectedItmsId;
  TempForNotAvailable: boolean;
  selectedServiceCatalogId: number;
  servicesForReadOnlyUser: Array<object>;
  actionPermission;
  write: boolean;
  tableYear1: string;
  tableYear2: string;
  tableYear3: string;
  tableYear4: string;
  tableYear5: string;
  approve: boolean;
  allocationMethodId: number;
  accessToVolume;
  accessToAll;
  enableServiceButton: boolean;
  checkSaveRibon: boolean;
  showSaveRibbon: boolean;
  localRows: any;
  subScriptions: Subscription[] = [];
  constructor(private _modal: Modal,
    private _storage: LocalStorageService,
    private _confermationAlertService: ConfermationAlertService,
    private changeDetectorRef: ChangeDetectorRef, private _featureService: FeatureService) {
    this.showStaticTemp = true;
    this.showStaticForSelection = true;
    this.showVolume = true;
    this.TempForNotAvailable = false;
    this.enableServiceButton = false;
    const authPermission = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.actionPermission = JSON.parse(authPermission);
    this.servicesForReadOnlyUser = [];
  }
  unSubscribe() {
    _.forEach(this.subScriptions, (sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
  // this.unSubscribe();
  // const subc = this.UserManagementService.getParticipantList(gridObj)
  //     .subscribe(data => {
  //         this.participantData = data.json();
  //         this.dataLoadingCompleted();
  //     }, error => {
  //         this.dataLoadingCompleted();
  //     });

  // this.subScriptions.push(subc);
  callGetVolumeSummery(reqData) {
    this.unSubscribe();
    this.rows = [];
    this.dataForBox = [];
    this.applicationTotalAll = [];
    this.dataLoadingStarted();
    this.selectStatus = 0;
    this.showStaticTemp = false;
    // this._featureService.getAppliationServicesDetails(reqData).then(data => {
    const subc = this._featureService.getAppliationServicesDetails(reqData)
      .subscribe(data => {
        data = data.json()
        this.dataLoadingCompleted();
        this.getApplicationTotal(this.selectedItmsId);
        $('body').tooltip({
          selector: '[data-toggle="tooltip"]'
        });
        this.allocationMethodId = data.header.allocationMethodId;
        this.selectedAppHeaderDetails = data.header;
        if (this.selectedAppHeaderDetails.showContent) {
          this.showStaticTemp = false;
          this.TempForNotAvailable = false;
          this.showStaticForSelection = true;
          this.onlyHeaderData = this.selectedAppHeaderDetails;
        } else {
          this.showStaticTemp = true;
          this.TempForNotAvailable = true;
          this.defaultSelection = null;
          this.showStaticForSelection = false;
          this.onlyHeaderData = this.selectedAppHeaderDetails;
        }
        this.enableServiceButton = !(data.header.enableAddServiceButton);
        this.dataForBox = data.applicationCostComparisions
        // this.volumeDetailsName = _.map(_.pick(['incurredCodeService']), data.applicationServiceDetails);
        // this.volumeDetailsName = _.pick(data.applicationServiceDetails, 'incurredCodeService');
        this.selectedDataItmsId = this.selectedItmsId.itmsId;
        this.volumeDetailsName = _.map(data.applicationServiceDetailsAll, function (object) {
          return _.pick(object, ['incurredCodeService', 'budgetDetailId', 'serviceCatalogId', 'budgetDetailId', 'readOnly']);
        });
        this._storage.set('volumeDetailsName', this.volumeDetailsName);
        // this.volumeDetailsName = _.map(data.applicationServiceDetails, 'incurredCodeService');
        this.temp = data.applicationServiceDetailsAll;
        this.rows = data.applicationServiceDetailsAll;
        this.tableYear1 = data.year1;
        this.tableYear2 = data.year2;
        this.tableYear3 = data.year3;
        this.tableYear4 = data.year4;
        this.tableYear5 = data.year5;
        this.itmsNo = data.header.applicationNumber;
        this.appName = data.header.applicationName;
        this.applicationServiceDetailsAll = data.applicationServiceDetailsAll;
        // this.getAllCatelogId = _.map(data.applicationServiceDetailsAll, function (object) {
        //   return _.pick(object, ['serviceCatalogId']);
        // });
        this.applicationServiceDetailsToDisplay = this.rows;
        this.applicationServiceDetailsApproved = data.applicationServiceDetailsApproved;
        this.applicationServiceDetailsCommitted = data.applicationServiceDetailsCommitted;
        this.applicationServiceDetailsPending = data.applicationServiceDetailsPending;
        this.editableServiceCatalogIds = _.cloneDeep(data.editableServiceCatalogIds);
        this.serviceOwner = _.cloneDeep(data.serviceOwner);
      }, error => {
        console.log(error)
        this.dataLoadingCompleted();
      });
    this.subScriptions.push(subc);
  }
  checkSave(event) {
    this.checkSaveRibon = event;
    this.showSaveRibbon = this.checkSaveRibon;
  }
  // onSort(event) {
  //   const val = event.target.value.toLowerCase();
  //   const sortProp = event.column.prop;
  //   this.localRows = _.cloneDeep(this.rows);
  //   // tslint:disable-next-line:radix
  //   this.localRows = _.sortBy([...this.localRows], [rows => parseInt(rows[sortProp]) ? rows[sortProp] : rows[sortProp].toLowerCase()],
  //    [event.newValue]);
  //   this.rows = [];
  //   this.rows = _.cloneDeep(this.localRows);
  // }
  getApplicationDetails(reqData) {
    this.volumeSummaryData = reqData;
    if (this.showSaveRibbon) {
      const that = this;
      // setTimeout(function () {
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page',
        function () {
          // ACTION: Do this If user says YES
          // that['name'] = 'Yes clicked';
          that.showSaveRibbon =
            false;
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

  getApplicationTotal(reqData) {
    this.unSubscribe();
    this.applicationTotalAll = null;
    const tableData = {
      'itmsId': reqData.itmsId,
      'itmsNo': reqData.itmsNo,
      'appName': reqData.applicationName,
      'cdsId': this._storage.get('cdsId'),
      'allocationMethodId': reqData.allocationMethodId
    }
    this._featureService.getAppliationTotal(tableData).subscribe(data => {
      data = data.json()
      // this.dataLoadingCompleted();
      this.applicationTotalData = data
      this.applicationTotalAll = data.applicationTotalsYearWisesAll;
      this.applicationTotalAllApproved = data.applicationTotalsYearWisesApproved;
      this.applicationTotalAllCommitted = data.applicationTotalsYearWisesCommitted;
      this.applicationTotalAllPending = data.applicationTotalsYearWisesPending;
      this.applicationTotalToDisplay = this.applicationTotalAll;
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }

  getColor(data, last, i) {
    if (data.colorForDifference) {
      const colorForDifference = data.colorForDifference
      if (colorForDifference[i] === 1 && last === true) {
        return '#E96468';
      } else if (colorForDifference[i] === 2 && last === true) {
        return '#24C093';
      } else {
        return '';
      }
    } else {
       return '';
    }
  }

  callGetApplicationDetais(reqData) {
    this.showVolume = true;
    this.selectedItmsId = reqData;
    this.rows = [];
    const tableData = {
      'itmsId': reqData.itmsId,
      'cdsId': this._storage.get('cdsId'),
      'itmsNo': reqData.itmsNo,
      'appName': reqData.applicationName,
      'allocationMethodId': reqData.allocationMethodId
    }
    if (!reqData.fromAppList) {
      this.defaultSelection = null;
    }
    if (reqData.selectionOn === 'usageApp' || reqData.selectionOn === 'usageFilteredApp') {
      this.callGetVolumeSummery(tableData);
      this.showStaticTemp = false;
    } else {
      this.callGetVolumeSummery(tableData);
    }
  }

  ngOnInit() {
    this.getAllSkills();
    this.authorisationPermission();
  }
  authorisationPermission() {
    _.forEach(this.actionPermission, (data, index) => {
      if (data.name === 'AllScreens') {
        this.accessToAll = data
      }
      if (data.name === 'Volume') {
        this.accessToVolume = data
      }
      if (this.accessToVolume) {
        if (this.accessToVolume.write === false) {
          this.write = false;
        } else {
          this.write = true;
        }
        if (this.accessToVolume.approve === false) {
          this.approve = false;
        } else {
          this.approve = true;
        }
      } else {
        this.write = false;
        this.approve = false;
      }
    })

  }
  getAllSkills() {
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
      _.remove(this.allStatusData, item => item.id === 4);
      _.remove(this.allStatusData, item => item.id === 6);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  selectedStatus(id) {
    let filteredData;
    filteredData = []
    if (id !== 0) {
      if (id === 2) {
        this.applicationTotalToDisplay = this.applicationTotalAllPending;
        filteredData = this.applicationServiceDetailsPending;
        // this.applicationServiceDetailsToDisplay = this.applicationServiceDetailsPending;
        // _.find(this.temp, data => {
        //   if (data.statusPendingCount > 0) {
        //     filteredData.push(data);
        //   };
        // });
      } else if (id === 3) {
        this.applicationTotalToDisplay = this.applicationTotalAllApproved;
        filteredData = this.applicationServiceDetailsApproved;
        // this.applicationServiceDetailsToDisplay = this.applicationServiceDetailsApproved;
        // _.find(this.temp, data => {
        //   if (data.statusApprovedCount > 0) {
        //     filteredData.push(data)
        //   };
        // });
      } else if (id === 5) {
        this.applicationTotalToDisplay = this.applicationTotalAllCommitted;
        // this.applicationServiceDetailsToDisplay = this.applicationServiceDetailsCommitted;
        filteredData = this.applicationServiceDetailsCommitted;
        // _.find(this.temp, data => {
        //   if (data.statusCommittedCount > 0) {
        //     filteredData.push(data)
        //   };
        // });
      } else {
        this.applicationTotalToDisplay = this.applicationTotalAll;
        this.applicationServiceDetailsToDisplay = this.applicationServiceDetailsAll;
      }
      this.rows = filteredData;
    } else {
      this.rows = this.temp
      this.applicationTotalToDisplay = this.applicationTotalAll;
    }
  }
  showDeafultPage(event) {
    this.showStaticTemp = event
  }
  selectedVolumeDetails(item) {
    this.budgetDetail = item;
    this.selectedServiceCatalogId = item.serviceCatalogId;
    this.getOpCostVolumeDetails(item)
  }
  callOpCostVolumeDetails(reqData) {
    if (this.showSaveRibbon) {
      const that = this;
      // setTimeout(function () {
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page',
        function () {
          // ACTION: Do this If user says YES
          // that['name'] = 'Yes clicked';
          that.showSaveRibbon = false;
          that.callGetApplicationData(reqData);
        }, function () {
          // ACTION: Do this if user says NO
          // that['name'] = 'No clicked';
          return true;
        })
      // }, 2000)
    } else {
      this.callGetApplicationData(reqData);
    }
  }
  callGetApplicationData(reqData) {
    this.showVolume = true;
    this.dataLoadingStarted();
    this.volumeDataDetail = undefined;
    this._featureService.getOpCostVolumeDetails(reqData).then(data => {
      this.showVolume = false;
      this.dataLoadingCompleted();
      data.navDetailsForVolume = data.header;
      data.navDetailsForVolume.itmsNo = data.header.applicationNumber;
      data.navDetailsForVolume.appName = data.header.applicationName;
      // this.rows = data
      // this.volumeDetailsName = _.map(data.applicationServiceDetails, 'incurredCodeService');
      this.accessRights = reqData.AccessreadOnly;
      data.accessRights = this.accessRights
      data.incurredCodeService = data.serviceName;
      this.volumeDataDetail = data;
      this.volumeDetailsData = data;
      // if (this.volumeDataDetail['responseFor'] === 'OpCost') {
      //   this.showVolume = false;
      // } else {
      //   this.showVolume = true;
      // }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      this.dataLoadingCompleted();
    });
  }
  getOpCostVolumeDetails(data) {
    this.budgetDetailId = data.budgetDetailId
    this.AccessreadOnly = data.readOnly
    const tableData = {
      'budgetDetailId': data.budgetDetailId,
      'serviceCatalogId': data.serviceCatalogId,
      'cdsId': this._storage.get('cdsId'),
      'itmsNo': this.itmsNo,
      'appName': this.appName
      // 'AccessreadOnly': data.readOnly
    }
    this.callOpCostVolumeDetails(tableData);
  };

  backToVolumePage(event) {
    this.showVolume = event;
    this.callGetApplicationDetais(this.volumeSummaryData);
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
  openAddServiceModal(item) {
    let t;
    this._modal.open(AddServiceModalComponent,
      overlayConfigFactory({
        addServiceDetails: this.volumeDetailsData, addUserId: this.selectedItmsId.itmsId,
        allServiceCatalogId: this.volumeDetailsName, editableServiceCatalogIds: this.editableServiceCatalogIds,
        serviceOwner: this.serviceOwner, adduserNo: this.selectedItmsId.itmsNo, allocationMethodId: this.allocationMethodId, appName: this.selectedItmsId.applicationName
      }, AddServiceModalContext)).then(d => {
        t = d.result.then(data => {
          if (this.selectedItmsId) {
            this.getApplicationDetails(this.selectedItmsId);
            this.selectStatus = 0;
          }
        });
      });
  }
  tableNavClick(details, rowIndex) {
    const tableData = {
      'budgetDetailId': details.budgetDetailId,
      'serviceCatalogId': details.serviceCatalogId,
      'itmsNo': this.itmsNo,
      'appName': this.appName,
      'cdsId': this._storage.get('cdsId')
      // 'AccessreadOnly': data.readOnly
    }
    this.getOpCostVolumeDetails(tableData);
    this.selectedServiceRow = rowIndex;
    this.selectedServiceCatalogId = details.serviceCatalogId;
    this.budgetDetailId = details.budgetDetailId;
  }
  getSearchedText(item) {
    // alert('hi');
  }
  dataLoadingStarted(): void {
    this.isDataLoading = true;
  }
  dataLoadingCompleted(): void {
    this.isDataLoading = false;
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
