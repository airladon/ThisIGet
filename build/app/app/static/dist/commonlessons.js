(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commonlessons"],{

/***/ "./src/Lessons/LessonsCommon/CommonLessonDiagram.js":
/*!**********************************************************!*\
  !*** ./src/Lessons/LessonsCommon/CommonLessonDiagram.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CommonLessonDiagram; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DiagramCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DiagramCollection */ "./src/Lessons/LessonsCommon/DiagramCollection.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


// import Lesson from '../../js/Lesson/Lesson';
// eslint-disable-next-line import/no-cycle

var Diagram = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Diagram,
    Rect = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Rect;
var joinObjects = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc.joinObjects;

var CommonLessonDiagram =
/*#__PURE__*/
function (_Diagram) {
  _inherits(CommonLessonDiagram, _Diagram);

  // $FlowFixMe
  function CommonLessonDiagram(diagramOptions, layout) {
    var _this;

    _classCallCheck(this, CommonLessonDiagram);

    var background = [1, 1, 1, 1];

    if (layout.colors && layout.colors.diagram && layout.colors.diagram.background) {
      background = layout.colors.diagram.background;
    }

    var defaultOptions = {
      limits: layout.limits,
      backgroundColor: background,
      fontScale: 1.2
    };
    var optionsToUse = joinObjects({}, defaultOptions, diagramOptions);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(CommonLessonDiagram).call(this, optionsToUse));
    _this.layout = layout;
    return _this;
  }

  return CommonLessonDiagram;
}(Diagram);



/***/ }),

/***/ "./src/Lessons/LessonsCommon/DiagramCollection.js":
/*!********************************************************!*\
  !*** ./src/Lessons/LessonsCommon/DiagramCollection.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CommonDiagramCollection; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tools_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/selector */ "./src/Lessons/LessonsCommon/tools/selector.js");
/* harmony import */ var _CommonLessonDiagram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommonLessonDiagram */ "./src/Lessons/LessonsCommon/CommonLessonDiagram.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // eslint-disable-next-line import/no-cycle


var _Fig$tools$g = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.g2,
    Point = _Fig$tools$g.Point,
    Transform = _Fig$tools$g.Transform;
var DiagramElementCollection = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementCollection,
    DiagramElement = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElement;

var CommonDiagramCollection =
/*#__PURE__*/
function (_DiagramElementCollec) {
  _inherits(CommonDiagramCollection, _DiagramElementCollec);

  function CommonDiagramCollection(diagram) {
    var _this;

    var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      colors: {}
    };
    var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Transform();

    _classCallCheck(this, CommonDiagramCollection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CommonDiagramCollection).call(this, transform, diagram.limits));
    _this.diagram = diagram;
    _this.layout = layout;
    _this.colors = layout.colors;
    return _this;
  }

  _createClass(CommonDiagramCollection, [{
    key: "makeUnitsSelector",
    value: function makeUnitsSelector() {
      var _this2 = this;

      var font = this.layout.defaultFont._dup();

      font.size = 0.09;
      font.setColor(this.layout.colors.diagram.disabled);
      var list = new _tools_selector__WEBPACK_IMPORTED_MODULE_1__["SelectorList"]();
      list.add('deg', 'degrees');
      list.add('rad', 'radians');

      var selectorClicked = function selectorClicked(selectedUnits) {
        var degSpans = document.getElementsByClassName('lesson__unit_deg');
        var radSpans = document.getElementsByClassName('lesson__unit_rad');

        if (selectedUnits === 'rad') {
          [].forEach.call(degSpans, function (degSpan) {
            return degSpan.classList.add('lesson__unit_hide');
          });
          [].forEach.call(radSpans, function (radSpan) {
            return radSpan.classList.remove('lesson__unit_hide');
          });
        }

        if (selectedUnits === 'deg') {
          [].forEach.call(degSpans, function (degSpan) {
            return degSpan.classList.remove('lesson__unit_hide');
          });
          [].forEach.call(radSpans, function (radSpan) {
            return radSpan.classList.add('lesson__unit_hide');
          });
        }

        _this2.setUnits(selectedUnits);
      };

      var selector = Object(_tools_selector__WEBPACK_IMPORTED_MODULE_1__["makeSelectorText"])(list, 'deg', this.diagram, selectorClicked.bind(this), 0, font, this.layout.colors.diagram.text.base, '/', 0.1);
      selector.setPosition(this.layout.units.position);
      return selector;
    } // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: "setUnits",
    value: function setUnits(units) {}
  }]);

  return CommonDiagramCollection;
}(DiagramElementCollection);



/***/ }),

/***/ "./src/Lessons/LessonsCommon/DiagramCollectionPopup.js":
/*!*************************************************************!*\
  !*** ./src/Lessons/LessonsCommon/DiagramCollectionPopup.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupBoxCollection; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DiagramCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DiagramCollection */ "./src/Lessons/LessonsCommon/DiagramCollection.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import getLessonIndex from './lessonindex';

var Transform = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Transform,
    DiagramElementPrimative = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementPrimative,
    Rect = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Rect,
    DiagramElementCollection = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementCollection;
var html = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.html;
var _Fig$tools$misc = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc,
    generateUniqueId = _Fig$tools$misc.generateUniqueId,
    joinObjects = _Fig$tools$misc.joinObjects;

