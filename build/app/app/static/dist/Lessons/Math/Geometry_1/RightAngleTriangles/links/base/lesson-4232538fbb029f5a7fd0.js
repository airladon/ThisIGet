!function(e){function t(t){for(var n,a,s=t[0],u=t[1],l=t[2],c=0,h=[];c<s.length;c++)a=s[c],o[a]&&h.push(o[a][0]),o[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(f&&f(t);h.length;)h.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,s=1;s<r.length;s++){var u=r[s];0!==o[u]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={83:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=u;i.push([752,0,1]),r()}({0:function(e,t){e.exports=Fig},1:function(e,t){e.exports=React},13:function(e,t,r){"use strict";r.r(t),r.d(t,"Headers",function(){return l}),r.d(t,"Request",function(){return b}),r.d(t,"Response",function(){return g}),r.d(t,"DOMException",function(){return v}),r.d(t,"fetch",function(){return _});var n={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(n.arrayBuffer)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=ArrayBuffer.isView||function(e){return e&&-1<o.indexOf(Object.prototype.toString.call(e))};function a(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function s(e){return"string"!=typeof e&&(e=String(e)),e}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return n.iterable&&(t[Symbol.iterator]=function(){return t}),t}function l(e){this.map={},e instanceof l?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function f(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function c(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function h(e){var t=new FileReader,r=c(t);return t.readAsArrayBuffer(e),r}function p(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function d(){return this.bodyUsed=!1,this._initBody=function(e){(this._bodyInit=e)?"string"==typeof e?this._bodyText=e:n.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:n.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:n.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():n.arrayBuffer&&n.blob&&function(e){return e&&DataView.prototype.isPrototypeOf(e)}(e)?(this._bodyArrayBuffer=p(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):n.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||i(e))?this._bodyArrayBuffer=p(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n.blob&&(this.blob=function(){var e=f(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)}),this.text=function(){var e=f(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,r=c(t);return t.readAsText(e),r}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}l.prototype.append=function(e,t){e=a(e),t=s(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},l.prototype.delete=function(e){delete this.map[a(e)]},l.prototype.get=function(e){return e=a(e),this.has(e)?this.map[e]:null},l.prototype.has=function(e){return this.map.hasOwnProperty(a(e))},l.prototype.set=function(e,t){this.map[a(e)]=s(t)},l.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},l.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r)}),u(e)},l.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},l.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t])}),u(e)},n.iterable&&(l.prototype[Symbol.iterator]=l.prototype.entries);var y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function b(e,t){var r=(t=t||{}).body;if(e instanceof b){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new l(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new l(t.headers)),this.method=function(e){var t=e.toUpperCase();return-1<y.indexOf(t)?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function m(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function g(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new l(t.headers),this.url=t.url||"",this._initBody(e)}b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},d.call(b.prototype),d.call(g.prototype),g.prototype.clone=function(){return new g(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new l(this.headers),url:this.url})},g.error=function(){var e=new g(null,{status:0,statusText:""});return e.type="error",e};var w=[301,302,303,307,308];g.redirect=function(e,t){if(-1===w.indexOf(t))throw new RangeError("Invalid status code");return new g(null,{status:t,headers:{location:e}})};var v=self.DOMException;try{new v}catch(e){(v=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),v.prototype.constructor=v}function _(e,t){return new Promise(function(r,o){var i=new b(e,t);if(i.signal&&i.signal.aborted)return o(new v("Aborted","AbortError"));var a=new XMLHttpRequest;function s(){a.abort()}a.onload=function(){var e={status:a.status,statusText:a.statusText,headers:function(e){var t=new l;return e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}}),t}(a.getAllResponseHeaders()||"")};e.url="responseURL"in a?a.responseURL:e.headers.get("X-Request-URL");var t="response"in a?a.response:a.responseText;r(new g(t,e))},a.onerror=function(){o(new TypeError("Network request failed"))},a.ontimeout=function(){o(new TypeError("Network request failed"))},a.onabort=function(){o(new v("Aborted","AbortError"))},a.open(i.method,i.url,!0),"include"===i.credentials?a.withCredentials=!0:"omit"===i.credentials&&(a.withCredentials=!1),"responseType"in a&&n.blob&&(a.responseType="blob"),i.headers.forEach(function(e,t){a.setRequestHeader(t,e)}),i.signal&&(i.signal.addEventListener("abort",s),a.onreadystatechange=function(){4===a.readyState&&i.signal.removeEventListener("abort",s)}),a.send(void 0===i._bodyInit?null:i._bodyInit)})}_.polyfill=!0,self.fetch||(self.fetch=_,self.Headers=l,self.Request=b,self.Response=g)},19:function(e,t){e.exports={title:"Right Angle Triangles",dependencies:["AreaTriangle"],enabled:!0,path:"Math/Geometry_1",uid:"RightAngleTriangles"}},264:function(e,t){e.exports={uid:"base",topic:"links",type:"generic",title:"External",description:"External links to sources of information for Right Angle Triangles",htmlTitle:"Links for Right Angle Triangles",htmlDescription:"External explanations of right angle triangles",links:[{url:"https://en.wikipedia.org/wiki/Right_triangle",hash:"0d0bf3df02ca4f1cae21e8ee0fc2f2c5",publisher:"Wikipedia",type:"generic",description:"Right Angle Triangles."},{url:"https://en.wikipedia.org/wiki/Pythagorean_theorem",hash:"695bf4125198718b2f47983f3d051038",publisher:"Wikipedia",type:"generic",description:"Pythagorean Theorm."},{url:"http://jwilson.coe.uga.edu/EMT668/EMT668.Student.Folders/HeadAngela/essay1/Pythagorean.html",hash:"4c24044beeca857cddbd5f4fde37d78f",author:"Angie Head",type:"generic",description:"Several different theorem proofs."},{url:"https://www.mathsisfun.com/right_angle_triangle.html",hash:"6a789eea2c88f07978d1b2a9bc2697cd",publisher:"Math is Fun",type:"generic",description:"Theorem definition."},{url:"https://www.mathplanet.com/education/pre-algebra/right-triangles-and-algebra/the-pythagorean-theorem",hash:"c5f008a4c8193905f1a6b4ffaff9fb00",publisher:"Math Planet",type:"generic",description:"Theorem definition and examples."},{url:"https://www.khanacademy.org/math/basic-geo/basic-geometry-pythagorean-theorem/geo-pythagorean-theorem/v/the-pythagorean-theorem",hash:"ed1f250866b93b59c5a7c669a2ca6ae7",publisher:"Khan Academy",type:"video",description:"Introduction with examples."}]}},31:function(e,t,r){},4:function(e,t){e.exports=ReactDOM},5:function(e,t,r){"use strict";var n=r(1),o=r.n(n),i=r(4),a=r.n(i),s=r(8),u=r(7);t.a=function(e){var t=document.getElementById("single-page-lesson"),r=Object(u.a)(s.a);t instanceof HTMLElement&&a.a.render(o.a.createElement(r,{lesson:e}),t)}},577:function(e,t,r){},752:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r(99),i=r(1),a=r(24),s=r(19),u=r.n(s),l=r(264),f=r.n(l);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(){function e(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),function(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,p(e).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(e,a.a),function(e,t,r){t&&h(e.prototype,t)}(e,[{key:"setTitle",value:function(){this.title=u.a.title}},{key:"setContent",value:function(){this.sections=[i.createElement("div",{key:"0",className:"lesson__links_table__disclaimer"},i.createElement("p",{style:{marginBottom:"3em"}},"These websites are not administered by This I Get. We don't control their availability, accuracy or policies."),i.createElement("p",null)),{links:f.a.links},i.createElement("div",{key:"1",className:"lesson__links_table__disclaimer"},i.createElement("p",{style:{marginTop:"3em"}},"If you visit a link, then you can rate the link for your own future reference, and for others that haven't yet visited it. If the link is broken or the content has changed and is no longer appropriate, then please let us know at ",i.createElement("a",{href:"mailto:feedback@thisiget.com?Subject=Feedback",className:"lesson__links_table__disclaimer_email"},"feedback@thisiget.com"),"."))]}}]),e}(),b=(r(31),r(577),new o.a(new y));Object(n.a)(b)}});