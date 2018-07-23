import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { VolumeComponent } from './volume-opcost/volume/volume.component';
import { VolumeDetailsComponent } from './volume-details/volume-details.component';
import { VolumeOpcostComponent } from './volume-opcost/volume-opcost.component';
import { NewapplicationsComponent } from './newapplications/newapplications.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { LumpSumsComponent } from './lump-sums/lump-sums.component';

import { CanActivateViaAuthGuard } from './../../config/guards/can-activate';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            breadcrumb: 'Home'
        },
        // canActivate: [
        //     CanActivateViaAuthGuard
        // ],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    breadcrumb: 'Dashboard',
                    pageTitle: 'Dashboard',
                    routeName: 'dashboard'
                }
            }, {
                path: 'volumedetails',
                component: VolumeDetailsComponent,
                data: {
                    breadcrumb: 'Volumedetails',
                    pageTitle: 'volumedetails',
                }

            }, {
                path: 'addnewapplication',
                component: NewapplicationsComponent,
                data: {
                    breadcrumb: 'addnewapplication',
                    pageTitle: 'addnewapplication',
                }

            }, {
                path: 'approvals',
                component: ApprovalsComponent,
                data: {
                    breadcrumb: 'approvals',
                    pageTitle: 'approvals',
                }

            }, {
                path: 'lumpsum',
                component: LumpSumsComponent,
                data: {
                    breadcrumb: 'lumpsum',
                    pageTitle: 'lumpsum',
                    routeName: 'lumpsum'
                }
            }, {
                path: 'application',
                component: ApplicationsComponent,
                data: {
                    breadcrumb: 'Application',
                    pageTitle: 'application',
                    routeName: 'application'
                }
            }, {
                path: 'volume',
                component: VolumeOpcostComponent,
                data: {
                    breadcrumb: 'Volume',
                    pageTitle: 'volume'
                },
                children: [
                    {
                        path: '',
                        component: VolumeComponent,
                    }, {
                        path: 'volume',
                        component: VolumeDetailsComponent,
                        data: {
                            breadcrumb: 'Volume',
                            pageTitle: 'volume',
                        }
                    }, {
                        path: 'volumedetails',
                        component: VolumeDetailsComponent,
                        data: {
                            breadcrumb: 'Volumedetails',
                            pageTitle: 'volumedetails',
                        }
                    }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [CanActivateViaAuthGuard]
})
export class HomeRoutingModule { }
