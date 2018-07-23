import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
declare var $: any;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  EditTrue: boolean;
  ribbonAlert: boolean;
  showRibon: boolean;
  pathLocation: any;
  @Input()
  hightlightNav;
  constructor(private _router: Router, private _storage: LocalStorageService) {
  this.EditTrue = false;
  this.showRibon = false;
  this.ribbonAlert = JSON.parse(window.localStorage.getItem('showSaveRibon'));
  }
  ngOnInit() {
    $(document).ready(function () {
      $('.cd-sub-side-nav').mouseenter(function () {
        $('.role-specific-function').addClass('hightlightNav');
      });
      $('.cd-sub-side-nav').mouseleave(function () {
        $('.role-specific-function').removeClass('hightlightNav');
      });
    });
  }
  stay() {
    this.EditTrue = false;
    this.showRibon = false;
  }
  leave() {
    localStorage.setItem('showSaveRibon', 'false');
    this.changeRoutingLocation(this.pathLocation);
  }
  changeRoutingLocation(location) {
    this.ribbonAlert = JSON.parse(window.localStorage.getItem('showSaveRibon'));
    this.pathLocation = location;
    if (this.ribbonAlert === true) {
      this.EditTrue = true;
      this.showRibon = true;
    } else {
      if (this._router.routerState.snapshot.url === location) {
        localStorage.setItem('showSaveRibon', 'true');
        this.EditTrue = false;
        this.showRibon = false;
      } else {
        this._router.navigate([location]);
      }
    }
  }

}
