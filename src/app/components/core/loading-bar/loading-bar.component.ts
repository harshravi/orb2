import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadingBarService, LoadingBarEvent, LoadingBarEventType } from './loading-bar.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

export function isPresent(obj: any) {
    return obj !== undefined && obj !== null;
}

@Component({
    selector: 'app-loading-bar',
    templateUrl: './loading-bar.component.html',
    styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
    @Input() progress = '0';
    @Input() color = 'firebrick';
    @Input() height = '2px';
    _show: boolean;

    @Input('show')
    set setShow(value: boolean) {
        this._show = value;
        this.opacity = this._show ? '1' : '0';
    }

    get getShow() {
        return this._show;
    }

    public opacity: string;

    subScriptions: Subscription[] = [];

    constructor(public service: LoadingBarService, private _changeDetectorRef: ChangeDetectorRef) {
        this._show = true;

        this.subScriptions.push(this.service.events.subscribe((event: LoadingBarEvent) => {
            if (event.type === LoadingBarEventType.PROGRESS && isPresent(event.value)) {
                this.progress = event.value;
            } else if (event.type === LoadingBarEventType.COLOR) {
                this.color = event.value;
            } else if (event.type === LoadingBarEventType.HEIGHT) {
                this.height = event.value;
            } else if (event.type === LoadingBarEventType.VISIBLE) {
                this._show = event.value;
                this.opacity = this._show ? '1' : '0';
            }

            this._changeDetectorRef.detectChanges();

        }));
    }

    ngOnInit() {

    }

    unSubscribe() {
        _.forEach(this.subScriptions, (sub) => {
            if (sub) {
                sub.unsubscribe();
            }
        });
    }

    ngOnDestroy() {
        this.unSubscribe();
    }

}
