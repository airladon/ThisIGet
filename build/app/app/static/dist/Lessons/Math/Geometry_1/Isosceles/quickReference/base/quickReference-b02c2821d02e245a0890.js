!function(e){function t(t){for(var i,o,s=t[0],r=t[1],u=t[2],p=0,h=[];p<s.length;p++)o=s[p],a[o]&&h.push(a[o][0]),a[o]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(c&&c(t);h.length;)h.shift()();return l.push.apply(l,u||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],i=!0,s=1;s<n.length;s++){var r=n[s];0!==a[r]&&(i=!1)}i&&(l.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},a={48:0},l=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window.webpackJsonp=window.webpackJsonp||[],r=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=r;l.push([721,0,1]),n()}({0:function(e,t){e.exports=Fig},224:function(e,t,n){},250:function(e,t){e.exports={uid:"base",topic:"quickReference",type:"presentation",references:["Main","SplitLine"]}},43:function(e,t){e.exports={title:"Isosceles Triangle",dependencies:["CongruentTriangles"],enabled:!0,path:"Math/Geometry_1",uid:"Isosceles"}},721:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),l=n(14),o=n(6),s=(n(224),["sides","angles","disabled"]);function r(){var e=Object(o.a)(s),t=e.colors;function n(e,n){return{curve:{radius:.3,width:.02,sides:200},autoRightAngle:1<arguments.length&&void 0!==n&&n,color:t.angles,label:{text:e}}}function i(e,t,n){return{label:{text:e,offset:.1,location:2<arguments.length&&void 0!==n?n:"outside",linePosition:1<arguments.length&&void 0!==t?t:.5}}}function a(e){return{elements:{num:e,v:{symbol:"vinculum"},_2:"2"},forms:{base:{frac:["num","_2","v"]}},scale:.6,defaultFormAlignment:{alignH:"center"}}}e.position=[0,-.1];var l=[[-1,-1],[0,1],[1,-1]],r=[0,-1];e.left={name:"left",method:"polyLine",options:{width:.02,points:[l[0],l[1],r],close:!0,angle:[n("a"),n(a("b")),n("c",!0)],side:[i("A"),i("L",.7,"inside"),i(a("B"))],color:t.sides},mods:{scenarios:{combined:{position:[0,0],scale:1},separate:{position:[-.5,0],scale:1},summary:{position:[0,-.2],scale:1}}}},e.right={name:"right",method:"polyLine",options:{width:.02,points:[l[2],r,l[1]],close:!0,angle:[n("a"),n("c",!0),n(a("b"))],side:[i(a("B")),i("L",.3,"inside"),i("A")],color:t.sides},mods:{scenarios:{combined:{position:[0,0],scale:1},separate:{position:[.5,0],scale:1},summary:{position:[0,-.2],scale:1}}}},e.triangle={name:"triangle",method:"polyLine",options:{width:.02,points:l,close:!0,angle:[n("a"),n("b"),n("a")],side:[i("A"),i("A"),i("2B")],color:t.sides},mods:{scenarios:{center:{position:[0,0],scale:1},summary:{position:[0,0],scale:1}}}},e.split={name:"split",method:"line",options:{width:.02,vertexSpaceStart:"start",position:l[1],length:l[1][1]-r[1],angle:-Math.PI/2,label:{text:"L",offset:.1,linePosition:.7},color:t.sides},mods:{scenarios:{center:{position:l[1],scale:1},summary:{position:[l[1][0],l[1][1]-.2],scale:1}}}};var u=Math.atan((l[1][1]-l[0][1])/l[2][0])+Math.PI/2,c=.03,p=Math.cos(u),h=Math.sin(u),f=Math.cos(Math.PI-u),g=Math.sin(Math.PI-u);return e.correction={name:"correction",method:"polyLine",options:{points:[[l[0][0]+c*p,l[0][1]+c*h],[l[1][0]+c*p,l[1][1]+c*h],[l[1][0],l[1][1]+.045],[l[1][0]+c*f,l[1][1]+c*g],[l[2][0]+c*f,l[2][1]+c*g]],close:!1,color:t.diagram.background,width:.04},mods:{scenarios:{summary:{position:[0,-.2],scale:1}}}},e.addElements=[e.left,e.right,e.triangle,e.split,e.correction],e}var u=n(15),c=(n(3),n(2));function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}a.a.DiagramElementPrimative,a.a.DiagramObjectAngle,a.a.DiagramObjectLine,a.a.DiagramElementCollection,a.a.DiagramObjectPolyLine;var d=a.a.Transform,m=function(){function e(t,n){var i,a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:new d("Common").rotate(0).translate(0,0);return function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),(i=function(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?g(e):t}(this,f(e).call(this,t,n,a))).setPosition(i.layout.position),i.diagram.addElements(g(i),i.layout.addElements),i.hasTouchableElements=!0,i._left._angleTop=i._left._angle1,i._left._angleEqual=i._left._angle0,i._left._angleBase=i._left._angle2,i._right._angleTop=i._right._angle2,i._right._angleEqual=i._right._angle0,i._right._angleBase=i._right._angle1,i._left._sideEqual=i._left._side01,i._left._sideSplit=i._left._side12,i._left._sideBase=i._left._side20,i._right._sideEqual=i._right._side20,i._right._sideSplit=i._right._side12,i._right._sideBase=i._right._side01,i._left._angleBase.autoRightAngle=!1,i._right._angleBase.autoRightAngle=!1,i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(e,c.a),function(e,t,n){t&&h(e.prototype,t)}(e,[{key:"pulseEqualSides",value:function(){this._triangle._side01._label.pulseScaleNow(1,2),this._triangle._side12._label.pulseScaleNow(1,2),this.diagram.animateNextFrame()}},{key:"pulseTopAngles",value:function(){this._left._angleTop.pulseScaleNow(1,1.3),this._right._angleTop.pulseScaleNow(1,1.3),this.diagram.animateNextFrame()}},{key:"pulseEqualAngles",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;this._triangle._angle0.pulseScaleNow(1,1.3),this._triangle._angle2.pulseScaleNow(1,1.3,0,t),this.diagram.animateNextFrame()}},{key:"pulseL",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;this._split._label.pulseScaleNow(1,2,0,t),this.diagram.animateNextFrame()}},{key:"pulseSplit",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;this._split.pulseWidth({done:t}),this.diagram.animateNextFrame()}},{key:"pulseLeftRightBaseAngles",value:function(){this._left._angleBase.pulseScaleNow(1,1.3),this._right._angleBase.pulseScaleNow(1,1.3),this.diagram.animateNextFrame()}},{key:"pulseLeftRightEqualAngles",value:function(){this._left._angleEqual.pulseScaleNow(1,1.3),this._right._angleEqual.pulseScaleNow(1,1.3),this.diagram.animateNextFrame()}},{key:"pulseLeftRightEqualSides",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;this._left._sideEqual._label.pulseScaleNow(1,2),this._right._sideEqual._label.pulseScaleNow(1,2,0,t),this.diagram.animateNextFrame()}},{key:"pulseRightAngle",value:function(){this._left._angleBase.autoRightAngle=!0,this._right._angleBase.autoRightAngle=!0,this._left._angleBase.update(),this._right._angleBase.update(),this.pulseLeftRightBaseAngles()}},{key:"pulseOpposites",value:function(){this.lastOpposite?(this._triangle._side01._label.pulseScaleNow(1,2.5),this._triangle._angle2.pulseScaleNow(1,1.3)):(this._triangle._side12._label.pulseScaleNow(1,2.5),this._triangle._angle0.pulseScaleNow(1,1.3)),this.lastOpposite=!this.lastOpposite,this.diagram.animateNextFrame()}}]),e}(),y=n(43),b=n.n(y),w=n(250),v=n.n(w);function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function A(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function q(e,t,n){return t&&A(e.prototype,t),n&&A(e,n),e}function E(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function j(e,t,n){return(j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var i=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(i){var a=Object.getOwnPropertyDescriptor(i,t);return a.get?a.get.call(n):a.value}})(e,t,n||e)}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}n.d(t,"QRMain",function(){return D}),n.d(t,"QRSplitLine",function(){return I});var x=b.a.uid,T=v.a.uid,R=a.a.Transform,B=a.a.Rect,L=a.a.tools.html,k=L.click,M=L.style,F=L.highlight,D=function(){function e(t){var n,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:(new R).scale(1,1).translate(0,0);O(this,e);var a=r();(n=E(this,P(e).call(this,t,a,i,"collection",m))).hasTouchableElements=!0;var l=n._collection,o=n.layout.colors,s={two_equal_angles:k(l.pulseEqualAngles,[l,null],o.angles),two_equal_sides:k(l.pulseEqualSides,[l],o.sides),_two_equal_sides:F(o.sides),_two_equal_angles:F(o.angles),opposite:k(l.pulseOpposites,[l],o.diagram.action)};return n.setTitle("Isosceles Triangle"),n.setDescription(M({scale:1},["An |isosceles triangle| has |two_equal_sides| and |two_equal_angles|. The equal angles are the angles |opposite| to the equal sides.","If a triangle has |_two_equal_sides| or |_two_equal_angles|, then it is an |isosceles triangle|."]),s),n.setLink("".concat(b.a.path,"/").concat(b.a.uid,"/explanation/base?page=1")),n}return N(e,u.a),q(e,[{key:"show",value:function(){this.setDiagramSpace({location:"left",size:.5}),j(P(e.prototype),"show",this).call(this);var t=this._collection;t.hideAll(),t.show();var n=t._triangle;n._line.show(),n._angle0.showAll(),n._angle2.showAll(),n._side01.showAll(),n._side12.showAll(),t.transform.updateScale(.6,.6),t.setPosition(this.layout.position),this.transformToQRWindow(t,new B(-1.3,-1.4,2.6,2.4)),this.diagram.animateNextFrame()}}]),e}(),I=function(){function e(t){var n,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:(new R).scale(1,1).translate(0,0);O(this,e);var a=r();(n=E(this,P(e).call(this,t,a,i,"collection",m))).hasTouchableElements=!0;var l=n._collection,o=n.layout.colors,s={right_angle:k(l.pulseLeftRightBaseAngles,[l],o.angles),line:k(l.pulseSplit,[l,null],o.sides),equal_sides:k(l.pulseLeftRightEqualSides,[l,null],o.sides),equal_angles:k(l.pulseLeftRightEqualAngles,[l],o.angles)};return n.setTitle("Split Isosceles Triangle"),n.setDescription(M({scale:1},["For an isosceles triangle, the |line| drawn from the angle between the |equal_sides| to the |midpoint| of the side between the |equal_angles| intersects the side at a |right_angle|, and splits the triangle into two equal halves."]),s),n.setLink("".concat(b.a.path,"/").concat(b.a.uid,"/explanation/base?page=1")),n}return N(e,u.a),q(e,[{key:"show",value:function(){this.setDiagramSpace({location:"left",size:.5}),j(P(e.prototype),"show",this).call(this);var t=this._collection;t.hideAll(),t.show();var n=t._left,i=t._right,a=t._correction,l=t._split;n._line.show(),n._angleTop.showAll(),n._sideBase.showAll(),n._angleEqual.showAll(),n._sideEqual.showAll(),i._line.show(),i._angleTop.showAll(),i._sideBase.showAll(),i._angleEqual.showAll(),i._sideEqual.showAll(),i._angleBase._curve.show(),a.showAll(),l._line.show(),t.setScenarios("summary"),i._angleBase.autoRightAngle=!0,i._angleBase.update(),t.transform.updateScale(.6,.6),t.setPosition(this.layout.position),this.transformToQRWindow(t,new B(-1.3,-1.4,2.6,2.4)),this.diagram.animateNextFrame()}}]),e}();Object(l.b)(b.a.path,x,T,{Main:D,SplitLine:I})}});