var PopupBoxCollection =
/*#__PURE__*/
function (_CommonDiagramCollect) {
  _inherits(PopupBoxCollection, _CommonDiagramCollect);

  _createClass(PopupBoxCollection, [{
    key: "setTitle",
    // internalResize: boolean;
    value: function setTitle(title) {
      var modifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var modifiedText = html.applyModifiers(title, modifiers);
      var elem = document.getElementById('id_lesson__qr__title_text__pres');

      if (elem != null) {
        elem.innerHTML = modifiedText;
        html.setOnClicks(modifiers, 'lesson__popup_box__action_word');
      }

      this.modifiers = modifiers;
    }
  }, {
    key: "setDescription",
    value: function setDescription(description) {
      var modifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var text = '';

      if (typeof description === 'string') {
        text = description;
      } else {
        description.forEach(function (paragraph) {
          text += "<p>".concat(paragraph, "</p>");
        });
      }

      var elem = document.getElementById('id_lesson__qr_description');

      if (elem != null) {
        var modifiedText = html.applyModifiers(text, modifiers);
        modifiedText = modifiedText.replace(/ interactive_word/g, ' ');
        elem.innerHTML = modifiedText;
        html.setOnClicks(modifiers, 'lesson__popup_box__action_word');
      }

      this.modifiers = modifiers;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setLink",
    value: function setLink() {
      var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var a = document.getElementById('id_lesson__qr__link_link__pres');

      if (a != null) {
        // $FlowFixMe
        a.href = "".concat(window.location.origin, "/Lessons/").concat(link);
      }
    }
  }]);

  function PopupBoxCollection(diagram, layout) {
    var _this;

    var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Transform();
    var collectionName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var Collection = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : generateUniqueId();

    _classCallCheck(this, PopupBoxCollection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PopupBoxCollection).call(this, diagram, layout, transform));

    if (Collection) {
      _this.add(collectionName, new Collection(diagram, layout, new Transform(id).scale(1, 1).rotate(0).translate(0, 0)));
    }

    _this.interactiveButtonMethod = null;
    return _this;
  }

  _createClass(PopupBoxCollection, [{
    key: "transformToQRWindow",
    value: function transformToQRWindow(element, lensWindow) {
      var diagramContainer = document.getElementById('id_lesson__qr_diagram_container');
      element.updateLimits(this.diagram.limits, this.diagram.spaceTransforms);

      if (diagramContainer != null) {
        // eslint-disable-next-line no-param-reassign
        element.tieToHTML = {
          element: diagramContainer.id,
          window: lensWindow,
          scale: 'fit',
          updateOnResize: true
        };
        element.updateHTMLElementTie(this.diagram.canvasLow);
      }
    } // size is width for 'left' or 'right', an height for 'up' or 'down'
    // For auto, size is 0.5
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setDiagramSpace",
    value: function setDiagramSpace(optionsIn) {
      var defaultOptions = {
        location: 'top',
        size: 0.5
      };
      var options = joinObjects({}, defaultOptions, optionsIn);
      var location = options.location,
          size = options.size;
      var diagramContainer = document.getElementById('id_lesson__qr_diagram_container');
      var textContainer = document.getElementById('id_lesson__qr_description_container');

      if (textContainer == null || diagramContainer == null) {
        return;
      }

      if (location === 'left') {
        textContainer.style["float"] = 'right';
        textContainer.style.height = '100%';
        textContainer.style.width = "".concat(Math.floor((1 - size) * 100), "%");
        diagramContainer.style.width = "".concat(Math.floor(size * 100), "%");
        diagramContainer.style.height = '100%';
        diagramContainer.style["float"] = '';
      } else if (location === 'right') {
        textContainer.style["float"] = '';
        textContainer.style.height = '100%';
        textContainer.style.width = "".concat(Math.floor((1 - size) * 100), "%");
        diagramContainer.style.width = "".concat(Math.floor(size * 100), "%");
        diagramContainer.style.height = '100%';
        diagramContainer.style["float"] = 'right';
      } else if (location === 'top') {
        textContainer.style["float"] = '';
        textContainer.style.height = "".concat(Math.floor((1 - size) * 100), "%");
        textContainer.style.width = '100%';
        diagramContainer.style.height = "".concat(Math.floor(size * 100), "%");
        diagramContainer.style.width = '100%';
        diagramContainer.style["float"] = '';
      }
    }
  }, {
    key: "setSimplePageSize",
    value: function setSimplePageSize() {
      var lessonContent = document.getElementById('lesson__content');

      if (lessonContent == null) {
        return;
      }

      var qrWidth = Math.min(600, lessonContent.clientWidth);
      var qrHeight = qrWidth * 2 / 3;
      this.setRootElement(qrWidth, qrHeight);
    }
  }, {
    key: "setPresentationPageSize",
    value: function setPresentationPageSize() {
      var overlay = document.getElementById('lesson__content_diagram');
      var lessonContent = document.getElementById('lesson__content');

      if (overlay == null || lessonContent == null) {
        return;
      } // const fontSize = parseFloat(window
      //   .getComputedStyle(lessonContent, null)
      //   .getPropertyValue('font-size'));
      // const width = overlay.clientWidth;


      var height = overlay.clientHeight; // const qrWidth = width * 0.7;

      var qrHeight = height * 0.7;
      var qrWidth = qrHeight * 3 / 2;
      this.setRootElement(qrWidth, qrHeight);
    }
  }, {
    key: "setSinglePageSize",
    value: function setSinglePageSize() {
      var overlay = document.getElementById('single_page_lesson__qr__overlay');
      var lessonContent = document.getElementById('lesson__content');

      if (overlay == null || lessonContent == null) {
        return;
      } // const fontSize = parseFloat(window
      //   .getComputedStyle(lessonContent, null)
      //   .getPropertyValue('font-size'));


      var width = overlay.clientWidth;
      var height = overlay.clientHeight;
      var qrWidth = Math.min(800, width * 0.9); // let qrWidth = width * 0.9;

      var qrHeight = qrWidth * 2 / 3;

      if (width > height) {
        qrHeight = height * 0.8;
        qrWidth = qrHeight * 3 / 2;
      }

      this.setRootElement(qrWidth, qrHeight);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setRootElement",
    value: function setRootElement(width, height) {
      var rootElement = document.documentElement;

      if (rootElement != null) {
        rootElement.style.setProperty('--lesson__qr_height', "".concat(height, "px"));
        rootElement.style.setProperty('--lesson__qr_width', "".concat(width, "px"));
      }
    }
  }, {
    key: "showAll",
    value: function showAll() {
      this.show();
    }
  }, {
    key: "showOnly",
    value: function showOnly() {
      this.show();
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(PopupBoxCollection.prototype), "show", this).call(this); // this._box.show();

    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "prepareToHideAll",
    value: function prepareToHideAll() {} // eslint-disable-next-line class-methods-use-this

  }, {
    key: "prepareToShow",
    value: function prepareToShow() {}
  }, {
    key: "hideAll",
    value: function hideAll() {
      this.prepareToHideAll();

      _get(_getPrototypeOf(PopupBoxCollection.prototype), "hideAll", this).call(this);

      this.diagram.animateNextFrame();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.prepareToHideAll();
      this.diagram.setElementsToCollection(new DiagramElementCollection());
      this.diagram.animateNextFrame();
      var element = document.getElementById("id_lesson__popup_box__".concat(this.id));

      if (element != null) {
        element.remove();
      }
    }
  }]);

  return PopupBoxCollection;
}(_DiagramCollection__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/Lessons/LessonsCommon/DiagramCollectionQuiz.js":
/*!************************************************************!*\
  !*** ./src/Lessons/LessonsCommon/DiagramCollectionQuiz.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Diagram = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Diagram,
    Transform = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Transform,
    Point = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Point,
    DiagramElementCollection = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementCollection,
    DiagramElementPrimative = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementPrimative;
var parsePoint = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.g2.parsePoint;
var joinObjects = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc.joinObjects;

// $FlowFixMe
var CommonQuizMixin = function CommonQuizMixin(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inherits(_class, _superclass);

      _createClass(_class, [{
        key: "tryAgain",
        value: function tryAgain() {
          this._messages.hideAll();

          if (this._check != null) {
            this._check.show();

            this._check.enable();
          }

          if (this._choice != null) {
            this._choice.show();

            this._choice.enable();

            this.selectMultipleChoice(this._choice.id, -1);
          }

          this.hasTouchableElements = true;

          if (this._input != null) {
            this._input.show();

            this._input.enable();

            this._input.setValue('');
          }

          this.diagram.animateNextFrame();
          this.diagram.lesson.enableInteractiveItems();
        } // eslint-disable-next-line class-methods-use-this

      }, {
        key: "setupNewProblem",
        value: function setupNewProblem() {}
      }, {
        key: "newProblem",
        value: function newProblem() {
          if (this._question) {
            this._question.show();
          }

          this._messages.hideAll();

          this._newProblem.hide();

          this._showAnotherAnswer.hide();

          if (this._input != null) {
            this._input.show();

            this._input.enable();

            this._input.setValue('');
          }

          if (this._check != null) {
            this._check.show();

            this._check.enable();
          }

          if (this._choice != null) {
            this._choice.show();

            this._choice.enable();

            this.selectMultipleChoice(this._choice.id, -1);
          }

          this.hasTouchableElements = true;
          this.answerIndex = -1;
          this.setupNewProblem();
          this.diagram.lesson.updateInteractiveItems();
          this.diagram.animateNextFrame();
        }
      }, {
        key: "transitionToNewProblem",
        value: function transitionToNewProblem() {
          var optionsIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var defaultOptionsIn = {
            target: 'quiz',
            duration: 1
          };
          var options = joinObjects({}, defaultOptionsIn, optionsIn);

          if (this._input != null) {
            this._input.disable();

            this._input.setValue('');
          }

          if (this._check != null) {
            this._check.disable();
          }

          if (this._choice != null) {
            this._choice.disable();

            this.selectMultipleChoice(this._choice.id, -1);
          }

          this.animations["new"]().scenarios(options).whenFinished(this.afterTransitionToNewProblem.bind(this)).start();
          this.diagram.animateNextFrame();
        }
      }, {
        key: "afterTransitionToNewProblem",
        value: function afterTransitionToNewProblem() {
          if (this._input != null) {
            this._input.enable();

            this._input.setValue('');
          }

          if (this._check != null) {
            this._check.show();

            this._check.enable();
          }

          if (this._choice != null) {
            this._choice.show();

            this._choice.enable();

            this.selectMultipleChoice(this._choice.id, -1);
          }

          this.diagram.lesson.enableInteractiveItems();
        }
      }, {
        key: "showCheck",
        value: function showCheck() {
          if (this._check != null) {
            this._check.show();

            this._check.enable();
          }
        }
      }, {
        key: "checkAnswer",
        value: function checkAnswer() {
          if (this._check != null) {
            this._check.disable();
          }

          if (this._choice != null) {
            this._choice.disable();
          }

          this.diagram.lesson.disableInteractiveItems();
          this.hasTouchableElements = false;
          var answer = this.findAnswer();

          if (answer === 'correct') {
            this._messages.hideAll();

            this._messages._correct.show();
          } else if (answer === 'incorrect') {
            this._messages.hideAll();

            this._messages._incorrect.show();
          } else {
            this._messages.hideAll();

            this._messages["_".concat(answer)].show();
          }

          this.diagram.animateNextFrame();
        } // eslint-disable-next-line class-methods-use-this

      }, {
        key: "findAnswer",
        value: function findAnswer() {
          return 'incorrect';
        } // eslint-disable-next-line class-methods-use-this

      }, {
        key: "showAnswer",
        value: function showAnswer() {
          this.hasTouchableElements = false;

          this._messages.hideAll();

          this._newProblem.show();

          if (this._input != null) {
            this._input.disable();

            this._input.setValue(this.answer);
          }

          if (this._check != null) {
            this._check.hide();

            this._check.disable();
          }

          if (this._choice != null) {
            this._choice.disable();
          }

          this.answerIndex = (this.answerIndex + 1) % this.answers.length;

          if (this.answers.length > 1) {
            this._showAnotherAnswer.show();
          }
        }
      }]);

      function _class(diagram) {
        var _this;

        var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          colors: {}
        };
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.round(Math.random() * 10000).toString();
        var messages = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var transform = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Transform();

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, diagram, layout, transform)); // this.add('check', this.makeCheckButton(id));

        _this.add('newProblem', _this.makeNewProblemButton(id));

        _this.add('messages', _this.makeQuizAnswerMessages(id, messages));

        _this.add('showAnotherAnswer', _this.makeShowAnotherAnswerButton(id));

        _this._messages.hideAll();

        _this.answers = [];
        _this.answer = '';
        _this.id = id; // this.answerIndex = -1;

        return _this;
      }

      _createClass(_class, [{
        key: "addCheck",
        value: function addCheck() {
          var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.id;
          this.add('check', this.makeCheckButton(id));
        }
      }, {
        key: "addMultipleChoice",
        value: function addMultipleChoice() {
          var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.id;
          var choices = arguments.length > 1 ? arguments[1] : undefined;
          this.add('choice', this.makeMultipleChoice(id, choices));

          this._choice.setPosition(this.layout.quiz.choice);
        }
      }, {
        key: "addQuestion",
        value: function addQuestion() {
          var optionsIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var defaultOptions = {
            size: 0.18,
            style: 'normal',
            family: 'helvetica',
            hAlign: 'left',
            vAlign: 'baseline',
            text: '',
            color: this.layout.colors.diagram.text.base,
            position: new Point(-2.7, 1.5)
          };
          var options = joinObjects({}, defaultOptions, optionsIn);
          options.position = parsePoint(options.position);
          var question = this.diagram.shapes.text(options);
          this.add('question', question);
        }
      }, {
        key: "makeAnswerBox",
        value: function makeAnswerBox(id, answerText) {
          var detailsText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          var incorrectBox = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
          var container = document.createElement('div');
          container.classList.add('lesson__quiz__answer_container');

          if (incorrectBox) {
            container.classList.add('lesson__quiz__answer_incorrect');
          } else {
            container.classList.add('lesson__quiz__answer_correct');
          }

          var answer = document.createElement('div');
          answer.classList.add('lesson__quiz__answer_text');
          answer.innerHTML = answerText;
          container.appendChild(answer);

          if (detailsText) {
            var details = document.createElement('div');
            details.classList.add('lesson__quiz__answer_details_text');
            details.innerHTML = detailsText;
            container.appendChild(details);
          }

          var nextSteps = document.createElement('div');
          nextSteps.classList.add('lesson__quiz__next_steps');
          container.appendChild(nextSteps);

          if (incorrectBox) {
            var tryAgain = document.createElement('div');
            tryAgain.classList.add('lesson__quiz__button');
            tryAgain.classList.add('lesson__quiz__button_fixed_size');
            tryAgain.innerHTML = 'Try Again';
            tryAgain.onclick = this.tryAgain.bind(this);
            nextSteps.appendChild(tryAgain);
            var showAnswer = document.createElement('div');
            showAnswer.classList.add('lesson__quiz__button');
            showAnswer.classList.add('lesson__quiz__button_fixed_size');
            showAnswer.innerHTML = 'Show Answer';
            showAnswer.onclick = this.showAnswer.bind(this);
            nextSteps.appendChild(showAnswer);
          }

          var newProblem = document.createElement('div');
          newProblem.classList.add('lesson__quiz__button');
          newProblem.classList.add('lesson__quiz__button_fixed_size');
          newProblem.innerHTML = 'Try New Problem';
          newProblem.onclick = this.newProblem.bind(this);
          nextSteps.appendChild(newProblem);
          var html = this.diagram.shapes.htmlElement(container, "id__quiz_answer_box__".concat(id), '', new Point(0, 0), 'middle', 'center');
          return html;
        }
      }, {
        key: "makeQuizAnswerMessages",
        value: function makeQuizAnswerMessages(id) {
          var _this2 = this;

          var incorrectMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var collection = this.diagram.shapes.collection(new Transform().translate(0, 0));
          collection.add('correct', this.makeAnswerBox("correct_".concat(id), 'Correct!', '', false));
          collection.add('incorrect', this.makeAnswerBox("incorrect_".concat(id), 'Incorrect!'));
          Object.keys(incorrectMessages).forEach(function (key) {
            var message = incorrectMessages[key].answer;
            var subMessage = incorrectMessages[key].details;
            collection.add(key, _this2.makeAnswerBox("".concat(key, "_").concat(id), message, subMessage));
          });
          return collection;
        }
      }, {
        key: "makeButton",
        value: function makeButton(id, label, callback, position) {
          var button = document.createElement('div');
          button.classList.add('lesson__quiz__button');
          button.innerHTML = label;
          button.onclick = callback;
          var html = this.diagram.shapes.htmlElement(button, "id__lesson_quiz_button_".concat(id), '', position, 'middle', 'center');
          html.isInteractive = true;

          html.disable = function () {
            html.isInteractive = false;
            button.classList.add('lesson__quiz__button_disabled');
          };

          html.enable = function () {
            html.isInteractive = true;
            button.classList.remove('lesson__quiz__button_disabled');
          };

          return html;
        }
      }, {
        key: "makeCheckButton",
        value: function makeCheckButton(id) {
          var button = this.makeButton("check__".concat(id), 'Check', this.checkAnswer.bind(this), this.layout.quiz.check);
          button.interactiveLocation = 'topRight'; // button.interactiveLocation = new Point(0.26, 0.12);

          return button;
        }
      }, {
        key: "makeNewProblemButton",
        value: function makeNewProblemButton(id) {
          var button = this.makeButton("new_problem__".concat(id), 'New Problem', this.newProblem.bind(this), this.layout.quiz.newProblem);
          button.interactiveLocation = 'topRight';
          return button;
        }
      }, {
        key: "makeShowAnotherAnswerButton",
        value: function makeShowAnotherAnswerButton(id) {
          var button = this.makeButton("show_another_answer__".concat(id), 'Show Another Answer', this.showAnswer.bind(this), this.layout.quiz.showAnotherAnswer);
          button.interactiveLocation = 'topRight';
          return button;
        }
      }, {
        key: "addInput",
        value: function addInput(id) {
          var defaultText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var numDigits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
          var decimalPlaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          this.add('input', this.makeEntryBox(id, defaultText, numDigits, decimalPlaces));
          this._input.interactiveLocation = 'topRight';

          if (this.layout.quiz) {
            if (this.layout.quiz.input) {
              this._input.setPosition(this.layout.quiz.input);
            }
          }
        } // eslint-disable-next-line class-methods-use-this

      }, {
        key: "makeEntryBox",
        value: function makeEntryBox(id) {
          var _this3 = this;

          var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var numDigits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
          var decimalPlaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          var container = document.createElement('div');
          container.classList.add('lesson__quiz_input_container'); // const form = document.createElement('form');
          // container.appendChild(form);

          var input = document.createElement('input');
          input.classList.add('lesson__quiz_input');
          input.setAttribute('type', 'text');
          input.setAttribute('placeholder', placeholder);

          input.onkeypress = function (event) {
            if (event.keyCode === 13) {
              _this3.checkAnswer();
            }
          };

          input.oninput = function () {
            var str = input.value.slice();
            var validStr = '';
            var decimalCount = 0;
            var decimal = false;

            for (var i = 0; i < str.length; i += 1) {
              if (validStr.length >= numDigits) {
                i = str.length;
              } else {
                var _char = str.charAt(i);

                if (_char >= '0' && _char <= '9' || _char === '.' && decimalPlaces > 0) {
                  var valid = true;

                  if (decimal === false && _char === '.') {
                    decimal = true;
                  } else if (decimal === true && _char === '.') {
                    valid = false;
                  } else if (decimal === true) {
                    decimalCount += 1;

                    if (decimalCount > decimalPlaces) {
                      valid = false;
                    }
                  }

                  if (valid) {
                    validStr = "".concat(validStr).concat(_char);
                  }
                }
              }
            }

            input.value = "".concat(validStr);
          };

          container.appendChild(input);
          var html = this.diagram.shapes.htmlElement(container, "id__quiz_input__".concat(id), '', new Point(0, 0), 'middle', 'center');
          html.isInteractive = true;

          html.getValue = function () {
            return input.value;
          };

          html.setValue = function (value) {
            if (typeof value === 'number') {
              input.value = value.toString();
            } else {
              input.value = value;
            }
          };

          html.disable = function () {
            input.disabled = true;
            html.isInteractive = false;
            input.classList.add('lesson__quiz_input_disabled');
          };

          html.enable = function () {
            input.disabled = false;
            html.isInteractive = true;
            input.classList.remove('lesson__quiz_input_disabled');
          };

          return html;
        } // eslint-disable-next-line class-methods-use-this

      }, {
        key: "selectMultipleChoice",
        value: function selectMultipleChoice(id) {
          var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          var indexStr = 'id_lesson__quiz_multiple_choice_box_';
          var answerSelected = 'lesson__quiz_multiple_choice_box_answer__selected';
          var circleSelected = 'lesson__quiz_multiple_choice_box_circle__selected';
          var elementSelected = 'lesson__quiz_multiple_choice_box__selected';
          var selected = document.getElementsByClassName(elementSelected);
          var selectedLength = selected.length;

          if (selected) {
            for (var i = 0; i < selectedLength; i += 1) {
              var element = selected[0];
              element.classList.remove(answerSelected);
              element.classList.remove(circleSelected);
              element.classList.remove(elementSelected);
            }
          }

          if (index > -1) {
            var circle = document.getElementById("".concat(indexStr, "circle__").concat(id, "_").concat(index));
            var answer = document.getElementById("".concat(indexStr, "answer__").concat(id, "_").concat(index));

            if (circle instanceof HTMLElement && answer instanceof HTMLElement) {
              circle.classList.add(circleSelected);
              circle.classList.add(elementSelected);
              answer.classList.add(answerSelected);
              answer.classList.add(elementSelected);
            }
          }
        } // eslint-disable-next-line class-methods-use-this

      }, {
        key: "getMultipleChoiceSelection",
        value: function getMultipleChoiceSelection(id) {
          var elementSelected = 'lesson__quiz_multiple_choice_box__selected';
          var selected = document.getElementsByClassName(elementSelected);

          for (var i = 0; i < selected.length; i += 1) {
            var idIndex = selected[i].id.replace('id_lesson__quiz_multiple_choice_box_circle__', '');
            var idString = idIndex.replace(/_[0-9]*$/, '');

            if (idString === id) {
              return parseInt(idIndex.replace("".concat(idString, "_"), ''), 10);
            }
          }

          return -1;
        }
      }, {
        key: "makeMultipleChoice",
        value: function makeMultipleChoice(id, answers) {
          var _this4 = this;

          var table = document.createElement('table');
          table.classList.add('lesson__quiz_multiple_choice_box_table');
          answers.forEach(function (answer, index) {
            var row = document.createElement('tr');
            row.classList.add('lesson__quiz_multiple_choice_box_row');
            row.onclick = _this4.selectMultipleChoice.bind(_this4, id, index);
            var col1 = document.createElement('td');
            col1.classList.add('lesson__quiz_multiple_choice_box_col1');
            var col2 = document.createElement('td');
            col2.classList.add('lesson__quiz_multiple_choice_box_col2');
            var circle = document.createElement('div');
            circle.classList.add('lesson__quiz_multiple_choice_box_circle');
            circle.id = "id_lesson__quiz_multiple_choice_box_circle__".concat(id, "_").concat(index);
            var answerText = document.createElement('div');
            answerText.classList.add('lesson__quiz_multiple_choice_box_answer');
            answerText.id = "id_lesson__quiz_multiple_choice_box_answer__".concat(id, "_").concat(index);
            answerText.innerHTML = answer;
            row.appendChild(col1);
            row.appendChild(col2);
            col1.appendChild(circle);
            col2.appendChild(answerText);
            table.appendChild(row);
          });
          var html = this.diagram.shapes.htmlElement(table, "id__quiz_multiple_choice_box__".concat(id), '', new Point(0, 0), 'left', 'top');

          html.enable = function () {
            var doEnable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var element = html.drawingObject.element;
            var classStr = 'lesson__quiz_multiple_choice_box_answer__disable';

            if (doEnable) {
              element.classList.remove(classStr);
            } else {
              element.classList.add(classStr);
            }
          };

          html.disable = function () {
            html.enable(false);
          };

          return html;
        }
      }]);

      return _class;
    }(superclass)
  );
};

/* harmony default export */ __webpack_exports__["default"] = (CommonQuizMixin);

/***/ }),

