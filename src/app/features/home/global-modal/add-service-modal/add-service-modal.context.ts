import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { AddServiceModalComponent } from './add-service-modal.component';
export class AddServiceModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    addServiceDetails;
    addUserId;
    serviceStatus: string;
    edit = false;
    allServiceCatalogId: Array<object>;
    editableServiceCatalogIds: any;
    serviceOwner: boolean;
    adduserNo: any;
    appName: any;
    allocationMethodId: number;
}
