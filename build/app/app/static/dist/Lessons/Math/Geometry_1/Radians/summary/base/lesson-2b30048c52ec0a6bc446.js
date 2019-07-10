!function(e){function t(t){for(var i,r,s=t[0],l=t[1],c=t[2],d=0,h=[];d<s.length;d++)r=s[d],o[r]&&h.push(o[r][0]),o[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(u&&u(t);h.length;)h.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(i=!1)}i&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},o={73:0},a=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;a.push([692,0,1]),n()}({0:function(e,t){e.exports=Fig},1:function(e,t){e.exports=React},11:function(e,t,n){},112:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var i=n(0),o=n.n(i),a=n(6),r=o.a.tools.g2.Point,s=["lines","angles","arc","marks","radianLines","degrees"],l=o.a.tools.misc.joinObjects,c=o.a.tools.math.round;function u(){var e=Object(a.a)(s),t=e.colors;e.position=new r(0,0);var n=1.2;e.radius=n;var i=.03;function o(e,i){var o=1<arguments.length&&void 0!==i?i:n;return{name:"marks".concat(e),method:"radialLines",options:{innerRadius:o,outerRadius:1.32,color:t.marks,width:.015,dAngle:2*Math.PI/e}}}function u(e,n){var i=1<arguments.length&&void 0!==n?n:49;return{name:"line".concat(c(e,0)),method:"polygon",options:{width:.015,radius:1.23,sides:314,sidesToDraw:i,rotation:e+1/314,color:t.radianLines}}}function d(e,t){return{animations:{options:{translation:{style:"curved",magnitude:t,direction:e}}}}}return e.width=i,e.line1={name:"line1",method:"line",options:{length:n,width:i,color:t.lines,move:{type:"rotation",middleLengthPercent:0}},mods:{interactiveLocation:new r(.96,0),scenarios:{start:{rotation:1}}},scenario:"start"},e.line2={name:"line2",method:"line",options:{length:n,width:i,color:t.lines}},e.angle={name:"angle",method:"angle",options:{curve:{width:i,sides:400,radius:.3},color:t.angles}},e.arc={name:"arc",method:"polygon",options:{width:i,radius:n,color:t.arc,sides:400}},e.radians=l(o(2*Math.PI),{name:"radians"}),e.degrees={name:"degrees",method:"collection",addElements:[o(360,1.26),o(36,1.025*n)]},e.radianLines={name:"radianLines",method:"collection",addElements:[u(0),u(1),u(2),u(3),u(4),u(5)]},e.bendLine={name:"bendLine",method:"collection",addElements:[{name:"line",method:"line",options:{length:n,color:t.radianLines,width:.015,position:new r(0,-i/4)}},{name:"arc",method:"polygon",options:{width:.015,radius:1.23,sides:1256,sidesToDraw:200,rotation:3*Math.PI/2,center:[0,1.215],color:t.radianLines}}]},e.angleText={name:"angleText",method:"collection",addElements:[{name:"label",method:"text",options:{text:"Angle:",color:t.angles,weight:700,family:"Helvetica",position:[-.1,0],hAlign:"right",size:.14},mods:{interactiveLocation:new r(-.05,.06)}},{name:"value",method:"text",options:{color:t.angles,weight:500,family:"Helvetica",hAlign:"left",size:.14}}],mods:{scenarios:{topLeft:{position:new r(-1.7,1.5)},bottomRight:{position:new r(.2,-1.5)},bottomLeft:{position:new r(-1.2,-1.2)},bottom:{position:new r(-.2,-1.5)},summary:{position:new r(-.2,-1.5)},bottomSlightRight:{position:new r(.1,-1.5)}}}},e.circle={name:"circle",method:"collection",addElements:[e.degrees,e.radians,e.radianLines,e.angle,e.arc,e.line2,e.line1,e.angleText,e.bendLine],mods:{scenarios:{center:{position:new r(0,-.3),scale:1},centerSmaller:{position:new r(0,-.3),scale:.9},centerSmall:{position:new r(0,-.3),scale:.8},bottom:{position:new r(0,-.4),scale:1},right:{position:new r(1.2,-.1),scale:.9},top:{position:new r(0,.1),scale:.8},summary:{position:new r(1.5,.1),scale:.9},qr:{position:new r(0,0),scale:1}}},scenario:"center"},e.equation={name:"equation",method:"addEquation",options:{color:t.diagram.text.base,scale:1,elements:{arc:{text:"arc length",color:t.arc},_arc:{text:"arc length",color:t.arc,mods:d("up",.4)},radius:{text:"radius",color:t.lines},_radius:{text:"radius",color:t.lines,mods:d("down",.7)},angle:{text:"angle",color:t.angles},_angle:{text:"angle",color:t.angles,mods:d("down",.4)},radiusLength1:{text:"radius length",color:t.radianLines},radiusLengths2:{text:"radius lengths",color:t.radianLines},radiusLengths3:{text:"radius lengths",color:t.radianLines},_2p:{text:"2π",elementOptions:{animations:{options:{translation:{style:"curved",magnitude:.6,direction:"down"}}}}},_1:{text:" 1 ",color:t.angles},_2:{text:" 2 ",color:t.angles},_3:{text:" 3 ",color:t.angles},x:"  ".concat(String.fromCharCode(215),"  "),equals:"  =  ",v:{symbol:"vinculum"},largeBrace:{symbol:"brace",side:"top",numLines:6,color:t.marks},smallBrace:{symbol:"brace",side:"top",numLines:1,color:t.marks}},defaultFormAlignment:{fixTo:"equals",alignH:"right",alignV:"top"},forms:{arc:["_arc","equals","_angle","x","_radius"],radius:["_radius","equals",{frac:["_arc","_angle","v"]}],angle:["_angle","equals",{frac:["_arc","_radius","v"]}],"1rad":["arc","equals","_1","   ","radiusLength1"],"2rad":["arc","equals","_2","   ","radiusLengths2"],"3rad":["arc","equals","_3","   ","radiusLengths3"],"3rad1":["arc","equals",{topComment:{content:"_3",comment:"angle",symbol:"smallBrace",contentSpace:.04,includeInSize:!1}},"   ",{topComment:["radiusLengths3","radius","largeBrace"]}],general:["arc","equals","angle","x","radius"]},formSeries:["arc","radius","angle"]},mods:{scenarios:{lowerLeft:{position:new r(-1,-1),scale:1},top:{position:new r(0,1.3),scale:1},center:{position:new r(0,0),scale:1.3},qr:{position:new r(0,-1.8),scale:1.2}}},scenario:"lowerLeft"},e.circumferenceEqn={name:"circumferenceEqn",method:"addEquation",options:{color:t.diagram.text.base,scale:1,elements:{radius:{text:"radius",color:t.lines},circumference:{text:"circumference",color:t.arc},x:"  ".concat(String.fromCharCode(215),"  "),_2pi:{text:"2π",color:t.angles},equals:"  =  "},defaultFormAlignment:{fixTo:"equals",alignH:"right",alignV:"top"},forms:{0:["circumference","equals","_2pi","x","radius"]}},mods:{scenarios:{center:{position:new r(0,0),scale:1.3},bottom:{position:new r(.2,-1.2),scale:1}}}},e.arcEqn={name:"arcEqn",method:"addEquation",options:{color:t.diagram.text.base,scale:1,elements:{radius:{text:"radius",color:t.lines},arc:{text:"arc length",color:t.arc},circumference:{text:"of circumference",color:t.arc},x:"  ".concat(String.fromCharCode(215),"  "),_2pi:{text:"2π",color:t.angles},angle:{text:"angle",color:t.angles},equals:"  =  "},defaultFormAlignment:{fixTo:"equals",alignH:"right",alignV:"top"},forms:{0:["arc","equals","angle","x","radius"],1:[{annotate:{content:"arc",withAnnotations:{annotation:{annotation:"circumference",relativeToContent:["center","bottom"],relativeToAnnotation:["center","top"],scale:.5}}}},"equals",{annotate:{content:"angle",withAnnotations:{annotation:{annotation:"_2pi",relativeToContent:["center",1.5],relativeToAnnotation:["center","top"],scale:.6}}}},"x","radius"],2:[{annotate:{content:"arc",withAnnotations:{annotation:{annotation:"circumference",relativeToContent:["center","bottom"],relativeToAnnotation:["center","top"],scale:.5}}}},"equals",{annotate:{content:"_2pi",withAnnotations:{annotation:{annotation:"angle",relativeToContent:["center",-.3],relativeToAnnotation:["center","top"],scale:.5}}}},"x","radius"]},formSeries:["0","1","2"]},mods:{scenarios:{center:{position:new r(0,0),scale:1.3},bottom:{position:new r(0,-1.6),scale:.9}}}},e.arcEqnNav={name:"arcEqnNav",method:"addNavigator",options:{equation:e.arcEqn,type:"equationOnly"},mods:{scenarios:{center:{position:new r(0,0),scale:1.3},bottom:{position:new r(0,-1.6),scale:.9}}}},e.radDegEqn={name:"radDegEqn",method:"addEquation",options:{color:t.diagram.text.base,scale:1,elements:{circle:{text:"of a circle",color:t.diagram.text.base},angle:{text:"angle",color:t.diagram.text.base},_angle:{text:"angle",color:t.diagram.text.base},equals:"  =  ",_equals:"  =  ",_2pi:{text:"2π",color:t.radianLines},x:"  ".concat(String.fromCharCode(215),"  "),_pi:{text:"π",color:t.arc},_360:{text:"360",color:t.degrees},deg:{text:"º",color:t.degrees},_180:{text:"180",color:t.arc},_radians:{text:"radians",color:t.radianLines},question:{text:"?",color:t.arc},v:{symbol:"vinculum",color:t.arc},degrees:{text:"degrees",color:t.degrees},radians:{text:"radians",color:t.radianLines}},defaultFormAlignment:{fixTo:"equals",alignH:"right",alignV:"baseline"},forms:{0:[{annotate:{content:"angle",withAnnotations:{annotation:{annotation:"circle",relativeToContent:["center","bottom"],relativeToAnnotation:["center","top"],scale:.5}}}},"_equals","_360","deg","equals","_2pi","  ","_radians"],1:["question","x","_360","equals","_2pi"],2:[{frac:["question","_180","v"]},"x","_360","equals","_2pi"],3:[{frac:["_pi","_180","v"]},"x","_360","equals","_2pi"],4:[{frac:["_pi","_180","v"]},"x",{annotate:{content:"_360",withAnnotations:{annotation:{annotation:"degrees",relativeToContent:["center",-.2],relativeToAnnotation:["center","top"],scale:.5}},includeAnnotationInSize:!1}},"equals",{annotate:{content:"_2pi",withAnnotations:{annotation:{annotation:"radians",relativeToContent:["center",-.2],relativeToAnnotation:["center","top"],scale:.5}},includeAnnotationInSize:!1}}],5:[{frac:["_pi","_180","v"]},"x","degrees","equals","radians"],6:["radians","equals","degrees","x",{frac:["_pi","_180","v"]}]},formSeries:["0","1","2","3","4","5"]},mods:{scenarios:{center:{position:new r(.5,0),scale:1.3}}}},e.radDegEqnNav={name:"radDeg",method:"addNavigator",options:{equation:e.radDegEqn,type:"equationOnly"},mods:{scenarios:{center:{position:new r(.5,0),scale:1.3}}}},e.degRadEqn={name:"degRadEqn",method:"addEquation",options:{color:t.diagram.text.base,scale:1,elements:{equals:"  =  ",x:"  ".concat(String.fromCharCode(215),"  "),_pi:{text:"π",color:t.arc},_180:{text:"180",color:t.arc},v:{symbol:"vinculum",color:t.arc},degrees:{text:"degrees",color:t.degrees},radians:{text:"radians",color:t.radianLines}},defaultFormAlignment:{fixTo:"equals",alignH:"right",alignV:"baseline"},forms:{0:["degrees","equals","radians","x",{frac:["_180","_pi","v"]}]},formSeries:["0"]},mods:{scenarios:{center:{position:new r(-.4,-.8),scale:1.3}}}},e.addElements=[e.circle,e.equation,e.circumferenceEqn,e.arcEqnNav,e.radDegEqnNav,e.degRadEqn],e}},13:function(e,t,n){"use strict";n.r(t),n.d(t,"Headers",function(){return c}),n.d(t,"Request",function(){return _}),n.d(t,"Response",function(){return y}),n.d(t,"DOMException",function(){return v}),n.d(t,"fetch",function(){return w});var i={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(i.arrayBuffer)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],a=ArrayBuffer.isView||function(e){return e&&-1<o.indexOf(Object.prototype.toString.call(e))};function r(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function s(e){return"string"!=typeof e&&(e=String(e)),e}function l(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return i.iterable&&(t[Symbol.iterator]=function(){return t}),t}function c(e){this.map={},e instanceof c?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function u(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function d(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function h(e){var t=new FileReader,n=d(t);return t.readAsArrayBuffer(e),n}function f(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:i.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:i.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:i.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():i.arrayBuffer&&i.blob&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=f(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):i.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||a(e))?this._bodyArrayBuffer=f(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):i.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i.blob&&(this.blob=function(){var e=u(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?u(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)}),this.text=function(){var e=u(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,n=d(t);return t.readAsText(e),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),i=0;i<t.length;i++)n[i]=String.fromCharCode(t[i]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i.formData&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}c.prototype.append=function(e,t){e=r(e),t=s(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},c.prototype.delete=function(e){delete this.map[r(e)]},c.prototype.get=function(e){return e=r(e),this.has(e)?this.map[e]:null},c.prototype.has=function(e){return this.map.hasOwnProperty(r(e))},c.prototype.set=function(e,t){this.map[r(e)]=s(t)},c.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},c.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),l(e)},c.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),l(e)},c.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),l(e)},i.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);var p=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function _(e,t){var n=(t=t||{}).body;if(e instanceof _){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new c(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new c(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<p.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function g(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),i=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(i),decodeURIComponent(o))}}),t}function y(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new c(t.headers),this.url=t.url||"",this._initBody(e)}_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},m.call(_.prototype),m.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},y.error=function(){var e=new y(null,{status:0,statusText:""});return e.type="error",e};var b=[301,302,303,307,308];y.redirect=function(e,t){if(-1===b.indexOf(t))throw new RangeError("Invalid status code");return new y(null,{status:t,headers:{location:e}})};var v=self.DOMException;try{new v}catch(e){(v=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack}).prototype=Object.create(Error.prototype),v.prototype.constructor=v}function w(e,t){return new Promise(function(n,o){var a=new _(e,t);if(a.signal&&a.signal.aborted)return o(new v("Aborted","AbortError"));var r=new XMLHttpRequest;function s(){r.abort()}r.onload=function(){var e={status:r.status,statusText:r.statusText,headers:function(e){var t=new c;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var n=e.split(":"),i=n.shift().trim();if(i){var o=n.join(":").trim();t.append(i,o)}}),t}(r.getAllResponseHeaders()||"")};e.url="responseURL"in r?r.responseURL:e.headers.get("X-Request-URL");var t="response"in r?r.response:r.responseText;n(new y(t,e))},r.onerror=function(){o(new TypeError("Network request failed"))},r.ontimeout=function(){o(new TypeError("Network request failed"))},r.onabort=function(){o(new v("Aborted","AbortError"))},r.open(a.method,a.url,!0),"include"===a.credentials?r.withCredentials=!0:"omit"===a.credentials&&(r.withCredentials=!1),"responseType"in r&&i.blob&&(r.responseType="blob"),a.headers.forEach(function(e,t){r.setRequestHeader(t,e)}),a.signal&&(a.signal.addEventListener("abort",s),r.onreadystatechange=function(){4===r.readyState&&a.signal.removeEventListener("abort",s)}),r.send(void 0===a._bodyInit?null:a._bodyInit)})}w.polyfill=!0,self.fetch||(self.fetch=w,self.Headers=c,self.Request=_,self.Response=y)},139:function(e,t,n){"use strict";n.d(t,"a",function(){return p});var i=n(0),o=n.n(i),a=(n(3),n(2));function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}o.a.DiagramElementPrimative,o.a.DiagramObjectAngle,o.a.DiagramObjectLine,o.a.DiagramElementCollection,o.a.Equation;var d=o.a.Transform,h=o.a.tools.math,f=h.rand,m=h.round,p=function(){function e(t,n){var i,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:new d("Iso").rotate(0).translate(0,0);return function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),(i=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?c(e):t}(this,l(e).call(this,t,n,o))).setPosition(i.layout.position),i.diagram.addElements(c(i),i.layout.addElements),i._circle._line1.makeTouchable(),i._circle._line1.setTransformCallback=i.updateAngle.bind(c(i)),i._equation.__arc.onClick=i.goToArcForm.bind(c(i)),i._equation.__radius.onClick=i.goToRadiusForm.bind(c(i)),i._equation.__angle.onClick=i.goToAngleForm.bind(c(i)),i._equation.__arc.makeTouchable(),i._equation.__radius.makeTouchable(),i._equation.__angle.makeTouchable(),i._equation._arc.makeTouchable(),i._equation._arc.onClick=i.pulseArc.bind(c(i)),i._equation._radius.makeTouchable(),i._equation._radius.onClick=i.pulseRadius.bind(c(i)),i._equation._angle.makeTouchable(),i._equation._angle.onClick=i.pulseAngle.bind(c(i)),i._equation.__1.makeTouchable(),i._equation.__1.onClick=i.pushLine.bind(c(i),1,0,1,null),i._equation.__2.makeTouchable(),i._equation.__2.onClick=i.pushLine.bind(c(i),2,0,1,null),i._equation.__3.makeTouchable(),i._equation.__3.onClick=i.pushLine.bind(c(i),3,0,1,null),i._equation._radiusLength1.makeTouchable(),i._equation._radiusLength1.onClick=function(){i._circle._radianLines._line0.pulseThickNow(1,1.03,9),i.diagram.animateNextFrame()},i._equation._radiusLengths2.makeTouchable(),i._equation._radiusLengths2.onClick=function(){i._circle._radianLines._line0.pulseThickNow(1,1.03,9),i._circle._radianLines._line1.pulseThickNow(1,1.03,9),i.diagram.animateNextFrame()},i._equation._radiusLengths3.makeTouchable(),i._equation._radiusLengths3.onClick=function(){i._circle._radianLines._line0.pulseThickNow(1,1.03,9),i._circle._radianLines._line1.pulseThickNow(1,1.03,9),i._circle._radianLines._line2.pulseThickNow(1,1.03,9),i.diagram.animateNextFrame()},i.decimals=1,i.marks=12,i._circle._angleText._label.onClick=i.pulseAngle.bind(c(i)),i._circle._angleText._label.makeTouchable(),i._radDegEqn.isTouchable=!1,i._radDegEqn.hasTouchableElements=!1,i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(e,a.a),function(e,t,n){t&&s(e.prototype,t)}(e,[{key:"goToRadiusForm",value:function(){this._equation.goToForm({name:"radius",duration:2,animate:"move",ifAnimating:{cancelGoTo:!1,skipToTarget:!1}}),this.diagram.animateNextFrame()}},{key:"toggleDegrees",value:function(){this._circle._degrees.isShown?this._circle._degrees.hide():this._circle._degrees.showAll(),this.diagram.animateNextFrame()}},{key:"toggleRadians",value:function(){this._circle._radianLines.isShown?this._circle._radianLines.hide():this._circle._radianLines.showAll(),this.diagram.animateNextFrame()}},{key:"goToArcForm",value:function(){this._equation.goToForm({name:"arc",duration:2,animate:"move",ifAnimating:{cancelGoTo:!1,skipToTarget:!1}}),this.diagram.animateNextFrame()}},{key:"goToAngleForm",value:function(){this._equation.goToForm({name:"angle",duration:2,animate:"move",ifAnimating:{cancelGoTo:!1,skipToTarget:!1}}),this.diagram.animateNextFrame()}},{key:"updateAngle",value:function(){var e=this._circle._line1.getRotation("0to360");if(this._circle._angle.isShown&&this._circle._angle.setAngle({angle:e}),this._circle._arc.isShown&&this._circle._arc.setAngleToDraw(e+.01),this._circle._angleText.isShown){var t="".concat(m(e*this.marks/Math.PI/2,this.decimals).toFixed(this.decimals)," ").concat(this.units);this._circle._angleText._value.drawingObject.setText(t)}}},{key:"setAngleTextProperties",value:function(e,t,n){this.marks=e,this.decimals=t,this.units=n}},{key:"setAngleMarks",value:function(e){var t=0<arguments.length&&void 0!==e?e:"degrees";this._circle._degrees.hide(),this._circle._radians.hide(),"degrees"===t?(this.setAngleTextProperties(360,0,"º"),this._circle._degrees.showAll()):"radians"===t&&(this.setAngleTextProperties(2*Math.PI,2,"radians"),this._circle._radians.showAll()),this.updateAngle(),this.diagram.animateNextFrame()}},{key:"bend",value:function(e){var t=this._circle._bendLine._line,n=this._circle._bendLine._arc,i=this.layout.radius;t.setLength((1-e)*i),n.transform.updateTranslation((1-e)*i,0),n.angleToDraw=.99*e}},{key:"bendLineToEnd",value:function(){var e=this._circle._bendLine,t=this.layout,n=t.radius,i=t.width;e.showAll(),e.stop(!0,!1),this.bend(1),e.setPosition(n+i/2,0),e.setRotation(Math.PI/2),this.diagram.animateNextFrame()}},{key:"bendRadius",value:function(e){var t=0<arguments.length&&void 0!==e?e:null,n=this._circle._line1,i=this._circle._bendLine,o=this.layout,a=o.radius,r=o.width;i.showAll(),i.stop(!0,!1),this.bend(0),i.setPosition(n.getPosition()),i.setRotation(n.getRotation(""));var s=i.transform._dup();s.updateRotation(Math.PI/2),s.updateTranslation(a+r/2,0),i.animations.new().transform({target:s,duration:1}).custom({callback:this.bend.bind(this),duration:1}).rotation({element:this._circle._line1,target:1,duration:1,direction:2}).whenFinished(t).start(),this.diagram.animateNextFrame()}},{key:"goToOneRadian",value:function(){1===this._circle._line1.getRotation("0to360")?this._circle._angle.pulseScaleNow(1,1.3):this.pushLine(1,0,1),this.diagram.animateNextFrame()}},{key:"appearRadianLines",value:function(e){var t=0<arguments.length&&void 0!==e?e:null,n=this._circle._radianLines;n._line1.hide(),n._line2.hide(),n._line3.hide(),n._line4.hide(),n._line5.hide(),n.stop(!0,!0),n.animations.new().dissolveIn({element:n._line1,duration:.5}).dissolveIn({element:n._line2,duration:.5}).dissolveIn({element:n._line3,duration:.5}).dissolveIn({element:n._line4,duration:.5}).dissolveIn({element:n._line5,duration:.5}).whenFinished(t).start(),this.diagram.animateNextFrame()}},{key:"pushLine",value:function(e,t,n,i){var o=0<arguments.length&&void 0!==e?e:null,a=1<arguments.length&&void 0!==t?t:0,r=2<arguments.length&&void 0!==n?n:2,s=3<arguments.length&&void 0!==i?i:null,l=o;if(null!=o&&m(o,5)===m(this._circle._line1.getRotation("0to360"),5)&&!0===this._circle._angle.isShown)return this._circle._line1.stop(!0,!1),this._circle._angle.pulseScaleNow(1,1.3,0,s),void this.diagram.animateNextFrame();null==o&&(l=f(Math.PI/2)+Math.PI/2+this._circle._line1.getRotation("0to360")),this._circle._line1.stop(!0,!1),this._circle._line1.animations.new().rotation({target:l,duration:r,direction:a}).whenFinished(s).start(),this.diagram.animateNextFrame()}},{key:"pushLineRad",value:function(e){this.setAngleTextProperties(2*Math.PI,2,"radians"),this.updateAngle(),this.pushLine(e,2,1,null)}},{key:"pushLineDeg",value:function(e){this.setAngleTextProperties(360,0,"º"),this.updateAngle(),this.pushLine(e,2,1,null)}},{key:"pulseAngle",value:function(){this._circle._angle.pulseScaleNow(1,1.5),this.diagram.animateNextFrame()}},{key:"pulseRadius",value:function(){this._circle._line1.pulseWidth(),this.diagram.animateNextFrame()}},{key:"pulseArc",value:function(){this._circle._arc.pulseThickNow(1,1.03,5),this.diagram.animateNextFrame()}},{key:"pulseRadianLines",value:function(){this._circle._radianLines._line0.pulseThickNow(1,1.04,9),this._circle._radianLines._line1.pulseThickNow(1,1.04,9),this._circle._radianLines._line2.pulseThickNow(1,1.04,9),this._circle._radianLines._line3.pulseThickNow(1,1.04,9),this._circle._radianLines._line4.pulseThickNow(1,1.04,9),this._circle._radianLines._line5.pulseThickNow(1,1.04,9),this.diagram.animateNextFrame()}},{key:"pulseMarks",value:function(e){this._circle["_marks".concat(e)].pulseScaleNow(1,1.1),this.diagram.animateNextFrame()}},{key:"setLineRotation",value:function(e,t,n){var i=!(1<arguments.length&&void 0!==t)||t,o=2<arguments.length&&void 0!==n?n:null,a=0<arguments.length&&void 0!==e?e:null,r=0;if(null==a){var s=this._circle._line1.getRotation("0to360");if(s<.5)a=1.3,r=1;else{if(!(s>1.75*Math.PI))return null!=o&&o(),void this.updateAngle();a=2*Math.PI-1,r=-1}}i?this.pushLine(a,r,2,o):(this._circle._line1.setRotation(a),null!=o&&o())}},{key:"cycleEquation",value:function(){this._equation.nextForm(2,0),this.diagram.animateNextFrame()}},{key:"showCircle",value:function(){this._circle._line1.stop(!0,!1),this._circle._line1.setRotation(0),this.pushLine(1.999*Math.PI,1,2)}}]),e}()},4:function(e,t){e.exports=ReactDOM},5:function(e,t,n){"use strict";var i=n(1),o=n.n(i),a=n(4),r=n.n(a),s=n(8),l=n(7);t.a=function(e){var t=document.getElementById("single-page-lesson"),n=Object(l.a)(s.a);t instanceof HTMLElement&&r.a.render(o.a.createElement(n,{lesson:e}),t)}},50:function(e,t){e.exports={title:"Radians",dependencies:["Degrees"],enabled:!0,path:"Math/Geometry_1",uid:"Radians"}},563:function(e,t,n){},692:function(e,t,n){"use strict";n.r(t);var i=n(5),o=n(10),a=n(0),r=n.n(a),s=n(9),l=n(112),c=n(50),u=n.n(c),d=n(3),h=n(139),f=n(2);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=r.a.Transform,y=function(){function e(t){var n,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:new g;!function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this);var o=Object(l.a)();return(n=function(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,p(e).call(this,t,o,i))).add("collection",new h.a(t,n.layout)),n.hasTouchableElements=!0,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(e,f.a),e}();function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var T=r.a.tools.html,q=T.click,A=T.style,k=T.centerV,E=T.highlight,L=Object(l.a)(),O=L.colors,S=function(){function e(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),function(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,w(e).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(e,s.a),function(e,t,n){t&&v(e.prototype,t)}(e,[{key:"setTitle",value:function(){this.title=u.a.title}},{key:"setDiagram",value:function(e){var t=0<arguments.length&&void 0!==e?e:"";this.diagram=new d.a({htmlId:t},L),this.diagram.elements=new y(this.diagram)}},{key:"addSections",value:function(){var e=this.diagram.elements._collection,t=e._circle;this.addSection({title:"",setContent:k([A({top:0,right:45},"A |radian| is the |angle| where the |arc_length| equals the |radius|."),A({right:45,top:5},"There are |2π| radians in a circle."),A({right:45,top:5},"When using |radians|, angle, arc length and radius are |related|:"),Object(s.b)({element:e._equation,window:[-.9,-.44,2,.8],top:2,left:5,width:45,height:18,classes:"lesson__equation_border",id:"id_lesson_content__equation_box"})]),modifiers:{radian:q(e.bendRadius,[e,null],O.radianLines),arc_length:q(e.pulseArc,[e],O.arc),radius:q(e.pulseRadius,[e],O.lines),angle:q(e.pulseAngle,[e],O.angles),_angle:E(O.angles),_arc_length:E(O.arc),_radius:E(O.lines)},show:[t._line1,t._line2,t._arc,t._angle,t._angleText],setSteadyState:function(){t.setScenario("summary"),t._line1.setRotation(1.3),e.setAngleMarks("radians"),e.updateAngle(),e._equation.showForm("arc"),t._angleText.setScenario("summary");var n=document.getElementById("id_lesson_content__equation_box");n&&e._equation.updateHTMLElementTie(n)}}),this.addSection({setContent:k(["|Radians| can be converted to |degrees| using:",Object(s.b)({element:e._radDegEqn,id:"id_rad_equation",window:[-.9,-.25,2,.6]}),"|Degrees| can be converted to |_radians| using:",Object(s.b)({element:e._degRadEqn,id:"id_deg_equation",window:[-.9,-.22,2,.6]})]),modifiers:{Radians:E(O.radianLines),_radians:E(O.radianLines),Degrees:E(O.degrees),_degrees:E(O.degrees)},setSteadyState:function(){e._radDegEqn.showForm("6"),e._degRadEqn.showForm("0")}})}}]),e}(),P=(n(11),n(563),new o.a(new S));Object(i.a)(P)}});