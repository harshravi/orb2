import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export enum LoadingBarEventType {
  PROGRESS,
  HEIGHT,
  COLOR,
  VISIBLE
}

export class LoadingBarEvent {
  constructor(public type: LoadingBarEventType, public value: any) { }
}

export function isPresent(obj: any) {
  return obj !== undefined && obj !== null;
}

@Injectable()
export class LoadingBarService {

  private _progress = 0;
  private _height = '2px';
  private _color = 'firebrick';
  private _visible = true;

  private _intervalCounterId: any = 0;
  public interval = 500; // in milliseconds

  private eventSource: Subject<LoadingBarEvent> = new Subject<LoadingBarEvent>();
  public events: Observable<LoadingBarEvent> = this.eventSource.asObservable();

  constructor() { }

  set progress(value: number) {
    if (isPresent(value)) {
      if (value > 0) {
        this.visible = true;
      }
      this._progress = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
    }
  }

  get progress(): number {
    return this._progress;
  }


  set height(value: string) {
    if (isPresent(value)) {
      this._height = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.HEIGHT, this._height));
    }
  }

  get height(): string {
    return this._height;
  }

  set color(value: string) {
    if (isPresent(value)) {
      this._color = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.COLOR, this._color));
    }
  }

  get color(): string {
    return this._color;
  }

  set visible(value: boolean) {
    if (isPresent(value)) {
      this._visible = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  private emitEvent(event: LoadingBarEvent) {
    if (this.eventSource) {
      // Push up a new event
      this.eventSource.next(event);
    }
  }


  start(onCompleted: Function = null) {
    // Stop current timer
    this.stop();
    // Make it visible for sure
    this.visible = true;
    // Run the timer with milliseconds iterval
    this._intervalCounterId = setInterval(() => {
      // Increment the progress and update view component
      this.progress++;
      // If the progress is 100% - call complete
      if (this.progress === 100) {
        this.complete();
      }
    }, this.interval);
  }

  stop() {
    if (this._intervalCounterId) {
      clearInterval(this._intervalCounterId);
      this._intervalCounterId = null;
    }
  }

  reset() {
    this.stop();
    this.progress = 0;
  }

  complete() {
    this.progress = 100;
    this.stop();
    setTimeout(() => {
      // Hide it away
      this.visible = false;
      setTimeout(() => {
        // Drop to 0
        this.progress = 0;
      }, 250);
    }, 250);
  }


}
