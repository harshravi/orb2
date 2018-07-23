// import { strEnum } from "../utils";
import { InjectionToken, Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export type SnoozeTypeEnum = 'hours' | 'days';

export const SnoozeType = {
    HOURS: 'hours' as SnoozeTypeEnum,
    DAYS: 'days' as SnoozeTypeEnum,
};

export type SymptomTypeEnum = 'vital_normal' | 'vital_alert' | 'vital_danger';

export const SymptomType = {
    NORMAL: 'vital_normal' as SymptomTypeEnum,
    ALERT: 'vital_alert' as SymptomTypeEnum,
    DANGER: 'vital_danger' as SymptomTypeEnum
};

export interface IControlValueAccessor<T> {
    provide: InjectionToken<ControlValueAccessor>;
    useExisting: Type<T>;
    multi: boolean;
}

export interface IDropdownOption {
    text: string;
    value: string;
}

export type EventLogTypeEnum = 'None' | 'Full' | 'Moderater' | 'Somewhat' | 'Severe' | 'Not at all' | 'Yes' | 'No';

export const EventLogType = {
    NONE: 'None' as EventLogTypeEnum,
    FULL: 'Full' as EventLogTypeEnum,
    MODERATE: 'Moderate' as EventLogTypeEnum,
    SEVERE: 'Severe' as EventLogTypeEnum,
    SOMEWHAT: 'Somewhat' as EventLogTypeEnum,
    NOT_AT_ALL: 'Not at all' as EventLogTypeEnum,
    YES: 'Yes' as EventLogTypeEnum,
    NO: 'No' as EventLogTypeEnum,
    RED: 'Red' as EventLogTypeEnum,
    YELLOW: 'Yellow' as EventLogTypeEnum,
    GREEN: 'Green' as EventLogTypeEnum,
    CLEAR: 'Clear' as EventLogTypeEnum
};

export interface IResponseObj {
    success_message: string;
}

