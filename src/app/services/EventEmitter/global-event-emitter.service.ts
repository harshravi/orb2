import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class GlobalEventEmitterService {
  private _modalClosed: Subject<boolean> = new Subject();

  public modalClosedObservable: Observable<boolean> = this._modalClosed.asObservable();

  public _isDeleteClicked: Subject<boolean> = new Subject();

  public modalDeleteClickObservable: Observable<boolean> = this._isDeleteClicked.asObservable();

  private _screenResize: Subject<number> = new Subject();
  public screenSizeEvent: Observable<number> = this._screenResize.asObservable();

  private _isTaskOpen: Subject<boolean> = new Subject();
  public taskbarToggleObservable: Observable<boolean> = this._isTaskOpen.asObservable();

  private _isMedicationUpdateCalled: Subject<boolean> = new Subject();
  public updateMedicationList: Observable<boolean> = this._isMedicationUpdateCalled.asObservable();

  constructor() { }

  modalClosedEvent() {
    this._modalClosed.next(true);
  }

  modalDeleteClickEvent() {
    this._isDeleteClicked.next(true);
  }

  screenSizeResizedEvent(screenWidth: number) {
    this._screenResize.next(screenWidth);
  }

  taskPanelOpenEvent(isTaskOpen: boolean) {
    this._isTaskOpen.next(isTaskOpen);
  }

  updateMedicationListDetails() {
    this._isMedicationUpdateCalled.next(true);
  }

}
