import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal.component';
export class DeleteConfirmationModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    deleteServiceDetails;
    itmsId;
    eventLogStatus: string;
    actionBtnText: string;
    heading: string;
    action: string;
}
