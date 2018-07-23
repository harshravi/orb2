import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { ApprovalConfirmationModalComponent } from './approval-confirmation-modal.component';
export class ApprovalConfirmationModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    approvalDetails;
    itmsId;
    eventLogStatus: string;
    actionBtnText: string;
    heading: string;
    action: string;
    sectionName: string;
    physicalUpdate: string;
}
