!function(e){function t(t){for(var r,a,s=t[0],l=t[1],c=t[2],h=0,f=[];h<s.length;h++)a=s[h],o[a]&&f.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(u&&u(t);f.length;)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={31:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([683,0,1]),n()}({0:function(e,t){e.exports=Fig},1:function(e,t){e.exports=React},11:function(e,t,n){},110:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n(0),o=n.n(r),i=n(6),a=o.a.tools.g2.Point,s=["lines","angles","arc","marks"];function l(){var e=Object(i.a)(s),t=e.colors;e.position=new a(0,0);var n=1.2;function r(e,r,o,i){var a=1<arguments.length&&void 0!==r?r:n,s=2<arguments.length&&void 0!==o?o:.015;return{name:3<arguments.length&&void 0!==i?i:"marks".concat(e),method:"radialLines",options:{innerRadius:a,outerRadius:1.32,color:t.marks,width:s,dAngle:2*Math.PI/e}}}return e.radius=n,e.width=.03,e.line1={name:"line1",method:"line",options:{length:n,width:.03,color:t.lines,move:{type:"rotation",middleLengthPercent:0}},mods:{interactiveLocation:new a(.96,0),scenarios:{start:{rotation:1.3}}},scenario:"start"},e.line2={name:"line2",method:"line",options:{length:n,width:.03,color:t.lines}},e.angle={name:"angle",method:"angle",options:{curve:{width:.03,sides:400,radius:.3},color:t.angles}},e.arc={name:"arc",method:"polygon",options:{width:.03,radius:n,color:t.arc,sides:400}},e.marks12Long=r(12,0,.0075,"marks12Long"),e.marks12=r(12),e.marks20=r(20),e.marks50=r(50),e.marks100=r(100),e.degrees={name:"degrees",method:"collection",addElements:[r(360,1.26),r(36,1.025*n)]},e.angleText={name:"angleText",method:"collection",addElements:[{name:"label",method:"text",options:{text:"Angle:",color:t.angles,weight:700,family:"Helvetica",position:[-.1,0],hAlign:"right",size:.14},mods:{interactiveLocation:new a(-.05,.06)}},{name:"value",method:"text",options:{color:t.lines,weight:500,family:"Helvetica",hAlign:"left",size:.14}}],mods:{scenarios:{topLeft:{position:new a(-1.7,1.5)},bottomRight:{position:new a(1.7,-1.3)},bottomLeft:{position:new a(-1.2,-1.2)},bottom:{position:new a(-.2,-1.5)},bottomSlightRight:{position:new a(.15,-1.5)},summary:{position:new a(.15,-1.55),scale:1.2},qr:{position:new a(.2,-1.7),scale:1.5}}}},e.circle={name:"circle",method:"collection",addElements:[e.marks12Long,e.marks12,e.marks20,e.marks50,e.marks100,e.degrees,e.angle,e.arc,e.line2,e.line1,e.angleText],mods:{scenarios:{center:{position:new a(0,-.15),scale:1},right:{position:new a(1.2,-.1),scale:.9},summary:{position:new a(1.4,.1),scale:.9},qr:{position:new a(0,.3),scale:1}}},scenario:"center"},e.addElements=[e.circle],e}},13:function(e,t,n){"use strict";n.r(t),n.d(t,"Headers",function(){return c}),n.d(t,"Request",function(){return m}),n.d(t,"Response",function(){return g}),n.d(t,"DOMException",function(){return w}),n.d(t,"fetch",function(){return v});var r={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(r.arrayBuffer)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=ArrayBuffer.isView||function(e){return e&&-1<o.indexOf(Object.prototype.toString.call(e))};function a(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function s(e){return"string"!=typeof e&&(e=String(e)),e}function l(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r.iterable&&(t[Symbol.iterator]=function(){return t}),t}function c(e){this.map={},e instanceof c?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function u(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function h(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function f(e){var t=new FileReader,n=h(t);return t.readAsArrayBuffer(e),n}function d(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function p(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:r.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:r.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:r.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():r.arrayBuffer&&r.blob&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=d(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):r.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||i(e))?this._bodyArrayBuffer=d(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},r.blob&&(this.blob=function(){var e=u(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?u(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(f)}),this.text=function(){var e=u(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,n=h(t);return t.readAsText(e),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},r.formData&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}c.prototype.append=function(e,t){e=a(e),t=s(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},c.prototype.delete=function(e){delete this.map[a(e)]},c.prototype.get=function(e){return e=a(e),this.has(e)?this.map[e]:null},c.prototype.has=function(e){return this.map.hasOwnProperty(a(e))},c.prototype.set=function(e,t){this.map[a(e)]=s(t)},c.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},c.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),l(e)},c.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),l(e)},c.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),l(e)},r.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);var y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function m(e,t){var n=(t=t||{}).body;if(e instanceof m){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new c(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new c(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<y.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function b(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(o))}}),t}function g(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new c(t.headers),this.url=t.url||"",this._initBody(e)}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},p.call(m.prototype),p.call(g.prototype),g.prototype.clone=function(){return new g(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},g.error=function(){var e=new g(null,{status:0,statusText:""});return e.type="error",e};var _=[301,302,303,307,308];g.redirect=function(e,t){if(-1===_.indexOf(t))throw new RangeError("Invalid status code");return new g(null,{status:t,headers:{location:e}})};var w=self.DOMException;try{new w}catch(e){(w=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack}).prototype=Object.create(Error.prototype),w.prototype.constructor=w}function v(e,t){return new Promise(function(n,o){var i=new m(e,t);if(i.signal&&i.signal.aborted)return o(new w("Aborted","AbortError"));var a=new XMLHttpRequest;function s(){a.abort()}a.onload=function(){var e={status:a.status,statusText:a.statusText,headers:function(e){var t=new c;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var n=e.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();t.append(r,o)}}),t}(a.getAllResponseHeaders()||"")};e.url="responseURL"in a?a.responseURL:e.headers.get("X-Request-URL");var t="response"in a?a.response:a.responseText;n(new g(t,e))},a.onerror=function(){o(new TypeError("Network request failed"))},a.ontimeout=function(){o(new TypeError("Network request failed"))},a.onabort=function(){o(new w("Aborted","AbortError"))},a.open(i.method,i.url,!0),"include"===i.credentials?a.withCredentials=!0:"omit"===i.credentials&&(a.withCredentials=!1),"responseType"in a&&r.blob&&(a.responseType="blob"),i.headers.forEach(function(e,t){a.setRequestHeader(t,e)}),i.signal&&(i.signal.addEventListener("abort",s),a.onreadystatechange=function(){4===a.readyState&&i.signal.removeEventListener("abort",s)}),a.send(void 0===i._bodyInit?null:i._bodyInit)})}v.polyfill=!0,self.fetch||(self.fetch=v,self.Headers=c,self.Request=m,self.Response=g)},130:function(e,t,n){"use strict";n.d(t,"a",function(){return y});var r=n(0),o=n.n(r),i=(n(3),n(2));function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}o.a.DiagramElementPrimative,o.a.DiagramObjectAngle,o.a.DiagramObjectLine,o.a.DiagramElementCollection;var h=o.a.Transform,f=o.a.tools.math,d=f.rand,p=f.round,y=function(){function e(t,n){var r,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:new h("Iso").rotate(0).translate(0,0);return function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),(r=function(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?c(e):t}(this,l(e).call(this,t,n,o))).setPosition(r.layout.position),r.diagram.addElements(c(r),r.layout.addElements),r._circle._line1.makeTouchable(),r._circle._line1.setTransformCallback=r.updateAngle.bind(c(r)),r.decimals=1,r.marks=12,r._circle._angleText._label.onClick=r.pulseAngle.bind(c(r)),r._circle._angleText._label.makeTouchable(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(e,i.a),function(e,t,n){t&&s(e.prototype,t)}(e,[{key:"updateAngle",value:function(){var e=this._circle._line1.getRotation("0to360");if(this._circle._angle.isShown&&this._circle._angle.setAngle({angle:e}),this._circle._arc.isShown&&this._circle._arc.setAngleToDraw(e+.01),this._circle._angleText.isShown){var t="".concat(p(e*this.marks/Math.PI/2,this.decimals).toFixed(this.decimals)," ").concat(this.units);this._circle._angleText._value.drawingObject.setText(t)}}},{key:"setAngleTextProperties",value:function(e,t,n){this.marks=e,this.decimals=t,this.units=n}},{key:"setAngleMarks",value:function(e,t){var n=0<arguments.length&&void 0!==e?e:"degrees";if(1<arguments.length&&void 0!==t&&t&&n===this.marks)return this._circle["_marks".concat(n)].pulseScaleNow(1,1.2),void this.diagram.animateNextFrame();this._circle._marks12.hide(),this._circle._marks12Long.hide(),this._circle._marks20.hide(),this._circle._marks50.hide(),this._circle._marks100.hide(),this._circle._degrees.hide(),"degrees"===n?(this.setAngleTextProperties(360,0,"º"),this._circle._degrees.showAll()):"12Long"===n?(this.setAngleTextProperties(12,1,"portions"),this._circle._marks12Long.showAll()):(this.setAngleTextProperties(n,1,"portions"),this._circle["_marks".concat(n)].showAll()),this.updateAngle(),this.diagram.animateNextFrame()}},{key:"pushLine",value:function(e,t,n,r){var o=0<arguments.length&&void 0!==e?e:null,i=1<arguments.length&&void 0!==t?t:0,a=2<arguments.length&&void 0!==n?n:2,s=3<arguments.length&&void 0!==r?r:null,l=o;if(null!=o&&p(o,5)===p(this._circle._line1.getRotation("0to360"),5)&&!0===this._circle._angle.isShown)return this._circle._line1.stop(!0,!1),this._circle._angle.pulseScaleNow(1,1.3),this.diagram.animateNextFrame(),void(null!=s&&s());null==o&&(l=d(Math.PI/2)+Math.PI/2+this._circle._line1.getRotation("0to360")),this._circle._line1.stop(!0,!1),this._circle._line1.animations.new().rotation({target:l,duration:a,direction:i}).whenFinished(s).start(),this.diagram.animateNextFrame()}},{key:"pulseAngle",value:function(){this._circle._angle.pulseScaleNow(1,1.5),this.diagram.animateNextFrame()}},{key:"pulseRadius",value:function(){this._circle._line1.pulseWidth(),this.diagram.animateNextFrame()}},{key:"pulseArc",value:function(){this._circle._arc.pulseThickNow(1,1.03,5),this.diagram.animateNextFrame()}},{key:"pulseMarks",value:function(e){this._circle["_marks".concat(e)].pulseScaleNow(1,1.1),this.diagram.animateNextFrame()}},{key:"pulseDegrees",value:function(){this._circle._degrees.pulseScaleNow(1,1.1),this.diagram.animateNextFrame()}},{key:"pulseLines",value:function(){this._circle._line1.pulseWidth(),this._circle._line2.pulseWidth(),this.diagram.animateNextFrame()}},{key:"pulseAngleText",value:function(){this._circle._angleText.pulseScaleNow(1,1.2),this.diagram.animateNextFrame()}},{key:"setLineRotation",value:function(e,t,n){var r=!(1<arguments.length&&void 0!==t)||t,o=2<arguments.length&&void 0!==n?n:null,i=0<arguments.length&&void 0!==e?e:null,a=0;if(null==i){var s=this._circle._line1.getRotation("0to360");if(s<.5)i=1.3,a=1;else{if(!(s>1.75*Math.PI))return null!=o&&o(),void this.updateAngle();i=2*Math.PI-1,a=-1}}r?this.pushLine(i,a,2,o):(this._circle._line1.setRotation(i),null!=o&&o())}},{key:"showCircle",value:function(){this._circle._line1.stop(!0,!1),this._circle._line1.setRotation(0),this.pushLine(1.999*Math.PI,1,2)}}]),e}()},4:function(e,t){e.exports=ReactDOM},5:function(e,t,n){"use strict";var r=n(1),o=n.n(r),i=n(4),a=n.n(i),s=n(8),l=n(7);t.a=function(e){var t=document.getElementById("single-page-lesson"),n=Object(l.a)(s.a);t instanceof HTMLElement&&a.a.render(o.a.createElement(n,{lesson:e}),t)}},512:function(e,t,n){},683:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n(10),i=n(0),a=n.n(i),s=n(9),l=n(110),c=n(72),u=n.n(c),h=n(3),f=n(130),d=n(2);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=a.a.Transform,g=function(){function e(t){var n,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:new b;!function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this);var o=Object(l.a)();return(n=function(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,y(e).call(this,t,o,r))).add("collection",new f.a(t,n.layout)),n.hasTouchableElements=!0,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(e,d.a),e}(),_=n(16);function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t){return(A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var O=a.a.tools.html,T=O.style,k=O.click,P=O.centerV,S=Object(l.a)(),E=S.colors,j=function(){function e(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),function(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,x(e).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&A(e,t)}(e,s.a),function(e,t,n){t&&v(e.prototype,t)}(e,[{key:"setTitle",value:function(){this.title=u.a.title}},{key:"setDiagram",value:function(e){var t=0<arguments.length&&void 0!==e?e:"";this.diagram=new h.a({htmlId:t},S),this.diagram.elements=new g(this.diagram)}},{key:"addSections",value:function(){var e=this.diagram.elements._collection,t=e._circle;this.addSection({title:"",setContent:[P([T({right:48,size:1},"|Angle| is the amount of |rotation| between two |lines|."),T({right:48,size:1},"A full rotation can be split into |360| |equal_portions|, called |degrees|."),T({right:48,size:1},"An angle can be |measured| by counting the number of degrees within it.")]),"".concat(new _.a("Degree","Latin",["de","down","gradus","step"]).html(E.angles))],modifiers:{full_rotation:k(e.pushLine,[e,1.999*Math.PI,1,1,null],E.angles),Angle:k(e.pulseAngle,[e],E.angles),equal_portions:k(e.pulseDegrees,[e],E.marks),lines:k(e.pulseLines,[e],E.lines),rotation:k(e.pushLine,[e,null,2,1,null],E.angles),measured:k(e.pulseAngleText,[e],E.angles)},show:[t._line1,t._line2,t._angle,t._degrees,t._angleText],hide:[],setSteadyState:function(){t._line1.setRotation(1),t.setScenario("summary"),e.setAngleMarks("degrees"),t._angleText.setScenario("summary"),e.updateAngle()},setLeaveState:function(){}})}}]),e}(),R=(n(11),n(512),new o.a(new j));Object(r.a)(R)},72:function(e,t){e.exports={title:"Degrees",dependencies:["Angle"],enabled:!0,path:"Math/Geometry_1",uid:"Degrees"}}});