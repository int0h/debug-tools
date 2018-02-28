"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Tracer = /** @class */ (function () {
    function Tracer() {
        var _this = this;
        this.history = [];
        this.callStack = {
            name: 'root',
            children: [],
            parent: null,
            time: NaN,
            data: null,
            totalChildren: 0
        };
        this.traceMethod = function (getName) { return function (target, key, descriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, key);
            }
            var originalMethod = descriptor.value;
            var self = _this;
            descriptor.value = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return self.logCall(getName(this), function () { return originalMethod.apply(_this, args); });
            };
            return descriptor;
        }; };
    }
    Tracer.prototype.logCall = function (name, fn) {
        var subInfo = {
            name: name,
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
        var startTime = utils_1.now();
        var result = fn();
        var endTime = utils_1.now();
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
    };
    return Tracer;
}());
exports.Tracer = Tracer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVidWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBNEI7QUFXNUI7SUFBQTtRQUFBLGlCQWdGQztRQS9FRyxZQUFPLEdBQWUsRUFBRSxDQUFDO1FBRWpCLGNBQVMsR0FBb0I7WUFDakMsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFLEdBQUc7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLGFBQWEsRUFBRSxDQUFDO1NBQ25CLENBQUM7UUF1REYsZ0JBQVcsR0FBRyxVQUFJLE9BQTJCLElBQUssT0FBQSxVQUFDLE1BQVMsRUFBRSxHQUFXLEVBQUUsVUFBOEI7WUFDckcsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBdUIsQ0FBQztZQUNwRixDQUFDO1lBRUQsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUV4QyxJQUFNLElBQUksR0FBRyxLQUFJLENBQUM7WUFFbEIsVUFBVSxDQUFDLEtBQUssR0FBRztnQkFBQSxpQkFFbEI7Z0JBRnFDLGNBQWM7cUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztvQkFBZCx5QkFBYzs7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFNLE9BQUEsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFJLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztZQUMvRSxDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUMsRUFkaUQsQ0FjakQsQ0FBQTtJQUNMLENBQUM7SUFwRUcsd0JBQU8sR0FBUCxVQUFXLElBQVksRUFBRSxFQUFXO1FBQ2hDLElBQU0sT0FBTyxHQUFhO1lBQ3RCLElBQUksTUFBQTtZQUNKLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3RCLElBQUksRUFBRSxHQUFHO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixhQUFhLEVBQUUsQ0FBQztTQUNuQixDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFFekIsSUFBTSxTQUFTLEdBQUcsV0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBTSxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDcEIsSUFBTSxPQUFPLEdBQUcsV0FBRyxFQUFFLENBQUM7UUFFdEIsc0JBQXNCO1FBRXRCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFFMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUV2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDO1FBRXRELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakMsdURBQXVEO1lBQ3ZELHdCQUF3QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLG9EQUFvRDtZQUNwRCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDYixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsRUFBRTtnQkFDWixNQUFNLEVBQUUsSUFBSTtnQkFDWixJQUFJLEVBQUUsR0FBRztnQkFDVCxJQUFJLEVBQUUsSUFBSTtnQkFDVixhQUFhLEVBQUUsQ0FBQzthQUNuQixDQUFDO1FBQ04sQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQWlCTCxhQUFDO0FBQUQsQ0FBQyxBQWhGRCxJQWdGQztBQWhGWSx3QkFBTSJ9