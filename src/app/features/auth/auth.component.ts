import { Component, OnInit, Inject } from '@angular/core';
import { AdfsAuthenticationService } from '../../services/Authentication/adfs-authentication.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Window } from 'selenium-webdriver';
import { environment } from 'environments/environment';
import { LoginComponent } from './login/login.component';
import { DOCUMENT } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AdfsAuthenticationService]
})
export class AuthComponent implements OnInit {
  token: String;
  cdsid: String;
  parameterMap: Array<string> = [];
  constructor(@Inject(DOCUMENT) private document: any, private _storage: LocalStorageService,private _adfsAuthenticationService: AdfsAuthenticationService, private location: Location, private _router: Router, private activatedRoute: ActivatedRoute) {
   
  }

  ngOnInit() {    
    if (environment.loginneeded) {
      this._router.navigateByUrl('/login');
    } else {
      let isTokenAlready = JSON.parse(window.localStorage.getItem('token'));
      
      if (isTokenAlready !== '' && isTokenAlready !== null) {
        this._router.navigate(['home/dashboard']);
      } else { 
            
        if (document.URL.includes("access_token")) {
          let callbackResponse = (document.URL).split('#')[2];
          let responseParameters = (callbackResponse).split('&');
          let parameterMap: Array<string> = [];
          for (let i = 0; i < responseParameters.length; i++) {
            parameterMap[responseParameters[i].split('=')[0]] = responseParameters[i].split('=')[1];
          }
          // decode base64 encoded tokens
          let accessToken = atob(parameterMap['access_token'].split('.')[1]);          
          this._storage.set('cdsId', JSON.parse(accessToken).user_name);
          this._storage.set('token', JSON.parse(accessToken));
          let clientId = JSON.parse(accessToken).user_name;
          this._router.navigate(['home/dashboard']);
        }else {
          this.document.location.href=environment.ADFSURL+'?response_type=token&client_id='+environment.CLIENTID+'&resource='+environment.RESOURCE+'&redirect_uri='+environment.REDIRECTURI;
        }

      }
    }
  }
}   