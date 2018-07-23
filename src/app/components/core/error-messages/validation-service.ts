import { ERROR_MESSAGES } from '../../../constants/other-constants';
import { Expressions } from '../../../constants/other-constants';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        return ERROR_MESSAGES[validatorName];
    }

    static isAlphabetNSpace(control) {

        if (!control || !control.value) {
            return null;
        }
        // Regex for only AlphaNumeric Character
        if (('' + control.value).match(Expressions.invalidName)) {
            return null;
        } else {
            return { 'invalidName': true };
        }
    }

    static clientName(control) {

        // validation for client required field
        if (control.value == null || control.value === '') {
            return { 'client_name': true };
        } else {
            return null;
        }
    }

    static clientNameisAlphabetNSpace(control) {
        if (!control || !control.value) {
            return null;
        }
        // client name alphabet validation
        if (('' + control.value).match(Expressions.client_name_onlyChar)) {
            return null;
        } else {
            return { 'client_name_onlyChar': true };
        }
    }

    static hospitalName(control) {

        // validation for hospital required field
        if (control.value == null || control.value === '') {
            return { 'hospital_group': true };
        } else {
            return null;
        }
    }

    static hospitalNameisAlphabetNSpace(control) {
        if (!control || !control.value) {
            return null;
        }

        // hospital name alphabet validation
        if (('' + control.value).match(Expressions.hospital_group_onlyChar)) {
            return null;
        } else {
            return { 'hospital_group_onlyChar': true };
        }
    }

    static deploymentName(control) {

        // validation for deployment name required field
        if (control.value == null || control.value === '') {
            return { 'deployment_type': true };
        } else {
            return null;
        }
    }

    static postalCodeOnlyNumber(control) {
        if (!control || !control.value) {
            return null;
        }
        // Regex for postal code only AlphaNumeric Character
        if (('' + control.value).match(Expressions.postal_code)) {
            return null;
        } else {
            return { 'postal_code': true };
        }
    }

    static contractStartDate(control) {

        // validation for contract start date required field
        if (control.value == null || control.value === '') {
            return { 'contract_start_date': true };
        } else {
            return null;
        }
    }

    static contractTime(control) {

        // validation for contract time required field
        if (control.value == null || control.value === '') {
            return { 'contract_time': true };
        } else {
            return null;
        }
    }
    static dateOfBirth(control) {

        // validation for date of birth required field
        if (control.value == null || control.value === '') {
            return { 'date_of_birth': true };
        } else {
            return null;
        }
    }

    static selectGender(control) {

        // validation for date of birth required field
        if (control.value == null || control.value === '') {
            return { 'gender': true };
        } else {
            return null;
        }
    }

    static firstName(control) {

        // validation for last name required field
        if (control.value == null || control.value === '') {
            return { 'first_name': true };
        } else if (('' + control.value).search(Expressions.maxCharAllowed)) {
            return { 'maxCharAllowed': true };
        } else {
            return null;
        }
    }
    static alphaNumeric(control) {

        // validation for alphanumeric data name required field
        if (control.value == null || control.value === '') {
            return { 'alphanumeric': true };
        } else {
            return null;
        }
    }
    static lastName(control) {

        // validation for first name required field
        if (control.value == null || control.value === '') {
            return { 'last_name': true };
        } else if (('' + control.value).search(Expressions.maxCharAllowed)) {
            return { 'maxCharAllowed': true };
        } else {
            return null;
        }
    }

    static firstNameisAlphabetNSpace(control) {
        if (!control || !control.value) {
            return null;
        }
        // hospital name alphabet validation
        if (('' + control.value).match(Expressions.first_name_onlyChar)) {
            return null;
        } else {
            return { 'first_name_onlyChar': true };
        }
    }

    static jobTitle(control) {

        // validation for first name required field
        if (control.value == null || control.value === '') {
            return { 'job_title': true };
        } else {
            return null;
        }
    }

    static JobTitalisAlphabetNSpace(control) {
        if (!control || !control.value) {
            return null;
        }

        // hospital name alphabet validation
        if (('' + control.value).match(Expressions.job_title_onlyChar)) {
            return null;
        } else {
            return { 'job_title_onlyChar': true };
        }
    }

    static emailId(control) {

        // validation for first name required field
        if (control.value == null || control.value === '') {
            return { 'email_id': true };
        } else {
            return null;
        }
    }

    static phoneNumber(control) {

        // validation for first name required field
        if (control.value == null || control.value === '') {
            return { 'phone_number': true };
        } else {
            return null;
        }
    }

    static phoneOnlyNumbers(control) {
        if (!control || !control.value) {
            return null;
        }

        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (('' + control.value).match(Expressions.phone_number_invalid)) {
            return null;
        } else {
            return { 'phone_number_invalid': true };
        }
    }

    static onlyNumbers(control) {

        if (!control || !control.value) {
            return null;
        }

        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (('' + control.value).match(Expressions.onlyNumbers)) {
            return null;
        } else {
            return { 'onlyNumbers': true };
        }
    }
    // static creditCardValidator(control) {
    //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    //     if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|
    // 6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
    //         return null;
    //     } else {
    //         return { 'invalidCreditCard': true };
    //     }
    // }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (!control.value) {
            return { 'invalidEmailAddress': true };
        } else if (('' + control.value).match(Expressions.invalidEmailAddress)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        if (!control || !control.value) {
            return null;
        }
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (('' + control.value).match(Expressions.invalidPassword)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static confirmPassword(control) {
        if (!control || !control.value) {
            return null;
        }
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (('' + control.value).match(Expressions.confirmPassword)) {
            return null;
        } else {
            return { 'confirmPassword': true };
        }
    }

    static addressValidate(control) {

        // validation for last name required field
        if (control.value == null || control.value === '') {
            return { 'addressValidate': true };
        } else if (('' + control.value).search(Expressions.maxCharAllowed)) {
            return { 'maxCharAllowed': true };
        } else {
            return null;
        }
    }

    static cityValidate(control) {

        // validation for last name required field
        if (control.value == null || control.value === '') {
            return { 'cityValidate': true };
        } else if (('' + control.value).search(Expressions.maxCharAllowed)) {
            return { 'maxCharAllowed': true };
        } else {
            return null;
        }
    }
    static stateValidate(control) {

        // validation for last name required field
        if (control.value == null || control.value === '') {
            return { 'stateValidate': true };
        } else if (('' + control.value).search(Expressions.maxCharAllowed)) {
            return { 'maxCharAllowed': true };
        } else {
            return null;
        }
    }
    static roleName(control) {

        // validation for first name required field
        if (control.value == null || control.value === '') {
            return { 'role_name': true };
        } else {
            return null;
        }
    }

    static roleType(control) {

        // validation for select role type required field
        if (control.value == null || control.value === '') {
            return { 'role_type': true };
        } else {
            return null;
        }
    }

    static userNameLogin(control) {

        // validation for username required field on login screen
        if (control.value == null || control.value === '') {
            return { 'user_name': true };
        } else {
            return null;
        }
    }

    static passwordLogin(control) {

        // validation for password required field on login screen
        if (control.value == null || control.value === '') {
            return { 'password': true };
        } else {
            return null;
        }
    }

    // For number decimal value
    static decimalValidator(control) {
        if (!control.value) {
            return { 'decimalValue': true };
        } else if (('' + control.value).match(Expressions.decimalValue)) {
            return null;
        } else {
            return { 'decimalValue': true };
        }
    }
}
