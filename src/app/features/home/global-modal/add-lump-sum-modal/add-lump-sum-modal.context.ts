import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { AddLumpSumModalComponent } from './add-lump-sum-modal.component';
export class AddLumpSumModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    addUserDetails;
    allLigialIntity;
    allSkills;
    addBtn;
    itmsId;
    eventLogStatus: string;
    addAgain: boolean;
    serviceCatalogId: number;
    allLigalEntityWithoutFilter;
    selectedRowEdit: object;
    allyears;
    highlightYear: number;
    edit: boolean;
    selectedYear
    allRegionsData: Array<object>;
    AllServices: Array<object>;
    allSkill: Array<object>;
    allLegal: Array<object>;
    heading: string;
    imAdmin: boolean;
    approveAccess: boolean;
}
