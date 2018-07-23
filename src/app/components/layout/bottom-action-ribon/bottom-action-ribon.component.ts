import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var _: any;
@Component({
  selector: 'app-bottom-action-ribon',
  templateUrl: './bottom-action-ribon.component.html',
  styleUrls: ['./bottom-action-ribon.component.scss']
})
export class BottomActionRibonComponent implements OnInit {
  @Input()
  commitStatus: boolean;
  @Input()
  showActionBtn: boolean;
  @Input()
  showSaveRibon: boolean;
  @Input()
  disableEdit: boolean;
  @Input()
  disableDelete: boolean;
  @Input()
  disableApprove: boolean;
  @Input()
  removeEditAllBtn: boolean;
  @Input()
  disableUnapprove: boolean;
  @Input()
  disableRejected: boolean;
  @Input()
  disableCommit: boolean;
  @Input()
  disableSave: boolean;
  @Input()
  showDeleteBtn: boolean;
  @Input()
  classToMakeInCenter: string;
  @Input()
  disableClearVolume: boolean;
  @Input()
  disableApproveOnly: boolean;
  @Input()
  removeClearVolumeBtn: boolean;
  @Output()
  clearVolumeAll = new EventEmitter();
  @Output()
  clearAll = new EventEmitter();
  @Output()
  editAll = new EventEmitter();
  @Output()
  deleteAll = new EventEmitter();
  @Output()
  approveAll = new EventEmitter();
  @Output()
  unapproveAll = new EventEmitter();
  @Output()
  rejectAll = new EventEmitter();
  @Output()
  saveAllSelected = new EventEmitter();
  @Output()
  commitAll = new EventEmitter();
  actionPermission;
  isAdmin : boolean;

  constructor() {
    this.showActionBtn = false;
    this.disableEdit = false;
    this.disableDelete = false;
    this.disableApprove = false;
    this.disableUnapprove = false;
    this.disableRejected = false;
    this.disableCommit = false;
    this.removeEditAllBtn = false;
    this.showDeleteBtn = true;
    this.clearVolumeAll = new EventEmitter();
    // this.disableClearVolume = false;
    this.removeClearVolumeBtn = false;
    const authPermission = JSON.parse(localStorage.getItem('FORD-ORB2.autorisationFor'));
    this.actionPermission = JSON.parse(authPermission);
    this.isAdmin = false;
    this.isAdminAccess(this.actionPermission);
   
  }

  ngOnInit() {
  }
  clearVolumeAllData(item) {
    this.clearVolumeAll.emit(item);
  }
  clearAllData(item) {
    this.clearAll.emit(item);
  }
  editAllData(item) {
    this.editAll.emit(item);
  }
  deleteAllData(item) {
    this.deleteAll.emit(item);
  }
  approveAllData(item) {
    this.approveAll.emit(item);
  }
  unapproveAllData(item) {
    this.unapproveAll.emit(item);
  }
  rejectAllData(item) {
    this.rejectAll.emit(item);
  }
  commitAllData(item) {
    this.commitAll.emit(item);
  }
  saveEdit(item) {
    this.saveAllSelected.emit(item);
  }
  isAdminAccess(actionPermission) {
    _.forEach(actionPermission, (element) => {
      if (element.name === 'Admin') {
        this.isAdmin = true;
        return false;
      }
    });
  }
}
