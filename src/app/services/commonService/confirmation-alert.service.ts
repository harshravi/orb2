import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { ToasterService } from 'angular2-toaster';
@Injectable() export class ConfermationAlertService {
    private subject = new Subject<any>();
    constructor(private _toasterService: ToasterService) { }
    confirmThis(message: string, subMessage: string, siFn: () => void, noFn: () => void) {
        this.setConfirmation(message, subMessage, siFn, noFn);
    }
    setConfirmation(message: string, subMessage: string, siFn: () => void, noFn: () => void) {
        const that = this;
        this.subject.next({
            type: 'confirm',
            text: message,
            subText: subMessage,
            siFn:
            function () {
                that.subject.next(); // this will close the modal
                siFn();
            },
            noFn: function () {
                that.subject.next();
                noFn();
            }
        });

    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    callToasterMsg(type: string, title: string) {
        const toast = {
            type: type,
            title: title,
        };
        this._toasterService.pop(toast);
    }
}