/***/ "./src/Lessons/LessonsCommon/images/textureMaps/circles.png":
/*!******************************************************************!*\
  !*** ./src/Lessons/LessonsCommon/images/textureMaps/circles.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/dist/Lessons/LessonsCommon/images/textureMaps/circles.png";

/***/ }),

/***/ "./src/Lessons/LessonsCommon/layout.js":
/*!*********************************************!*\
  !*** ./src/Lessons/LessonsCommon/layout.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return baseLayout; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
 // import { Rect, Point } from '../../js/diagram/tools/g2';
// import getCssColors from '../../js/tools/getCssColors';
// import angleCircleLayout from '../../../LessonsCommon/AngleCircle/layout';
// import { DiagramFont } from '../../js/diagram/DrawingObjects/TextObject/TextObject';

var Rect = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Rect,
    Point = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Point,
    DiagramFont = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramFont; // const cssColorNames = [
//   'latin',
//   'line',
//   'angleA',
//   'angleB',
//   'disabled',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */

function baseLayout() {
  var cssColorNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var colors = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.color.getCSSColors(cssColorNames);

  if (colors.diagram == null) {
    colors.diagram = {
      text: {
        base: [1, 1, 1, 1]
      }
    };
  } else if (colors.diagram.text == null) {
    colors.diagram.text = {
      base: [1, 1, 1, 1]
    };
  } else if (colors.diagram.text.base == null) {
    colors.diagram.text.base = [1, 1, 1, 1];
  }

  var textColor = [1, 1, 1, 1];

  if (colors.diagram.text != null) {
    textColor = colors.diagram.text.base;
  }

  var layout = {
    limits: new Rect(-3, -2, 6, 4),
    linewidth: 0.03,
    position: new Point(0, 0),
    selector: {
      y: 1.7
    },
    quiz: {
      check: new Point(2.4, -1.7),
      input: new Point(2.4, -1.3),
      newProblem: new Point(2.4, -1.7),
      // check: new Point(0, -1.7),
      position: new Point(0, 0),
      answer: new Point(0, -1.7),
      nextSteps: new Point(0, -1.9),
      // newProblem: new Point(0, -1.7),
      showAnotherAnswer: new Point(1.1, -1.7),
      choice: new Point(2.02, -1.1)
    },
    defaultFont: new DiagramFont('helvetica, sans-serif', 'normal', 0.2, '400', 'center', 'middle', textColor),
    colors: colors
  };
  return layout;
}

