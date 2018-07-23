import { Injectable } from '@angular/core';

export interface IUserDetail {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    roleType?: string;
    mobile_number: string;
    user_name: string;
    street_address?: string;
    email?: string;
    previleges: string[];
    designation?: string;
    city?: string;
    state?: string;
    postal_code?: string;
}

@Injectable()
export class UserDetail implements IUserDetail {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile_number: string;
    user_name: string;
    previleges: string[];

    constructor(private _userDetail: IUserDetail) {

        this.id = _userDetail.id;
        this.first_name = _userDetail.first_name;
        this.middle_name = _userDetail.middle_name;
        this.last_name = _userDetail.last_name;
        this.mobile_number = _userDetail.mobile_number;
        this.user_name = _userDetail.user_name;
        this.previleges = _userDetail.previleges;
    }

    getFullName(): string {
        if (this._userDetail.middle_name) {
            return this._userDetail.first_name + ' ' + this._userDetail.middle_name + ' ' + this._userDetail.last_name;
        } else {
            return this._userDetail.first_name + ' ' + this._userDetail.last_name;
        }
    }
}
