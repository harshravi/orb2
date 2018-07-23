import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


/** Utility function to create a K:V from a list of strings */
export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}

export class CommonUtil {
    /** Limit decimals to 2 points */
    static limitDecimals(val: string): number {
        const value = parseFloat(val);

        if (value % 1 !== 0) {
            let  FinalValue;
            if (val.length  >  4) {
                FinalValue  =  Number(val).toFixed(2);
            }  else {
                FinalValue  =  Number(val);
            }
            return  FinalValue;

        } else {
            return value;
        }
    }

    static stripTime(date): IMoment {
        date = moment(date);
        date.hours(0);
        date.minutes(0);
        date.seconds(0);
        date.milliseconds(0);
        return date;
    }

    /** get color coding based on medication compliance */
    static getColorCodeForMedicationCompliacne(status: number): string {
        if (status <= 80) {
            return 'text-danger';
        } else if (status > 80 && status < 90) {
            return 'text-warning';
        } else if (status >= 90) {
            return 'text-navy';
        }
    }

    /** get color coding based on careplan compliance */
    static getColorCodeForCarePlanCompliacne(status: number): string {
        if (status === 2) {
            return 'text-danger';
        } else if (status === 1) {
            return 'text-warning';
        } else if (status === 0) {
            return 'text-navy';
        } else {
            return 'text-muted';
        }
    }

    static httpService<T>(_http, _loadingBarService): IHttpServiceResponse<T> {
        // httpRequest$ stream that allows us to push new requests
        const httpRequest$ = new Subject();

        // httpResponse$ stream that allows clients of the httpService
        // to handle our responses (fetch here can be replaced with whatever
        // http library you're using).
        const httpResponse$ = httpRequest$
            .switchMap((param: any) => {
                param.callType = param.callType || 'post';

                let result = null;
                if (param.callType === 'post') {
                    result = _http.post(param.url, param.data, param.options);
                } else if (param.callType === 'get') {
                    result = _http.get(param.url, param.options);
                }

                return result;
            }).share();

        httpResponse$.subscribe(() => _loadingBarService.complete(), () => _loadingBarService.complete());

        // Expose a single method get() that pushes a new
        // request onto the httpRequest stream. Expose the
        // httpResponse$ stream to handle responses.
        return <IHttpServiceResponse<T>>{
            call: (param) => httpRequest$.next(param),
            httpResponse$
        };
    }

    static isEscapingChar(e: KeyboardEvent) {
        const keyCode = (typeof e.which === 'number') ? e.which : e.keyCode;

        if ([46, 8, 9, 27, 13, 110, 190, 16].indexOf(keyCode) !== -1 ||
            // Allow: Ctrl+A
            (keyCode === 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (keyCode === 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+V
            (keyCode === 86 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (keyCode >= 35 && keyCode <= 39)) {
            // let it happen, don't do anything
            return true;
        }

        return false;
    }
}

export interface IHttpParam {
    url: string;
    data?: any;
    options: any;
    callType: string;
}
export interface IHttpServiceResponse<T> {
    call: (param: IHttpParam) => void;
    httpResponse$: Observable<T>;
}
