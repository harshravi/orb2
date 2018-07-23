import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { AddVolumeDetailsModalComponent } from './add-volume-details-modal.component';
export class AddVolumeDetailsModalContext extends BSModalContext {
    addVolumeHeader;
    addVolumeDetails;
    allStatusData;
    addVolumeStatusData;
    allRegions;
    allPurchaseOrderList;
    approve: boolean;
    adminUser: boolean;
    selectedYear: number;
    selectedRow: number;
    eventLogStatus: string;
    actionBtnText: string;
    heading: string;
    action: string;
    budgetDetail;
    budgetDetailId: number;
    itmsId: number;
    itmsNo: any;
    appName: any;
    selectedServiceCatalogId: number
}