/***/ }),

/***/ "./src/Lessons/LessonsCommon/lessonindex.js":
/*!**************************************************!*\
  !*** ./src/Lessons/LessonsCommon/lessonindex.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getLessonIndex; });
/* harmony import */ var _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/Lesson/lessonDescription */ "./src/js/Lesson/lessonDescription.js");

function getLessonIndex() {
  var lessonIndex = {
    AdjacentAngles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Adjacent Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AdjacentAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Explanation of complementary, supplementary, and explementary angles.',
            htmlTitle: 'Complementary, supplementary and explementary angles explanation',
            htmlDescription: 'What are complementary angles, supplementary angles and explementary angles',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Complementary, Supplementary and Explementary Angles.',
            description: 'Summary of complementary, supplementary and explementary Angles.',
            htmlTitle: 'Complementary, supplementary and explementary angles summary',
            htmlDescription: 'Summary of complementary angles, supplementary angles and explementary angles',
            fullLesson: true
          }
        }
      },
      dependencies: ['ImportantAngles'],
      enabled: true
    }),
    Angle: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Angle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Introduction to Angles.',
            htmlTitle: 'Introduction to Angles',
            htmlDescription: 'Introduction to the concept of angle',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: 'Summary of Angles introduction',
            htmlTitle: 'Summary of Angles introduction',
            htmlDescription: 'Definition of an angle and where the name comes from',
            fullLesson: true
          }
        }
      },
      dependencies: ['Circle'],
      enabled: true
    }),
    Area: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Area and Rectangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Area',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to area, rectangle area and square area',
            htmlDescription: 'Concept of area, why they it is measured in squares and why areas of rectangles and squares are what they are',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Create an area',
            description: '',
            htmlTitle: 'Quiz: Create a rectangle or square with area',
            htmlDescription: 'Create a rectangle or square that has some defined area on this dynamic page',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of area, rectangle area and square area.',
            htmlDescription: 'Summary of area concept, and equations for rectangle area and square area',
            fullLesson: true
          }
        }
      },
      dependencies: ['RectanglesAndSquares'],
      enabled: true
    }),
    AreaCircle: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Area of a Circle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AreaCircle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Intuitive derivation of circle area',
            htmlDescription: 'Find the equation for circle area using triangles',
            fullLesson: true
          },
          "static": {
            type: 'singlePage',
            title: 'Single Page Full explanation',
            description: '',
            htmlTitle: 'Intuitive derivation of circle area in a single page',
            htmlDescription: 'Using triangles, find the equation to area of a circle',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz: Calculate the circle property',
            htmlDescription: 'Calculate circle property from either the radius, diameter, area or circumference',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of Circle Area',
            htmlDescription: 'Area of a circle equation',
            fullLesson: true
          }
        }
      },
      dependencies: ['AreaTriangle'],
      enabled: true
    }),
    AreaTriangle: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Area of a Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'AreaTriangle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Triangle Area derivation and proof',
            htmlDescription: 'Explanation on why area of a triangle is what it is',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Make triangle with target area',
            description: '',
            htmlTitle: 'Quiz - Create a triangle with a given area',
            htmlDescription: 'Drag the corners of a triangle to change its height and base to get the target area',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Area of a triangle',
            htmlDescription: 'Summary of triangle area',
            fullLesson: true
          }
        }
      },
      dependencies: ['Area'],
      enabled: true
    }),
    Circle: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Circles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Circle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Presentation form - interactive.',
            htmlTitle: 'Introduction to circles, their history and properties',
            htmlDescription: 'Introduction to circle, diameter, radius, circumference, center point. Relationships between radius, diameter and circumference.',
            fullLesson: true
          }
        },
        quiz: {
          identifyProperties: {
            type: 'presentation',
            title: 'Identify Properties',
            description: 'Identify the properties of a circle.',
            htmlTitle: 'Quiz - Identify the circle property',
            htmlDescription: 'Given four different properties, click on the one that is requested',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Circle Properties',
            description: 'Presentation form - interactive.',
            htmlTitle: 'Properties of a circle summary',
            htmlDescription: 'Diameter, circumference, radius and center point, and the relationships between them',
            fullLesson: true
          }
        }
      },
      dependencies: ['Introduction'],
      enabled: true
    }),
    CongruentTriangles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Congruent Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'CongruentTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Congruent triangles and how to determine congruency',
            htmlDescription: 'Introduction to congruent triangles and intuitive reasoning behind the SAS, SSA, ASA, AAS, SSS, AAA congruency tests',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Determine if two triangles are congruent',
            htmlDescription: 'Given three properties of two triangles, can you determine if they are congruent?',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of congruent triangles and SAS, SSA, ASA, AAS, SSS, AAA',
            htmlDescription: 'Facts only summary of congruent triangles and congruent triangle tests',
            fullLesson: true
          }
        }
      },
      dependencies: ['Triangles'],
      enabled: true
    }),
    Degrees: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Degrees',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Degrees',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Explanation on why we use degrees as a measure of angle',
            htmlDescription: 'How angle is measured, why use degrees and common angles in degrees',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of using degrees to measure angle',
            htmlDescription: 'History of word, interactive diagram to see different angles in degrees',
            fullLesson: true
          }
        }
      },
      dependencies: ['Angle'],
      enabled: true
    }),
    Equilateral: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Equilateral Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Equilateral',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Equilateral triangle derivation from an isosceles triangle',
            htmlDescription: 'Use isosceles triangles to show the properties of an equilateral triangle, and the relationship of its angles',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Equilateral triangle summary',
            htmlDescription: 'Interactive diagram showing properties of an equilateral triangle',
            fullLesson: true
          }
        }
      },
      dependencies: ['Isosceles'],
      enabled: true
    }),
    ExternalAngles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'External Angle of a Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ExternalAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'External angles (also called exterior angles) in a triangle explanation through presentation',
            htmlDescription: 'Proof of external angles in a triangle equalling sum of opposite internal angles',
            fullLesson: true
          },
          simple: {
            type: 'singlePage',
            title: 'Full explanation in single page',
            description: '',
            htmlTitle: 'External angles (also called exterior angles)  in a triangle as a single page explanation',
            htmlDescription: 'Proof of external angles in a triangle equalling sum of opposite internal angles',
            fullLesson: true
          }
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for External Angles of Triangles',
            htmlTitle: 'Links for external angles of a triangle',
            htmlDescription: 'Links with explanations, examples and proofs for external angles of a triangle',
            fullLesson: false
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - find the external angle of a triangle',
            htmlDescription: 'Find the external angle (also called exterior angle) in a triangle quiz',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'External angle summary',
            description: '',
            htmlTitle: 'Summary of triangle external angle (or exterior angle)',
            htmlDescription: 'Interactive diagram showing and describing the external angle of a triangle',
            fullLesson: true
          }
        }
      },
      dependencies: ['Triangles'],
      enabled: true
    }),
    ImportantAngles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Important Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ImportantAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Right Angle, Acute Angle, Obtuse Angle, Reflex Angle, Straight Angle, Full Angle',
            htmlDescription: 'Dynamic diagram that lets you explore the different types of important angles',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - set the angle to be either acute, right, obtuse, straight, reflex or full',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Degrees'],
      enabled: true
    }),
    Introduction: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Why Study Shapes?',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Introduction',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Initial',
            description: 'Presentation form - interactive.',
            htmlTitle: 'Introduction to why we should study shapes',
            htmlDescription: 'Introduction to shapes, naming, history and why we should study them',
            fullLesson: true
          },
          singlePage: {
            type: 'singlePage',
            title: 'Initial - Single Page',
            description: 'Single page form - interactive.',
            htmlTitle: 'Interactive introduction to shapes',
            htmlDescription: 'Introduction to shapes, naming, history and why we should study them',
            fullLesson: true
          }
        }
      },
      dependencies: [],
      enabled: true
    }),
    Isosceles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Isosceles Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Isosceles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Isosceles triangles and proof',
            htmlDescription: 'Proof for if two sides are equal why two angles are equal and vise versa',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the missing side or angle of an isosceles triangle',
            htmlDescription: 'Given a set of sides and angles, find the missing one',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of Isosceles triangle and its properties',
            htmlDescription: 'Isosceles triangle, side and angle equality, split line properties',
            fullLesson: true
          }
        }
      },
      dependencies: ['CongruentTriangles'],
      enabled: true
    }),
    ParallelLineDistance: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Parallel Line Distance',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelLineDistance',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to the distance between parallel lines',
            htmlDescription: 'Investigate the property of distance between parallel lines',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of parallel line distance property',
            htmlDescription: 'Parallel line distance is the length of the perpendicular line between them',
            fullLesson: true
          }
        }
      },
      dependencies: ['PointLineDistance'],
      enabled: true
    }),
    ParallelLines: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Parallel Lines',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelLines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Interactive introduction to parallel lines',
            htmlDescription: 'See what parallel lines are, and when lines are parallel',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Move lines to be parallel and find parallel lines',
            htmlDescription: 'Interactive quiz to make lines parallel, and find parallel lines in a selection of lines',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Introduction to parallel lines summary',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['AdjacentAngles'],
      enabled: true
    }),
    ParallelSplitOfTriangle: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Parallel Split of Triangle',
      path: '/Lessons/Math/Geometry_1',
      uid: 'ParallelSplitOfTriangle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Descriptive',
            description: '',
            htmlTitle: 'Splitting a triangle with a parallel line',
            htmlDescription: 'Proof that splitting a triangle with a parallel line results in a similar triangle',
            fullLesson: true
          },
          "static": {
            type: 'singlePage',
            title: 'Full Proof',
            description: 'Proof showing the resulting triangle has proportional sides',
            htmlTitle: 'Similar Triangles Proof',
            htmlDescription: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            fullLesson: true
          }
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for Parallel Split of a Triangle',
            htmlTitle: 'Links: Parallel split of a triangle',
            htmlDescription: 'External links looking at triangle proportionality and parallel splits of a triangle.',
            fullLesson: false
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'External angle summary',
            description: '',
            htmlTitle: 'Splitting a triangle with a parallel line',
            htmlDescription: 'Summary showing splitting a triangle with a parallel line results in a similar triangle',
            fullLesson: true
          }
        }
      },
      dependencies: ['ParallelLineDistance'],
      enabled: true
    }),
    PointLineDistance: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Point to Line Distance',
      path: '/Lessons/Math/Geometry_1',
      uid: 'PointLineDistance',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to distance between a point and line',
            htmlDescription: 'Properties of distance between point and a line',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of point line distance property',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['RightAngleTriangles'],
      enabled: true
    }),
    Quadrangles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Quadrangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Quadrangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to quadrangles and quadrilaterals',
            htmlDescription: 'Quadrangles, quadrilaterals and their properties',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle in the quadrangle',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quadrangles (quadrilaterals) summary',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Triangles'],
      enabled: true
    }),
    Radians: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Radians',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Radians',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to radians and why we use them',
            htmlDescription: 'Radians and their relationship with arc length and radius',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz: Find the arc or angle that matches the target',
            htmlDescription: 'Interactive quiz where you can change the diagram to find the target angle or arc length',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of what radians are and their relationship to radius and arc length',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Degrees'],
      enabled: true
    }),
    RectanglesAndSquares: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Rectangles and Squares',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RectanglesAndSquares',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to rectangles and squares and derivation of their properties',
            htmlDescription: 'Proof showing why a rectangles opposite sides are equal and parallel',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of rectangle and square properties',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Quadrangles', 'CongruentTriangles'],
      enabled: true
    }),
    RelatedAngles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Related Angles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RelatedAngles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Opposite angles, corresponding angles, alternate angles and interior angles',
            htmlDescription: 'Introduction to opposite, corresponding, alternate and interior angles and their proofs',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle in a system of opposite, corresponding, alternate and interior angles',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of opposite, corresponding, adjacent and interior angles',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['ParallelLines'],
      enabled: true
    }),
    RightAngleTriangles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Right Angle Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'RightAngleTriangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: 'Properties of right angle triangles, and the Pythagorean theorem.',
            htmlTitle: 'Right angle triangle introduction and pythagoean theorem proof',
            htmlDescription: 'Right angle triangle introduction, hypotenuse, area and pythagorean theorem derivation.',
            fullLesson: true
          },
          pythagorus_proof: {
            type: 'singlePage',
            title: 'Derivation of Pythagorean Theorem',
            description: 'Derivation using area of four right angle triangles',
            htmlTitle: 'Pythagorean Theorem Derivation',
            htmlDescription: 'Derivation using area of four right angle triangles',
            fullLesson: false
          }
        },
        links: {
          base: {
            type: 'generic',
            title: 'External',
            description: 'External links to sources of information for Right Angle Triangles',
            htmlTitle: 'Links for Right Angle Triangles',
            htmlDescription: 'External explanations of right angle triangles',
            fullLesson: false
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Find the Unknown Angle',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle, side or area in a right angle triangle.',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Properties',
            description: '',
            htmlTitle: 'Right Angle Triangle Summary',
            htmlDescription: 'Right angle triangle definition including hypotenuse, area and pythagorean theorem.',
            fullLesson: true
          }
        }
      },
      dependencies: ['AreaTriangle'],
      enabled: true
    }),
    SideAngleRelationship: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Side Angle Relationships',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SideAngleRelationship',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to relationship between triangle side length and angle',
            htmlDescription: 'Proof of why larger angles are opposite longer sides in a triangle',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the largest or smallest side or angle',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of relationship between side and angle in a triangle',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Isosceles'],
      enabled: true
    }),
    SideSideSide: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Side-Side-Side Congruency',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SideSideSide',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Proof for Side Side Side triangle congruency',
            htmlDescription: 'Proof for SSS or side-side-side congruent triangles',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Congruent triangles by SSS Summary',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Isosceles'],
      enabled: true
    }),
    SimilarTriangles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Similar Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'SimilarTriangles',
      topics: {
        explanation: {
          equilangularIsSimilarProof: {
            type: 'singlePage',
            title: 'Equilangular Triangles are Similar - Proof 2',
            description: 'Proof showing why equiangular triangles are proportional triangles and therefore similar',
            htmlTitle: 'Equilangular Triangles are Similar Proof',
            htmlDescription: 'Proof showing why equiangular triangles are proportional triangles and therefore similar',
            fullLesson: false
          },
          equilangularProofBrief: {
            type: 'singlePage',
            title: 'Equilangular Triangles are Similar - Proof 2 (Brief)',
            description: 'Succinct proof showing why equiangular triangles, are proportional triangles and therefore similar',
            htmlTitle: 'Triangles with equal angles are similar proof',
            htmlDescription: 'Succinct proof showing why equiangular triangles, are proportional triangles and therefore similar',
            fullLesson: false
          },
          "static": {
            type: 'singlePage',
            title: 'Descriptive',
            description: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            htmlTitle: 'Similar Triangles Proof',
            htmlDescription: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            fullLesson: true
          },
          staticBrief: {
            type: 'singlePage',
            title: 'In Brief',
            description: 'Succinct proofs showing why equiangular triangles, and proportional triangles are similar',
            htmlTitle: 'Similar Triangles Proof',
            htmlDescription: 'Proofs showing why equiangular triangles, and proportional triangles are similar',
            fullLesson: true
          }
        },
        links: {
          base: {
            type: 'generic',
            title: 'External Links',
            description: 'External links to sources of information for Similar Triangles',
            htmlTitle: 'Similar Triangles Links',
            htmlDescription: 'Explanations, proofs, examples and questions about Similar Triangles>',
            fullLesson: false
          }
        }
      },
      dependencies: ['ParallelSplitOfTriangle'],
      enabled: false
    }),
    CalculatingPi: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Calculating Pi',
      path: '/Lessons/Math/Geometry_1/ToDo',
      uid: 'CalculatingPi',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['RightAngleTriangles'],
      enabled: false
    }),
    Triangles: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Triangles',
      path: '/Lessons/Math/Geometry_1',
      uid: 'Triangles',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Full explanation',
            description: '',
            htmlTitle: 'Introduction to triangles and their properties',
            htmlDescription: 'Proof that triangle total angle equals 180º',
            fullLesson: true
          }
        },
        quiz: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Quiz - Find the unknown angle in the triangle',
            htmlDescription: 'Dynamic quiz where no two questions are the same',
            fullLesson: true
          }
        },
        summary: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: 'Summary of triangles and their properties',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['RelatedAngles'],
      enabled: true
    }),
    Chord: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Chord',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Chord',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Sine'],
      enabled: false
    }),
    Cosecant: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Cosecant',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cosecant',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Secant'],
      enabled: false
    }),
    Cosine: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Cosine',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cosine',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Sine'],
      enabled: false
    }),
    Cotangent: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Cotangent',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Cotangent',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Pythagoras'],
      enabled: false
    }),
    LawOfCosines: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Law of Cosines',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'LawOfCosines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['LawOfSines'],
      enabled: false
    }),
    LawOfSines: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Law of Sines',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'LawOfSines',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Pythagoras'],
      enabled: false
    }),
    Pythagoras: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Pythagorean Identity',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Pythagoras',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Tangent'],
      enabled: false
    }),
    Secant: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Secant',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Secant',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Pythagoras'],
      enabled: false
    }),
    Sine: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Sine',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Sine',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['UnitCircle'],
      enabled: false
    }),
    Tangent: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Tangent',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'Tangent',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: ['Chord'],
      enabled: false
    }),
    UnitCircle: new _js_Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Unit Circle',
      path: '/Lessons/Math/Trigonometry_1',
      uid: 'UnitCircle',
      topics: {
        explanation: {
          base: {
            type: 'presentation',
            title: 'Base',
            description: '',
            htmlTitle: '',
            htmlDescription: '',
            fullLesson: true
          }
        }
      },
      dependencies: [],
      enabled: false
    })
  };
  return lessonIndex;
}

