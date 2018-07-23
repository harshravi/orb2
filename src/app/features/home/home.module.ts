import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



/** Module imported for breadcrumb  */
// import { BreadcrumbModule } from 'primeng/primeng';

import { CanActivateViaAuthGuard } from './../../config/guards/can-activate';
import { AuthenticationService } from '../../services/Authentication/authentication.service';


/** Modules imported for data grid */
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ToasterModule } from 'angular2-toaster';
// // import { DatePickerModule } from 'ng2-datepicker/ng2-datepicker';
// import { MomentModule } from 'angular2-moment';
/** Custom App based modules */
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppOnlyNumbersDirective } from '../../directive/only-number.directive';
import { TooltipDirective } from '../../directive/tooltip.directive';
// Import Service for the Loading bar
import { LoadingBarService } from './../../components/core/loading-bar';

/** All Modal Based Imports go here  */



/** Component's Modules to be imported */
import {
  ButtonModule,
  ArrowRibonModule,
  SearchTextBoxModule,
  HeaderModule,
  SideNavModule,
  NavDetailsMenuModule,
  ContentHeaderModule,
  DropDownModule,
  StaticTempModule,
  ProgressSpinnerModule,
  BottomActionRibonModule,
  ConfirmationAlertModule,
  MultiselectModule,
  LoadingBarModule
} from '../../components';

import { ApplicationsComponent } from './applications/applications.component';
import { AddUserModalComponent } from './global-modal/add-user-modal/add-user-modal.component';
import { VolumeComponent } from './volume-opcost/volume/volume.component';
import { VolumeDetailsComponent } from './volume-details/volume-details.component';
// import { AddVolumeDetailsModalComponent } from './global-modal/add-volumedetails-modal/add-volumedetails-modal.component';
import { AddServiceModalComponent } from './global-modal/add-service-modal/add-service-modal.component';
import { DeleteConfirmationModalComponent } from './global-modal/delete-confirmation-modal/delete-confirmation-modal.component';
import { UpdateVolumeOpcostModalComponent } from './global-modal/update-volume-opcost-modal/update-volume-opcost-modal.component';
import { VolumeOpcostComponent } from './volume-opcost/volume-opcost.component';
import { AddVolumeModalComponent } from './global-modal/add-volume-modal/add-volume-modal.component';
import { AddVolumeDetailsModalComponent } from './global-modal/add-volume-details-modal/add-volume-details-modal.component';
import { VolumePhysicalDetailsComponent } from './volume-physical-details/volume-physical-details.component';
import { EditPhysicalGroupModalComponent } from './global-modal/edit-physical-group-modal/edit-physical-group-modal.component';
import {
  AddLegalPhysicalEntityModalComponent
  } from './global-modal/add-legal-physical-entity-modal/add-legal-physical-entity-modal.component';
import { AddSpreadVolumeMaticModalComponent } from './global-modal/add-spread-volume-matic-modal/add-spread-volume-matic-modal.component';
import { NewapplicationsComponent } from './newapplications/newapplications.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { LumpSumsComponent } from './lump-sums/lump-sums.component';
import { AddLumpSumModalComponent } from './global-modal/add-lump-sum-modal/add-lump-sum-modal.component';
import { LumpSumActionModalComponent } from './global-modal/lump-sum-action-modal/lump-sum-action-modal.component';
import { ClearConfirmationModalComponent } from './global-modal/clear-component-modal/clear-confirmation-modal.component';
import { ApprovalConfirmationModalComponent } from './global-modal/approval-confirmation-modal/approval-confirmation-modal.component';



@NgModule({
  imports: [
    MultiselectModule,
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    ButtonModule,
    ToasterModule,
    ArrowRibonModule,
    SearchTextBoxModule,
    HeaderModule,
    SideNavModule,
    NavDetailsMenuModule,
    ContentHeaderModule,
    StaticTempModule,
    BottomActionRibonModule,
    ConfirmationAlertModule,
    ProgressSpinnerModule,
    DropDownModule,
    LoadingBarModule
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    ApplicationsComponent,
    AddUserModalComponent,
    AppOnlyNumbersDirective,
    TooltipDirective,
    VolumeComponent,
    VolumeDetailsComponent,
    AddServiceModalComponent,
    AddVolumeDetailsModalComponent,
    AddServiceModalComponent,
    DeleteConfirmationModalComponent,
    UpdateVolumeOpcostModalComponent,
    VolumeOpcostComponent,
    AddVolumeModalComponent,
    VolumePhysicalDetailsComponent,
    EditPhysicalGroupModalComponent,
    AddLegalPhysicalEntityModalComponent,
    AddSpreadVolumeMaticModalComponent,
    NewapplicationsComponent,
    ApprovalsComponent,
    LumpSumsComponent,
    AddLumpSumModalComponent,
    LumpSumActionModalComponent,
    ClearConfirmationModalComponent,
    ApprovalConfirmationModalComponent
  ],
  entryComponents: [
    AddUserModalComponent,
    AddServiceModalComponent,
    AddVolumeModalComponent,
    AddVolumeDetailsModalComponent,
    DeleteConfirmationModalComponent,
    UpdateVolumeOpcostModalComponent,
    EditPhysicalGroupModalComponent,
    AddLegalPhysicalEntityModalComponent,
    AddSpreadVolumeMaticModalComponent,
    AddLumpSumModalComponent,
    LumpSumActionModalComponent,
    ClearConfirmationModalComponent,
    ApprovalConfirmationModalComponent
  ],
  providers: [
    AuthenticationService,
    LoadingBarService
  ]
})
export class HomeModule { }

