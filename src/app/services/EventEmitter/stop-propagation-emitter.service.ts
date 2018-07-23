import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class StopPropagationEmitterService {
    private _propagationStopped: Subject<number> = new Subject();

    public propagationStoppedObservable: Observable<number> = this._propagationStopped.asObservable();

    constructor() { }

    propagationStoppedEvent(propagationStoppedById: number) {
        this._propagationStopped.next(propagationStoppedById);
    }

}

window.stopPropagationEmitterService = new StopPropagationEmitterService();

// https://stackoverflow.com/questions/40089316/how-to-share-service-between-two-modules-ngmodule-in-angular2