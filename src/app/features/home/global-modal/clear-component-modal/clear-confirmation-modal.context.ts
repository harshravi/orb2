import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { ClearConfirmationModalComponent } from './clear-confirmation-modal.component';
export class ClearConfirmationModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    deleteServiceDetails;
    itmsId;
    eventLogStatus: string;
    description: string;
    heading: string;
    action: string;
    clearVolumeList;
    content;
}
