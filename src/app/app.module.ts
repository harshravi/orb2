import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpInterceptor } from './config/HTTP';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
// import { HomeComponent } from './features/home/home.component';
// import { ButtonComponent } from './components/core/button/button.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { HomeModule } from './features/home/home.module';
import { HeadersService } from './constants/url-constants';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { ConfirmationAlertComponent } from './components/core/confirmation-alert/confirmation-alert.component';
// import { BottomActionRibonComponent } from './components/layout/bottom-action-ribon/bottom-action-ribon.component';
// import { StaticTempComponent } from './components/layout/static-temp/static-temp.component';
// import { ContentHeaderComponent } from './components/layout/content-header/content-header.component';
// import { HeaderComponent } from './components/core/header/header.component';
// import { SideNavComponent } from './components/core/side-nav/side-nav.component';
// import { NavDetailsMenuComponent } from './components/core/nav-details-menu/nav-details-menu.component';
// import { SearchTextBoxComponent } from './components/core/search-text-box/search-text-box.component';
// import { ArrowRibonComponent } from './components/core/arrow-ribon/arrow-ribon.component';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpInterceptor(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    // ConfirmationAlertComponent,
    // BottomActionRibonComponent,
    // StaticTempComponent
    // HeaderComponent,
    // SideNavComponent,
    // NavDetailsMenuComponent,
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'FORD-ORB2',
      storageType: 'localStorage'
    }),
    BrowserModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    // LocalStorageService,\
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    HeadersService,
    {
      provide: HttpInterceptor,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
