import test = require('tape');
import {Tracer, } from '../..';

function waitSync(time: number) {
    const start = Date.now();
    while (Date.now() - start < time) {}
}

function timeFn(fn: () => void) {
    const start = Date.now();
    fn();
    return Date.now() - start;
}

function about(t: any, val: number, ref: number, accuracy: number = 5) {
    t.true(Math.abs(val - ref) < accuracy);
}

test('helpers', t => {
    const time = timeFn(() => waitSync(50));
    about(t, time, 50);
    t.end();
});

test('tracing', t => {
    const tracer = new Tracer();
    tracer.logCall('a', () => {
        waitSync(40);
    });
    about(t, tracer.history[0].time, 40);
    t.end();
});

test('tracing nested', t => {
    const tracer = new Tracer();
    tracer.logCall('a', () => {
        waitSync(40);
        tracer.logCall('b', () => {
            waitSync(70);
        });
    });
    about(t, tracer.history[0].time, 110);
    about(t, tracer.history[0].children[0].time, 70);
    t.end();
});
