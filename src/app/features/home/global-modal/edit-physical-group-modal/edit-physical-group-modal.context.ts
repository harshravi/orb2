import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { EditPhysicalGroupModalComponent } from './edit-physical-group-modal.component';
export class EditPhysicalGroupModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    editGroupStagingIdCollection;
    stagigId;
    groupName: string;
    cdsId: number;
    year: number;
    yearCollection: Array<object>;
    itmsNo: string;
    serviceCatalogId: string;
    appName: string;
    disableDeleteGroup;
}
