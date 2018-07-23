import {
  Component, OnInit, OnChanges, ViewChild, Input, SimpleChange,
  Output, AfterViewChecked, ChangeDetectorRef, EventEmitter
} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Action } from 'rxjs/scheduler/Action';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {
  AddVolumeDetailsModalComponent, AddVolumeDetailsModalContext,
  AddLegalPhysicalEntityModalContext, AddLegalPhysicalEntityModalComponent,
  AddSpreadVolumeMaticModalComponent, AddSpreadVolumeMaticModalContext, ClearConfirmationModalComponent, ClearConfirmationModalContext
} from '../../home/global-modal';
import { FeatureService } from '../../../../app/services/featureServices/feature.service';
import {
  UpdateVolumeOpcostModalContext, UpdateVolumeOpcostModalComponent,
  EditPhysicalGroupModalComponent, EditPhysicalGroupModalContext
} from '../../home/global-modal';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster';
import { ConfermationAlertService } from '../../../services/commonService';

declare var $: any;
declare var _: any;

@Component({
  selector: 'app-volume-physical-details',
  templateUrl: './volume-physical-details.component.html',
  styleUrls: ['./volume-physical-details.component.scss'],
  providers: [FeatureService, ConfermationAlertService]
})
export class VolumePhysicalDetailsComponent implements OnInit, OnChanges, AfterViewChecked {
  private currentComponentWidth;
  @ViewChild('myTable') table: DatatableComponent;
  @ViewChild('tableWrapper') tableWrapper;

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
  @Input()
  volumeHeaderDetails: Array<object>;
  @Output()
  goToVolumePage = new EventEmitter();
  @Input()
  selectedServiceCatalogId: number;
  @Input()
  selectedItmsId: number;
  userTypestatus: boolean;
  canEdit: boolean;
  enableEditButton: boolean;
  selectedDropdown: boolean;
  rows: any;
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
  isDataLoading: boolean;
  selectStatus: any;
  highlightedYearSelected: number;
  selectedDataItmsId: number;
  allRegions: Array<object>;
  allPurchaseOrder: Array<object>;
  allSkill: Array<object>;
  allLigalEntity: Array<object>;
  TempForNotAvailable: boolean;
  selectedYearData;
  selectedYearDatas;
  selectedYear: number;
  isDataLoadingforSave: boolean;
  isVolumeDataLoading: boolean;
  highlightedSearchedRow: number;
  disableSingleEdit: boolean;
  showSaveRibon: boolean;
  showDeleteBtn: boolean;
  openCreatGroupBox: boolean;
  disableCheckBox: boolean;
  singleRowEdit: number;
  groupNameText: string;
  editableRowBundleIndex: number;
  yearCollection: Array<object>;
  bundelNameCollection: Array<object>;
  reservedVolumeDetailsData: Array<object>;
  reservedRowDataOfTable: Array<object>;
  reservedRowData: Array<object>;
  spreadMaticData: Array<object>;
  selectedBundelName: string;
  duplicateEntry: boolean;
  disableSave: boolean;
  selected = [];
  allStatusforTable;
  groupNameforTable: any;
  disableClearVolume: boolean;
  disableDeleteGroup: boolean;
  quantityzeroCheck: boolean;
  setEditFlag: boolean;
  enableLumpSumsService;
  nonAdmin: boolean;
  localRows;
  allStatusIds;
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
    this.disableSave = false;
    this.highlightedYearSelected = 1;
    this.selectedBundelName = 'Group - All';
    this.TempForNotAvailable = false;
    this.showDeleteBtn = false;
    this.openCreatGroupBox = false;
    this.selectedDropdown = false;
    this.disableClearVolume = false;
    this.yearCollection = [];
    this.spreadMaticData = [];
    this.selectStatus = 'Status - All';
    this.disableDeleteGroup = false;
    this.quantityzeroCheck = false;
    this.canEdit = false;
    this.setEditFlag = false;
    this.enableEditButton = false;
    this.volumeDetailsName = this._storage.get('volumeDetailsName')
    this.getAllStatus();
    this.getChangeRegions();
    this.getPurchaseOrder();
    this.allStatusIds = [];
  }
  showRow(newValue: number) {
    this.highlightedSearchedRow = newValue;
  }
  enableGroupAddBox() {
    if (this.openCreatGroupBox) {
      this.openCreatGroupBox = false;
    } else {
      this.openCreatGroupBox = true;
      this.groupNameText = null;
      this.duplicateEntry = false;
    }
  }
  enterGroupName(groupNameText) {
    // const validateGroupName = groupNameText.trim();
    if (groupNameText === '') {
      this.duplicateEntry = false;
    }
  }
  createGroup() {
    const validateGroupName = this.groupNameText.trim();
    if (validateGroupName) {
      this.duplicateEntry = false;
    } else {
      this.duplicateEntry = true;
    }
    _.forEach(this.reservedRowData, (element, i) => {
      if (this.groupNameText.toLocaleLowerCase() === element.bundleName) {
        this.duplicateEntry = true;
      }
    });
    if (!this.duplicateEntry) {
      const reqData = {
        'serviceCatalogId': this.selectedServiceCatalogId,
        'cdsId': this._storage.get('cdsId'),
        'groupName': this.groupNameText,
        'itmsId': this.selectedItmsId,
        'year': this.selectedYear,
        'itmsNo': this.volumeTabularDetails['header'].applicationNumber,
        'appName': this.volumeTabularDetails['header'].applicationName
      };
      this.groupNameText = null;
      this.isDataLoadingforSave = true;
      this._featureService.createGroup(reqData).then(data => {
        this.isDataLoadingforSave = false;
        this.openCreatGroupBox = false;
        const toast = { type: 'success', title: 'Group Created successfully' };
        this._toasterService.pop(toast);
        this.callOpCostVolumeDetails()
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        this.dataLoadingCompleted();
      });

    }
  }
  backToVolumePage(event) {
    if (this.showSaveRibon) {
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

  onSort(event, bundleName) {

    let tempData = [];
    const sortProp = event.column.prop;

    _.forEach(this.rows, function (data, i) {
      if (data.bundleName === bundleName) {
        tempData = _.cloneDeep(data.volumeDetailDTOs);
      }
    })
    
    tempData = _.orderBy([...tempData], [rows => parseInt(rows[sortProp]) ? rows[sortProp] : rows[sortProp].toLowerCase()], [event.newValue]);
    // this.rows = [];
    
    _.forEach(this.rows, function (data, i) {
      if (data.bundleName === bundleName) {
        data.volumeDetailDTOs = _.cloneDeep(tempData);
      }
    })
    this.localRows = this.rows;
  }

  onSelect({ selected }) {
    this.disableCheckBox = false;
    this.disableClearVolume = false;
    this.disableSingleEdit = false;
    this.openCreatGroupBox = false;
    this.quantityzeroCheck = false;
    if (selected) {
      this.setFlag(selected);
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      if (this.selected.length === 0) {
        _.forEach(this.rows, function (element, i) {
          _.forEach(element.volumeDetailDTOs, function (list, j) {
            list[j + '-quantity'] = false;
            list[j + '-comments'] = false;
            list[j + '-status'] = false;
            list[j + '-changeRegion'] = false;
            list[j + '-purchageOrder'] = false;
            list.rowNo = j;
          });
        });
      } else {
        let statusFlag = false;
        _.forEach(this.selected, element => {
          _.forEach(this.rows, function (data, i) {
            if (data.bundleName === element.bundleName) {
              _.forEach(data.volumeDetailDTOs, function (list, j) {
                if (element.legalEntityId === list.legalEntityId && element.skillTeamName === list.skillTeamName) {
                  list[j + '-quantity'] = false;
                  list[j + '-comments'] = false;
                  list[j + '-status'] = false;
                  list[j + '-changeRegion'] = false;
                  list[j + '-purchageOrder'] = false;
                  list.rowNo = j;
                  return false;
                }
              });
            }
          });

          if (element.quantity === 0) {
            this.quantityzeroCheck = true;
            this.disableSave = true;
          }
          if (this.allStatusIds.indexOf(parseInt(element.statusId)) < 0 && !statusFlag) {
            this.disableSave = true;
            statusFlag = true;
          }
          if (element.statusDescription !== 'Pending') {
            this.disableClearVolume = true;
          }
        });
      }
      if (this.selected.length > 0) {
        this.disableSingleEdit = true;
        this.showSaveRibon = true;
        this.disableCheckBox = false;
      } else {
        this.showSaveRibon = false;
        this.disableSingleEdit = false;
      }
    }
  }

  clearVolumeAll() {
    let dataEdited = [];
    let clearVolumeData;
    let totalQuantity = 0;
    let totalCount = 0;
    clearVolumeData = [];
    if (this.selected.length > 0) {
      dataEdited = _.map(this.selected, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'enablePO', 'cyBudgetAmount',
          'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year',
          'statusDescription', 'approvedDateString', 'committedDate', 'committedDateString', 'lastModifiedDateString',
          'approvedDateWithZone', 'committedDateWithZone', 'lastModifiedDate',
          index + '-comments', index + '-changeRegion', index + '-purchageOrder', 'purchaseOrderName',
          index + '-quantity', index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        totalQuantity = totalQuantity + Number(element.quantity);
        totalCount = Number(totalCount) + 1;
        element.changeReasonId = null;
        element.purchaseOrderId = 0;
        element.quantity = 0;
        element.volumeStagingId = element.stagigId;
        element.bundleName = element.bundleName;
        element.itmsId = this.selectedItmsId;
        element.cdsId = this._storage.get('cdsId');
        element.year = this.selectedYear;
        element.comments = '';
        delete element.rowNo;
        delete element.stagigId;
        delete element.legalEntityId;
        delete element.status;
        delete element.changeReason;
        delete element.legalEntityName;
        clearVolumeData.push(element);
      });
    }
    let t;
    this._modal.open(ClearConfirmationModalComponent,
      overlayConfigFactory({
        description: 'You are about to clear [' + totalQuantity + '] ' + this.selectedYearData.unit + ' of volume for [' +
          totalCount + '] Legal Entities.',
        content: 'Please Confirm.',
        heading: 'Confirmation',
        clearVolumeList: clearVolumeData
      }, ClearConfirmationModalContext)).then(d => {
        t = d.result.then(data => {
          this.showSaveRibon = false;
          this.disableSingleEdit = false;
          this.callOpCostVolumeDetails();
          this.selected = [];
        });
      });
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

  statusFilter(id, bundleIndex) {
    let newVal;
    if (id === 0) {
      newVal = 'All';
    } else if (id === 2) {
      newVal = 'Pending';
    } else if (id === 3) {
      newVal = 'Approved';
    } else if (id === 5) {
      newVal = 'Committed';
    } else if (id === 4) {
      newVal = 'Rejected';
    } else {
      newVal = 'No Change';
    }
    const val = newVal.toLowerCase();
    const resetReserveData = _.cloneDeep(this.selectedYearDatas.bundleGroupDTOs)
    // this.reservedRowData = _.cloneDeep(this.selectedYearData.bundleGroupDTOs);
    this.reservedRowData = resetReserveData;
    // filter our data
    let totalQty = 0;
    let totalCost = 0;
    if (val) {
      if (bundleIndex === null || bundleIndex === 'Group - All') {
        this.rows = _.cloneDeep(this.selectedYearDatas.bundleGroupDTOs);
        _.forEach(resetReserveData, (element, i) => {
          this.temp = _.cloneDeep(element.volumeDetailDTOs);
          let temp;
          if (this.temp && val !== 'all') {
            temp = this.temp.filter(function (d) {
              return d.statusDescription.toLowerCase().indexOf(val) !== -1 || !val;
            });
          } else {
            temp = this.temp;
          }
          _.forEach(this.rows, (list, j) => {
            if (list.bundleName === element.bundleName) {
              switch (id) {
                case 0:
                  list.totalQuantity = list.pendingQuantity + list.approvedQuantity + list.committedQuantity;
                  list.totalCost = list.pendingCost + list.approvedCost + list.committedCost;
                  break;
                case 2:
                  list.totalQuantity = list.pendingQuantity;
                  list.totalCost = list.pendingCost;
                  break;
                case 3:
                  list.totalQuantity = list.approvedQuantity;
                  list.totalCost = list.approvedCost;
                  break;
                case 4:
                  list.totalQuantity = 0;
                  list.totalCost = 0;
                  break;
                case 5:
                  list.totalQuantity = list.committedQuantity;
                  list.totalCost = list.committedCost;
                  break;
              }
              list.volumeDetailDTOs = temp;
              totalQty = totalQty + list.totalQuantity;
              totalCost = totalCost + list.totalCost;
              return false;
            }
          });
          this.selectedYearData.totalQuantity = totalQty;
          this.selectedYearData.totalCost = totalCost;
        });
        // this.calculateTotals(bundleIndex, resetReserveData, val);
      } else {
        _.forEach(this.reservedRowData, (element, i) => {
          if (bundleIndex === element.bundleName) {
            this.temp = _.cloneDeep(element.volumeDetailDTOs)
            let temp;
            if (this.temp && val !== 'all') {
              temp = this.temp.filter(function (d) {
                return d.statusDescription.toLowerCase().indexOf(val) !== -1 || !val;
              });
            } else {
              temp = this.temp;
            }
            switch (id) {
              case 0:
                element.totalQuantity = element.pendingQuantity + element.approvedQuantity + element.committedQuantity;
                element.totalCost = element.pendingCost + element.approvedCost + element.committedCost;
                break;
              case 2:
                element.totalQuantity = element.pendingQuantity;
                element.totalCost = element.pendingCost;
                break;
              case 3:
                element.totalQuantity = element.approvedQuantity;
                element.totalCost = element.approvedCost;
                break;
              case 4:
                element.totalQuantity = 0;
                element.totalCost = 0;
                break;
              case 5:
                element.totalQuantity = element.committedQuantity;
                element.totalCost = element.committedCost;
                break;
            }
            element.volumeDetailDTOs = temp;
            totalQty = totalQty + element.totalQuantity;
            totalCost = totalCost + element.totalCost;
            this.rows = []
            this.rows.push(element);
            return false;
          }
        });
        this.selectedYearData.totalQuantity = totalQty;
        this.selectedYearData.totalCost = totalCost;
      }
      // this.calculateTotals(bundleIndex, resetReserveData, val);
    } else {
      // _.forEach(resetReserveData, (element, i) => {
      //   _.forEach(this.rows, (list, j) => {
      if (this.rows.length < 1) {

        this.rows.volumeDetailDTOs = resetReserveData.volumeDetailDTOs;

      }
    }
  }
  updateValue(event, cell, rowIndex, bundleIndex) {
    this.rows[bundleIndex].volumeDetailDTOs[rowIndex][cell] = event.target.value;
    if (cell === 'quantity' || cell === 'changeReason' || cell === 'comments' || cell === 'statusId') {
      if (this.selected.length > 0) {
        _.forEach(this.selected, (element, i) => {
          if (parseFloat(element.quantity) === 0 || element.quantity === '' || element.comments === '' || element.changeReason === undefined
            || element.changeReason === null || element.comments === undefined || element.comments === null || element.comments.length === 0
            || this.allStatusIds.indexOf(parseInt(element.statusId)) < 0) {
            this.disableSave = true;
          } else {
            this.disableSave = false;
          }
        });
      } else {
        const commentField = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['comments'];
        const quantity = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['quantity'];
        const changeReason = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['changeReason'];
        const selectedstatusId = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['statusId'];
        if (parseFloat(quantity) === 0 || quantity === '' || changeReason === undefined || changeReason === null
          || commentField === undefined || commentField === null || commentField.length === 0
          || this.allStatusIds.indexOf(parseInt(selectedstatusId)) < 0) {
          this.disableSave = true;
        } else {
          this.disableSave = false;
        }
      }
      _.forEach(this.rows, (element, i) => {
        if (bundleIndex === i) {
          _.forEach(element.volumeDetailDTOs, (item, j) => {
            if (j === rowIndex) {
              this.rows[i].volumeDetailDTOs[j][cell] = event.target.value;
            }
          });
        }
      })
    }
  }
  selectBundelName(bundleName, selectStatus) {
    this.statusFilter(selectStatus, bundleName);
  }

  calculateTotals(bundleName, totalData, status) {
    let tempTotalQuantity = 0;
    let tempTotalCost = 0;
    let groupTotalQuantity = 0;
    // let groupTotalCost = 0;
    let tempData = [];
    if (status === '') {
      if (totalData !== '' && totalData !== undefined) {
        _.forEach(totalData, function (element, j) {
          _.forEach(element.volumeDetailDTOs, function (item, e) {
            if (item.statusDescription !== 'Rejected') {
              tempTotalQuantity = Number(tempTotalQuantity) + item.quantity;
            }
          })
        })
      }
      this.selectedYearData.totalQuantity = tempTotalQuantity;
      this.selectedYearData.totalCost = tempTotalQuantity * this.selectedYearData.rate;
    } else {
      const rate = this.selectedYearData.rate;
      _.forEach(totalData, (element, i) => {
        if (element.bundleName === bundleName) {
          if (status !== 'all') {
            tempData = element.volumeDetailDTOs.filter(function (d) {
              return d.statusDescription.toLowerCase().indexOf(status) !== -1 || !status;
            });
          } else {
            tempData = element.volumeDetailDTOs;
          }
        }
      });

      _.forEach(tempData, (element, j) => {
        if (element.statusDescription !== 'Rejected') {
          groupTotalQuantity = Number(groupTotalQuantity) + element.quantity;
        }
      });

      _.forEach(this.rows, function (element, j) {
        _.forEach(element.volumeDetailDTOs, function (item, e) {
          if (element.bundleName === bundleName) {
            element.totalQuantity = groupTotalQuantity;
            element.totalCost = groupTotalQuantity * rate;
          }
        })
      })

      _.forEach(this.rows, function (element, j) {
        tempTotalQuantity = Number(tempTotalQuantity) + element.totalQuantity;
        tempTotalCost = Number(tempTotalCost) + element.totalCost;
      })
      this.selectedYearData.totalQuantity = tempTotalQuantity;
      this.selectedYearData.totalCost = tempTotalCost * this.selectedYearData.rate;
    }
  }

  getAllBundleName(rows) {
    this.bundelNameCollection = [];
    if (rows) {
      const byDefault = {
        'bundelId': 0,
        'bundelName': 'Group - All'
      }
      this.bundelNameCollection.push(byDefault)
      _.forEach(rows, (element, i) => {
        this.bundelNameCollection.push(_.fromPairs([['bundelId', i + 1], ['bundelName', element.bundleName]]));
      });
    }
  }
  getSelectedYearData(selectedYear) {
    if (this.volumeTabularDetails['volumeDetailsYearWiseList'] && selectedYear) {
      this.groupNameforTable = [];
      let selected;
      selected = _.find(this.volumeTabularDetails['volumeDetailsYearWiseList'], data => {
        return data.year === selectedYear;
      });
      this.selectedYearData = selected;
      this.selectedYearDatas = selected;
      this.reservedRowData = _.cloneDeep(this.selectedYearData.bundleGroupDTOs);
      this.reservedRowDataOfTable = _.cloneDeep(this.selectedYearData.bundleGroupDTOs);
      this.rows = _.cloneDeep(this.selectedYearData.bundleGroupDTOs);
      this.getAllBundleName(this.rows);
      if (this.rows.length > 0) {
        _.forEach(this.rows, (list, i) => {
          _.forEach(list.volumeDetailDTOs, (element, j) => {
            const getTimeZoneName = moment.tz.guess();
            //const getZoneName = moment.tz.guess(element.approvedDate);
            
            if(element.approvedDate){
              const getApprovedDateInNumber = Date.parse(element.approvedDate);
              element.approvedDateWithZone = moment(getApprovedDateInNumber).tz(getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
            }
            
            if(element.committedDate){
              const getCommittedDateInNumber = Date.parse(element.committedDate);
              element.committedDateString = moment(getCommittedDateInNumber).tz(getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
            }
            
            if(element.committedDate){
              const getLastModifiedDate = Date.parse(element.lastModifiedDateString);
              element.lastModifiedDate = moment(getLastModifiedDate).tz(getTimeZoneName).format('MM/DD/YYYY HH:mm:SS z');
            }

            element.rowNo = j;
            element.cdsId = this._storage.get('cdsId');
          })
        });
        this.groupNameforTable.push({
          id: 'All',
          name: 'Group - All'
        });
        _.forEach(this.rows, (element, i) => {
          this.groupNameforTable.push({
            id: element.bundleName,
            name: element.bundleName
          });
        });
        // this.getCurrentGroupName(this.groupNameforTable[1])
      } else {
        this.disableCheckBox = true;
      }
      this.openCreatGroupBox = false;
    }
  }
  selectedServiceDetails(selectedRow, selectedYear) {
    if (this.showSaveRibon) {
      const that = this;
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page',
        function () {
          that.clearAllSelected();
          that.highlightedYearSelected = selectedRow;
          that.selectedYear = selectedYear;
          that.getSelectedYearData(selectedYear);
          // that.getSelectedYearData(selectedYear);
          that.showRow(0);
        }, function () {
          return true;
        })
    } else {
      this.clearAllSelected();
      this.highlightedYearSelected = selectedRow;
      this.selectedYear = selectedYear;
      this.getSelectedYearData(selectedYear);
      // this.getSelectedYearData(selectedYear);
      this.showRow(0);
      this.selectedBundelName = 'Group - All';
      this.statusFilter(this.selectStatus, this.selectedBundelName);
    }
    this.enableLumpSumsService = false;
    if (selectedRow === 1) {
      this.enableLumpSumsService = this.volumeTabularDetails['header']['enableLumpSumsService'];
    }
    if (this.rows.length === 0) {
      this.disableCheckBox = true;
    } else {
      this.disableCheckBox = false;
    }
  }
  getCurrentGroupName(bundleName, selectStatus, selectedBundleName) {
    if (bundleName['name']) {
      this.groupNameText = bundleName['name'];
    } else {
      this.groupNameText = bundleName;
    }
    // this.rows = _.cloneDeep(this.reservedRowDataOfTable);
    this.statusFilter(selectStatus, selectedBundleName);
  }
  ngOnInit() {
    this.isDataLoadingforSave = false;
    this.isVolumeDataLoading = false;
    this.showRow(0);
    this.getallIntityDetails();
    if (this.volumeTabularDetails) {
      this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year1']]]));
      this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year2']]]));
      this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year3']]]));
      this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year4']]]));
      this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year5']]]));
    }
    // this.rows = []
    // this.getOpCostVolumeDetails();
    // this.volumeTabularData = this.volumeTabularDetails;
    // this.rows = this.volumeDetailsData.
    // $(document).ready(function () {
    //   function close_accordion_section() {
    //     $('.accordion .accordion-section-title').removeClass('active');
    //     $('.accordion .accordion-section-content').removeClass('open-tab');
    //     $('.accordion .accordion-section-content').addClass('close-tab');
    //   }

    //   $('.accordion-section-title').click(function (e) {
    //     // Grab current anchor value
    //     const currentAttrValue = $(this).attr('id');

    //     if ($(e.target).is('.active')) {
    //       close_accordion_section();
    //       $(e.target).removeClass('up-icon');
    //       // $('.accordion .accordion-section-title').find('.up-icon').removeClass('up-icon');
    //       $(e.target).addClass('down-icon');
    //     } else {
    //       $('.active').addClass('down-icon');
    //       $('.active').removeClass('up-icon');
    //       close_accordion_section();

    //       // Add active class to section title
    //       $(this).addClass('active');
    //       // Open up the hidden content panel
    //       $('.' + currentAttrValue).addClass('open-tab');
    //       $('.' + currentAttrValue).removeClass('close-tab');
    //       $(e.target).removeClass('down-icon');
    //       $(e.target).addClass('up-icon');
    //     }

    //     e.preventDefault();
    //   });
    //   // $('.accordion .accordion-section-title').removeClass('active');
    //   $('.accordion-section-content.accordion-1').removeClass('close-tab');
    //   $('.accordion-section-content.accordion-1').addClass('open-tab');
    //   $('.accordionIcon-1').removeClass('down-icon');
    //   $('.accordionIcon-1').addClass('up-icon');
    //   $('.accordionIcon-1').addClass('action');
    // });
  }
  getRowClass(row) {
    return 'danger';
  }
  callOpCostVolumeDetails() {
    const reqData = {
      'budgetDetailId': this.budgetDetailId,
      'cdsId': this._storage.get('cdsId'),
      'serviceCatalogId': this.selectedServiceCatalogId,
      'itmsNo': this.volumeTabularDetails['header'].applicationNumber,
      'appName': this.volumeTabularDetails['header'].applicationName
    }
    this.isDataLoadingforSave = true;
    this._featureService.getOpCostVolumeDetails(reqData).then(data => {
      this.reservedVolumeDetailsData = _.cloneDeep(data);
      this.volumeTabularDetails = _.cloneDeep(data);
      this.isDataLoadingforSave = false;
      this.showSaveRibon = false;
      // removed code to avoid duplicate year
      // if (this.volumeTabularDetails) {
      //   this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year1']]]));
      //   this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year2']]]));
      //   this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year3']]]));
      //   this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year4']]]));
      //   this.yearCollection.push(_.fromPairs([['year', this.volumeTabularDetails['year5']]]));
      // }
      this.getSelectedYearData(this.selectedYear);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      this.dataLoadingCompleted();
    });
  }
  // getAllStatus() {
  //   this._featureService.getFilterStatusData().then(data => {
  //     // this.dataLoadingCompleted();
  //     this.allStatusData = data
  //     const statusTable = [{
  //       id: 0,
  //       name: 'Status - All',
  //       units: null
  //     }, {
  //       id: 2,
  //       name: 'Pending',
  //       units: null
  //     }, {
  //       id: 3,
  //       name: 'Approved',
  //       units: null
  //     }, {
  //       id: 5,
  //       name: 'Committed',
  //       units: null
  //     }, {
  //       id: 4,
  //       name: 'Rejected',
  //       units: null
  //     }]
  //     // this.allStatusData = 0;
  //     // this.allStatusData.unshift(statusTable)
  //     this.allStatusforTable = statusTable;
  //     _.remove(this.allStatusforTable, item => item.id === 0);
  //     this.allStatusData = data;
  //     // _.remove(this.allStatusData, item => item.id === 0);
  //     _.remove(this.allStatusData, item => item.id === 1);
  //     _.remove(this.allStatusData, item => item.id === 6);
  //   }, error => {
  //     console.log(error)
  //     // this.dataLoadingCompleted();
  //   });
  // };
  getAllStatus() {
    this._featureService.getFilterStatusData().then(data => {
      const selectAll = {
        id: 0,
        name: 'All',
        units: null
      }
      const userType = this.volumeTabularDetails['header'];
      this.userTypestatus = userType.adminUser;
      if (userType.adminUser) {
        this.allStatusData = data;
        this.selectStatus = 0;
        this.allStatusData.unshift(selectAll)
        _.remove(this.allStatusData, item => item.id === 1);
        // _.remove(this.allStatusData, item => item.id === 4);
        _.remove(this.allStatusData, item => item.id === 6);
      } else {
        this.allStatusData = data;
        this.selectStatus = 0;
        this.allStatusData.unshift(selectAll)
        _.remove(this.allStatusData, item => item.id === 1);
        // _.remove(this.allStatusData,  item => item.id === 5);
        _.remove(this.allStatusData, item => item.id === 6);
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
        _.remove(statusTable, item => item.id === 5);
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
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  getPurchaseOrder() {
    this._featureService.getPurchaseOrderList().then(data => {
      // this.dataLoadingCompleted();
      $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
      this.allPurchaseOrder = data
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  };
  getChangeRegions() {
    this._featureService.getChangeRegionList().then(data => {
      // this.dataLoadingCompleted();
      this.allRegions = data
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
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
    filteredData = []
    if (id !== 0) {
      _.find(this.temp, data => {
        if (data.status === id) {
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
        else if (data.type === 'Remove' && data.status !== 5) {
          filteredData.push(data)
        }
      });
      this.rows = filteredData;
      // console.log(id, this.rows)
    }
  }
  updateFilter(event, bundleName) {
    const val = event.target.value.toLowerCase();
    const resetReserveData = _.cloneDeep(this.reservedRowData)
    this.reservedRowData = resetReserveData;
    // filter our data
    if (val) {
      _.forEach(resetReserveData, (element, i) => {
        if (element.bundleName === bundleName) {
          this.temp = _.cloneDeep(element.volumeDetailDTOs)
          let temp;
          if (this.temp) {
            temp = this.temp.filter(function (d) {
              return d.legalEntityName.toLowerCase().indexOf(val) !== -1 || !val;
            });
          }
          _.forEach(this.rows, (list, j) => {
            if (list.bundleName === bundleName) {
              list.volumeDetailDTOs = temp;
              return false;
            }
          });
          return false;
        }
      });
    } else {
      _.forEach(resetReserveData, (element, i) => {
        _.forEach(this.rows, (list, j) => {
          if (list.bundleName === bundleName) {
            list.volumeDetailDTOs = element.volumeDetailDTOs;
            return false;
          }
        });
        return false;
      });
    }
    // update the rows
    // this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  clearAllSelected() {
    this.selected = [];
    this.disableSingleEdit = false;
    this.disableCheckBox = false;
    this.showSaveRibon = false;
    // this.volumeTabularDetails = this.reservedVolumeDetailsData;
    // _.forEach(this.temp, item => {
    this.rows = [];
    if (this.localRows) {
      this.rows = [...this.localRows];
    } else if (this.reservedRowDataOfTable) {
      this.rows = [...this.reservedRowDataOfTable];
    }    
    // this.rows = _.cloneDeep(this.reservedRowDataOfTable);
    if (this.rows) {
      _.forEach(this.rows, function (element, i) {
        _.forEach(element.volumeDetailDTOs, function (list, j) {
          list[j + '-quantity'] = false;
          list[j + '-comments'] = false;
          list[j + '-status'] = false;
          list[j + '-changeRegion'] = false;
          list[j + '-purchageOrder'] = false;
        });
      });
    }
    // });
  }
  callUpdateService(strippedRows) {
    this.isVolumeDataLoading = true;
    //this.showSaveRibon = false;
    this._featureService.updateVolumePhysical(strippedRows).then(data => {
      // this.volumeDetails = undefined;
      console.log(data);
      this.isVolumeDataLoading = false;

      if(data != null && data.length > 0){        
        let dataMap = new Map();
        _.forEach(data, function (dataElement, i) {
          dataMap.set(dataElement.volumeStagingId+'-'+dataElement.budgetDetailId, dataElement.errorMsg);
        }); 
        
        _.forEach(this.rows, function (element, i) {
          _.forEach(element.volumeDetailDTOs, function (list, j) {
            if (dataMap.has(list.stagigId+"-"+list.budgetDetailId)) {
              list.errorMessage = dataMap.get(list.stagigId+"-"+list.budgetDetailId);
            }
          });
        });
       }else{
        this.spreadMaticData = [];
        const toast = { type: 'success', title: 'Volume Edited successfully' };
        this._toasterService.pop(toast);
        this.showSaveRibon = false;
        this.disableCheckBox = false;
        this.selected = [];
        this.callOpCostVolumeDetails();
       }
      
      // this.getApplicationDetails(this.selectedItmsId);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  // make a single row of table editable
  editRow(rowIndex, bundleIndex, row) {
    this.disableSave = false;
    // this.rows[bundleIndex].volumeDetailDTOs[rowIndex][cell] = event.target.value;
    // if (cell === 'quantity' || cell === 'changeReason' || cell === 'comments') {
    const commentField = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['comments'];
    const quantity = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['quantity'];
    const changeReason = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['changeReason'];
    const statusId = this.rows[bundleIndex].volumeDetailDTOs[rowIndex]['statusId'];
    if (parseFloat(quantity) === 0 || quantity === '' || changeReason === undefined || changeReason === null
      || commentField === undefined || commentField === null || commentField.length === 0 || this.allStatusIds.indexOf(statusId) < 0 ) {
      this.disableSave = true;
    } else {
      this.disableSave = false;
    }
    // }
    // if (row.quantity === 0 || row.quantity === '' || row.comments === null || row.comments === undefined) {
    //   this.disableSave = true;
    // } else {
    //   this.disableSave = false;
    // }
    $('.tooltip').fadeOut('fast', function () {
      $('.tooltip').remove();
    });
    this.disableCheckBox = true;
    this.singleRowEdit = rowIndex;
    this.editableRowBundleIndex = bundleIndex;
    _.forEach(this.rows, function (element, i) {
      if (i === bundleIndex) {
        _.forEach(element.volumeDetailDTOs, function (list, j) {
          if (j === rowIndex) {
            list[j + '-quantity'] = true;
            list[j + '-comments'] = true;
            list[j + '-status'] = true;
            list[j + '-changeRegion'] = true;
            list[j + '-purchageOrder'] = true;
            return false;
          }
        });
      }
     // return false;
    });
    this.disableSingleEdit = false;
    this.showSaveRibon = true;
    this.openCreatGroupBox = false;
  }
  saveEdit() {
    this.disableSingleEdit = false;
    this.disableCheckBox = true;
    let dataEdited = [];
    let selectedSingleEditData;
    selectedSingleEditData = [];
    if (this.selected.length > 0) {
      dataEdited = _.map(this.selected, function (row, index) {
        return _.omit(row, ['approvedBy', 'approvedDate', 'enablePO', 'cyBudgetAmount',
          'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year',
          'statusDescription', 'approvedDateString', 'committedDate', 'committedDateString', 'lastModifiedDateString',
          'approvedDateWithZone', 'committedDateWithZone', 'lastModifiedDate',
          index + '-comments', index + '-changeRegion', index + '-purchageOrder', 'purchaseOrderName',
          index + '-quantity', index + '-status']);
      });
      _.forEach(dataEdited, (element, index) => {
        const selectedResion = _.find(this.allRegions, data => {
          if (element.changeReason) {
            return data.name === element.changeReason;
          }
        });
        if (selectedResion) {
          element.changeReasonId = selectedResion.id;
        } else {
          element.changeReasonId = element.changeReason;
        }
        element.quantity = Number(element.quantity);
        element.volumeStagingId = element.stagigId;
        element.bundleName = element.bundleName;
        // element.budgetDetailId = this.budgetDetailId;
        element.itmsId = this.selectedItmsId;
        element.cdsId = this._storage.get('cdsId');
        element.year = this.selectedYear;
        element.purchaseOrderId = Number(element.purchaseOrderId);
        delete element.rowNo;
        delete element.stagigId;
        delete element.legalEntityId;
        delete element.status;
        delete element.changeReason;
        delete element.legalEntityName;
        selectedSingleEditData.push(element);
      });
      this.callUpdateService(selectedSingleEditData);
    } else if ((this.selected.length === 0) && (this.spreadMaticData.length === 0)) {
      _.forEach(this.rows, (element, i) => {
        if (i === this.editableRowBundleIndex) {
          dataEdited = _.map(element.volumeDetailDTOs, function (row, index) {
            return _.omit(row, ['approvedBy', 'approvedDate', 'enablePO', 'cyBudgetAmount',
              'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year', 'statusDescription',
              index + '-comments', index + '-changeRegion', 'approvedDateString', 'committedDate', index + '-purchageOrder',
              'approvedDateWithZone', 'committedDateWithZone', 'lastModifiedDate',
              'committedDateString', 'purchaseOrderName', 'lastModifiedDateString', index + '-quantity', index + '-status']);
          });
        }
      })

      _.forEach(dataEdited, (element, index) => {
        if (this.singleRowEdit === index) {
          const selectedResion = _.find(this.allRegions, data => {
            if (element.changeReason) {
              return data.name === element.changeReason;
            }
          });
          if (selectedResion) {
            element.changeReasonId = selectedResion.id;
          } else {
            element.changeReasonId = element.changeReason;
          }
          element.quantity = Number(element.quantity);
          element.volumeStagingId = element.stagigId;
          element.bundleName = element.bundleName;
          // element.budgetDetailId = this.budgetDetailId;
          element.itmsId = this.selectedItmsId;
          element.cdsId = this._storage.get('cdsId');
          element.year = this.selectedYear;
          element.purchaseOrderId = Number(element.purchaseOrderId);
          delete element.rowNo;
          delete element.stagigId;
          delete element.legalEntityId;
          delete element.status;
          delete element.changeReason;
          delete element.legalEntityName;
          selectedSingleEditData.push(element);
          return true;
        }
      });
      this.callUpdateService(selectedSingleEditData)
    } else if ((this.selected.length === 0) && (this.spreadMaticData.length > 0)) {
      const spreadMaticDataForSave = [];
      _.forEach(this.rows, (element, i) => {
        _.forEach(this.spreadMaticData, (item, j) => {
          if (element.bundleName === item.bundleName) {
            dataEdited = _.map(element.volumeDetailDTOs, function (row, index) {
              // if (row.legalEntityId === item.legalEntityId) {
              return _.omit(row, ['approvedBy', 'approvedDate', 'enablePO', 'cyBudgetAmount',
                'incurredCodeService', 'lastModified', 'poId', 'rowNo', 'skillTeamName', 'year', 'statusDescription',
                index + '-comments', index + '-changeRegion', 'approvedDateString', 'committedDate', 'committedDateString',
                'approvedDateWithZone', 'committedDateWithZone', 'lastModifiedDate',
                'lastModifiedDateString', 'purchaseOrderName', index + '-quantity', index + '-status', index + '-purchageOrder']);
              // }
            });
          }
        })
      });
      _.forEach(this.spreadMaticData, (element) => {
        _.forEach(dataEdited, (item) => {
          if (element.stagigId === item.stagigId) {
            spreadMaticDataForSave.push(item)
          }
        })
      })
      _.forEach(spreadMaticDataForSave, (element, index) => {
        const selectedResion = _.find(this.allRegions, data => {
          if (element.changeReason) {
            return data.name === element.changeReason;
          }
        });
        if (selectedResion) {
          element.changeReasonId = selectedResion.id;
        } else {
          element.changeReasonId = element.changeReason;
        }
        element.quantity = Number(element.quantity);
        element.volumeStagingId = element.stagigId;
        element.bundleName = element.bundleName;
        // element.budgetDetailId = this.budgetDetailId;
        element.itmsId = this.selectedItmsId;
        element.cdsId = this._storage.get('cdsId');
        element.year = this.selectedYear;
        element.purchaseOrderId = Number(element.purchaseOrderId);
        // element.changeReasonId =  element.changeReason;
        delete element.rowNo;
        delete element.stagigId;
        delete element.legalEntityId;
        delete element.status;
        delete element.changeReason;
        delete element.legalEntityName;
        selectedSingleEditData.push(element);
        return true;
      });
      this.callUpdateService(selectedSingleEditData)
    }
  }

  onCheckboxChange(event, asd) {
  }

  selectAllChecked() {
    this.showSaveRibon = true;
    this.enableEditButton = false;
    this.disableCheckBox = true;
    this.disableSingleEdit = false;
    _.forEach(this.selected, element => {
      _.forEach(this.rows, function (item, i) {
        _.forEach(item.volumeDetailDTOs, function (list, j) {
          if (element.stagigId === list.stagigId
            && element.legalEntityId === list.legalEntityId
            && element.skillTeamName === list.skillTeamName) {
            list[j + '-quantity'] = true;
            list[j + '-comments'] = true;
            list[j + '-status'] = true;
            list[j + '-changeRegion'] = true;
            list[j + '-purchageOrder'] = true;
          }
        });
      });
    })
  }
  openEditGroupModal(bundleName) {
    let deleteGroup = true;
    this.disableDeleteGroup = false;
    let volumeStagingCollection;
    volumeStagingCollection = [];
    _.forEach(this.selectedYearData.bundleGroupDTOs, (element, i) => {
      if (bundleName === element.bundleName) {
        _.forEach(element.volumeDetailDTOs, (item, j) => {
          volumeStagingCollection.push(item.stagigId);
          if (item.quantity !== 0 || item.statusDescription !== 'Pending' || item.stagigId === 0) {
            deleteGroup = false;
          }
        })
      }
    })
    if (!deleteGroup || !this.volumeTabularDetails['header']['enableClearVolumeButton']) {
      this.disableDeleteGroup = true;
    }
    let t;
    this._modal.open(EditPhysicalGroupModalComponent,
      overlayConfigFactory({
        editGroupStagingIdCollection: volumeStagingCollection,
        groupName: bundleName,
        cdsId: this._storage.get('cdsId'),
        year: this.selectedYear,
        yearCollection: this.yearCollection,
        itmsId: this.selectedItmsId,
        itmsNo: this.volumeTabularDetails['header'].applicationNumber,
        appName: this.volumeTabularDetails['header'].applicationName,
        serviceCatalogId: this.selectedServiceCatalogId,
        disableDeleteGroup: this.disableDeleteGroup
      }, EditPhysicalGroupModalContext)).then(d => {
        t = d.result.then(data => {
          this.callOpCostVolumeDetails();
        });
      });
  }
  openAddSpeadoMaticModal(bundleName) {
    let t;
    this._modal.open(AddSpreadVolumeMaticModalComponent,
      overlayConfigFactory({
        addVolumeDetails: this.volumeDetails,
        addVolumeHeader: this.volumeDetailsData,
        allRegions: this.allRegions,
        allPurchaseOrderList: this.allPurchaseOrder,
        selectedYear: this.selectedYear,
        itmsId: this.selectedItmsId,
        bundleName: bundleName,
        allStatusData: this.allStatusData,
        serviceCatalogId: this.selectedServiceCatalogId,
        approve: this.approve
      }, AddSpreadVolumeMaticModalContext)).then(d => {
        t = d.result.then(data => {
          this.changeOnSpreadMatric(data);
        });
      });
  }
  changeOnSpreadMatric(data) {
    this.showSaveRibon = true;
    this.disableCheckBox = true;
    this.disableSingleEdit = false;
    this.spreadMaticData = data;
    _.forEach(this.spreadMaticData, (element, i) => {
      _.forEach(this.rows, (bundleList) => {
        if (bundleList.bundleName === element.bundleName) {
          _.forEach(bundleList.volumeDetailDTOs, (list, j) => {
            if ((0 != list.stagigId && element.stagigId === list.stagigId)
              || (element.skillTeamName === list.skillTeamName && element.legalEntityId === list.legalEntityId)) {
              list[j + '-quantity'] = true;
              list[j + '-comments'] = true;
              list[j + '-status'] = true;
              list[j + '-changeRegion'] = true;
              list[j + '-purchageOrder'] = true;
              list.quantity = Number(element.quantity);
              list.comments = element.comments;
              list.statusId = Number(element.status);
              list.changeReason = element.changeReason;
              list.purchaseOrderId = element.purchaseOrder;
              list.stagigId = element.stagigId;
              return false;
            }
          })
        }
      });
    });
  }
  openActionModal(dataForAction, modalDetails) {
    let t;
    this._modal.open(UpdateVolumeOpcostModalComponent,
      overlayConfigFactory({
        deleteServiceDetails: dataForAction,
        heading: modalDetails.heading,
        action: modalDetails.action,
        allRegions: this.allRegions,
        physicalUpdate: true,
        selectedYear: this.selectedYear,
        budgetDetailId: this.budgetDetailId,
        bundleName: this.groupNameText,
        actionBtnText: modalDetails.actionBtnText,
        itmsId: this.volumeDetailsData['navDetailsForVolume']['itmsId']
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
      heading: 'Would you like to approve the below user(s) ?',
      action: 'approve',
      actionBtnText: 'APPROVE'
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
  openCommitModal(dataToDelete) {
    let modalDetails;
    modalDetails = {
      heading: 'Would you like to commit the below user(s) ?',
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
  showAddLigalEntityModal(event) {
    let t;
    this._modal.open(AddLegalPhysicalEntityModalComponent,
      overlayConfigFactory({
        addVolumeDetails: this.volumeDetails,
        addVolumeHeader: this.volumeDetailsData,
        allRegions: this.allRegions,
        allSkills: this.allSkill,
        allLigialIntity: this.allLigalEntity,
        itmsId: this.volumeTabularDetails['header'].itmsId,
        itmsNo: this.volumeTabularDetails['header'].applicationNumber,
        appName: this.volumeTabularDetails['header'].applicationName,
        allPurchaseOrderList: this.allPurchaseOrder,
        selectedYear: this.selectedYear,
        serviceCatalogId: this.selectedServiceCatalogId,
        addBtn: true,
        allStatusData: this.allStatusData,
        volumeHeaderDetails: this.volumeHeaderDetails
      }, AddLegalPhysicalEntityModalContext)).then(d => {
        t = d.result.then(data => {
          // if (this.selectedItmsId) {
          this.callOpCostVolumeDetails()
          this.getallIntityDetails();
          // }
        });
      });
  }
  getSkill() {
    this._featureService.getSkillList().then(data => {
      this.allSkill = data;
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  getallIntityDetails() {
    const reqst = {
      'itmsId': this.volumeTabularDetails['header'].itmsId,
      'serviceCatalogId': this.selectedServiceCatalogId,
      'itmsNo': this.volumeTabularDetails['header'].applicationNumber,
      'appName': this.volumeTabularDetails['header'].applicationName,
    }
    this._featureService.getServiceLigialIntity(reqst).then(data => {
      this.allLigalEntity = data;
      this.allLigalEntity = _.sortBy(this.allLigalEntity, ['legalEntityID']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      // this.dataLoadingCompleted();
    });
  }
  showModal() {
    let t;
    this._modal.open(AddVolumeDetailsModalComponent,
      overlayConfigFactory({
        addVolumeDetails: this.volumeDetails,
        addVolumeHeader: this.volumeDetailsData,
        allRegions: this.allRegions,
        allPurchaseOrderList: this.allPurchaseOrder,
        selectedYear: this.selectedYear,
        allStatusData: this.allStatusData
      }, AddVolumeDetailsModalContext)).then(d => {
        t = d.result.then(data => {
          // if (this.selectedItmsId) {
          // this.getApplicationDetails(this.selectedItmsId)
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
  confirmationAlert() {
    const that = this;
    setTimeout(function () {
      that._confermationAlertService.confirmThis('Your changes have not been saved', 'Would you like to stay on the page',
        function () {
          // ACTION: Do this If user says YES
          // that['name'] = 'Yes clicked';
        }, function () {
          // ACTION: Do this if user says NO
          // that['name'] = 'No clicked';
        })
    }, 2000)
  }

  onlyNumberKey(event) {
    if (event.length === 0 && event.which === 48) {
      return false;
    }
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 45 && event.charCode <= 57;
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    // this.selectedYearData = undefined;
    if (changes['volumeTabularDetails'] !== undefined) {
      if (this.volumeTabularDetails) {
        this.selectedYear = this.volumeTabularDetails['year1'];
        this.enableLumpSumsService = this.volumeTabularDetails['header']['enableLumpSumsService'];
        this.getSelectedYearData(this.selectedYear);
      }
      //   this.volumeDetails = this.volumeTabularDetails;
      // console.log(_.fromPairs([['year', this.volumeDetails['year1']))
      // _.fromPairs([['year', this.volumeDetails['year1']);
      //   if (this.volumeDetails) {
      //     this.yearCollection.push(_.fromPairs([['year', this.volumeDetails['year1']]]));
      //     this.yearCollection.push(_.fromPairs([['year', this.volumeDetails['year2']]]));
      //     this.yearCollection.push(_.fromPairs([['year', this.volumeDetails['year3']]]));
      //     this.yearCollection.push(_.fromPairs([['year', this.volumeDetails['year4']]]));
      //     this.yearCollection.push(_.fromPairs([['year', this.volumeDetails['year5']]]));
      //   }
      // }
      // if (this.volumeDetails) {
      //   this.selectedServiceDetails(1, this.volumeDetails['year1']);
      //   // this.getallIntityDetails();
      //   this.getSkill();
      //   this.selectedItmsId = this.selectedItmsId;
      // }
      // if (changes['groupNameText']) {
      //   this.duplicateEntry = false;
    }
    // console.log(this.volumeTabularDetails['volumeDetailsYearWiseList'])
  }
  ngAfterViewChecked() {
    if (this.table && this.table.recalculate && (this.tableWrapper.nativeElement.clientWidth !== this.currentComponentWidth)) {
      this.currentComponentWidth = this.tableWrapper.nativeElement.clientWidth;
      this.table.recalculate();
      this.changeDetectorRef.detectChanges();
      window.dispatchEvent(new Event('resize'));
    }
  }
  statusFilterBaseByGroup(id, bundleIndex, resetReserveData) {
    let newVal;
    if (id === 0) {
      newVal = 'All';
    } else if (id === 2) {
      newVal = 'Pending';
    } else if (id === 3) {
      newVal = 'Approved';
    } else if (id === 5) {
      newVal = 'Committed';
    } else if (id === 4) {
      newVal = 'Rejected';
    } else {
      newVal = 'No Change';
    }
    const val = newVal.toLowerCase();
    // this.reservedRowData = _.cloneDeep(this.selectedYearData.bundleGroupDTOs);
    this.reservedRowData = resetReserveData;
    // filter our data
    let totalQty = 0;
    let totalCost = 0;
    if (val) {
      _.forEach(resetReserveData, (element, i) => {
        this.temp = _.cloneDeep(element.volumeDetailDTOs);
        let temp;
        if (this.temp && val !== 'all') {
          temp = this.temp.filter(function (d) {
            return d.statusDescription.toLowerCase().indexOf(val) !== -1 || !val;
          });
        } else {
          temp = this.temp;
        }
        _.forEach(this.rows, (list, j) => {
          if (list.bundleName === element.bundleName) {
            switch (id) {
              case 0:
                list.totalQuantity = list.pendingQuantity + list.approvedQuantity + list.committedQuantity;
                list.totalCost = list.pendingCost + list.approvedCost + list.committedCost;
                break;
              case 2:
                list.totalQuantity = list.pendingQuantity;
                list.totalCost = list.pendingCost;
                break;
              case 3:
                list.totalQuantity = list.approvedQuantity;
                list.totalCost = list.approvedCost;
                break;
              case 4:
                list.totalQuantity = 0;
                list.totalCost = 0;
                break;
              case 5:
                list.totalQuantity = list.committedQuantity;
                list.totalCost = list.committedCost;
                break;
            }
            list.volumeDetailDTOs = temp;
            totalQty = totalQty + list.totalQuantity;
            totalCost = totalCost + list.totalCost;
            return false;
          }
        });
        this.selectedYearData.totalQuantity = totalQty;
        this.selectedYearData.totalCost = totalCost;
      });
      // this.calculateTotals(bundleIndex, resetReserveData, val);
    } else {
      // _.forEach(resetReserveData, (element, i) => {
      //   _.forEach(this.rows, (list, j) => {
      if (this.rows.length < 1) {
        this.rows.volumeDetailDTOs = resetReserveData.volumeDetailDTOs;
      }
    }
  }
}
