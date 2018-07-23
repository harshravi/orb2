import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { UpdateVolumeOpcostModalComponent } from './update-volume-opcost-modal.component';
export class UpdateVolumeOpcostModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    deleteServiceDetails;
    itmsId;
    allRegions;
    bundleName;
    groupNameText;
    physicalUpdate: boolean;
    eventLogStatus: string;
    actionBtnText: string;
    heading: string;
    action: string;
    selectedYear: number;
    budgetDetailId: number;
}