/***/ }),

/***/ "./src/Lessons/LessonsCommon/tools/definition.js":
/*!*******************************************************!*\
  !*** ./src/Lessons/LessonsCommon/tools/definition.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Definition; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var _Fig$tools$misc = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc,
    generateUniqueId = _Fig$tools$misc.generateUniqueId,
    joinObjects = _Fig$tools$misc.joinObjects;
var colorArrayToRGBA = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.color.colorArrayToRGBA;

var Root = function Root(rootWord, meaning) {
  _classCallCheck(this, Root);

  this.root = rootWord;
  this.meaning = meaning;
};

var specialWords = {
  WHERE: 'where',
  AND: 'and',
  MEANING: 'meaning',
  MEANS: 'means'
};

var SpecialWord = function SpecialWord(word) {
  _classCallCheck(this, SpecialWord);

  this.word = specialWords[word];
};

var FromLanguage = function FromLanguage(language) {
  var roots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, FromLanguage);

  this.language = language;
  this.roots = [];

  for (var i = 0; i < roots.length; i += 1) {
    var rootWord = roots[i];

    if (specialWords[rootWord] != null) {
      this.roots.push(new SpecialWord(rootWord));
    } else {
      var rootWordMeaning = '';

      if (i + 1 < roots.length) {
        if (specialWords[roots[i + 1]] != null) {
          this.roots.push(new Root(rootWord, rootWordMeaning));
          this.roots.push(new SpecialWord(roots[i + 1]));
        } else {
          rootWordMeaning = roots[i + 1];
          this.roots.push(new Root(rootWord, rootWordMeaning));
        }
      }

      i += 1;
    }
  } // roots.forEach((rootWord, index) => {
  //   if (specialWords[rootWord] != null) {
  //     this.roots.push(new SpecialWord(rootWord));
  //   } else {
  //   }
  //   if (index % 2 === 0 && roots.length >= index) {
  //     this.roots.push(new Root(roots[index], roots[index + 1]));
  //   }
  // });

}; // new Definition(
//   'Supplementary',
//   'Latin', ['supplementum', 'fill up or complete'],
//   'Greek', ['suppl', 'super', 'mentum', 'man'],
// )


var Definition =
/*#__PURE__*/
function () {
  function Definition() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Definition);

    this.word = '';
    this.from = [];
    args.forEach(function (arg, index) {
      if (index === 0 && typeof arg === 'string') {
        _this.word = arg;
      }

      if (index % 2 === 1 && args.length >= index) {
        var roots = args[index + 1];

        if (typeof arg === 'string' && Array.isArray(roots)) {
          _this.from.push(new FromLanguage(arg, roots));
        }
      }
    });
  }

  _createClass(Definition, [{
    key: "html",
    value: function html() {
      var optionsIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultOptions = {
        id: generateUniqueId('definition'),
        classes: '',
        wordClass: '',
        color: ''
      };
      var options = defaultOptions;

      if (Array.isArray(optionsIn)) {
        defaultOptions.color = colorArrayToRGBA(optionsIn);
      } else {
        options = joinObjects(defaultOptions, optionsIn);
      }

      if (Array.isArray(options.color)) {
        options.color = colorArrayToRGBA(options.color);
      }

      var _options = options,
          id = _options.id,
          classes = _options.classes;
      var outStr = '';
      outStr += "<div id=\"".concat(id, "\" class=\"lesson__definition_container ").concat(classes, "\">");
      var style = '';

      if (options.color) {
        style = " style=\"color:".concat(options.color, "\"");
      }

      outStr += "<span class=\"lesson__definition_word ".concat(options.wordClass, "\"").concat(style, ">");
      outStr += this.word;
      outStr += '</span>';
      this.from.forEach(function (fromLanguage) {
        var lang = "lesson__".concat(fromLanguage.language.toLowerCase());
        lang = lang.replace(/ /g, '_');
        outStr += " - from <span class=\"".concat("\">", fromLanguage.language, "</span> ");
        fromLanguage.roots.forEach(function (root, index) {
          if (root instanceof Root) {
            outStr += "<span class=\"lesson__definition_root ".concat(lang, "\">");
            outStr += "".concat(root.root);
            outStr += '</span>'; // outStr += '';

            if (root.meaning) {
              if (root.root) {
                outStr += ': ';
              }

              outStr += "<span class=\"lesson__definition_meaning\">".concat(root.meaning, "</span>");
            }

            if (fromLanguage.roots.length > index + 1 && fromLanguage.roots[index + 1] instanceof Root) {
              outStr += ', ';
            }
          } else {
            outStr += " ".concat(root.word, " ");
          }
        });
      });
      outStr += '</div>';
      return outStr;
    }
  }, {
    key: "element",
    value: function element(id) {
      var container = document.createElement('div');
      container.classList.add('lesson__definition_container');
      container.id = id;
      var word = document.createElement('span');
      word.innerHTML = this.word;
      word.classList.add('lesson__definition_word');
      container.appendChild(word);
      this.from.forEach(function (fromLanguage) {
        var language = document.createElement('span');
        language.innerHTML = "from ".concat(fromLanguage.language, " ");
        container.appendChild(language);
        var roots = fromLanguage.roots;
        roots.forEach(function (rootWord, index) {
          var rootElement = document.createElement('span');

          if (rootWord.root != null && typeof rootWord.root === 'string') {
            rootElement.innerHTML = rootWord.root;
          }

          rootElement.classList.add('lesson__definition_root');
          container.appendChild(rootElement);
          var meaningElement = document.createElement('span');
          meaningElement.classList.add('lesson__definition_meaning');

          if (rootWord.meaning != null && typeof rootWord.meaning === 'string') {
            var meaningString = "\"".concat(rootWord.meaning, "\"");

            if (roots.length > index + 1) {
              meaningString += ',';
            }

            meaningElement.innerHTML = meaningString;
          }

          container.appendChild(meaningElement);
        });
      });
      return container;
    }
  }]);

  return Definition;
}();



