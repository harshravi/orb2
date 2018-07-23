import { Component, OnInit, ViewContainerRef, Input, ChangeDetectorRef } from '@angular/core';
// import { UserManagementService } from '../../services';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// import { LocalStorageService } from 'angular-2-local-storage';
// Breadcrumb services
// import { MenuItem } from 'primeng/primeng';
// import { BreadcrumbService } from '../../services';
// import { BreadcrumbRouteEventEmitterService } from '../../services/breadcrumb-route-service/breadcrumb-route.service';
// import { DateUtilityService } from '../../services';
// import { AppACLService, AclService } from '../../services/';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-full-width'
  });
  constructor(private location: Location) {

  localStorage.setItem('showSaveRibon', 'false');
   }

  ngOnInit() {
    // this.location.go('home/dashboard');
  }
}
