export const Expressions = {
    'invalidName': /^[aA-zZ\s]*$/,
    'client_name_onlyChar': /^[aA-zZ\s]*$/,
    'hospital_group_onlyChar': /^[aA-zZ\s]*$/,
    'postal_code': /^[0-9]+$/,
    'first_name_onlyChar': /^[aA-zZ\s]*$/,
    'job_title_onlyChar': /^[aA-zZ\s]*$/,
    'phone_number_invalid': /^[0-9]+$/,
    'onlyNumbers': /^[0-9]+$/,
    'maxCharAllowed': /^.{0,50}$/,
    'invalidEmailAddress':
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'invalidPassword': /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/,
    'phoneMask': ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    'confirmPassword': /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    'decimalValue' : /^[1-9]\d{0,2}?(?:\.\d{1,2})?$/
};