/***/ }),

/***/ "./src/Lessons/LessonsCommon/tools/selector.js":
/*!*****************************************************!*\
  !*** ./src/Lessons/LessonsCommon/tools/selector.js ***!
  \*****************************************************/
/*! exports provided: SelectorList, SelectorHTML, HorizontalSelectorHTML, VerticalSelectorHTML, addSelectorHTML, makeSelectorText, makeVerticalSelectorText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorList", function() { return SelectorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectorHTML", function() { return SelectorHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalSelectorHTML", function() { return HorizontalSelectorHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerticalSelectorHTML", function() { return VerticalSelectorHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSelectorHTML", function() { return addSelectorHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSelectorText", function() { return makeSelectorText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeVerticalSelectorText", function() { return makeVerticalSelectorText; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/Lessons/LessonsCommon/layout.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DiagramElementCollection = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementCollection,
    Diagram = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Diagram,
    DiagramFont = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramFont,
    Point = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Point,
    Transform = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Transform;
var RGBToArray = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.color.RGBToArray;
var layout = Object(_layout__WEBPACK_IMPORTED_MODULE_1__["default"])();
var SelectorList =
/*#__PURE__*/
function () {
  function SelectorList() {
    _classCallCheck(this, SelectorList);

    this.content = {};
    this.order = [];
  }

  _createClass(SelectorList, [{
    key: "add",
    value: function add(id, text) {
      var subText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var selectorItem = {
        id: id,
        text: text,
        subText: subText
      };
      this.content[id] = selectorItem;
      this.order.push(selectorItem);
    }
  }]);

  return SelectorList;
}();

