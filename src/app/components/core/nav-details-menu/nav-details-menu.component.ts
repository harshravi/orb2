import {
  Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter, ViewChild,
  ElementRef, HostListener
} from '@angular/core';
import { FeatureService } from '../../../../app/services/featureServices/feature.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder, FormArray, NG_VALIDATORS } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { CheckBoxService, ConfermationAlertService } from '../../../services';

declare var $: any;
declare var _: any;
@Component({
  selector: 'app-nav-details-menu',
  templateUrl: './nav-details-menu.component.html',
  styleUrls: ['./nav-details-menu.component.scss'],
  providers: [FeatureService, CheckBoxService, ConfermationAlertService]
})
export class NavDetailsMenuComponent implements OnInit, OnChanges {
  form: FormGroup;
  @ViewChild('appIdName') appIdName: ElementRef;
  @ViewChild('typeahead') typeahead;
  @ViewChild('searchedWordText') searchedWordText;
  @Input()
  showActiveUser: boolean;
  @Input()
  showNav: boolean;
  @Input()
  showApplicationDetails: any;
  @Input()
  showNavApprovals: boolean;
  @Input()
  showNavLumpsum: boolean;
  // @Input()
  // showUsageApp: boolean
  @Input()
  showServiceApp: boolean
  @Input()
  navDetailsData: any;
  @Input()
  showSpinner: boolean;
  @Input()
  showNavFor: string;
  @Input()
  detailsNames: Array<object>;
  @Input()
  highlightedSearchedRow: number;
  @Input()
  highlightedServiceRow: number;
  @Input()
  enableServiceBut: boolean;
  @Input()
  checkForChange: boolean;
  @Input()
  detailsId: number;
  @Output()
  dashboardData = new EventEmitter();
  @Output()
  searchedText = new EventEmitter();
  @Output()
  selectedApp = new EventEmitter();
  @Output()
  defaultPage = new EventEmitter();
  @Output()
  openModal = new EventEmitter()
  @Output()
  selectedVolumeDetails = new EventEmitter();
  @ViewChild('filterText') filterText: ElementRef;
  @ViewChild('searchedContentText') searchedContentText;
  @Output() approvalFilterButton = new EventEmitter<any>();
  @Output() lumFilterButton = new EventEmitter<any>();
  dashboardDeatils: any;
  usageFilter = true;
  selectedEntity = [];
  selectedRegion = [];
  selectedAppHeaderDetails;
  selectedRegionCount: number;
  selectedSkills = [];
  selectedSkillsCount: number;
  selectedServices = [];
  selectedServicesCount: number;
  reservedselectedRegion: Array<object>;
  resetServiceCall: boolean;

  changeRequestsdBy = [];
  changeRequestedByCount: number;

  selectedapprovesdBy = [];
  selectedapprovedByCount: number;

  showFilterBox: string;
  showSearchBox: string;
  lessOpacity: string;
  filterIsActive: boolean;
  showShorting: boolean;
  temp = [];
  searchedData = [];
  seachedValue: any;
  approvedBy: any;
  appData: any;
  AllAppData: any;
  write: boolean;
  approve: boolean;
  actionPermission;
  accessToAll;
  accessToVolume;
  userName;
  otherThanSearchedApp: any;
  AllRegions: any;
  AllRegionsCopy: any;
  allSkill: any;
  allSkillCopy: any;
  allServices: any;
  allServicesCopy: any;
  reservedRigion: Array<object>;
  reservedService: Array<object>;
  isDataLoading: boolean;
  checkFlag: boolean;
  reservedSkill: Array<object>;
  regionFilterText: string;
  multiselectOne = 'one';
  multiselectTwo = 'two';
  multiselectThree = 'three';
  plan_text = 'Care Plan';
  stage_text = 'Risk State';
  allLegalEntity: any;
  allLegalEntityCopy: any;
  appSearch: any;
  typehead = false;
  typeheadNoResult: boolean;
  applicationName: any;
  applicationID: number;
  responseSection: string;
  selectStatus: any;
  rows: any;
  sectionName: string;
  searchData: any;
  selectSkill: any;
  selectService: any;
  selectLegalEntity: any;
  selectRegion: any;

