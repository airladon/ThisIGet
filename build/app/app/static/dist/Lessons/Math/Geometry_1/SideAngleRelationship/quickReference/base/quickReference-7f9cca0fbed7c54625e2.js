!function(e){function t(t){for(var o,a,l=t[0],s=t[1],u=t[2],f=0,p=[];f<l.length;f++)a=l[f],r[a]&&p.push(r[a][0]),r[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(c&&c(t);p.length;)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,l=1;l<n.length;l++){var s=n[l];0!==r[s]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={88:0},i=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=s;i.push([738,0,1]),n()}({0:function(e,t){e.exports=Fig},270:function(e,t){e.exports={uid:"base",topic:"quickReference",type:"presentation",references:["Main"]}},51:function(e,t){e.exports={title:"Side Angle Relationships",dependencies:["Isosceles"],enabled:!0,path:"Math/Geometry_1",uid:"SideAngleRelationship"}},586:function(e,t,n){},738:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(14),a=n(6),l=(n(586),r.a.tools.g2.Point),s=["sides","angles","equalSide","isosceles","fill","description"],u=n(15),c=(n(3),n(2));function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}r.a.DiagramElementPrimative,r.a.DiagramObjectAngle,r.a.DiagramObjectLine,r.a.DiagramElementCollection,r.a.DiagramObjectPolyLine;var b=r.a.Transform,h=function(){function e(t,n){var o,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:new b("Common").rotate(0).translate(0,0);return function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),(o=function(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?g(e):t}(this,d(e).call(this,t,n,r))).setPosition(o.layout.position),o.diagram.addElements(g(o),o.layout.addElements),o.hasTouchableElements=!0,o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(e,c.a),function(e,t,n){t&&p(e.prototype,t)}(e,[{key:"pulseSideB",value:function(){this._fig._tri._side12._label.pulseScaleNow(1,2.5),this.diagram.animateNextFrame()}},{key:"pulseSideA",value:function(){this._fig._tri._side01._label.pulseScaleNow(1,2.5),this.diagram.animateNextFrame()}},{key:"pulseAngleA",value:function(){this._fig._tri._angle2.pulseScaleNow(1,1.5),this.diagram.animateNextFrame()}},{key:"pulseAngleB",value:function(){this._fig._tri._angle0.pulseScaleNow(1,1.5),this.diagram.animateNextFrame()}},{key:"pulseLargestSideAngle",value:function(){this.pulseAngleB(),this.pulseSideB()}},{key:"pulseSmallestSideAngle",value:function(){this.pulseAngleA(),this.pulseSideA()}}]),e}(),m=n(51),_=n.n(m),v=n(270),w=n.n(v);function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function j(e,t,n){return(j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t){return(A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"default",function(){return N});var x=_.a.uid,k=w.a.uid,E=r.a.Transform,T=r.a.Rect,R=r.a.tools.html.click,N=function(){function e(t){var n,o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:(new E).scale(1,1).translate(0,0);!function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this);var r=function(){function e(e,t,n){var r=1<arguments.length&&void 0!==t?t:.3;return{color:2<arguments.length&&void 0!==n?n:o.angles,curve:{radius:r,width:.015,sides:200},label:{text:e,radius:r-.05}}}function t(e){return{label:{text:e,location:"outside",offset:.05}}}var n=Object(a.a)(s),o=n.colors,r=[new l(-2,-1),new l(-1.5,.6),new l(.7,-1)],i={name:"fig",method:"collection",addElements:[{name:"tri",method:"polyLine",options:{color:o.sides,width:.04,close:!0,points:r,angle:[e("b"),e("c"),e("a")],side:[t("A"),t("B"),t("C")]}}],mods:{scenarios:{default:{position:[.7,0],scale:1},left:{position:[-1.1,0],scale:.8},summary:{position:[.7,-.5],scale:1},qr:{position:[.7,0],scale:1.3}}}};return n.addElements=[i],n}();(n=function(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}(this,P(e).call(this,t,r,o,"collection",h))).hasTouchableElements=!0;var i=n._collection,u=n.layout.colors,c={Angles_opposite_longer_sides:R(i.pulseLargestSideAngle,[i],u.angles),angles_opposite_shorter_sides:R(i.pulseSmallestSideAngle,[i],u.angles),sides_opposite_larger_angles:R(i.pulseLargestSideAngle,[i],u.sides),sides_opposite_smaller_angles:R(i.pulseSmallestSideAngle,[i],u.sides)};return n.setTitle("Triangle Angle Side Relationships"),n.setDescription(["|Angles_opposite_longer_sides| will always be |larger| than |angles_opposite_shorter_sides| in the same triangle. Similarly, |sides_opposite_larger_angles| will always be |longer| than |sides_opposite_smaller_angles| in the same triangle."],c),n.setLink("".concat(_.a.path,"/").concat(_.a.uid,"/explanation/base?page=1")),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&A(e,t)}(e,u.a),function(e,t,n){t&&O(e.prototype,t)}(e,[{key:"show",value:function(){this.setDiagramSpace({location:"top",size:.5}),j(P(e.prototype),"show",this).call(this);var t=this._collection,n=t._fig;n.show([n._tri._line,n._tri._angle0,n._tri._angle2,n._tri._side01,n._tri._side12]),n.setScenarios("qr"),n._tri.updateLabels(),this.transformToQRWindow(t,new T(-2,-1.1,4,2.4)),this.diagram.animateNextFrame()}}]),e}();Object(i.b)(_.a.path,x,k,{Main:N})}});