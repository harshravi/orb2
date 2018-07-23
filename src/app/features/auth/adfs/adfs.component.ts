import { Component, OnInit } from '@angular/core';
import { AdfsAuthenticationService } from '../../../services/Authentication/adfs-authentication.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-adfs',
  templateUrl: './adfs.component.html',
  styleUrls: ['./adfs.component.scss'],
  providers: [AdfsAuthenticationService]
})
export class AdfsComponent implements OnInit {
  token: String;
  parameterMap: Array<string> = [];
  constructor(private route: ActivatedRoute, private _adfsAuthenticationService: AdfsAuthenticationService,
    private location: Location, private _router: Router, private activatedRoute: ActivatedRoute, private _storage: LocalStorageService,) {
   
  }

  ngOnInit() {
    
    let callbackResponse = (document.URL).split('#')[1];    
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

  }
}