function selectorHandler(listId, htmlId, cols, onclick) {
  var subTextCols = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'horizontal';
  var selectedId = "".concat(htmlId, "__").concat(listId);
  cols.forEach(function (col, index) {
    if (col.id !== selectedId) {
      col.classList.remove('lesson__selector_title_selected');
      col.classList.add('lesson__selector_title_not_selected');
      var subTextCol = subTextCols[index];

      if (subTextCol && type === 'vertical') {
        subTextCol.classList.add('lesson__vertical_selector_table_subtext__hide');
        col.classList.remove('lesson__vertical_selector_table_cell_with_subtext');
      }

      if (type === 'horizontal') {
        subTextCol.classList.remove('lesson__horizontal_selector_table_subtext_selected');
      }
    } else {
      col.classList.add('lesson__selector_title_selected');
      col.classList.remove('lesson__selector_title_not_selected');
      var _subTextCol = subTextCols[index];

      if (_subTextCol.innerHTML !== '' && type === 'vertical') {
        _subTextCol.classList.remove('lesson__vertical_selector_table_subtext__hide');

        col.classList.add('lesson__vertical_selector_table_cell_with_subtext');
      }

      if (type === 'horizontal') {
        _subTextCol.classList.add('lesson__horizontal_selector_table_subtext_selected');
      } // }

    }
  });
  onclick(listId);
} // export function makeSelectorHTML(
//   selectorItems: SelectorList,
//   firstSelection: string = selectorItems.order[0].id,
//   id: string = 'id__lesson_selector',
//   diagram: Diagram,
//   onclick: Function,
//   yPosition: number = diagram.limits.top - diagram.limits.height / 2,
//   separator: string = '',
// ) {
//   const table = document.createElement('table');
//   table.classList.add('lesson__selector_table');
//   const row = document.createElement('tr');
//   const cols: Array<HTMLElement> = [];
//   const numKeys = selectorItems.order.length;
//   selectorItems.order.forEach((selectorItem, index) => {
//     const col = document.createElement('td');
//     col.innerHTML = selectorItem.text;
//     col.id = `${id}__${selectorItem.id}`;
//     col.onclick = selectorHandler.bind(this, selectorItem.id, id, cols, onclick);
//     col.classList.add('lesson__selector_title_not_selected');
//     col.classList.add('lesson__selector_table_selectable');
//     col.classList.add('lesson__vertical_selector_table_cell');
//     cols.push(col);
//     row.appendChild(col);
//     if (separator !== '' && index < numKeys - 1) {
//       const sep = document.createElement('td');
//       sep.innerHTML = '/';
//       sep.style.paddingLeft = '0';
//       sep.style.paddingRight = '0';
//       row.appendChild(sep);
//     }
//   });
//   table.appendChild(row);
//   const selector = diagram.shapes.htmlElement(table, id, 'lesson__selector_container');
//   selector.setPosition(diagram.limits.left, yPosition);
//   selectorHandler(firstSelection, id, cols, onclick);
//   return selector;
// }
// export function makeVerticalSelectorHTML(
//   selectorItems: SelectorList,
//   firstSelection: string = selectorItems.order[0].id,
//   id: string = 'id__lesson_selector',
//   diagram: Diagram,
//   onclick: Function,
// ) {
//   const table = document.createElement('table');
//   table.classList.add('lesson__vertical_selector_table');
//   const cols: Array<HTMLElement> = [];
//   selectorItems.order.forEach((selectorItem) => {
//     const row = document.createElement('tr');
//     const col = document.createElement('td');
//     col.innerHTML = selectorItem.text;
//     col.id = `${id}__${selectorItem.id}`;
//     col.onclick = selectorHandler.bind(this, selectorItem.id, id, cols, onclick);
//     col.classList.add('lesson__selector_title_not_selected');
//     col.classList.add('lesson__selector_table_selectable');
//     col.classList.add('lesson__vertical_selector_table_cell');
//     cols.push(col);
//     row.appendChild(col);
//     table.appendChild(row);
//   });
//   const selector = diagram.shapes.htmlElement(table, id, 'lesson__selector_container');
//   selector.setPosition(0, 0);
//   selectorHandler(firstSelection, id, cols, onclick);
//   return selector;
// }


