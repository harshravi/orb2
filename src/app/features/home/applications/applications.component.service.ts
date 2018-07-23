import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FEATURE_CONSTANT } from '../../../constants/url-constants'
import { HeadersService } from '../../../constants/url-constants';
import { environment } from '../../../../environments/environment';
import { HttpInterceptor } from './../../../config/HTTP';


// import { LoadingBarService } from './../../../components/core/loading-bar';

@Injectable()
export class ApplicationService {
    options: any;
    constructor(private _headers: HeadersService, private _http: HttpInterceptor) {
        this.options = this._headers.getHeaders()
    }
    // service to get eventlog data in the table
    getAppliationTabular(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_APPLICATION, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    getAppliationDetails(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_APPLICATION_USAGE_DETAILS, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

}
