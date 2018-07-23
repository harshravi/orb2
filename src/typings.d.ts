/* SystemJS module definition */
declare var $: any;
declare var module: NodeModule;
declare var moment: any;
interface NodeModule {
  id: string;
}
declare interface Dictionary<T> {
    [index: string]: T;
}
declare interface IMoment {
    isSameOrAfter: (IMoment) => IMoment;
    format: (string) => number;
    add(number, string): IMoment;
    subtract(number, string): IMoment;
}
declare interface Window {
    stopPropagationEmitterService: any;
}
