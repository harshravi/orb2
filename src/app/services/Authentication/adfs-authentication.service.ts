import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { AUTH_CONSTANT } from '../../constants/url-constants';
import { HttpInterceptor } from './../../config/HTTP';
import { HeadersService } from '../../constants/url-constants';



@Injectable()
export class AdfsAuthenticationService {

  constructor(
    private _http: HttpInterceptor,
    private _storage: LocalStorageService,
    private _router: Router,
    private _headers: HeadersService,
  ) {

  }

  /** Login the User into the System */
  login() {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('resource', environment.RESOURCE);
    params.set('client_id', environment.CLIENTID);
    params.set('redirect_uri', environment.RESOURCE);
    const options = new RequestOptions({
      params: params,
    });
    console.log('Calling FORD ADFS...')
    return this._http.get(environment.ADFSURL)
      .toPromise()
      .then(data => {
      }, (res_error) => {
        const error = res_error.json();
        // this._storage.set('IS_LOGGED_IN', false);
        return error;
      });
  }

  authenticate(token) {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
   
    console.log('Calling FORD ADFS token...')
    let url = environment.ADFSURL+'?grant_type=authorization_code&code='+token+'&client_id='+environment.CLIENTID+'&resource='+environment.RESOURCE+'&redirect_uri='+environment.RESOURCE;
    console.log('URL:'+url);
    return this._http.post(url, options)
      .toPromise()
      .then(data => {
      }, (res_error) => {
        const error = res_error.json();
        // this._storage.set('IS_LOGGED_IN', false);
        return error;
      });
  }
}
