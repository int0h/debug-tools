"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flameChart_1 = require("./flameChart");
function genReport(renderStack) {
    var name = renderStack.name;
    var value = isNaN(renderStack.time)
        ? (renderStack.children || []).reduce(function (total, cur) { return total + cur.time; }, 0)
        : renderStack.time;
    if (!renderStack.children || renderStack.children.length <= 0) {
        return { name: name, value: value };
    }
    var children = renderStack.children.map(genReport);
    return { name: name, value: value, children: children };
}
exports.genReport = genReport;
function createReportIframe(window, data) {
    var json = JSON.stringify(genReport(data));
    var code = "<html>\n        <head>\n        </head>\n        <body>\n            <div id=\"chart\"></div>\n            <script type=\"text/javascript\" id=\"flame\"></script>\n            <script type=\"text/javascript\" id=\"app\">\n\n            </script>\n        </body>\n    </html>";
    var ifr = window.document.createElement('iframe');
    ifr.setAttribute('width', '100%');
    ifr.setAttribute('height', '1000px');
    window.document.body.appendChild(ifr);
    ifr.contentDocument.write(code);
    var flame = ifr.contentDocument.createElement('script');
    flame.textContent = flameChart_1.default;
    ifr.contentDocument.body.appendChild(flame);
    var app = ifr.contentDocument.createElement('script');
    app.textContent = "\n        var data = " + json + ";\n\n        const flame = new FlameChart({height: 300, width: 500});\n        flame.setData(data);\n        flame.render(document.body);\n    ";
    ifr.contentDocument.body.appendChild(app);
}
exports.createReportIframe = createReportIframe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUFxQztBQVFyQyxtQkFBMEIsV0FBcUI7SUFDM0MsSUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUM5QixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHLElBQUssT0FBQSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBaEIsQ0FBZ0IsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFckQsTUFBTSxDQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUMsQ0FBQztBQUNuQyxDQUFDO0FBYkQsOEJBYUM7QUFFRCw0QkFBbUMsTUFBVyxFQUFFLElBQWM7SUFDMUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFNLElBQUksR0FBRyxxUkFVTCxDQUFDO0lBRVQsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFELEtBQUssQ0FBQyxXQUFXLEdBQUcsb0JBQVMsQ0FBQztJQUM5QixHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsR0FBRyxDQUFDLFdBQVcsR0FBRywwQkFDRCxJQUFJLG9KQUtwQixDQUFDO0lBQ0YsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTlDLENBQUM7QUFoQ0QsZ0RBZ0NDIn0=