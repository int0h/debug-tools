export const now = (typeof window === 'undefined' || typeof window.performance === 'undefined')
    ? () => Date.now()
    : () => performance.now();
