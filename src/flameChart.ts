export default "!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,\"a\",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p=\"\",e(e.s=1)}([function(t,e,n){\"use strict\";function r(t,e,n){void 0===e&&(e={}),void 0===n&&(n=[]);var r=t.split(\":\").reverse(),o=r[0],s=r[1],a=\"svg\"===s?document.createElementNS(\"http://www.w3.org/2000/svg\",o):document.createElement(o);return i(a,e),n.forEach(function(t){return\"string\"==typeof t?a.appendChild(document.createTextNode(t)):a.appendChild(t)}),a}function i(t,e){for(var n in e)t.setAttribute(n,String(e[n]))}Object.defineProperty(e,\"__esModule\",{value:!0}),e.h=r,e.setAttrs=i;document.head.appendChild(r(\"style\",{},[\"\\n    svg {\\n        transform-origin: top left;\\n    }\\n\\n    g:hover rect {\\n        fill-opacity: 1;\\n    }\\n\\n    rect {\\n        cursor: pointer;\\n        transform-origin: top left;\\n        /*fill: #aea;*/\\n        fill-opacity: 0.5;\\n        stroke: #8b8;\\n        fill-opacity: 0.7;\\n        stroke-width: 0.5;\\n        transition: width,x .5s ease-in-out;\\n        rx: 2;\\n        ry: 2;\\n    }\\n\\n    div {\\n        width: 500px;\\n        overflow-x: scroll;\\n        overflow-y: hidden;\\n    }\\n\\n    text {\\n        cursor: pointer;\\n        font-size: 10px;\\n        font-family: monospace;\\n    }\\n\\n    g{\\n        transition: transform .5s ease-in-out;\\n    }\\n\"]))},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(2);window.FlameChart=r.FlameChart},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(0),i=n(3),o=i.measureFontWidth(),s=0,a=function(){function t(t,e,n,r,i,o){this.id=s++,this.x=t,this.y=e,this.w=n,this.value=r,this.color=o,this.text=i+\"[\"+r+\"]\"}return t.prototype.mount=function(){return this.rect=r.h(\"svg:rect\",{height:10,y:this.y,x:0,fill:this.color}),this.textElem=r.h(\"svg:text\",{y:this.y+7,x:o},[this.text]),this.g=r.h(\"svg:g\",{\"data-id\":this.id},[this.rect,this.textElem]),this.g},t.prototype.update=function(t,e){var n=this.w*t,s=i.sliceText(this.text,Math.floor(n/o)-2);r.setAttrs(this.rect,{width:n}),this.g.style.transform=\"translateX(\"+(this.x*t+e)+\"px)\",this.textElem.textContent=s},t.prototype.render=function(){return this.mount(),this.update(1,0),this.g},t}();e.Block=a;var u=function(){function t(e){var n=this;this.blocks=[],this.focusBlock=function(t){var e=n.data.value/t.value,r=-t.x;n.setViewpoert(e,r)},this.onClick=function(t,e){n.focusBlock(e)},this.config=e;var r=0;this.mapColor=e.mapColor||t.makeColorMapper(function(t){return t.name},function(){return t.getNextHue(1,.5,r++)})}return t.makeColorMapper=function(t,e){var n={};return function(r){var i=t(r),o=n[i];return o||(o=e(i),n[i]=o),o}},t.getNextHue=function(t,e,n){var r=i.getN(360,n),o=[t,e].map(function(t){return Math.round(100*t)+\"%\"});return\"hsl(\"+[r,o[0],o[1]].join(\", \")+\")\"},t.prototype.setData=function(t){t.children&&t.children.length>1&&(t={name:\"root\",value:t.children.reduce(function(t,e){return t+e.value},0),children:[t]}),this.data=t},t.prototype.setViewpoert=function(t,e){var n=t<4?t:4,r=this.config.width*n;this.svg.setAttribute(\"width\",String(r));var i=this.config.width/2*(n-1),o=e*t+i;this.blocks.forEach(function(e){return e.update(t,o)}),this.div.scrollLeft=i},t.prototype.render=function(t){var e=this;this.svg=r.h(\"svg:svg\",{width:this.config.width,height:this.config.height}),this.div=r.h(\"div\",{},[this.svg]);var n=this.config.width/this.data.value,i=function(t,r,o){for(var s=r,u=t.children||[],c=0,h=u;c<h.length;c++){var l=h[c],d=s,f=l.value*n;s+=f;var v=e.mapColor(l),p=new a(d,o,f,l.value,l.name,v);e.svg.appendChild(p.render()),e.blocks.push(p),i(l,d,o+12)}};i(this.data,0,0);var o=function(t,n){var r=n.getAttribute(\"data-id\");if(!r){var i=n.parentElement;if(!i)return;return void o(t,i)}var s=e.blocks[parseInt(r)];e.onClick(t,s)};this.div.addEventListener(\"click\",function(t){var e=t.target;o(t,e)}),t.appendChild(this.div)},t}();e.FlameChart=u},function(t,e,n){\"use strict\";function r(t,e){return e<3?\"\":t.length>e?t.slice(0,e-1)+\"…\":t}function i(){var t=s.h(\"svg:text\",{opacity:0},[\"w\"]),e=s.h(\"svg:svg\",{},[t]);document.body.appendChild(e);var n=t.getBoundingClientRect().width;return e.remove(),n}function o(t,e){for(var n=0;e>0;)t/=2,n+=e%2*t,e=Math.floor(e/2);return n}Object.defineProperty(e,\"__esModule\",{value:!0});var s=n(0);e.sliceText=r,e.measureFontWidth=i,e.getN=o}]);\n//# sourceMappingURL=bundle.js.map";