var SelectorHTML =
/*#__PURE__*/
function () {
  function SelectorHTML() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id__lesson_selector';
    var onclick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    _classCallCheck(this, SelectorHTML);

    this.list = new SelectorList();
    this.table = document.createElement('table'); // this.table.classList.add('lesson__vertical_selector_table');

    this.id = id;
    this.onclick = onclick;
    this.titleElements = [];
    this.subTextElements = [];
    this.type = 'horizontal';
  }

  _createClass(SelectorHTML, [{
    key: "select",
    value: function select(listId) {
      selectorHandler(listId, this.id, this.titleElements, this.onclick, this.subTextElements, this.type);
    }
  }, {
    key: "selectWithoutExecution",
    value: function selectWithoutExecution(listId) {
      selectorHandler(listId, this.id, this.titleElements, function () {}, this.subTextElements, this.type);
    }
  }]);

  return SelectorHTML;
}();
var HorizontalSelectorHTML =
/*#__PURE__*/
function (_SelectorHTML) {
  _inherits(HorizontalSelectorHTML, _SelectorHTML);

  function HorizontalSelectorHTML() {
    var _this;

    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id__lesson_horizontal_selector';
    var onclick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, HorizontalSelectorHTML);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HorizontalSelectorHTML).call(this, id, onclick));

    _this.table.classList.add('lesson__horizontal_selector_table');

    _this.titleRow = document.createElement('tr');

    _this.table.appendChild(_this.titleRow);

    _this.subTextRow = document.createElement('tr');

    _this.table.appendChild(_this.subTextRow);

    _this.type = 'horizontal';
    _this.separator = separator;
    return _this;
  }

  _createClass(HorizontalSelectorHTML, [{
    key: "add",
    value: function add(listId, text) {
      var subText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (this.separator && this.list.order.length > 0) {
        var sepTitleCol = document.createElement('td');
        sepTitleCol.innerHTML = this.separator;
        sepTitleCol.classList.add('lesson__horiztonal_selector_table_separator_cell');
        this.titleElements.push(sepTitleCol);
        this.titleRow.appendChild(sepTitleCol);
        var sepSubTextCol = document.createElement('td');
        this.subTextElements.push(sepSubTextCol);
        this.subTextRow.appendChild(sepSubTextCol);
      }

      this.list.add(listId, text, subText);
      var newItem = this.list.order.slice(-1)[0];
      var titleCol = document.createElement('td');
      titleCol.innerHTML = newItem.text;
      titleCol.id = "".concat(this.id, "__").concat(newItem.id);
      titleCol.onclick = selectorHandler.bind(this, newItem.id, this.id, this.titleElements, this.onclick, this.subTextElements, this.type);
      titleCol.classList.add('lesson__selector_title_not_selected');
      titleCol.classList.add('lesson__selector_table_selectable');
      titleCol.classList.add('lesson__horiztonal_selector_table_cell');
      this.titleElements.push(titleCol);
      this.titleRow.appendChild(titleCol);
      var subTextCol = document.createElement('td');
      subTextCol.innerHTML = newItem.subText;
      subTextCol.id = "".concat(this.id, "__").concat(newItem.id, "__subtext");
      subTextCol.classList.add('lesson__horizontal_selector_table_subtext');
      this.subTextElements.push(subTextCol);
      this.subTextRow.appendChild(subTextCol);
    }
  }]);

  return HorizontalSelectorHTML;
}(SelectorHTML);
var VerticalSelectorHTML =
/*#__PURE__*/
function (_SelectorHTML2) {
  _inherits(VerticalSelectorHTML, _SelectorHTML2);

  function VerticalSelectorHTML() {
    var _this2;

    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id__lesson_selector';
    var onclick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    _classCallCheck(this, VerticalSelectorHTML);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(VerticalSelectorHTML).call(this, id, onclick));

    _this2.table.classList.add('lesson__vertical_selector_table');

    _this2.type = 'vertical';
    return _this2;
  }

  _createClass(VerticalSelectorHTML, [{
    key: "add",
    value: function add(listId, text) {
      var subText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      this.list.add(listId, text, subText);
      var newItem = this.list.order.slice(-1)[0];
      var titleRow = document.createElement('tr');
      var titleCol = document.createElement('td');
      titleCol.innerHTML = newItem.text;
      titleCol.id = "".concat(this.id, "__").concat(newItem.id);
      titleCol.onclick = selectorHandler.bind(this, newItem.id, this.id, this.titleElements, this.onclick, this.subTextElements, this.type);
      titleCol.classList.add('lesson__selector_title_not_selected');
      titleCol.classList.add('lesson__selector_table_selectable');
      titleCol.classList.add('lesson__vertical_selector_table_cell');
      this.titleElements.push(titleCol);
      titleRow.appendChild(titleCol);
      this.table.appendChild(titleRow);
      var subTextRow = document.createElement('tr');
      var subTextCol = document.createElement('td');
      subTextCol.innerHTML = newItem.subText;
      subTextCol.id = "".concat(this.id, "__").concat(newItem.id, "__subtext");
      subTextCol.classList.add('lesson__vertical_selector_table_subtext');
      subTextCol.classList.add('lesson__vertical_selector_table_subtext__hide');
      this.subTextElements.push(subTextCol);
      subTextRow.appendChild(subTextCol);
      this.table.appendChild(subTextRow);
    }
  }]);

  return VerticalSelectorHTML;
}(SelectorHTML);
function addSelectorHTML(diagram, collection, elementName, uniqueString, onclick) {
  var style = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'horizontal';
  var separator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
  var vAlign = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'middle';
  var hAlign = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'center';
  var selector;

  if (style === 'vertical') {
    selector = new VerticalSelectorHTML("id_".concat(uniqueString), onclick);
  } else {
    selector = new HorizontalSelectorHTML("id_".concat(uniqueString), onclick, separator);
  }

  var element = diagram.shapes.htmlElement(selector.table, "".concat(uniqueString), 'lesson__selector_container', new Point(0, 0), vAlign, hAlign);
  element.selector = selector;
  collection.add(elementName, element);
} // export function makeExpandingVerticalSelectorHTML(
//   selectorItems: SelectorList,
//   firstSelection: string = selectorItems.order[0].id,
//   id: string = 'id__lesson_selector',
//   diagram: Diagram,
//   onclick: Function,
// ) {
//   const table = document.createElement('table');
//   table.classList.add('lesson__vertical_selector_table');
//   const cols: Array<HTMLElement> = [];
//   const subTextCols: Array<?HTMLElement> = [];
//   selectorItems.order.forEach((selectorItem) => {
//     const row = document.createElement('tr');
//     const col = document.createElement('td');
//     col.innerHTML = selectorItem.text;
//     col.id = `${id}__${selectorItem.id}`;
//     col.onclick = selectorHandler.bind(this, selectorItem.id, id, cols, onclick, subTextCols);
//     col.classList.add('lesson__selector_title_not_selected');
//     col.classList.add('lesson__selector_table_selectable');
//     col.classList.add('lesson__vertical_selector_table_cell');
//     cols.push(col);
//     row.appendChild(col);
//     table.appendChild(row);
//     if (selectorItem.subText) {
//       const rowSub = document.createElement('tr');
//       const colSub = document.createElement('td');
//       colSub.innerHTML = selectorItem.subText;
//       colSub.id = `${id}__${selectorItem.id}__subtext`;
//       colSub.classList.add('lesson__selector_table_subtext');
//       colSub.classList.add('lesson__selector_table_subtext__hide');
//       subTextCols.push(colSub);
//       rowSub.appendChild(colSub);
//       table.appendChild(rowSub);
//     } else {
//       subTextCols.push(null);
//     }
//   });
//   const selector = diagram.shapes.htmlElement(table, id, 'lesson__selector_container');
//   selector.setPosition(0, 0);
//   selectorHandler(firstSelection, id, cols, onclick, subTextCols);
//   return selector;
// }

function makeSelectorText(selectorItems) {
  var _this3 = this;

  var firstSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selectorItems.order[0].id;
  var diagram = arguments.length > 2 ? arguments[2] : undefined;
  var onclick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var yPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : diagram.limits.top - diagram.limits.height / 2;
  var font = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : layout.defaultFont;
  var selectedColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : layout.colors.diagram.text.base;
  var separator = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
  var spacing = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
  var selector = diagram.shapes.collection(new Transform().translate(0, 0));
  var width = 0;
  var widthRecord = [];
  var disabledColor = font.color;

  if (typeof disabledColor === 'string') {
    disabledColor = RGBToArray(disabledColor).slice();
  } else if (disabledColor == null) {
    disabledColor = [0.5, 0.5, 0.5, 1];
  } else {
    disabledColor = disabledColor.slice();
  }

  var selectorHandlerText = function selectorHandlerText(id) {
    selector.setColor(disabledColor);
    selector["_".concat(id)].setColor(selectedColor.slice());
    onclick(id);
    diagram.animateNextFrame();
  };

  var numTitles = selectorItems.order.length;
  selectorItems.order.forEach(function (selectorItem, index) {
    var text = diagram.shapes.text(selectorItem.text, new Point(0, 0), disabledColor, font);
    text.setFirstTransform(diagram.spaceTransforms.diagramToGL);
    text.isTouchable = true;
    text.onClick = selectorHandlerText.bind(_this3, selectorItem.id);
    var bounds = text.getRelativeDiagramBoundingRect();
    width += bounds.width;
    widthRecord.push(bounds.width);
    selector.add(selectorItem.id, text);

    if (separator !== '' && index < numTitles - 1) {
      var sep = diagram.shapes.text(separator, new Point(0, 0), disabledColor, font);
      sep.setFirstTransform(diagram.spaceTransforms.diagramToGL);
      var sepBounds = sep.getRelativeDiagramBoundingRect();
      width += sepBounds.width;
      widthRecord.push(sepBounds.width);
      selector.add("sep".concat(index), sep);
    }
  });
  var space = 0;

  if (spacing == null) {
    space = (diagram.limits.width - width) / numTitles;
  } else {
    space = spacing;
  }

  var x = 0 - width / 2 - space * numTitles / 2;
  selector.drawOrder.forEach(function (key, index) {
    var element = selector.elements[key];

    if (separator !== '' && index % 2 === 1) {
      element.setPosition(x + widthRecord[index] / 2, 0);
      x += widthRecord[index];
    } else {
      element.setPosition(x + widthRecord[index] / 2 + space / 2, 0);
      x += widthRecord[index] + space;
    }
  });
  selector.hasTouchableElements = true;
  selector.setPosition(0, yPosition);
  selectorHandlerText(firstSelection);

  selector.select = function (selection) {
    return selectorHandlerText(selection);
  };

  return selector;
}
function makeVerticalSelectorText(selectorItems) {
  var _this4 = this;

  var firstSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selectorItems.order[0].id;
  var diagram = arguments.length > 2 ? arguments[2] : undefined;
  var onclick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : layout.defaultFont;
  var selectedColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : layout.colors.diagram.text.base;
  var spacing = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var selector = diagram.shapes.collection(new Transform().translate(0, 0));
  var height = 0;
  var heightRecord = [];
  var disabledColor = font.color;

  if (typeof disabledColor === 'string') {
    disabledColor = RGBToArray(disabledColor).slice();
  } else if (disabledColor == null) {
    disabledColor = [0.5, 0.5, 0.5, 1];
  } else {
    disabledColor = disabledColor.slice();
  }

  var selectorHandlerText = function selectorHandlerText(id) {
    selector.setColor(disabledColor);
    selector["_".concat(id)].setColor(selectedColor.slice());
    onclick(id);
    diagram.animateNextFrame();
  };

  var numTitles = selectorItems.order.length;
  selectorItems.order.forEach(function (selectorItem) {
    var text = diagram.shapes.text(selectorItem.text, new Point(0, 0), disabledColor, font);
    text.setFirstTransform(diagram.spaceTransforms.diagramToGL);
    text.isTouchable = true;
    text.onClick = selectorHandlerText.bind(_this4, selectorItem.id);
    var bounds = text.getRelativeDiagramBoundingRect();
    height += bounds.height;
    heightRecord.push(bounds.height);
    selector.add(selectorItem.id, text);
  });
  var space = 0;

  if (spacing == null) {
    space = (diagram.limits.height - height) / numTitles;
  } else {
    space = spacing;
  }

  var y = 0;
  selector.order.forEach(function (key, index) {
    var element = selector.elements[key];
    element.setPosition(0, y - heightRecord[index] / 2 - space / 2);
    y -= heightRecord[index] + space; // }
  });
  selector.hasTouchableElements = true;
  selectorHandlerText(firstSelection);
  return selector;
}

/***/ })

}]);
//# sourceMappingURL=commonlessons.js.map