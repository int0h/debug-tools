import { CallInfo } from './debug';
export interface FlameReport {
    name: string;
    value: number;
    children?: FlameReport[];
}
export declare function genReport(renderStack: CallInfo): FlameReport;
export declare function createReportIframe(window: any, data: CallInfo): void;
