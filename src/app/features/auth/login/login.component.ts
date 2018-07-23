import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../services';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isDataLoading: boolean;
  loginFailed: any;
  constructor(private _fb: FormBuilder, private _auth: AuthenticationService,
    private _storage: LocalStorageService,
    private location: Location, private _router: Router) {
      this.isDataLoading = false;
     }

  ngOnInit() {
    this.loginForm = this._fb.group({
      'cdsId': ['', []],
      'password': ['', []]
    });
  }
  onSubmit() {
    // this.location.go('home/dashboard');
    // this._router.navigate(['home/dashboard']);
    if (this.loginForm.value.password === 'Fordorb2') {
      this.isDataLoading = true;
      delete this.loginForm.value.password;
      this._auth.login(this.loginForm.value).then(data => {
        if (data.httpStatus === 'FORBIDDEN') {
          this.loginFailed = data.errorMessage;
          this.isDataLoading = false;
        this._router.navigate(['./']);
        }else {
          console.log('Inside pass');
          this.isDataLoading = false;
          this._router.navigate(['home/dashboard']);
          this._storage.set('cdsId', this.loginForm.value.cdsId);
        }
      }, error => {
        console.log(error)
        // this.dataLoadingCompleted();
      });
    }
  }
}
