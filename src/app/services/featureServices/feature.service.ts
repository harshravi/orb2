import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FEATURE_CONSTANT } from '../../constants/url-constants'
import { HeadersService } from '../../constants/url-constants';
import { environment } from '../../../environments/environment';
import { HttpInterceptor } from './../../config/HTTP';
import { CommonUtil, IHttpServiceResponse } from '../../utils/common.util';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoadingBarService } from './../../components/core/loading-bar';
import { saveAs } from 'file-saver/FileSaver';
// import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import { Router } from '@angular/router';

// import { LocalStorageService } from 'angular-2-local-storage';
// import 'rxjs/add/operator/map';

// import { environment } from '../../../environments/environment';
// import { AUTH_CONSTANT } from '../../constants/url-constants';
// import { HttpInterceptor } from './../../config/HTTP';
// import { HeadersService } from '../../constants/url-constants';

// import { LoadingBarService } from './../../../components/core/loading-bar';

@Injectable()
export class FeatureService {
    options: any;
    getParticipantListHttp: IHttpServiceResponse<any>;
    constructor(private _storage: LocalStorageService, private _loadingBarService: LoadingBarService,
        private _http: HttpInterceptor, private _headers: HeadersService) {
        this.options = this._headers.getHeaders();

        this.getParticipantListHttp = CommonUtil.httpService(_http, _loadingBarService);
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

    // service to get eventlog data in the table
    getUsageFIlterTabular(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_FILTER_USAGE_DETAILS, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    //
    // service to get eventlog data in the table
    addNewApplication(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_NEW_APPLICATION, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    // service to get Lumpsum data in the table
    getAlllumpsums(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ALL_LUMPSUMS, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    // service to get Lumpsum data in the table
    AddNewlumpsums(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_LUMPSUMS, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    // service to update Lumpsum data in the table
    updateLumpSums(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.put(environment.URL + FEATURE_CONSTANT.UPDATE_LUMPSUMS, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    // service to add service to volume page
    addService(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_SERVICE, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    // service to add service to volume page
    addServiceLegalEntity(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_LEGALENTITY, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    // service to add more volume
    // addVolumeDetails(appRequest: Object){
    //     const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_VOLUME, appRequest, this.options)
    //     // .map(res => res)
    //     .toPromise()
    //     .then(data => {
    //         // this._loadingBarService.complete();
    //         return data;
    //     });
    // return result;
    // }
    // service to get volume details
    // getVolumeDetails(appRequest: Object) {
    //     // this._loadingBarService.start();
    //     const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_VOLUME_DETAILS, appRequest, this.options)
    //         .map(res => res.json())
    //         .toPromise()
    //         .then(data => {
    //             // this._loadingBarService.complete();
    //             return data;
    //         });
    //     return result;
    // }

    // service to add service to volume page
    addUsage(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_USAGE, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    getDashboardDetails(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_DASHBOARD_DETAILS, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    getAppliationUsageDetails(appRequest: Object) {
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
    getAppliationServicesDetails(appRequest: Object) {
        this._loadingBarService.start();
        const url = environment.URL + FEATURE_CONSTANT.GET_APPLICATION_SERVICES_DETAILS;

        this.getParticipantListHttp.call({ callType: 'post', url: url, data: appRequest, options: this.options });
        return this.getParticipantListHttp.httpResponse$;

        // return this._http.post(environment.URL + FEATURE_CONSTANT.GET_APPLICATION_SERVICES_DETAILS, appRequest, this.options)
        //     .subscribe(data => {
        //         // this._loadingBarService.complete();
        //         return data;
        //     });
    }
    getOpCostVolumeDetails(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_OP_COST_VOLUME_DETAILS, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    deleteGroup(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.DELETE_GROUP, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getApprovalDetails(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_APPROVAL_DETAILS, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    approvalDownload(response: Response) {
    const result = this._http.get(environment.URL + FEATURE_CONSTANT.APPROVAL_DOWNLOAD, response)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
            return result;
    }

    // approvalDownload (id): Observable<Blob> {
    //     // const options = new RequestOptions({responseType: ResponseContentType.Blob });
    //     const result =  this._http.get(environment.URL + FEATURE_CONSTANT.APPROVAL_DOWNLOAD, this.options)
    //         .map(res => res.blob())
    //         // .toPromise()
    //         // .then(data => {
    //         // });
    // }

    getAppliationTotal(appRequest: Object) {
        this._loadingBarService.start();
        const url = environment.URL + FEATURE_CONSTANT.GET_APPLICATION_TOTAL;

        this.getParticipantListHttp.call({ callType: 'post', url: url, data: appRequest, options: this.options });
        return this.getParticipantListHttp.httpResponse$;
    }
    createGroup(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.CREATE_GROUP, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    updateGroup(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.UPDATE_GROUP, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    addVolumeForOpcost(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.ADD_VOLUME_OPCOST, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    };
    addSpreadVolume(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.SPREAD_VOLUME, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    };
    deleteUser(appRequest: Array<Object>) {
        // this._loadingBarService.start();
        const result = this._http.put(environment.URL + FEATURE_CONSTANT.DELETE_USER, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    // edit user in usage screen
    updateUser(appRequest: Array<Object>) {
        // this._loadingBarService.start();
        const result = this._http.put(environment.URL + FEATURE_CONSTANT.UPDATE_USER, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    // edit volume in volume opcost screen
    updateVolumeOpcost(appRequest: Array<Object>) {
        // this._loadingBarService.start();
        const result = this._http.put(environment.URL + FEATURE_CONSTANT.UPDATE_VOLUME_OPCOST, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    updateVolumePhysical(appRequest: Array<Object>) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.UPDATE_PHYSICAL_TABLE, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    saveApprovals(appRequest: Array<Object>) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.APPROVAL_SAVE, appRequest, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    // service to get eventlog data in the table
    getLigialIntityModified(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GET_LIGAL_INTITY, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    // service to get eventlog data in the table
    getLegalEntity() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_LEGAL_ENTITY_NEW, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    // service to get eventlog data in the table
    getITMSDetails() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_ITMMS_APPLICATION_DETAILS, this.options)
            .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getRegionList() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_RIGIONS, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getLegalEntityList() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_LEGAL_ENTITYTIES, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getPurchaseOrderList() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_PURCHASE_ORDERS, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    getChangeRegionList() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.CHANGE_REGIONS, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    };
    getSkillList() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_SKILL_TEAMS, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    getFilterStatusData() {
        // this._loadingBarService.start();
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_ALL_STATUS, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }
    getAllService() {
        const result = this._http.get(environment.URL + FEATURE_CONSTANT.GET_ALL_SERVICES, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getAllSkillTeam(appRequest: Object) {
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GETVOLUME_PHYSICAL_SKILLTEAM, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getServiceLigialIntity(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GETVOLUME_PHYSICAL_LEGALENTITY, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    getAllServiceCatalog(appRequest: Object) {
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GETVOLUME_PHYSICAL_SERVICECATALOG, appRequest, this.options)
            .map(res => res.json())
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

    addVolumePhysicalService(appRequest: Object) {
        // this._loadingBarService.start();
        const result = this._http.post(environment.URL + FEATURE_CONSTANT.GETVOLUME_PHYSICAL_ADDSERVICE, appRequest, this.options)
            // .map(res => res)
            .toPromise()
            .then(data => {
                // this._loadingBarService.complete();
                return data;
            });
        return result;
    }

}
