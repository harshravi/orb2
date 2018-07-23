import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'environments/environment';

@Injectable()
export class HeadersService {

    constructor(private _storage: LocalStorageService) { }
    /* Get Headers */
    getloginHeaders() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });
        return options;
    }

    getHeaders(): RequestOptions {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Token': this._storage.get('accessToken'),
            'CDSID': this._storage.get('cdsId'),
            'tokenToValidate': 'NO'
            // ,'X-CSRF-TOKEN': this._storage.get('xcsrftoken')
        });
        const options = new RequestOptions({ headers: headers, withCredentials: true });
        options.headers.append('method', 'POST');
        return options;
    }
}
