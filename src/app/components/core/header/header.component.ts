import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName;
  constructor(private _storage: LocalStorageService) {
    this.userName = this._storage.get('cdsId');
  }

  ngOnInit() {
  }

}
