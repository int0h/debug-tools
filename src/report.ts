import {CallInfo} from './debug';
import flameCode from './flameChart';

export interface FlameReport {
    name: string;
    value: number;
    children?: FlameReport[];
}

export function genReport(renderStack: CallInfo): FlameReport {
    const name = renderStack.name;
    const value = isNaN(renderStack.time)
        ? (renderStack.children || []).reduce((total, cur) => total + cur.time, 0)
        : renderStack.time;

    if (!renderStack.children || renderStack.children.length <= 0) {
        return {name, value}
    }

    const children = renderStack.children.map(genReport);

    return {name, value, children};
}

export function createReportIframe(window: any, data: CallInfo) {
    const json = JSON.stringify(genReport(data));
    const code = `<html>
        <head>
        </head>
        <body>
            <div id="chart"></div>
            <script type="text/javascript" id="flame"></script>
            <script type="text/javascript" id="app">

            </script>
        </body>
    </html>`;

    const ifr = window.document.createElement('iframe');
    ifr.setAttribute('width', '100%');
    ifr.setAttribute('height', '1000px');
    window.document.body.appendChild(ifr);
    ifr.contentDocument.write(code);
    const flame = ifr.contentDocument.createElement('script');
    flame.textContent = flameCode;
    ifr.contentDocument.body.appendChild(flame);
    const app = ifr.contentDocument.createElement('script');
    app.textContent = `
        var data = ${json};

        const flame = new FlameChart({height: 300, width: 500});
        flame.setData(data);
        flame.render(document.body);
    `;
    ifr.contentDocument.body.appendChild(app);

}
