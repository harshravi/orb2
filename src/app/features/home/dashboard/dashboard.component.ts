import { Component, OnInit } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AddUserModalComponent, AddUserModalContext } from '../../home/global-modal';
import { FeatureService } from '../../../../app/services/featureServices/feature.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoadingBarService } from './../../../components/core/loading-bar';
import { ConfermationAlertService } from '../../../services/commonService';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [Modal, Overlay, FeatureService, LoadingBarService, ConfermationAlertService, AuthenticationService]
})
export class DashboardComponent implements OnInit {
  text: string;
  showNavDetails: boolean;
  dashboardDeatils: any;
  isDataLoading: boolean;
  constructor(private _modal: Modal, private _storage: LocalStorageService, private _auth: AuthenticationService,
    private _confermationAlertService: ConfermationAlertService, private _featureService: FeatureService) {
    this.text = 'hello';
    this.showNavDetails = false;
  }

  ngOnInit() {
    this.updateDashboard();
    this.authDetails();
  }
  viewModal() {
    this._modal.open(AddUserModalComponent,
      overlayConfigFactory({
        addUserDetails: 'UserDetails', addUserId: '123'
      }, AddUserModalContext));
  }
  authDetails() {
    const tableData = {
      'cdsId': this._storage.get('cdsId')
    }
    this._auth.login(tableData).then(data => {
      console.log(data);
    });
  }
  updateDashboard() {
    this.dataLoadingStarted();
    const tableData = {
      'cdsId': this._storage.get('cdsId')
    }
    this._featureService.getDashboardDetails(tableData).then(data => {
      this.dataLoadingCompleted();
      this.dashboardDeatils = data
    }, error => {
      this._confermationAlertService.callToasterMsg('error', 'The application has encountered an unknown error. Please contact support.');
      console.log(error)
      this.dataLoadingCompleted();
    });
  }
  dataLoadingStarted(): void {
    this.isDataLoading = true;
  }
  dataLoadingCompleted(): void {
    this.isDataLoading = false;
  }

}
