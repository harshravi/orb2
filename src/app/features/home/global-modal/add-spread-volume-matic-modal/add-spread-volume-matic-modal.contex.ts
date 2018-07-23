import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { AddSpreadVolumeMaticModalComponent } from './add-spread-volume-matic-modal.component';
export class AddSpreadVolumeMaticModalContext extends BSModalContext {
    addVolumeHeader;
    addVolumeDetails;
    allStatusData;
    allRegions;
    allPurchaseOrderList;
    itmsId;
    selectedYear: number;
    eventLogStatus: string;
    actionBtnText: string;
    bundleName: string;
    heading: string;
    action: string;
    serviceCatalogId;
    approve;
}