  constructor(private _featureService: FeatureService, private _CheckBoxService: CheckBoxService, private _fb: FormBuilder,
    private _confermationAlertService: ConfermationAlertService, private _storage: LocalStorageService) {
    this.rows = [];
    this.showNav = false;
    this.showServiceApp = false;
    // this.showUsageApp = false;
    this.filterIsActive = false;
    this.checkFlag = true;
    this.detailsNames = [];
    this.allSkill = [];
    this.userName = this._storage.get('cdsId');
    this.showShorting = false;
    this.typeheadNoResult = false;
    this.showActiveUser = true;
    this.getApplication('ALL');
    this.getAllLegalEntity();
    this.getRegions();
    this.getAllServiceList();
    // this.getApprovalDetails();
    const authPermission = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.actionPermission = JSON.parse(authPermission);

    this.selectSkill = 0;
    this.selectService = 0;
    this.selectLegalEntity = 0;
    this.selectRegion = 0;
  }
  ngOnInit() {
    this.updateDashboard();
    this.approvedBy = this.showApplicationDetails;
    this.getApplication(this._storage.get('cdsId'));
    // this.getApprovalDetails();
    this.getSkill();
    // this.form = this._fb.group({
    //   'applicationEntityID': ['', Validators.required]
    // });
    $(document).ready(function () {
      // $('#test').BootSideMenu({
      //   side: 'left'
      // });
      const slider_width = $('.sliding-nav').width(); // get width automaticly
      const left_nav_width = $('.cd-side-nav').width();
      $('.content-wrapper').css({ 'margin-left': left_nav_width + slider_width + 1 + 'px' });
      $('#arrow').click(function () {
        //   ($(this).css('margin-left')),
        //   (slider_width + 'px'),
        //   ($(this).css('margin-left') === -slider_width),
        //   ($(this).is(':animated'))
        // )
        if ($(this).css('margin-left') === '-' + slider_width + 'px') {
          $('.sliding-nav,#arrow').animate({ 'margin-left': '+=' + slider_width });
          $('.content-wrapper').animate({ 'margin-left': left_nav_width + slider_width + 1 + 'px' });
        } else {
          if (!$(this).is(':animated')) { // perevent double click to double margin
            $('.sliding-nav,#arrow').animate({ 'margin-left': '-=' + slider_width });
            $('.content-wrapper').animate({ 'margin-left': left_nav_width + 'px' });
          }
        }
      });


      $('#arrow').on('click', function () {
        if ($('#arrow-span').hasClass('glyphicon-triangle-left')) {
          $('#arrow-span').removeClass('glyphicon-triangle-left');
          $('#arrow-span').addClass('glyphicon-triangle-right');
          $('.content-header').removeClass('header-spacing-left');
        } else {
          $('#arrow-span').removeClass('glyphicon-triangle-right');
          $('.content-header').addClass('header-spacing-left');
          $('#arrow-span').addClass('glyphicon-triangle-left');
        }
        if ($(this).hasClass('bg-darkblue')) {
          $(this).removeClass('bg-darkblue');
          $(this).addClass('bg-orange');
        } else {
          $(this).removeClass('bg-orange');
          $(this).addClass('bg-darkblue');
        }
      })
      $('.filter-text').on('click', function () {
        const checkClass = $('span.filter-icon');
        if (checkClass.hasClass('show-filter-on')) {
          checkClass.removeClass('show-filter-on');
          checkClass.text('Show Filters');
        } else {
          checkClass.addClass('show-filter-on');
          checkClass.text('Hide Filters');
        }
      });
      // $('.filter-sort').on('click', function () {
      //   const checkClass = $('.filter-sort-icon');
      //   if (checkClass.hasClass('filter-sort-icon-on')) {
      //     this.appData = _.orderBy(this.appData, ['itmsId'], ['asc']);
      //     checkClass.removeClass('filter-sort-icon-on');
      //   } else {
      //     this.appData = _.orderBy(this.appData, ['itmsId'], ['asc']);
      //     checkClass.addClass('filter-sort-icon-on');
      //   }
      // });
      // $('.toggle-app').click(function (e) {
      //   e.preventDefault();

      //   const $this = $(this);

      //   if ($this.next().hasClass('show')) {
      //     $this.next().removeClass('show');
      //     $this.next().slideUp(150);
      //   } else {
      //     $this.parent().parent().find('span .inner').removeClass('show');
      //     $this.parent().parent().find('span .inner').slideUp(150);
      //     $this.next().toggleClass('show');
      //     $this.next().slideToggle(150);
      //   }
      // });
      $('#volume-nav-details').on('click', function (e) {
        e.preventDefault();
        const $this = $(this);
        if ($this.find('div').hasClass('toggle-app')) {
        }
      })
      // $('.accordion').on('click', function (e) {
      //   e.preventDefault();
      //   console.log('yes')
      //   // Expand or collapse this panel
      //   // $(this).next().slideToggle('fast');

      //   // // Hide the other panels
      //   // $('.accordion-content').not($(this).next()).slideUp('fast');

      // });


      $('.list-group-item').on('click', function (e) {
        e.preventDefault();
        const $this = $(this);
        // if ($('.list-group-item').hasClass('highlight-list-row')) {
        $($('.list-group-item')).removeClass('highlight-list-row');
        $this.addClass('highlight-list-row');
        // } else {
        //     $this.addClass('highlight-list-row');
        // }

      });

    });
  }

