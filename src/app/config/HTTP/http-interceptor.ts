import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToasterService } from 'angular2-toaster';
import { CommonUtil} from '../../utils/common.util';

declare var _: any;

export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        // this.getParticipantListHttp = CommonUtil.callToasterMsgOnError();
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('access-contol-allow-origin', '*');
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if ((err.status === 401 || err.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');

                if (window.location.pathname !== '/' && err.status === 401) {
                    window.localStorage.clear();
                    window.localStorage.setItem('concurrentSession', 'true');
                    window.location.href = '/';
                }

                if (window.location.pathname !== '/' && err.status === 403 && JSON.parse(err._body).error_message === 'Access is denied') {
                    window.localStorage.clear();
                    window.localStorage.setItem('accessDenied', 'true');
                    window.location.href = '/';
                }

                if (window.location.pathname !== '/' && err.status === 403 && JSON.parse(err._body).error_message !== 'Access is denied') {
                    window.localStorage.clear();
                    window.localStorage.setItem('concurrentSession', 'true');
                    window.location.href = '/';
                }
            }
            // CommonUtil.callToasterMsgOnError();
            return Observable.throw(err);
        });

    }
}
