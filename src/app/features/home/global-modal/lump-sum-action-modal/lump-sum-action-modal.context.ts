import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { LumpSumActionModalComponent } from './lump-sum-action-modal.component';
export class LumpSumActionModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    editGroupStagingIdCollection;
    groupName: string;
    cdsId: number;
    year: number;
    yearCollection: Array<object>;
    action;
    itmsId;
    heading;
    actionBtnText;
    deleteServiceDetails
}