  updateDashboard() {
    this.dataLoadingStarted();
    const tableData = {
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.getDashboardDetails(tableData).then(data => {
      this.dataLoadingCompleted();
      const dashboardList = _.cloneDeep(data);
      this.dashboardData.emit(_.cloneDeep(data))
      if (_.cloneDeep(data.userDetails)) {
        this.dashboardDeatils = _.cloneDeep(data.userDetails);
        const skillTeamList = [];
        const serviceCatalogList = [];
        const seriveOnFilter = [];
        const skillOnFilter = [];
        _.forEach(this.dashboardDeatils, element => {
          _.forEach(element.serviceCatalog, list => {
            serviceCatalogList.push(list)
          })
        })
        serviceCatalogList.map(
          item => this.allServices.filter(obj => {
            if (obj.name === item) {
              obj.selected = true
              seriveOnFilter.push(obj);
            } if (item === 'All') {
              obj.selected = true
              this.onServiceSelection(obj)
            }
          })
        );
        if (seriveOnFilter.length > 0) {
          this.onServiceSelection(seriveOnFilter)
        }
        _.forEach(this.dashboardDeatils, element => {
          _.forEach(element.skillTeam, list => {
            skillTeamList.push(list)
          })
        })
        skillTeamList.map(
          item => this.allSkill.filter(obj => {
            if (obj.name === item) {
              obj.selected = true
              skillOnFilter.push(obj);
            }
            if (item === 'All') {
              obj.selected = true
              this.onSkillSelection(obj)
            }
          })
        );
        if (skillOnFilter.length > 0) {
          this.onSkillSelection(skillOnFilter)
        }

      }
      this.allSkill = this.allSkill.filter(obj => obj.selected === true);
      // this.allServices = this.allServices.filter(obj => obj.selected === true);
      this.reservedselectedRegion = [];
      // this.AllRegions = this.AllRegions.filter(obj => (obj.region === this.dashboardDeatils.regionName) || (this.dashboardDeatils.regionName === 'Global'))
      if (dashboardList.accessToAllRegions === false) {
        _.forEach(dashboardList['regionList'], element => {
          _.forEach(this.AllRegions, (list, i) => {
            if (element === list.regionId) {
              list.selected = true
              this.selectedRegion.push(list);
              this.reservedselectedRegion.push(list);
              this.selectedRegionCount = this.reservedselectedRegion.length
              this.usageFilter = false;
            }
          })
        })
      } else if (dashboardList.accessToAllRegions === true) {
        _.forEach(this.AllRegions, (list, i) => {
          list.selected = true
          this.selectedRegion.push(list);
          this.reservedselectedRegion.push(list);
          this.selectedRegionCount = this.reservedselectedRegion.length
          this.usageFilter = false;
        })
      }
      this.reservedRigion = _.cloneDeep(this.AllRegions);
      this.reservedService = [];
      if (dashboardList.accessToAllServiceCatalogs === false) {
        _.forEach(dashboardList['serviceCatalogList'], element => {
          _.forEach(this.allServices, (list, id) => {
            if (element === list.id) {
              list.selected = true
              this.selectedServices.push(list);
              this.reservedService.push(list);
              this.selectedServicesCount = this.reservedService.length
              this.usageFilter = false;
            }
          })
        })
      } else if (dashboardList.accessToAllServiceCatalogs === true) {
        _.forEach(this.allServices, (list, id) => {
          list.selected = true
          this.selectedServices.push(list);
          this.reservedService.push(list);
          this.selectedServicesCount = this.reservedService.length
          this.usageFilter = false;
        })
      }
      this.reservedService = _.cloneDeep(this.allServices);
      // this.AllRegions.forEach(element => {
      //   element.selected = true;
      //   this.onRegionSelection(element)
      // });
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      this.dataLoadingCompleted();
    });
  }

  toggleHighlightSearch(newValue: number) {
    this.highlightedSearchedRow = newValue;
  }
  toggleHighlightService(newValue: number) {
    this.highlightedServiceRow = newValue;
  };
  openRelatedDetailPage(item, data) {
    item.navDetailsForVolume = data;
    this.selectedVolumeDetails.emit(item)
  }
  showAppShorting(sortBy) {
    // this.highlightedSearchedRow = null;
    // this.defaultPage.emit(true);
    // this.detailsNames = null;
    this.showShorting = sortBy;
    if (sortBy === true) {
      this.appData = _.orderBy(this.appData, ['applicationName'], ['desc']);
    } else {
      this.appData = _.orderBy(this.appData, ['applicationName'], ['asc']);
    }
    this.seachedValue = '';
  }



  openModalToAdd(event) {
    this.openModal.emit(event)
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.checkForChange = undefined;
    if (changes['checkForChange'] !== undefined) {
      this.getApplication(this._storage.get('cdsId'));
    }
  }
  callGetApplication(requestData) {
    // const appRequest = {
    //   cdsId: requestData
    // }
    this.dataLoadingStarted();
    this.appData = undefined;
    this._featureService.getAppliationTabular(requestData).then(data => {
      this.dataLoadingCompleted();
      this.appData = data;
      if (this.selectedAppHeaderDetails) {
        _.find(this.appData, item => {
          if (item.itmsId === this.selectedAppHeaderDetails.itmsId) {
            item.selectionOn = this.selectedAppHeaderDetails.selectionOn;
            item.userAppData = this.selectedAppHeaderDetails.userAppData;
            this.selectedApp.emit(item);
          }
        })
      };
      // this.temp = data
      this.appData = _.orderBy(this.appData, ['applicationName'], ['asc']);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
      this.dataLoadingCompleted();
    });
  }

  getApplication(requestedCdsid) {
    // this.rows = [];
    this.dataLoadingStarted();
    let appRequest;
    appRequest = {
      cdsId: requestedCdsid,
    }
    if (requestedCdsid === 'ALL') {
      this._featureService.getAppliationTabular(appRequest).then(data => {
        this.dataLoadingCompleted();
        this.AllAppData = data;
        this.temp = data
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        console.log(error)
        // this.dataLoadingCompleted();
      });
    } else {
      if (this.showNavFor === 'usage') {
        appRequest.screen = this.showNavFor
        this.callGetApplication(appRequest);
      } else if (this.showNavFor === 'volume') {
        appRequest.screen = this.showNavFor
        this.callGetApplication(appRequest);
      }
    }

  }

  usgaeFilter() {
    this.defaultPage.emit(true);
    const selectedRegionIds = [];
    this.AllRegions = _.cloneDeep(this.reservedRigion);
    for (let i = 0; i < this.selectedRegion.length; i++) {
      selectedRegionIds.push(this.selectedRegion[i].regionId)
    }

    const selectedSkillsIds = [];
    // this.AllRegions = _.cloneDeep(this.reservedService);
    for (let i = 0; i < this.selectedSkills.length; i++) {
      selectedSkillsIds.push(this.selectedSkills[i].id)
    }

    const selectedServicesIds = [];
    for (let i = 0; i < this.selectedServices.length; i++) {
      selectedServicesIds.push(this.selectedServices[i].id)
    }

    const requestDataRegion = {
      'cdsId': this._storage.get('cdsId'),
      'screen': this.showNavFor,
      'region': selectedRegionIds,
      'skillTeam': selectedSkillsIds,
      'services': selectedServicesIds
    };
    if (this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1) {
      this.appData = [];
      this.onCloseToggle();
      this.dataLoadingStarted();
      this._featureService.getUsageFIlterTabular(requestDataRegion).then(data => {
        this.dataLoadingCompleted();
        this.appData = data;
        this.temp = data;
        this.appData = _.orderBy(this.appData, ['applicationName'], ['asc']);
      }, error => {
        this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
        this.dataLoadingCompleted();
        this.onCloseToggle();
      });
    }
  }

  onCloseToggle() {
    this.filterIsActive = false;
    const checkClass = $('span.filter-icon');
    checkClass.removeClass('show-filter-on');
    checkClass.text('Show Filters');
  }
  removeSelectedRegion(item, legalentity) {
    const index = this.selectedRegion.indexOf(item);
    this.selectedRegion.splice(index, 1);
    const objIndex = legalentity.listData.findIndex((obj => obj.regionId === item.regionId));
    legalentity.listData[objIndex].selected = false
    this.AllRegions = legalentity.listData;
    this.selectedRegionCount = this.selectedRegionCount - 1;
    this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
  }
  onRegionSelection(item) {
    if (item.length === undefined) {
      // this._CheckBoxService.setCheckBoxData(item);
      const newData = this._CheckBoxService.getCheckBoxData();
      if (item.selected === true) {
        const checkItAdded = _.find(this.selectedRegion, element => {
          return (element.regionId === item.regionId);
        })
        if (checkItAdded) {
          this.selectedRegion = _.filter(this.selectedRegion, element => {
            return (element.regionId !== item.regionId)
          });
        } else {
          this.selectedRegion.push(item);
        }
        if (this.regionFilterText !== '' && this.regionFilterText !== undefined) {
          let checkRegionFalse = [];
          checkRegionFalse = _.remove(_.cloneDeep(this.AllRegions), element => {
            return (element.selected === true);
          })
          this.selectedRegionCount = checkRegionFalse.length;
        } else {
          this.selectedRegionCount = this.selectedRegion.length;
        }
      } else {
        this.selectedRegion = this.selectedRegion.filter(function (el) {
          return el.selected === true;
        });
        if (this.regionFilterText !== '' && this.regionFilterText !== undefined) {
          let checkRegionTrue = [];
          checkRegionTrue = _.remove(_.cloneDeep(this.AllRegions), element => {
            return (element.selected === true);
          })
          this.selectedRegionCount = checkRegionTrue.length;
        } else {
          this.selectedRegionCount = this.selectedRegion.length;
        }
      }
      if (this.showNavFor === 'volume') {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      } else {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      }
      console.log(this.selectedRegion)
    } else if (item.length !== undefined) {
      const selectionlist = item;
      selectionlist.forEach(element => {
        if (element.selected === true) {
          if (this.selectedRegionCount !== selectionlist.length) {
            this.selectedRegion.push(element)
          }
          this.selectedRegionCount = this.selectedRegion.length;
        } else {
          this.selectedRegion = this.selectedRegion.filter(function (el) {
            return el.selected === true;
          });
          // this.selectedRegionCount = this.selectedRegion.length;
        }
      });

      if (this.showNavFor === 'volume') {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      } else {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      }
    }

  }

  onSkillSelection(item) {
    if (item.length === undefined) {
      if (item.selected === true) {
        this.selectedSkills.push(item)
        this.selectedSkillsCount = this.selectedSkills.length;
      } else {
        this.selectedSkills = this.selectedSkills.filter(function (el) {
          return el.selected === true;
        });
        this.selectedSkillsCount = this.selectedSkills.length;
      }
      if (this.showNavFor === 'volume') {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      } else {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      }
    } else if (item.length !== undefined) {
      const selectionlist = item;
      selectionlist.forEach(element => {
        if (element.selected === true) {
          if (this.selectedSkillsCount !== selectionlist.length) {
            this.selectedSkills.push(element)
          }
          this.selectedSkillsCount = this.selectedSkills.length;
        } else {
          this.selectedSkills = this.selectedSkills.filter(function (el) {
            return el.selected === true;
          });
          //  this.selectedSkillsCount = this.selectedSkills.length;
        }
      });

      if (this.showNavFor === 'volume') {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      } else {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      }
    }
  }

  onServiceSelection(item) {
    if (item.length === undefined) {
      if (item.selected === true) {
        this.selectedServices.push(item)
        this.selectedServicesCount = this.selectedServices.length;
      } else {
        this.selectedServices = this.selectedServices.filter(function (el) {
          return el.selected === true;
        });
        this.selectedServicesCount = this.selectedServices.length;
      }
      if (this.showNavFor === 'volume') {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      } else {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      }
    } else if (item.length !== undefined) {
      const selectionlist = item;
      selectionlist.forEach(element => {
        if (element.selected === true) {
          if (this.selectedServicesCount !== selectionlist.length) {
            this.selectedServices.push(element);
          }
          this.selectedServicesCount = this.selectedServices.length;
        } else {
          this.selectedServices = this.selectedServices.filter(function (el) {
            return el.selected === true;
          });
          // this.selectedServicesCount = this.selectedServices.length;
        }
      });
      if (this.showNavFor === 'volume') {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      } else {
        this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
      }
    }
  }

  removeSelectedSkill(item, legalentity) {
    const index = this.selectedSkills.indexOf(item);
    this.selectedSkills.splice(index, 1);
    const objIndex = legalentity.listData.findIndex((obj => obj.id === item.id));
    legalentity.listData[objIndex].selected = false
    this.allSkill = legalentity.listData;
    this.selectedSkillsCount = this.selectedSkillsCount - 1;
    this.usageFilter = this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1 ? false : true;
  }
  resetModalData(legal, skill) {
    if (this.selectedRegion.length >= 1) {
      legal.listData.map(obj => (obj.selected === true) && (obj.selected = false));
    }
    if (this.selectedSkills.length >= 1) {
      skill.listData.map(obj => (obj.selected === true) && (obj.selected = false));
    }
    this.selectedRegion = [];
    this.selectedSkills = [];
    if (this.resetServiceCall) {
      const requestDataRegion = {
        'cdsId': this._storage.get('cdsId'),
      };
      this.lumFilterButton.emit(requestDataRegion);
      this.resetServiceCall = false;
    }
    this.usageFilter = true;
    this.selectedRegionCount = null;
    this.selectedSkillsCount = null;
  }
//   getApprovalDetails() {
//     this.dataLoadingStarted();
//     if (this.showActiveUser) {
//       this.sectionName = 'usage';
//     } else {
//       this.sectionName = 'volume';
//     }
//     const reqData = {
//       'section': this.sectionName,
//       'cdsId': this._storage.get('cdsId'),
//       'yearForVolume': 2019
//     }
//     this.responseSection = undefined;
//     this._featureService.getApprovalDetails(reqData).then(data => {
//       this.responseSection = data.responseSection;
//       if (this.responseSection === 'usage') {
//         this.rows = data.usageRecords;
//         this.temp = _.cloneDeep(data.usageRecords);
//         if (this.rows === '') {
//           this.appSearch = null;
//         } else {
//           this.appSearch = this.rows;
//         }
//       }else {
//         this.rows = data.volumeRecords;
//         this.temp = _.cloneDeep(data.volumeRecords);
//         if (this.rows === '') {
//           this.appSearch = null;
//         } else {
//           this.appSearch = this.rows;
//         }
//       }
//   }, error => {
//     this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
//     console.log(error)
//     this.dataLoadingCompleted();
//   });
// }
autoSearch(event) {
  const searchText = event.value;
  if (searchText.length >= 1 && searchText === undefined) {
    if (isNaN(searchText)) {
      const temp = this.appSearch.filter(function (d) {
        if (d.applicationName != null) {
          return d.applicationName.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 || !searchText.toLocaleLowerCase();
        }
      });
      this.searchData = temp;
    } else {
      const temp = this.appSearch.filter(d => d.applicationDetailsId.toString().indexOf(searchText) !== -1 || !searchText);
      this.searchData = temp;
    }
    this.typehead = true;
    this.typeheadNoResult = this.searchData.length >= 1 ? false : true;

  } else {
    this.typeheadNoResult = false;
    this.searchData.splice(0, this.searchData.length);
  }
}
enableType(event) {
  const searchText = event.value;
  if (searchText) {
    if (event.code === 'Backspace' && this.applicationName !== undefined) {
      if (this.typeahead) {
        this.typeahead.nativeElement.style.display = 'none';
        this.typeahead = false;
      }
      this.form.controls['applicationEntityID'].reset();
    } else if (searchText.length >= 1) {
      if (this.typeahead) {
        this.typeahead.nativeElement.style.display = 'block';
      }
      this.typeheadNoResult = this.searchData.length >= 1 ? false : true;
    } else {
      this.typehead = false;
      this.applicationName = '';
      // this.AppButtonStatus();
    }
  }
}
clickedInside($event: Event) {
  $event.preventDefault();
  $event.stopPropagation();
}
updateApplicationName(item) {
  this.applicationID = item.applicationDetailsId;
  this.appIdName.nativeElement.value = item.applicationDetailsId + ' ' + item.applicationName;
  this.form.value.applicationEntityID = item.applicationDetailsId + ' ' + item.applicationName;
  this.applicationName = item.applicationName;
  if (this.typeahead) {
    this.typeahead.nativeElement.style.display = 'none';
  }
}
// updateFilter(event) {
//   if (event.target.value.length >= 1) {
//   const val = event.target.value.toLowerCase();
//   const temp = this.temp.filter(function (d) {
//     return d.applicationDetailsId.toLowerCase().indexOf(val) !== -1 || !val;
//   });
//   const temp1 = this.temp.filter(function (d) {
//     return d.applicationName.toLowerCase().indexOf(val) !== -1 || !val;
//   });

//   // update the rows
//   this.rows = temp;
// }
//   // Whenever the filter changes, always go back to the first page
//   // this.table.offset = 0;
// }
  resetFilter(regions, skill, entities) {
    this.onCloseToggle();
    this.defaultPage.emit(true);
    if (this.selectedRegion.length >= 1) {
      regions.listData.map(obj => (obj.selected === true) && (obj.selected = false));
    }
    if (this.selectedSkills.length >= 1) {
      skill.listData.map(obj => (obj.selected === true) && (obj.selected = false));
    }

    this.selectedRegion = [];
    this.selectedSkills = [];
    this.selectedServices = [];
    this.selectedRegionCount = null;
    this.selectedSkillsCount = null;
    this.selectedServicesCount = null;
    this.updateDashboard();

  }

  resetApprovalFilter(regions, skill, entities, service) {
    // this.defaultPage.emit(true);
    this.selectedEntity = [];
    this.selectedRegion = [];
    this.selectedSkills = [];
    this.selectedServices = [];
  }

  onchangeRequestBy(item, request) {
    if (request === 'request') {
      if (item.selected === true) {
        this.changeRequestsdBy.push(item)
        this.changeRequestedByCount = this.changeRequestsdBy.length;
      } else {
        this.changeRequestsdBy = this.changeRequestsdBy.filter(function (el) {
          return el.selected === true;
        });
        this.changeRequestedByCount = this.changeRequestsdBy.length;
      }
    }
  }

  onapprovedBy(item, approve) {
    if (approve === 'approve') {
      if (item.selected === true) {
        this.selectedapprovesdBy.push(item)
        this.selectedapprovedByCount = this.selectedapprovesdBy.length;
      } else {
        this.selectedapprovesdBy = this.selectedapprovesdBy.filter(function (el) {
          return el.selected === true;
        });
        this.selectedapprovedByCount = this.selectedapprovesdBy.length;
      }
    }
  }
  lumsumFilter() {
    const selectedRegionIds = [];
    for (let i = 0; i < this.selectedRegion.length; i++) {
      selectedRegionIds.push(this.selectedRegion[i].regionId)
    }

    const selectedSkillsIds = [];
    for (let i = 0; i < this.selectedSkills.length; i++) {
      selectedSkillsIds.push(this.selectedSkills[i].id)
    }

    const requestDataRegion = {
      'cdsId': this._storage.get('cdsId'),
      'regionIds': selectedRegionIds,
      'skillTeamIds': selectedSkillsIds
    };
    this.lumFilterButton.emit(requestDataRegion);
    this.resetServiceCall = true;
  }

  approvalFilter() {
    const requestDataRegion = {
      'cdsId': this._storage.get('cdsId'),
      'section': 'usageFilter',
      'regionID': this.selectRegion,
      'skillTeamID': this.selectSkill,
      'legalEntityID': this.selectLegalEntity
    };

    // if (this.selectedRegion.length >= 1 && this.selectedSkills.length >= 1) {
    //   this.appData = [];
    //   this.dataLoadingStarted();
    //   this._featureService.getUsageFIlterTabular(requestDataRegion).then(data => {
    //     this.dataLoadingCompleted();
    //     this.appData = data;
    //     this.temp = data;
    //     this.appData = _.orderBy(this.appData, ['applicationName'], ['asc']);
    //   }, error => {
    //     this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
    //     this.dataLoadingCompleted();
    //     this.onCloseToggle();
    //   });
    // }
    this.approvalFilterButton.emit(requestDataRegion);
  }

  getRegions() {
    this._featureService.getRegionList().then(data => {            
      this.AllRegions = data;
      this.AllRegionsCopy = data;
      this.AllRegions = _.sortBy(this.AllRegions, ['region']);
      if(this.showNavApprovals){
        const AllRegions = {
          regionId: 0,
          region: 'All'
        }
        this.AllRegions.unshift(AllRegions);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
    });
  }

  getAllServiceList() {
    this._featureService.getAllService().then(data => {
      this.allServices = data;
      this.allServicesCopy = data;
      this.allServices = _.sortBy(this.allServices, ['name']);
      if(this.showNavApprovals){
        const allServices = {
          id: 0,
          name: 'All'
        }
        this.allServices.unshift(allServices);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
    });
  }

  getAllLegalEntity() {
    this._featureService.getLegalEntity().then(data => {
      this.allLegalEntity = data;      
      this.allLegalEntityCopy = data;
      this.allLegalEntity = _.sortBy(this.allLegalEntity, ['legalEntity']);
      const allLegalEntity = {
        legalEntityID: 0,
        legalEntity: 'All'
      }
      this.allLegalEntity.unshift(allLegalEntity);
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error);
    });
  }

  getSkill() {
    this._featureService.getSkillList().then(data => {
      this.allSkill = data;      
      this.allSkillCopy = data;
      this.allSkill = _.sortBy(this.allSkill, ['name']);
      if(this.showNavApprovals){
        const allSkillList = {
          id: 0,
          name: 'All'
        }
        this.allSkill.unshift(allSkillList);
      }
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.')
      console.log(error)
    })
  }

  otherData(searchedAppData, searchedtext, allData) {

    // const temp = [];
    // _.forEach(searchedAppData, (element) => {
    //   _.forEach(this.AllAppData, (list) => {
    //     if ((element.itmsId !== list.itmsId) && (element.applicationName !== list.applicationName)) {
    //       temp.push(list);
    //       return false;
    //     }
    //   });
    // })
    // const presents = _.intersectionWith(searchedAppData, this.AllAppData, _.isEqual);
    const temp = _.differenceBy(allData, searchedAppData, 'itmsId', 'applicationName');
    const otherData = _.map(temp, function (row, index) {
      return _.omit(row, ['pendingCount', 'readOnly', 'regionName', 'skillTeamName']);
    });
    this.otherThanSearchedApp = otherData;


    // const temp = _(this.AllAppData)
    //   .differenceBy(searchedAppData, 'itmsId', 'applicationName')
    // .map(_.partial(_.pick, _, 'itmsNo', 'itmsId', 'applicationName'))
    // .value();

   /* this.otherThanSearchedApp = otherData.filter(function (d) {
      if (/^\d+$/.test(searchedtext)) {
        const itemsId = d.itmsNo.toString();
        return itemsId.includes(searchedtext)  || !searchedtext;
      } else {
        return d.applicationName.toLowerCase().includes(searchedtext) || !searchedtext;
      }
    });*/
  }
  selectedAppRow(item, selectionCrateria, fromAppList) {
    if (this.searchedContentText !== undefined) {
      this.searchedContentText.searchValue = '';
    }
    item.selectionOn = selectionCrateria;
    this.seachedValue = '';
    item.fromAppList = fromAppList;
    item.userAppData = this.appData;
    this.selectedApp.emit(item);
    this.selectedAppHeaderDetails = item;
    this.detailsNames = [];
    // this.detailsId = null;
    this.highlightedServiceRow = null;
    this.showSearchBox = '';
    this.lessOpacity = '';
  }
  enterText(item) {
    if (item.target.value.length >= 2) {
      this.showSearchBox = 'show-search-box'
      this.lessOpacity = 'dull'
      // this.otherThanSearchedApp = this.AllAppData;
      const val = item.target.value;
      const text = item.target.value.toLowerCase();
      let temp = [...this.appData].filter(function (d) {
        // if (/^\d+$/.test(text)) {
          return d.itmsNo.toLowerCase().includes(val) || !val;
          // let itemsId;
          // itemsId = d.itmsNo.toString();
          // return itemsId.indexOf(val) !== -1 || !val;
        // }
      });
      const appNameTemp = [...this.appData].filter(function (d) {
        // if (/^\d+$/.test(text)) {
          return d.applicationName.toLowerCase().includes(val) || !val;
          // let itemsId;
          // itemsId = d.itmsNo.toString();
          // return itemsId.indexOf(val) !== -1 || !val;
        // }
      });
      temp = temp.concat(appNameTemp);
      let allData = [...this.AllAppData].filter(function (d) {
        // if (/^\d+$/.test(text)) {
          return d.itmsNo.toLowerCase().includes(val) || !val;
          // let itemsId;
          // itemsId = d.itmsNo.toString();
          // return itemsId.indexOf(val) !== -1 || !val;
        // }
      });
      const allDataAppNameTemp = [...this.AllAppData].filter(function (d) {
        // if (/^\d+$/.test(text)) {
          return d.applicationName.toLowerCase().includes(val) || !val;
          // let itemsId;
          // itemsId = d.itmsNo.toString();
          // return itemsId.indexOf(val) !== -1 || !val;
        // }
      });
      allData = allData.concat(allDataAppNameTemp);
      this.searchedData = temp;
      this.otherData(temp, text, allData);
    } else {
      this.showSearchBox = '';
      this.lessOpacity = '';
    }
    // this.seachedValue = null;
    // this.searchedText.emit(item);
  }
  toggleFilter() {
    this.filterIsActive = !this.filterIsActive;
  }
  dataLoadingStarted(): void {
    this.isDataLoading = true;
  }
  dataLoadingCompleted(): void {
    this.isDataLoading = false;
  }
  filterSearch(searchText) {
    if (searchText.length >= 1) {
      this.regionFilterText = searchText
      const temp = _.cloneDeep(this.reservedRigion).filter(function (d) {
        if (d.region != null) {
          return d.region.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 || !searchText.toLocaleLowerCase();
        }
      });
      this.AllRegions = temp;
    } else {
      if (searchText === '') {
        this.AllRegions = _.cloneDeep(this.reservedRigion);
      }
    }
    let checkRegionTrue = [];
    checkRegionTrue = _.remove(_.cloneDeep(this.AllRegions), element => {
      return (element.selected === true);
    })
    this.selectedRegionCount = checkRegionTrue.length;
  }

  filterSearchSkill(searchText) {
    if (this.checkFlag) {
      this.reservedSkill = _.cloneDeep(this.allSkill);
    }
    // const filterSelectedSkill = _.remove(_.cloneDeep(reservedSkill), data => {
    //   return (data.selected === true)
    // });
    if (searchText.length >= 1) {
      this.checkFlag = false;
      const temp = _.cloneDeep(this.reservedSkill).filter(function (d) {
        if (d.name != null) {
          return d.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 || !searchText.toLocaleLowerCase();
        }
      });
      this.allSkill = [...temp];
      this.selectedSkillsCount = [...temp].length;
    } else {
      this.allSkill = _.cloneDeep(this.reservedSkill);
    }
    let checkSkillTrue = [];
    checkSkillTrue = _.remove(_.cloneDeep(this.allSkill), element => {
      return (element.selected === true);
    })
    this.selectedSkillsCount = checkSkillTrue.length;
  }

  filterSearchService(searchText) {
    if (searchText.length >= 1) {
      const temp = _.cloneDeep(this.reservedService).filter(function (d) {
        if (d.name != null) {
          return d.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 || !searchText.toLocaleLowerCase();
        }
      });
      this.allServices = temp;
    } else {
      if (searchText === '') {
        this.allServices = _.cloneDeep(this.reservedService);
      }
    }
    let checkServiceTrue = [];
    checkServiceTrue = _.remove(_.cloneDeep(this.allServices), element => {
      return (element.selected === true);
    })
    this.selectedServicesCount = checkServiceTrue.length;
  }

  unselectedAllFilter(data, options) {
    if (options === 'regions') {
      const selecters = this.AllRegions.map(obj =>
        obj.selected = false
      );
      this.onRegionSelection(this.AllRegions);
      this.selectedRegionCount = 0;
    } else if (options === 'skill') {
      const selecters = this.allSkill.map(obj =>
        obj.selected = false
      );
      this.onSkillSelection(this.allSkill);
      this.selectedSkillsCount = 0;
    } else if (options === 'service') {
      const selecters = this.allServices.map(obj =>
        obj.selected = false
      );
      this.onServiceSelection(this.allServices);
      this.selectedServicesCount = 0;
    }
  }
  selectedAllFilters(data, options) {
    if (options === 'regions') {
      const selecters = this.AllRegions.map(obj =>
        obj.selected = true
      );
      this.onRegionSelection(this.AllRegions);
      this.selectedRegionCount = this.AllRegions.length;
    } else if (options === 'skill') {
      const selecters = this.allSkill.map(obj =>
        obj.selected = true
      );
      this.onSkillSelection(this.allSkill);
      this.selectedSkillsCount = this.allSkill.length;
    } else if (options === 'service') {
      const selecters = this.allServices.map(obj =>
        obj.selected = true
      );
      this.onServiceSelection(this.allServices);
      this.selectedServicesCount = this.allServices.length;
    }
  }
}
