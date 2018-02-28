export interface CallInfo {
    name: string;
    children: CallInfo[];
    parent: CallInfo | null;
    totalChildren: number;
    time: number;
    data: any;
}
export declare class Tracer {
    history: CallInfo[];
    private callStack;
    logCall<T>(name: string, fn: () => T): T;
    traceMethod: <T>(getName: (obj: T) => string) => (target: T, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
}
