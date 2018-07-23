import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { AddLegalPhysicalEntityModalComponent } from './add-legal-physical-entity-modal.component';
export class AddLegalPhysicalEntityModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    addUserDetails;
    allLigialIntity;
    allSkills;
    addBtn;
    itmsId;
    itmsNo;
    appName;
    eventLogStatus: string;
    addAgain: boolean;
    serviceCatalogId: number;
    allLigalEntityWithoutFilter;
    volumeHeaderDetails: Array<object>;
    selectedYear: number;
    addVolumeHeader: Array<object>;
}
