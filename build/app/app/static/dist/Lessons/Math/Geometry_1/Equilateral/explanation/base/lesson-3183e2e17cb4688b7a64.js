!function(e){function t(t){for(var r,a,s=t[0],l=t[1],u=t[2],f=0,h=[];f<s.length;f++)a=s[f],o[a]&&h.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(c&&c(t);h.length;)h.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={32:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=l;i.push([714,0,1]),n()}({0:function(e,t){e.exports=Fig},1:function(e,t){e.exports=React},11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t),n.d(t,"Headers",function(){return u}),n.d(t,"Request",function(){return b}),n.d(t,"Response",function(){return m}),n.d(t,"DOMException",function(){return w}),n.d(t,"fetch",function(){return v});var r={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(r.arrayBuffer)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=ArrayBuffer.isView||function(e){return e&&-1<o.indexOf(Object.prototype.toString.call(e))};function a(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function s(e){return"string"!=typeof e&&(e=String(e)),e}function l(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r.iterable&&(t[Symbol.iterator]=function(){return t}),t}function u(e){this.map={},e instanceof u?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function c(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function f(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function h(e){var t=new FileReader,n=f(t);return t.readAsArrayBuffer(e),n}function d(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function p(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:r.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:r.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:r.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():r.arrayBuffer&&r.blob&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=d(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):r.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||i(e))?this._bodyArrayBuffer=d(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},r.blob&&(this.blob=function(){var e=c(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?c(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)}),this.text=function(){var e=c(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,n=f(t);return t.readAsText(e),n}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},r.formData&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}u.prototype.append=function(e,t){e=a(e),t=s(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},u.prototype.delete=function(e){delete this.map[a(e)]},u.prototype.get=function(e){return e=a(e),this.has(e)?this.map[e]:null},u.prototype.has=function(e){return this.map.hasOwnProperty(a(e))},u.prototype.set=function(e,t){this.map[a(e)]=s(t)},u.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},u.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),l(e)},u.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),l(e)},u.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),l(e)},r.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);var y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function b(e,t){var n=(t=t||{}).body;if(e instanceof b){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new u(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new u(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<y.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function g(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(o))}}),t}function m(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new u(t.headers),this.url=t.url||"",this._initBody(e)}b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},p.call(b.prototype),p.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},m.error=function(){var e=new m(null,{status:0,statusText:""});return e.type="error",e};var _=[301,302,303,307,308];m.redirect=function(e,t){if(-1===_.indexOf(t))throw new RangeError("Invalid status code");return new m(null,{status:t,headers:{location:e}})};var w=self.DOMException;try{new w}catch(e){(w=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack}).prototype=Object.create(Error.prototype),w.prototype.constructor=w}function v(e,t){return new Promise(function(n,o){var i=new b(e,t);if(i.signal&&i.signal.aborted)return o(new w("Aborted","AbortError"));var a=new XMLHttpRequest;function s(){a.abort()}a.onload=function(){var e={status:a.status,statusText:a.statusText,headers:function(e){var t=new u;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var n=e.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();t.append(r,o)}}),t}(a.getAllResponseHeaders()||"")};e.url="responseURL"in a?a.responseURL:e.headers.get("X-Request-URL");var t="response"in a?a.response:a.responseText;n(new m(t,e))},a.onerror=function(){o(new TypeError("Network request failed"))},a.ontimeout=function(){o(new TypeError("Network request failed"))},a.onabort=function(){o(new w("Aborted","AbortError"))},a.open(i.method,i.url,!0),"include"===i.credentials?a.withCredentials=!0:"omit"===i.credentials&&(a.withCredentials=!1),"responseType"in a&&r.blob&&(a.responseType="blob"),i.headers.forEach(function(e,t){a.setRequestHeader(t,e)}),i.signal&&(i.signal.addEventListener("abort",s),a.onreadystatechange=function(){4===a.readyState&&i.signal.removeEventListener("abort",s)}),a.send(void 0===i._bodyInit?null:i._bodyInit)})}v.polyfill=!0,self.fetch||(self.fetch=v,self.Headers=u,self.Request=b,self.Response=m)},131:function(e,t,n){"use strict";n.d(t,"a",function(){return h});var r=n(0),o=n.n(r),i=(n(3),n(2));function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}o.a.DiagramElementCollection,o.a.DiagramObjectLine,o.a.DiagramObjectPolyLine,o.a.DiagramObjectAngle;var f=o.a.Transform,h=function(){function e(t,n){var r,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:new f("Common").rotate(0).translate(0,0);return function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),(r=function(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?u(e):t}(this,l(e).call(this,t,n,o))).setPosition(r.layout.position),r.diagram.addElements(u(r),r.layout.addElements),r.hasTouchableElements=!0,r.isosceles=0,r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(e,i.a),function(e,t,n){t&&s(e.prototype,t)}(e,[{key:"toggleIsoscelesSides",value:function(){this._angle.showAll(),this.isosceles=(this.isosceles+1)%3,this._angle.setRotation(this.isosceles*Math.PI/3*2),this.diagram.animateNextFrame()}},{key:"toggleIsoscelesSidesAndAngles",value:function(){this._angle.showAll(),this.isosceles=(this.isosceles+1)%3,this._angle.setRotation(this.isosceles*Math.PI/3*2),0===this.isosceles?(this._triangle._angle0.showAll(),this._triangle._angle0.pulseScaleNow(1,1.3),this._triangle._angle2.showAll(),this._triangle._angle2.pulseScaleNow(1,1.3),this._triangle._angle1.hide()):1===this.isosceles?(this._triangle._angle0.hide(),this._triangle._angle1.showAll(),this._triangle._angle1.pulseScaleNow(1,1.3),this._triangle._angle2.showAll(),this._triangle._angle2.pulseScaleNow(1,1.3)):(this._triangle._angle1.showAll(),this._triangle._angle1.pulseScaleNow(1,1.3),this._triangle._angle0.showAll(),this._triangle._angle0.pulseScaleNow(1,1.3),this._triangle._angle2.hide()),this.diagram.animateNextFrame()}},{key:"pulseAngles",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;this._triangle._angle0.pulseScaleNow(1,1.3),this._triangle._angle1.pulseScaleNow(1,1.3),this._triangle._angle2.pulseScaleNow(1,1.3,0,t),this.diagram.animateNextFrame()}},{key:"pulseSides",value:function(){this._triangle._side01._label.pulseScaleNow(1,2.3),this._triangle._side12._label.pulseScaleNow(1,2.3),this._triangle._side20._label.pulseScaleNow(1,2.3),this.diagram.animateNextFrame()}}]),e}()},4:function(e,t){e.exports=ReactDOM},5:function(e,t,n){"use strict";var r=n(1),o=n.n(r),i=n(4),a=n.n(i),s=n(8),l=n(7);t.a=function(e){var t=document.getElementById("single-page-lesson"),n=Object(l.a)(s.a);t instanceof HTMLElement&&a.a.render(o.a.createElement(n,{lesson:e}),t)}},513:function(e,t,n){},714:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n(10),i=n(0),a=n.n(i),s=n(9),l=n(16),u=n(88),c=n(73),f=n.n(c),h=n(3),d=n(131),p=n(2);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=a.a.Transform,_=function(){function e(t){var n,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:new m;!function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this);var o=Object(u.a)();return(n=function(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,b(e).call(this,t,o,r))).add("collection",new d.a(t,n.layout)),n.hasTouchableElements=!0,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(e,p.a),e}();function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var A=a.a.tools.html,T=A.click,E=A.centerV,P=A.highlight,j=A.highlightWord,x=Object(u.a)(),B=x.colors,q=function(){function e(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),function(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,S(e).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(e,s.a),function(e,t,n){t&&v(e.prototype,t)}(e,[{key:"setTitle",value:function(){this.title=f.a.title}},{key:"setDiagram",value:function(e){var t=0<arguments.length&&void 0!==e?e:"";this.diagram=new h.a({htmlId:t},x),this.diagram.elements=new _(this.diagram),this.loadQRs(["Math/Geometry_1/Isosceles/base","Math/Geometry_1/Triangles/base"])}},{key:"addSections",value:function(){var e=this.diagram.elements._collection,t=e._triangle;this.addSection({title:"Equilateral Triangle",setContent:["A triangle that has all |three sides| the |same length| is called an |equilateral| triangle.","".concat(new l.a("Equilateral","Latin",["aequilateralis","","aequi","equal","lateralis","side"]).html())],show:[t],setSteadyState:function(){t.hideAngles()}}),this.addSection({setContent:["As |any| two sides are equal, an |equilateral| triangle is a special case of an |isosceles| triangle."],modifiers:{isosceles:this.qr("Math/Geometry_1/Isosceles/base/Main"),any:T(e.toggleIsoscelesSides,[e],B.highlight)},show:[t],setSteadyState:function(){t.hideAngles()}}),this.addSection({setContent:["As all pairs of sides are equal, then |all_pairs| of angles are also equal."],modifiers:{all_pairs:T(e.toggleIsoscelesSidesAndAngles,[e],B.highlight)},show:[t],setSteadyState:function(){t.hideAngles()}}),this.addSection({setContent:["And so in an equilateral triangle |all_sides| and |all_angles| are equal."],modifiers:{all_sides:T(e.pulseSides,[e],B.sides),all_angles:T(e.pulseAngles,[e,null],B.angles)},show:[t]}),this.addSection({setContent:E(["As an equilateral triangle is a special case of an isosceles triangle, then the same method can be used to show |any triangle with equal angles| will also have |equal sides|.","Therefore, if you |know| a triangle has |equal angles|, you will then know it will be an |equilateral| triangle with |equal sides|."])}),this.addSection({title:"Angle Relationship",setContent:["Next we can consider the |relationship| between an equilateral triangle's |angles|."],modifiers:{angles:P(B.angles)},show:[t]});var n={setContent:["We know all the angles of a |triangle| sum to |_180|. Therefore, each angle must be a |third_of_180|, which is |_60|."],modifiers:{_180:j("180º",B.angles),_60:j("60º",B.angles),third_of_180:j("third of 180º",B.angles),triangle:this.qr("Math/Geometry_1/Triangles/base/AngleSumPres")},show:[t]};this.addSection(n),this.addSection(n,{transitionFromAny:function(n){t._angle0.label.setText("60º"),t._angle1.label.setText("60º"),t._angle2.label.setText("60º"),e.pulseAngles(n)},setLeaveState:function(){t._angle0.label.setText("a"),t._angle1.label.setText("a"),t._angle2.label.setText("a")}})}}]),e}(),I=(n(11),n(513),new o.a(new q));Object(r.a)(I)},73:function(e,t){e.exports={title:"Equilateral Triangle",dependencies:["Isosceles"],enabled:!0,path:"Math/Geometry_1",uid:"Equilateral"}},88:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n(0),o=n.n(r),i=n(6),a=o.a.tools.g2.Point,s=["sides","angles","highlight"];function l(){var e=Object(i.a)(s),t=e.colors,n=[new a(-1,-1).add(0,1-Math.tan(Math.PI/6)),new a(0,.73205).add(0,1-Math.tan(Math.PI/6)),new a(1,-1).add(0,1-Math.tan(Math.PI/6))];e.position=[0,-.2];var r={name:"triangle",method:"polyLine",options:{width:.02,color:t.sides,close:!0,points:n,side:{label:{text:"A",offset:.1,location:"outside"}},angle:{color:t.angles,label:{text:"a",radius:.29},curve:{radius:.3,sides:100,width:.02}}},mods:{scenarios:{summary:{position:[0,-.3]}}}},o={name:"angle",method:"polyLine",options:{points:n,close:!1,color:t.highlight,width:.04}};return e.addElements=[r,o],e}}});