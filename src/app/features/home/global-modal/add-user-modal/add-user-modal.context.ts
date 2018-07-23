import { BSModalContext, BootstrapModalSize } from 'angular2-modal/plugins/bootstrap';
import { AddUserModalComponent } from './add-user-modal.component';
export class AddUserModalContext extends BSModalContext {
    size: BootstrapModalSize = 'lg';
    addUserDetails;
    allLigialIntity;
    addBtn;
    addUserId;
    eventLogStatus: string;
    addAgain: boolean;
    legalEntity;
    allLigalEntityWithoutFilter;
}


