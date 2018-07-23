import {BrowserXhr, } from '@angular/http';
import {Injectable} from '@angular/core'

@Injectable()
/**
 * @author AhsanAyaz
 * We're extending the BrowserXhr to support CORS
 */
export class CustExtBrowserXhr extends BrowserXhr {
  constructor() {
      super();
  }
  build(): any {
    const xhr = super.build();
    xhr.withCredentials = true;             // this is all the magic we need for now
    return <any>(xhr);
  }
}
