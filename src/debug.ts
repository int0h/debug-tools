import {now} from './utils';

export interface CallInfo {
    name: string;
    children: CallInfo[];
    parent: CallInfo | null;
    totalChildren: number;
    time: number;
    data: any;
}

export class Tracer {
    history: CallInfo[] = [];

    private callStack: CallInfo | null = {
        name: 'root',
        children: [],
        parent: null,
        time: NaN,
        data: null,
        totalChildren: 0
    };

    logCall<T>(name: string, fn: () => T): T {
        const subInfo: CallInfo = {
            name,
            children: [],
            parent: this.callStack,
            time: NaN,
            data: null,
            totalChildren: 0
        };

        if (this.callStack === null) {
            throw new Error('render stack failed');
        }

        this.callStack.children.push(subInfo);
        this.callStack.totalChildren++;
        this.callStack = subInfo;

        const startTime = now();
        const result = fn();
        const endTime = now();

        // childrenRendered++;

        this.callStack.time = endTime - startTime;

        this.callStack = this.callStack.parent;

        if (this.callStack === null) {
            throw new Error('render stack failed');
        }

        this.callStack.totalChildren += subInfo.totalChildren;

        if (this.callStack.parent === null) {
            // console.log('children rendered:', childrenRendered);
            // childrenRendered = 0;
            this.history.push(this.callStack.children[0]);
            //this.callStack.report = genReport(this.callStack);
            //console.log(this.callStack);
            this.callStack = {
                name: 'root',
                children: [],
                parent: null,
                time: NaN,
                data: null,
                totalChildren: 0
            };
        }

        return result;
    }

    traceMethod = <T>(getName: (obj: T) => string) => (target: T, key: string, descriptor: PropertyDescriptor) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor;
        }

        const originalMethod = descriptor.value;

        const self = this;

        descriptor.value = function (this: T, ...args: any[]) {
            return self.logCall(getName(this), () => originalMethod.apply(this, args));
        };

        return descriptor;
    }
}
