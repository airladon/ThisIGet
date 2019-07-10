(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tools"],{

/***/ "./src/js/Lesson/LinksLesson.js":
/*!**************************************!*\
  !*** ./src/js/Lesson/LinksLesson.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleLesson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SimpleLesson */ "./src/js/Lesson/SimpleLesson.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import Fig from 'figureone';
// import SimpleLessonContent from './SimpleLessonContent';
// import { PresentationLessonContent } from './PresentationLessonContent';
// import Diagram from '../diagram/Diagram';
// const { Diagram } = Fig;

var LinksLesson =
/*#__PURE__*/
function (_SimpleLesson) {
  _inherits(LinksLesson, _SimpleLesson);

  function LinksLesson(content) {
    var _this;

    _classCallCheck(this, LinksLesson);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinksLesson).call(this, content));
    _this.type = 'links';
    return _this;
  }

  return LinksLesson;
}(_SimpleLesson__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (LinksLesson);

/***/ }),

/***/ "./src/js/Lesson/PresentationLesson.js":
/*!*********************************************!*\
  !*** ./src/js/Lesson/PresentationLesson.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PresentationLessonContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PresentationLessonContent */ "./src/js/Lesson/PresentationLessonContent.js");
/* harmony import */ var _SimpleLesson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SimpleLesson */ "./src/js/Lesson/SimpleLesson.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // import Diagram from '../diagram/Diagram';

var Diagram = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Diagram;

function hideInfoButton() {
  var infoButton = document.getElementById('id_lesson__info_button');

  if (infoButton instanceof HTMLElement) {
    infoButton.classList.add('lesson__info_hide');
  }
}

function hideInteractiveHighlightButton() {
  var interactiveHighlightButton = document.getElementById('id_lesson__interactive_element_button');

  if (interactiveHighlightButton instanceof HTMLElement) {
    interactiveHighlightButton.classList.add('lesson__interactive_element_button__hide');
  }
} // Flow:
//
//  Coming from any section
//    - setEnterState               Guaranteed
//    - showOnly                    Guaranteed
//    - hideOnly                    Guaranteed
//    - show                        Guaranteed
//    - hide                        Guaranteed
//    - transitionFromPrev/Next     Can be cancelled
//    - transitionFromAny           Can be cancelled / skipped
//    - setPlannedPositions?        Can be cancelled / skipped
//    - setSteadyState              Can be skipped
//
//  Go to next, prev or goTo
//    - transitionToPrev/Next       Can be cancelled / skipped
//    - transitionToAny             Can be cancelled / skipped
//    - saveState                   Guaranteed
//    - setLeaveState               Guaranteed
// Flow of when a page is first loaded
// Rect Component finishes mounting
//    gotoSection
//    transitionToAny
//    finishTransitionToAny
//    setLeaveStateAndMoveToNextSection
//    setLeaveState
//    refresh -> lesson.refreshText called with setState callback
//               callback is then called on lesson.component update complete
//
//  When lesson.component is finished updating
//    setState
//       setEnterState
//    transitionFromAny
//    finishTransitionFromAny
//    refresh -> lesson.refreshText called with componentUpdateComplete
//
//  When lesson.component is finished updating
//    componentUpdateComplete
//      setOnclicks
//      setSteadyState
//      setInfoButton
//      setInteractiveElements
//
//  Then ratings will be received asynchronously causing another react
//  component state update, meaning the onclicks need to be set again.


var PresentationLesson =
/*#__PURE__*/
function (_SimpleLesson) {
  _inherits(PresentationLesson, _SimpleLesson);

  // overlayDiagram: Diagram | null;
  // type: string;
  function PresentationLesson(content) {
    var _this;

    _classCallCheck(this, PresentationLesson);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PresentationLesson).call(this, content)); // this.content = content;

    _this.diagram = null; // this.overlayDiagram = null;

    _this.currentSectionIndex = 0;
    _this.firstPageShown = true;
    _this.state = {};
    _this.inTransition = false;
    window.presentationLessonTransitionStatus = 'noSteady';

    _this.refresh = function () {}; // eslint-disable-line func-names


    _this.comingFrom = '';
    _this.transitionCancelled = false;
    _this.goToSectionIndex = 0;
    _this.type = 'presentation';
    return _this;
  }

  _createClass(PresentationLesson, [{
    key: "getContentHtml",
    value: function getContentHtml() {
      var htmlText = '';
      var section = this.content.sections[this.currentSectionIndex];
      htmlText = section.getContent();
      return htmlText;
    }
  }, {
    key: "nextSection",
    value: function nextSection() {
      var diagram = this.diagram;
      window.presentationLessonTransitionStatus = 'notSteady';

      if (this.currentSectionIndex < this.content.sections.length - 1 && diagram) {
        // If in transition, then cancel the transition.
        if (this.inTransition) {
          var firstPageShown = this.firstPageShown;
          var comingFrom = this.comingFrom;
          this.stopTransition();

          if (comingFrom === 'prev' || firstPageShown) {
            return;
          }
        } else {
          // Stop diagrams if not in transition to stop any animations.
          this.stopDiagrams();
        }

        this.firstPageShown = false;

        if (this.currentSection().blankTransition.toNext) {
          this.refresh('', this.currentSectionIndex);
        }

        this.content.toggleInfo(false); // this.currentSection().goingTo = 'next';
        // this.sections.[this.currentSectionIndex + 1].comingFrom = 'prev';

        this.transitionStart('prev');
        this.goToSectionIndex = this.currentSectionIndex + 1;
        this.currentSection().transitionToNext(this.finishTransToNextOrPrev.bind(this));
      }

      this.renderDiagrams();
    }
  }, {
    key: "prevSection",
    value: function prevSection() {
      var diagram = this.diagram;
      window.presentationLessonTransitionStatus = 'notSteady';

      if (this.currentSectionIndex > 0 && diagram) {
        if (this.inTransition) {
          var comingFrom = this.comingFrom;
          var firstPageShown = this.firstPageShown;
          this.stopTransition();

          if (comingFrom === 'next' || firstPageShown) {
            return;
          }
        } else {
          this.stopDiagrams();
        }

        this.firstPageShown = false;

        if (this.currentSection().blankTransition.toNext) {
          this.refresh('', this.currentSectionIndex);
        } // this.currentSection().goingTo = 'prev';
        // this.sections.[this.currentSectionIndex + 1].comingFrom = 'next';


        this.content.toggleInfo(false);
        this.transitionStart('next');
        this.goToSectionIndex = this.currentSectionIndex - 1;

        if (this.content.sections[this.currentSectionIndex - 1].skipWhenComingFromNext) {
          if (this.currentSectionIndex - 1 > 0) {
            this.goToSectionIndex = this.currentSectionIndex - 2;
          }
        }

        this.currentSection().transitionToPrev(this.finishTransToNextOrPrev.bind(this));
      }

      this.renderDiagrams();
    }
  }, {
    key: "goToSection",
    value: function goToSection(sectionId) {
      window.presentationLessonTransitionStatus = 'notSteady'; // console.log('goToSection')

      var sectionIndex = 0;

      if (typeof sectionId === 'number') {
        sectionIndex = sectionId;
      } else {
        this.content.sections.forEach(function (section, index) {
          if (section.title === sectionId) {
            sectionIndex = index;
          }
        });
      } // this.firstPageShown = false;


      if (sectionIndex >= 0 && sectionIndex < this.content.sections.length) {
        if (this.inTransition) {
          this.stopTransition();

          if (this.firstPageShown) {
            this.firstPageShown = false;
          }
        } else {
          this.stopDiagrams();
        } // this.currentSection().goingTo = 'goto';
        // this.sections.[this.currentSectionIndex + 1].comingFrom = 'goto';


        if (this.currentSection().blankTransition.toGoto) {
          this.refresh('', this.currentSectionIndex);
        }

        this.content.toggleInfo(false);
        this.transitionStart('goto');
        this.goToSectionIndex = sectionIndex;
        this.currentSection().transitionToAny(this.finishTransToAny.bind(this));
      }

      this.renderDiagrams();
    }
  }, {
    key: "transitionStart",
    value: function transitionStart() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.inTransition = true;
      this.comingFrom = direction;

      if (direction === 'prev') {
        this.content.goingTo = 'next';
        this.content.comingFrom = 'prev';
      } else if (direction === 'next') {
        this.content.goingTo = 'prev';
        this.content.comingFrom = 'next';
      } else {
        this.content.goingTo = 'goto';
        this.content.comingFrom = 'goto';
      }

      var diagram = this.diagram;

      if (diagram) {
        diagram.inTransition = true;
      }
    }
  }, {
    key: "finishTransToNextOrPrev",
    value: function finishTransToNextOrPrev() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (flag === false) {
        this.finishTransToAny();
      } else {
        this.currentSection().transitionToAny(this.finishTransToAny.bind(this));
      }
    }
  }, {
    key: "finishTransToAny",
    value: function finishTransToAny() {
      // console.log('finishTransToAny')
      this.setLeaveStateAndMoveToNextSection();
    }
  }, {
    key: "setLeaveStateAndMoveToNextSection",
    value: function setLeaveStateAndMoveToNextSection() {
      // console.log('setLeaveStateAndMoveToNextSection')
      hideInfoButton();
      hideInteractiveHighlightButton();
      var possibleState = this.currentSection().setLeaveState();

      if (possibleState !== null && possibleState !== undefined) {
        this.state = possibleState;
      }

      this.currentSectionIndex = this.goToSectionIndex;
      this.currentSection().setBlanks();
      var contentHTML = this.getContentHtml();

      if (this.comingFrom === 'prev' && this.currentSection().blankTransition.fromPrev || this.comingFrom === 'next' && this.currentSection().blankTransition.fromNext || this.comingFrom === 'goto' && this.currentSection().blankTransition.fromGoto) {
        contentHTML = '';
      }

      this.refresh(contentHTML, this.currentSectionIndex, this.setState.bind(this));
    }
  }, {
    key: "fadeInTextFromPrev",
    value: function fadeInTextFromPrev() {
      var section = this.content.sections[this.currentSectionIndex];

      if (section.fadeInFromPrev) {
        var lastSection = this.content.sections[this.currentSectionIndex - 1];
        var thisContent = section.getContent(false);
        var lastContent = lastSection.getContent(false);

        if (thisContent !== lastContent) {
          var element = document.getElementById('id_lesson__diagram_text');

          if (element != null) {
            element.classList.add('lesson__diagram_text_fade_in');
          }
        }
      }
    }
  }, {
    key: "setState",
    value: function setState() {
      // console.log('setState')
      var diagram = this.diagram;
      var section = this.content.sections[this.currentSectionIndex];

      if (diagram) {
        section.setEnterState(this.state);
        section.currentInteractiveItem = -1; // if (this.overlayDiagram) {
        //   this.overlayDiagram.elements.hideAll();
        // }

        section.setVisible();
        this.renderDiagrams();

        if (this.transitionCancelled) {
          this.finishTransitionFromAny();
        }

        if (this.comingFrom === 'next') {
          section.transitionFromNext(this.finishTransFromNextOrPrev.bind(this));
        } else if (this.comingFrom === 'prev') {
          this.fadeInTextFromPrev();
          section.transitionFromPrev(this.finishTransFromNextOrPrev.bind(this));
        } else {
          section.transitionFromAny(this.finishTransitionFromAny.bind(this));
        }
      }
    }
  }, {
    key: "finishTransFromNextOrPrev",
    value: function finishTransFromNextOrPrev() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (flag === false) {
        this.finishTransitionFromAny();
      } else {
        var section = this.content.sections[this.currentSectionIndex];
        section.transitionFromAny(this.finishTransitionFromAny.bind(this));
      }
    }
  }, {
    key: "finishTransitionFromAny",
    value: function finishTransitionFromAny() {
      // console.log('finishTransitionFromAny')
      this.refresh(this.getContentHtml(), this.currentSectionIndex, this.componentUpdateComplete.bind(this));
    }
  }, {
    key: "setOnclicks",
    value: function setOnclicks() {
      // console.log('setting conclicks')
      var section = this.content.sections[this.currentSectionIndex];
      section.setOnClicks();

      if (section.refresh != null) {
        section.refresh();
      }
    }
  }, {
    key: "componentUpdateComplete",
    value: function componentUpdateComplete() {
      // console.log('componentUpdateComplete');
      this.setOnclicks();
      var section = this.content.sections[this.currentSectionIndex]; // section.setOnClicks();

      section.setSteadyState(this.state);
      this.firstPageShown = false;
      this.inTransition = false;
      var diagram = this.diagram;

      if (diagram) {
        diagram.inTransition = false; // diagram.setFirstTransform();
      }

      section.setInfoButton(); // console.log('updateInteractiveItems')

      this.updateInteractiveItems();
      this.comingFrom = '';
      this.transitionCancelled = false;
      this.renderDiagrams();
      window.presentationLessonTransitionStatus = 'steady';
    }
  }, {
    key: "updateInteractiveItems",
    value: function updateInteractiveItems() {
      var section = this.content.sections[this.currentSectionIndex];
      section.setInteractiveElements();
      section.setInteractiveElementsButton();
    }
  }, {
    key: "currentSection",
    value: function currentSection() {
      return this.content.sections[this.currentSectionIndex];
    }
  }, {
    key: "stopDiagrams",
    value: function stopDiagrams() {
      var diagram = this.diagram;

      if (diagram) {
        diagram.stop(true, true);
      }
    }
  }, {
    key: "highlightNextInteractiveItem",
    value: function highlightNextInteractiveItem() {
      var section = this.content.sections[this.currentSectionIndex];
      var interactiveItem = section.getNextInteractiveItem();

      if (interactiveItem) {
        var element = interactiveItem.element,
            location = interactiveItem.location;
        this.content.highlightInteractiveElement(element, location);
      }
    }
  }, {
    key: "stopTransition",
    value: function stopTransition() {
      var diagram = this.diagram;
      this.transitionCancelled = true;

      if (diagram) {
        diagram.inTransition = false; // console.log('stopping')

        diagram.stop(true, true);
      }

      this.inTransition = false;
    }
  }, {
    key: "renderDiagrams",
    value: function renderDiagrams() {
      var diagram = this.diagram;

      if (diagram) {
        diagram.animateNextFrame();
      }
    }
  }, {
    key: "closeDiagram",
    value: function closeDiagram() {
      var diagram = this.diagram;

      if (diagram) {
        diagram.destroy();
      }

      this.diagram = null;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.closeDiagram();

      _get(_getPrototypeOf(PresentationLesson.prototype), "initialize", this).call(this); // this.content.initialize();


      this.diagram = this.content.diagram; // this.overlayDiagram = this.content.overlayDiagram;

      this.diagram.lesson = this;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "disableInteractiveItems",
    value: function disableInteractiveItems() {
      var button = document.getElementById('id_lesson__interactive_element_button');

      if (button != null) {
        button.classList.add('lesson__interactive_element_button__hide');
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "enableInteractiveItems",
    value: function enableInteractiveItems() {
      this.updateInteractiveItems();
    }
  }]);

  return PresentationLesson;
}(_SimpleLesson__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PresentationLesson);

/***/ }),

/***/ "./src/js/Lesson/PresentationLessonContent.js":
/*!****************************************************!*\
  !*** ./src/js/Lesson/PresentationLessonContent.js ***!
  \****************************************************/
/*! exports provided: Section, PresentationLessonContent, diagramCanvas, initializeItemSelector, applyModifiers, interactiveItem, infoList, makeFig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return Section; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentationLessonContent", function() { return PresentationLessonContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diagramCanvas", function() { return diagramCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeItemSelector", function() { return initializeItemSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyModifiers", function() { return applyModifiers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interactiveItem", function() { return interactiveItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "infoList", function() { return infoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeFig", function() { return makeFig; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SimpleLessonContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SimpleLessonContent */ "./src/js/Lesson/SimpleLessonContent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


// import LessonDescription from './lessonDescription';
// import getLessonIndex from '../../Lessons/index';
// import { loadRemote, loadRemoteCSS } from '../tools/misc';
 // import PopupBoxCollection from '../../Lessons/LessonsCommon/DiagramCollectionPopup';

var Diagram = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Diagram,
    HTMLObject = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.HTMLObject,
    Point = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Point,
    DiagramElementPrimative = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementPrimative,
    DiagramElementCollection = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElementCollection,
    DiagramElement = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.DiagramElement,
    Rect = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Rect,
    Equation = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Equation,
    parsePoint = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.parsePoint,
    EqnNavigator = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.EqnNavigator;
var _Fig$tools$misc = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc,
    generateUniqueId = _Fig$tools$misc.generateUniqueId,
    joinObjects = _Fig$tools$misc.joinObjects;
var _Fig$tools$html = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.html,
    _setOnClicks = _Fig$tools$html.setOnClicks,
    applyModifiers = _Fig$tools$html.applyModifiers,
    click = _Fig$tools$html.click;

function initializeItemSelector(methodToExecute, bindingObject) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var elem = document.getElementById("id__lesson_item_selector_".concat(index));

  if (elem != null) {
    if (elem.children.length > 0) {
      for (var i = 0; i < elem.children.length; i += 1) {
        elem.children[i].onclick = methodToExecute.bind(bindingObject, i);
      }
    }
  }
}

function interactiveItem(element) {
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return {
    element: element,
    location: location
  };
}

function infoList(listItems) {
  var out = ['<ul>'];
  listItems.forEach(function (item) {
    out.push("<li>".concat(item, "</li>"));
  });
  out.push(['</ul>']);
  return out.join(' ');
}

function diagramCanvas(id, DiagramClass) {
  var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return {
    replacementText: function replacementText() {
      return "<div id=\"".concat(id, "\" class=\"canvas_container ").concat(classes, "\">\n        <canvas class=\"diagram__gl\"></canvas>\n        <div class=\"diagram__html\"></div>\n        <canvas class=\"diagram__text\"></canvas>\n      </div>");
    },
    type: 'diagram',
    DiagramClass: DiagramClass,
    id: id
  };
}

var Section =
/*#__PURE__*/
function () {
  function Section(diagram) {
    _classCallCheck(this, Section);

    this.diagram = diagram;
    this.title = '';
    this.modifiers = {};
    this.infoModifiers = {};
    this.showOnly = [];
    this.blank = [];
    this.infoElements = [];
    this.fadeInFromPrev = true;
    this.blankTransition = {
      toNext: false,
      toPrev: false,
      fromNext: false,
      fromPrev: false,
      toGoto: false,
      fromGoto: false
    };
    this.interactiveElementList = [];
    this.currentInteractiveItem = -1;
    this.skipWhenComingFromNext = false;
    this.refresh = null;
  }

  _createClass(Section, [{
    key: "setContent",
    value: function setContent() {
      return [];
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setInfo",
    value: function setInfo() {
      return [];
    }
  }, {
    key: "setOnClicks",
    value: function setOnClicks() {
      _setOnClicks(this.modifiers);

      _setOnClicks(this.infoModifiers);
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      var htmlText = '';
      var info = '';

      if (typeof this.setInfo === 'string' || Array.isArray(this.setInfo)) {
        info = this.setInfo;
      } else {
        info = this.setInfo();
      }

      if (typeof info === 'string') {
        info = [info];
      }

      var contentInBullets = [];

      if (info.length > 1) {
        info.forEach(function (line) {
          if (line.startsWith('<li>') || line.startsWith('<ul>') || line.startsWith('</ul>')) {
            contentInBullets.push(line);
          } else {
            contentInBullets.push("<li>".concat(line, "</li>"));
          }
        });

        if (info[0] !== '<ul>') {
          htmlText = '<ul>';
        }
      } else {
        contentInBullets = info;
      }

      contentInBullets.forEach(function (element) {
        htmlText = "".concat(htmlText).concat(element);
      });

      if (info.length > 1 && info[0] !== '<ul>') {
        htmlText = "".concat(htmlText, "</ul>");
      } // info.forEach((element) => {
      //   htmlText = `${htmlText}${element}`;
      // });
      // htmlText += '\n';


      htmlText = applyModifiers(htmlText, this.infoModifiers); // Go through all text, and replace all characters between | | with
      // with default keywords
      // const r = RegExp(/\|([^|]*)\|/, 'gi');
      // return htmlText.replace(r, '<span class="highlight_word">$1</span>');

      return htmlText;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "hideInfoButton",
    value: function hideInfoButton() {
      var infoElement = document.getElementById('id_lesson__info_button');

      if (infoElement instanceof HTMLElement) {
        infoElement.classList.add('lesson__info_hide');
      }
    }
  }, {
    key: "setInfoButton",
    value: function setInfoButton() {
      var infoHtml = this.getInfo();
      var infoElement = document.getElementById('id_lesson__info_button');
      var infoBox = document.getElementById('id_lesson__info_box__text');

      if (infoElement instanceof HTMLElement) {
        if (infoHtml) {
          infoElement.classList.remove('lesson__info_hide');

          if (infoBox instanceof HTMLElement) {
            infoBox.innerHTML = infoHtml;
          }
        } else {
          infoElement.classList.add('lesson__info_hide');
        }
      }
    }
  }, {
    key: "setInteractiveElementsButton",
    value: function setInteractiveElementsButton() {
      // const infoHtml = this.getInfo();
      var button = document.getElementById('id_lesson__interactive_element_button'); // const infoBox = document.getElementById('id_lesson__info_box__text');

      if (button instanceof HTMLElement) {
        if (this.interactiveElementList.length > 0 && this.getNextInteractiveItem()) {
          this.currentInteractiveItem = -1;
          button.classList.remove('lesson__interactive_element_button__hide');
        } else {
          button.classList.add('lesson__interactive_element_button__hide');
        }
      }
    }
  }, {
    key: "getNextInteractiveItem",
    value: function getNextInteractiveItem() {
      if (this.interactiveElementList.length > 0) {
        var index = this.currentInteractiveItem + 1;
        var counter = 0;

        while (counter < this.interactiveElementList.length) {
          if (index > this.interactiveElementList.length - 1) {
            index = 0;
          }

          var element = this.interactiveElementList[index].element;
          var elementIsVisible = false;

          if (typeof element === 'string') {
            element = document.getElementById(element);
          }

          if (element instanceof HTMLElement) {
            var rect = element.getBoundingClientRect();

            if (rect.left > 0 && rect.width > 0) {
              elementIsVisible = true;
            }
          } else if (element instanceof DiagramElementPrimative && element.drawingObject instanceof HTMLObject) {
            if (element.isShown) {
              elementIsVisible = true;
            }
          } else if ((element instanceof DiagramElementPrimative || element instanceof DiagramElementCollection) && element.isShown) {
            if (element.isMovable || element.isTouchable || element.isInteractive) {
              elementIsVisible = true;
            }
          }

          var elementIsTouchable = false;

          if (element instanceof DiagramElementCollection) {
            if (element.isTouchable || element.isMovable || element.hasTouchableElements || element.isInteractive) {
              elementIsTouchable = true;
            }
          } else if (element instanceof DiagramElementPrimative) {
            if (element.isTouchable || element.isMovable || element.isInteractive) {
              elementIsTouchable = true;
            }
          } else if (element instanceof HTMLElement) {
            elementIsTouchable = true;

            if (element.classList.contains('not_interactive_word')) {
              elementIsVisible = false;
            } else {
              elementIsVisible = true;
            }
          }

          if (elementIsVisible && elementIsTouchable && element != null && element.isInteractive !== false) {
            this.currentInteractiveItem = index;
            return {
              element: element,
              location: this.interactiveElementList[index].location
            };
          }

          index += 1;

          if (index > this.interactiveElementList.length - 1) {
            index = 0;
          }

          counter += 1;
        }
      }

      return null;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var modify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (typeof this.modifiers === 'function') {
        this.modifiers = this.modifiers();
      }

      var htmlText = '';
      var content = '';

      if (typeof this.setContent === 'string' || Array.isArray(this.setContent)) {
        content = this.setContent;
      } else {
        content = this.setContent();
      }

      if (typeof content === 'string') {
        content = [content];
      }

      var contentInParagraphs = [];
      content.forEach(function (line) {
        if (line.charAt(0) !== '<') {
          contentInParagraphs.push("<p>".concat(line, "</p>"));
        } else {
          contentInParagraphs.push(line);
        }
      });
      contentInParagraphs.forEach(function (element) {
        htmlText = "".concat(htmlText).concat(element);
      }); // htmlText += '\n';

      if (modify) {
        htmlText = applyModifiers(htmlText, this.modifiers);
      } // Object.keys(this.modifiers).forEach((key) => {
      //   const mod = this.modifiers[key];
      //   htmlText = modifyText(htmlText, key, mod);
      // });
      // Go through all text, and replace all characters between | | with
      // with default keywords
      // const r = RegExp(/\|([^|]*)\|/, 'gi');
      // return htmlText.replace(r, '<span class="highlight_word">$1</span>');


      return htmlText;
    }
    /* eslint-disable no-unused-vars */

  }, {
    key: "setSteadyState",
    value: function setSteadyState(previousState) {}
    /* eslint-disable no-unused-vars */

  }, {
    key: "setEnterState",
    value: function setEnterState(previousState) {}
    /* eslint-disable no-unused-vars */

  }, {
    key: "setLeaveState",
    value: function setLeaveState() {}
  }, {
    key: "setBlanks",
    value: function setBlanks() {
      var _this = this;

      this.blank.forEach(function (element) {
        if (element in _this.blankTransition) {
          _this.blankTransition[element] = true;
        }
      }); // if ('blank' in this) {
      //   Object.keys(this.blank).forEach((key) => {
      //     this.blankTransition[key] = this.blank[key];
      //   });
      // }
    }
  }, {
    key: "getInteractiveElementIndex",
    value: function getInteractiveElementIndex(element) {
      var elem = element;

      if (typeof element === 'string') {
        elem = document.getElementById(element);
      }

      for (var i = 0; i < this.interactiveElementList.length; i += 1) {
        var item = this.interactiveElementList[i];

        if (item.element === elem || item.element === element) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "removeInteractiveElement",
    value: function removeInteractiveElement(element) {
      var index = this.getInteractiveElementIndex(element);

      if (index > -1) {
        this.interactiveElementList.splice(index, 1);
      }
    }
  }, {
    key: "replaceInteractiveElement",
    value: function replaceInteractiveElement(element, location) {
      var index = this.getInteractiveElementIndex(element);

      if (index > -1) {
        this.interactiveElementList[index] = interactiveItem(element, location);
        return true;
      }

      return false;
    }
  }, {
    key: "replaceOrAddInteractiveElement",
    value: function replaceOrAddInteractiveElement(element, location) {
      var replaced = this.replaceInteractiveElement(element, location);

      if (!replaced) {
        this.interactiveElementList.push(interactiveItem(element, location));
      }
    }
  }, {
    key: "setInteractiveElements",
    value: function setInteractiveElements() {
      var _this2 = this;

      this.interactiveElementList = [];

      if ('interactiveElementsOnly' in this) {
        // this.interactiveElementList = this.interactiveElementsOnly;
        this.interactiveElementsOnly.forEach(function (element) {
          if (element instanceof DiagramElementCollection || element instanceof DiagramElementPrimative) {
            _this2.replaceOrAddInteractiveElement(element, '');
          } else if (typeof element === 'string') {
            var elem = document.getElementById(element);

            if (elem != null) {
              _this2.replaceOrAddInteractiveElement(element, '');
            }
          } else {
            _this2.replaceOrAddInteractiveElement(element.element, element.location);
          }
        });
      } else {
        // Get all action words
        var elements = document.getElementsByClassName('interactive_word');

        for (var i = 0; i < elements.length; i += 1) {
          var element = elements[i];

          if (element.id != null) {
            this.interactiveElementList.push({
              element: element.id,
              location: 'topRightText'
            });
          } else {
            this.interactiveElementList.push({
              element: element,
              location: 'topRightText'
            });
          }
        }

        elements = document.getElementsByClassName('interactive_top_right');

        for (var _i = 0; _i < elements.length; _i += 1) {
          var _element = elements[_i];
          var style = window.getComputedStyle(_element); // const style = {visibility: '', display: ''}

          if (style.visibility !== 'hidden' && style.display !== 'none') {
            if (_element.id != null && _element.id !== '') {
              this.interactiveElementList.push({
                element: _element.id,
                location: 'topRightText'
              });
            } else {
              this.interactiveElementList.push({
                element: _element,
                location: 'topRightText'
              });
            }
          }
        } // Get all movable diagram elements


        var diagramElements = this.diagram.elements.getAllPossiblyInteractiveElements(); // console.log(this.diagram.elements)
        // debugger;

        diagramElements.forEach(function (element) {
          _this2.interactiveElementList.push({
            element: element,
            location: ''
          });
        });
      } // Overwrite or add single elements


      if ('interactiveElements' in this) {
        this.interactiveElements.forEach(function (element) {
          if (element instanceof DiagramElementCollection || element instanceof DiagramElementPrimative) {
            _this2.replaceOrAddInteractiveElement(element, '');
          } else {
            _this2.replaceOrAddInteractiveElement(element.element, element.location);
          }
        });
      } // Remove elements


      if ('interactiveElementsRemove' in this) {
        this.interactiveElementsRemove.forEach(function (element) {
          _this2.removeInteractiveElement(element);
        });
      }
    }
  }, {
    key: "setVisible",
    value: function setVisible() {
      if ('showOnly' in this) {
        var elementsOrMethod = this.showOnly;

        if (Array.isArray(elementsOrMethod)) {
          this.diagram.elements.showOnly(elementsOrMethod);
        } else {
          elementsOrMethod();
        }
      }

      if ('hideOnly' in this) {
        var _elementsOrMethod = this.hideOnly;

        if (Array.isArray(_elementsOrMethod)) {
          this.diagram.elements.hideOnly(_elementsOrMethod);
        } else {
          _elementsOrMethod();
        }
      }

      if ('show' in this) {
        var _elementsOrMethod2 = this.show;

        if (Array.isArray(_elementsOrMethod2)) {
          _elementsOrMethod2.forEach(function (element) {
            if (element instanceof DiagramElementCollection) {
              element.showAll();
            } else {
              element.show();
            }
          });
        } else {
          _elementsOrMethod2();
        }
      }

      if ('hide' in this) {
        var _elementsOrMethod3 = this.hide;

        if (Array.isArray(_elementsOrMethod3)) {
          _elementsOrMethod3.forEach(function (element) {
            if (element instanceof DiagramElementCollection) {
              element.hideAll();
            } else {
              element.hide();
            }
          });
        } else {
          _elementsOrMethod3();
        }
      }
    }
  }, {
    key: "getState",
    value: function getState(diagram) {
      return {};
    }
  }, {
    key: "transitionToNext",
    value: function transitionToNext() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function temp() {};
      done();
    }
  }, {
    key: "transitionFromNext",
    value: function transitionFromNext() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function temp() {};
      done();
    }
  }, {
    key: "transitionToPrev",
    value: function transitionToPrev() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function temp() {};
      done();
    }
  }, {
    key: "transitionFromPrev",
    value: function transitionFromPrev() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function temp() {};
      done();
    }
  }, {
    key: "transitionFromAny",
    value: function transitionFromAny() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function temp() {};
      done();
    }
  }, {
    key: "transitionToAny",
    value: function transitionToAny() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function temp() {};
      done();
    }
    /* eslint-enable no-unused-vars */

  }]);

  return Section;
}(); // class diagramClass {
// }


var whichAnimationEvent = function whichAnimationEvent() {
  // let t;
  var el = document.createElement('fakeelement');
  var transitions = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd'
  }; // for (t in transitions) {
  //   console.log(t)
  //   if (el.style[t] !== undefined) {
  //     return transitions[t];
  //   }
  // }

  for (var i = 0; i < Object.keys(transitions).length; i += 1) {
    var key = Object.keys(transitions)[i];

    if (key in el.style) {
      return transitions[key];
    }
  }

  return '';
};

var PresentationLessonContent =
/*#__PURE__*/
function (_SimpleLessonContent) {
  _inherits(PresentationLessonContent, _SimpleLessonContent);

  // diagram: Object;
  // overlayDiagram: Object;
  // iconLink: string;
  // iconLinkGrey: string;
  // questions
  function PresentationLessonContent() {
    var _this3;

    var htmlId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lesson__content';

    _classCallCheck(this, PresentationLessonContent);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(PresentationLessonContent).call(this, htmlId));
    _this3.diagramHtmlId = "".concat(htmlId, "_diagram"); // this.qrDiagram = null;
    // this.sections = [];
    // this.iconLink = '/';
    // this.iconLinkGrey = '/';
    // this.setTitle();

    _this3.animationEnd = whichAnimationEvent();

    if (window.quickReference == null) {
      window.quickReference = {};
    }

    return _this3;
  }

  _createClass(PresentationLessonContent, [{
    key: "initialize",
    value: function initialize() {
      var _this4 = this;

      this.setDiagram(this.diagramHtmlId);

      this.next = function () {
        _this4.diagram.lesson.nextSection();
      };

      this.prev = function () {
        _this4.diagram.lesson.nextSection();
      };

      this.setElementContent();
      this.addSections();
      this.addInfoBox();
      this.addStar();
      this.diagram.setFirstTransform();
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "toggleInfo",
    value: function toggleInfo() {
      var toState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var infoButton = document.getElementById('id_lesson__info_button');
      var infoBox = document.getElementById('id_lesson__info_box');

      if (infoButton instanceof HTMLElement && infoBox instanceof HTMLElement) {
        if (typeof toState === 'boolean' && toState === true) {
          infoButton.classList.add('lesson__info_button_show');
          infoBox.classList.remove('lesson__info_hide');
        } else if (typeof toState === 'boolean' && toState === false) {
          infoButton.classList.remove('lesson__info_button_show');
          infoBox.classList.add('lesson__info_hide');
        } else {
          infoButton.classList.toggle('lesson__info_button_show');
          infoBox.classList.toggle('lesson__info_hide');
        }

        if (infoBox.classList.contains('lesson__info_hide')) {
          this.diagram.elements.hasTouchableElements = true;
        } else {
          this.diagram.elements.hasTouchableElements = false;
        }
      } // if (infoBox instanceof HTMLElement) {
      //   infoBox.classList.toggle('lesson__info_hide');
      // }

    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "prepareToShowQR",
    value: function prepareToShowQR() {
      // this.qrDiagram.container.style.zIndex = '10';
      var overlay = document.getElementById('presentation_lesson__qr__overlay');

      if (overlay != null) {
        overlay.style.zIndex = '10';
      }

      var next = document.getElementById('lesson__button-next');

      if (next) {
        next.classList.add('lesson__button-next-disabled');
      }

      var prev = document.getElementById('lesson__button-previous');

      if (prev) {
        prev.classList.add('lesson__button-prev-disabled');
      }

      var gotoButton = document.getElementById('id__lesson__button-goto_container');

      if (gotoButton) {
        gotoButton.classList.add('lesson__button-goto_container-disabled');
      }

      var interactive = document.getElementById('id_lesson__interactive_element_button');

      if (interactive) {
        interactive.classList.add('lesson__interactive_element_button__disable');
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "prepareToHideQR",
    value: function prepareToHideQR() {
      var overlay = document.getElementById('presentation_lesson__qr__overlay');

      if (overlay != null) {
        overlay.style.zIndex = '-1';
      }

      var next = document.getElementById('lesson__button-next');

      if (next && this.diagram.lesson.currentSectionIndex < this.diagram.lesson.content.sections.length - 1) {
        next.classList.remove('lesson__button-next-disabled');
      }

      var prev = document.getElementById('lesson__button-previous');

      if (prev && this.diagram.lesson.currentSectionIndex > 0) {
        prev.classList.remove('lesson__button-prev-disabled');
      }

      var gotoButton = document.getElementById('id__lesson__button-goto_container');

      if (gotoButton) {
        gotoButton.classList.remove('lesson__button-goto_container-disabled');
      }

      var interactive = document.getElementById('id_lesson__interactive_element_button');

      if (interactive) {
        interactive.classList.remove('lesson__interactive_element_button__disable');
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "addInfoBox",
    value: function addInfoBox() {
      var container = document.createElement('div');
      container.classList.add('lesson__info_box');
      container.classList.add('lesson__info_hide');
      container.id = 'id_lesson__info_box';
      var title = document.createElement('div');
      title.classList.add('lesson__info_box__title');
      container.appendChild(title);
      var infoSymbol = document.createElement('div');
      infoSymbol.classList.add('lesson__info_box__title_i');
      infoSymbol.innerHTML = 'i';
      title.appendChild(infoSymbol);
      var close = document.createElement('div');
      close.classList.add('lesson__info_box__close');
      close.id = 'id_lesson__info_box__close';
      close.innerHTML = 'X';
      close.onclick = this.toggleInfo.bind(this);
      title.appendChild(close);
      var titleText = document.createElement('div');
      titleText.classList.add('lesson__info_box__title_text');
      titleText.innerHTML = 'What can you do on this page?';
      title.appendChild(titleText);
      var text = document.createElement('div');
      text.classList.add('lesson__info_box__text');
      text.id = 'id_lesson__info_box__text';
      container.appendChild(text);
      this.diagram.htmlCanvas.appendChild(container);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "pulseStar",
    value: function pulseStar() {
      var star = document.getElementById('id_lesson__star');

      if (star instanceof HTMLElement) {
        star.classList.toggle('lesson__info_star_pulse');
      }
    } // starOnNextInteractiveItem() {
    //   const index = this.
    // }

  }, {
    key: "highlightInteractiveElement",
    value: function highlightInteractiveElement(element, location) {
      var _this5 = this;

      var star = document.getElementById('id_lesson__star');

      if (star instanceof HTMLElement) {
        var animationEnd = function animationEnd() {
          star.removeEventListener(_this5.animationEnd, animationEnd);
          star.classList.remove('lesson__info_star_pulse'); // this next line triggers a relflow, making the class removal stick
          // eslint-disable-next-line no-unused-vars

          var w = star.offsetWidth;
        };

        animationEnd();
        var cssPosition = new Point(0, 0);

        if (element instanceof DiagramElementPrimative || element instanceof DiagramElementCollection) {
          var diagramPosition;

          if (location === 'center' || location === '' && element.interactiveLocation === 'center') {
            diagramPosition = element.getCenterDiagramPosition();
          } else if (location === 'zero' || location === '' && element.interactiveLocation === 'zero') {
            diagramPosition = element.getDiagramPosition();
          } else if (location === 'topLeft' || location === '' && element.interactiveLocation === 'topLeft') {
            var _rect = element.getDiagramBoundingRect();

            diagramPosition = new Point(_rect.left, _rect.top);
          } else if (location === 'topRight' || location === '' && element.interactiveLocation === 'topRight') {
            var _rect2 = element.getDiagramBoundingRect();

            diagramPosition = new Point(_rect2.right, _rect2.top);
          } else if (location === 'vertexLeft' || location === '' && element.interactiveLocation === 'vertexLeft') {
            var borders = element.getVertexSpaceBoundaries();
            var minXPoint;
            borders.forEach(function (border) {
              border.forEach(function (borderPoint) {
                if (minXPoint == null) {
                  minXPoint = borderPoint._dup();
                } else if (minXPoint.x > borderPoint.x) {
                  minXPoint = borderPoint._dup();
                }
              });
            });

            if (minXPoint) {
              minXPoint.y = 0;
              diagramPosition = element.getVertexSpaceDiagramPosition(minXPoint);
            } else {
              diagramPosition = new Point(0, 0);
            }
          } else if (location instanceof Point || typeof location === 'number' || Array.isArray(location)) {
            var p = parsePoint(location);

            var _rect3 = element.getDiagramBoundingRect();

            diagramPosition = new Point(_rect3.left + p.x * _rect3.width, _rect3.bottom + p.y * _rect3.height);
          } else {
            diagramPosition = element.getVertexSpaceDiagramPosition(parsePoint(element.interactiveLocation));
          }

          cssPosition = diagramPosition.transformBy(this.diagram.spaceTransforms.diagramToPixel.matrix());
        } else {
          var html = element;

          if (typeof element === 'string') {
            html = document.getElementById(element);
          }

          if (html instanceof HTMLElement) {
            var _rect4 = html.getBoundingClientRect();

            var fontSize = parseFloat(window.getComputedStyle(html, null).getPropertyValue('font-size'));
            var rectBase = this.diagram.htmlCanvas.getBoundingClientRect();

            if (location === 'topLeft') {
              cssPosition = new Point(_rect4.left - rectBase.left, _rect4.top - rectBase.top);
            } else if (location === 'topRight') {
              cssPosition = new Point(_rect4.left - rectBase.left + _rect4.width, _rect4.top - rectBase.top);
            } else if (location === 'topRightText') {
              cssPosition = new Point(_rect4.left - rectBase.left + _rect4.width, _rect4.top - rectBase.top + fontSize * 0.3);
            } else if (location === 'vertexLeft') {
              cssPosition = new Point(_rect4.left - rectBase.left + _rect4.width * 0.05, _rect4.top - rectBase.top + _rect4.height * 0.5);
            } else if (location instanceof Point || typeof location === 'number' || Array.isArray(location)) {
              var _p = parsePoint(location);

              cssPosition = new Point(_rect4.left - rectBase.left + _rect4.width * _p.x, _rect4.top - rectBase.top + _rect4.height * _p.y);
            } else {
              cssPosition = new Point(_rect4.left - rectBase.left + _rect4.width / 2, _rect4.top - rectBase.top + _rect4.height / 2);
            }
          }
        }

        star.classList.add('lesson__info_star_pulse');
        var rect = star.getBoundingClientRect();
        star.style.left = "".concat(cssPosition.x - rect.width / 2, "px");
        star.style.top = "".concat(cssPosition.y - rect.height / 2, "px");
        star.addEventListener(this.animationEnd, animationEnd.bind(this));
      }
    }
  }, {
    key: "bindNext",
    value: function bindNext() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.diagram.layout.colors.diagram.action;
      return click(this.next, [this], color);
    } // bindShowQR(
    //   uid: string,
    //   qrid: string,
    //   colorOrOptions: Array<number> | {
    //     color?: ?Array<number>,
    //     interactive?: boolean,
    //     id?: string,
    //     classes?: string,
    //     text?: ?string,
    //   } = {},
    //   // color: Array<number> = this.diagram.layout.colors.diagram.action,
    // ) {
    //   const defaultOptions = {
    //     color: this.diagram.layout.colors.diagram.action,
    //     classes: '',
    //   };
    //   let options = defaultOptions;
    //   if (Array.isArray(colorOrOptions)) {
    //     options.color = colorOrOptions;
    //   } else {
    //     options = joinObjects({}, defaultOptions, colorOrOptions);
    //     options.classes = `lesson__qr_action_word ${options.classes}`;
    //   }
    //   return click(this.showQR, [this, uid, qrid], options);
    // }

  }, {
    key: "qr",
    value: function qr(link) // color: Array<number> = this.diagram.layout.colors.diagram.action,
    {
      var colorOrOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultOptions = {
        color: this.diagram.layout.colors.diagram.action,
        classes: 'lesson__qr_action_word'
      };
      var options = defaultOptions;

      if (Array.isArray(colorOrOptions)) {
        options.color = colorOrOptions;
      } else {
        options = joinObjects({}, defaultOptions, colorOrOptions);
        options.classes = "lesson__qr_action_word ".concat(options.classes);
      }

      return click(window.lessonFunctions.qr, [window.lessonFunctions, '', link], options);
    }
  }, {
    key: "addStar",
    value: function addStar() {
      var img = document.createElement('img');
      img.setAttribute('src', '/static/assets/star.png');
      img.id = 'id_lesson__star';
      img.classList.add('lesson__info_star');
      img.alt = 'active item';
      this.diagram.htmlCanvas.appendChild(img);
    }
  }, {
    key: "setTitle",
    value: function setTitle() {
      this.title = '';
    } // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: "setDiagram",
    value: function setDiagram() {
      var htmlId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setElementContent",
    value: function setElementContent() {} // eslint-disable-next-line class-methods-use-this

  }, {
    key: "addSections",
    value: function addSections() {}
  }, {
    key: "addSection",
    value: function addSection() {
      var s = new Section(this.diagram);

      for (var _len = arguments.length, sectionObjects = new Array(_len), _key = 0; _key < _len; _key++) {
        sectionObjects[_key] = arguments[_key];
      }

      var section = Object.assign.apply(Object, [{}].concat(sectionObjects));
      Object.keys(section).forEach(function (key) {
        // $FlowFixMe
        s[key] = section[key];
      });
      this.sections.push(s);
    }
  }, {
    key: "addSectionEqnStep",
    value: function addSectionEqnStep(optionsIn) {
      var defaultOptions = {
        animate: 'move',
        duration: 0.8
      };
      var options = joinObjects({}, defaultOptions, optionsIn);

      for (var _len2 = arguments.length, sectionObjects = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        sectionObjects[_key2 - 1] = arguments[_key2];
      }

      var userSections = Object.assign.apply(Object, [{}].concat(sectionObjects));
      var eqn = options.eqn;
      var animate = options.animate,
          duration = options.duration;
      var nav = null;

      if (eqn.table != null) {
        nav = eqn;
        var _nav = nav;
        eqn = _nav.eqn;
      }

      var fromForm = options.from;
      var toForm = options.to;
      var eqnSection = {
        transitionFromPrev: function transitionFromPrev(done) {
          var callback = done;

          if (userSections.transitionFromPrev != null) {
            callback = userSections.transitionFromPrev.bind(userSections, done);
          }

          eqn.showForm(fromForm);

          if (fromForm === toForm) {
            callback();
            return;
          }

          eqn.goToForm({
            name: toForm,
            duration: duration,
            callback: callback,
            animate: animate
          });

          if (nav != null) {
            nav.updateButtons();
          }
        },
        setSteadyState: function setSteadyState() {
          if (userSections.setSteadyState != null) {
            userSections.setSteadyState();
          }

          eqn.showForm(toForm);

          if (nav != null) {
            nav.updateButtons();
          }
        }
      };
      var section = Object.assign.apply(Object, [{}].concat(sectionObjects, [eqnSection]));
      this.addSection(section);
    }
  }, {
    key: "addSectionEqnStory",
    value: function addSectionEqnStory(equations) {
      var _this6 = this;

      var defaultEqnOptions = {
        animate: 'move',
        duration: 1,
        dissolveInTime: 1,
        dissolveOutTime: 0.5,
        pulseDuration: 1,
        pulseScale: 1.1,
        opacity: 0.6
      };

      for (var _len3 = arguments.length, sectionObjects = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        sectionObjects[_key3 - 1] = arguments[_key3];
      }

      var userSections = Object.assign.apply(Object, [{}].concat(sectionObjects));

      var setFirstTransform = function setFirstTransform() {
        _this6.diagram.setFirstTransform();
      };

      var eqnSection = {
        transitionFromPrev: function transitionFromPrev(done) {
          setFirstTransform();
          var callback = done;

          if (userSections.transitionFromPrev != null) {
            callback = userSections.transitionFromPrev.bind(userSections, done);
          }

          var counter = 0;

          var countUp = function countUp() {
            counter += 1;

            if (counter === equations.length) {
              callback();
            }
          };

          equations.forEach(function (eqOptions, i) {
            if (eqOptions.nav == null && eqOptions.eqn == null) {
              return;
            }

            var options = joinObjects({}, defaultEqnOptions, eqOptions);
            var form = options.form,
                duration = options.duration,
                toForm = options.toForm,
                dissolveInTime = options.dissolveInTime,
                dissolveOutTime = options.dissolveOutTime,
                pulseDuration = options.pulseDuration,
                pulseScale = options.pulseScale,
                animate = options.animate,
                opacity = options.opacity,
                moveFrom = options.moveFrom;
            var eqn = options.eqn,
                nav = options.nav;

            if (eqn == null) {
              var _nav2 = nav;
              eqn = _nav2.eqn;
            }

            if (nav == null) {
              nav = {
                // eslint-disable-next-line no-unused-vars
                showForm: function showForm(t) {},
                // eslint-disable-next-line no-unused-vars
                setOpacity: function setOpacity(o) {}
              };
            }

            if (toForm == null && form == null) {
              return;
            }

            function setFinalForm(f) {
              nav.showForm(f);
              eqn.showForm(f);
              countUp();

              if (i < equations.length - 1) {
                eqn.setOpacity(opacity);
                nav.setOpacity(opacity);
              }
            }

            if (toForm == null && form != null) {
              if (animate === 'dissolve') {
                // nav.showForm(form);
                eqn.hide();
                eqn.goToForm({
                  name: form,
                  animate: 'dissolve',
                  duration: duration,
                  dissolveInTime: dissolveInTime,
                  dissolveOutTime: dissolveOutTime,
                  callback: setFinalForm.bind(_this6, form)
                });
                return;
              }

              setFinalForm(form);
              return;
            }

            if (form == null && toForm != null) {
              setFinalForm(toForm);
              return;
            }

            if (form === toForm) {
              setFinalForm(form);
              return;
            }

            eqn.showForm(options.form);

            if (options.moveFrom == null) {
              nav.showForm(toForm);
              eqn.showForm(form);
              eqn.goToForm({
                name: toForm,
                animate: animate,
                duration: duration,
                dissolveInTime: dissolveInTime,
                dissolveOutTime: dissolveOutTime,
                callback: setFinalForm.bind(_this6, toForm)
              });
              return;
            }

            var moveFromPosition = moveFrom;

            var pulseMoveFrom = function pulseMoveFrom() {};

            var dullLastEqn = function dullLastEqn() {};

            if (options.moveFrom instanceof DiagramElementCollection) {
              moveFromPosition = moveFrom.getPosition();

              pulseMoveFrom = function pulseMoveFrom() {
                moveFrom.pulseScaleNow(pulseDuration, pulseScale);
              };

              if (moveFrom instanceof EqnNavigator || moveFrom instanceof Equation) {
                dullLastEqn = function dullLastEqn() {
                  moveFrom.showForm(form);
                  moveFrom.setOpacity(0.5);
                };
              }
            }

            eqn.animations["new"]().position({
              target: moveFromPosition
            }).trigger({
              callback: pulseMoveFrom
            }).pulse({
              duration: pulseDuration,
              scale: pulseScale
            }).trigger({
              callback: dullLastEqn
            }).position({
              start: moveFromPosition,
              target: eqn.getPosition(),
              duration: duration
            }) // eslint-disable-next-line no-loop-func
            .whenFinished(function () {
              // if (equation instanceof EqnNavigator) {
              //   equation.showForm(toForm);
              // }
              nav.showForm(toForm);
              eqn.showForm(form);
              eqn.goToForm({
                name: toForm,
                animate: 'move',
                duration: duration,
                dissolveInTime: dissolveInTime,
                dissolveOutTime: dissolveOutTime,
                callback: function callback() {
                  nav.showForm(toForm);
                  countUp();
                }
              });
            }).start();
          });
        },
        setSteadyState: function setSteadyState() {
          if (userSections.setSteadyState != null) {
            userSections.setSteadyState();
          }

          equations.forEach(function (eqOptions, i) {
            if (eqOptions.nav == null && eqOptions.eqn == null) {
              return;
            }

            var options = joinObjects({}, defaultEqnOptions, eqOptions);
            var form = options.form,
                toForm = options.toForm,
                opacity = options.opacity;
            var eqn = options.eqn,
                nav = options.nav;

            if (eqn == null) {
              var _nav3 = nav;
              eqn = _nav3.eqn;
            }

            if (nav == null) {
              nav = {
                // eslint-disable-next-line no-unused-vars
                showForm: function showForm(t) {},
                // eslint-disable-next-line no-unused-vars
                setOpacity: function setOpacity(o) {}
              };
            }

            if (toForm == null && form != null) {
              nav.showForm(form);
              eqn.showForm(form);
            } else if (toForm != null) {
              nav.showForm(toForm);
              eqn.showForm(toForm);
            }

            if (i < equations.length - 1) {
              eqn.setOpacity(opacity);
              nav.setOpacity(opacity);
            }
          });
        }
      };
      var section = Object.assign.apply(Object, [{}].concat(sectionObjects, [eqnSection]));
      this.addSection(section);
    }
  }]);

  return PresentationLessonContent;
}(_SimpleLessonContent__WEBPACK_IMPORTED_MODULE_1__["default"]);

function makeFig(optionsIn) // id: string = `id_figure__${generateUniqueId()}`,
// elements: DiagramElement | Array<DiagramElement>,
// scale: string = 'fit',
// limits: Rect | null | Array<number> = null,
{
  var defaultOptions = {
    id: "id_figure__".concat(generateUniqueId()),
    scale: 'fit',
    window: [-1, -1, 2, 2],
    left: null,
    top: null,
    width: null,
    height: null,
    borderDebug: false,
    classes: ''
  };
  var options = joinObjects(defaultOptions, optionsIn);
  var leftMargin = '';
  var topMargin = '';
  var width = '';
  var height = '';
  var border = '';
  var classes = '';

  if (options.left != null) {
    leftMargin = "margin-left:".concat(options.left, "%;");
  }

  if (options.top != null) {
    topMargin = "margin-top:".concat(options.top, "%;");
  }

  if (options.left != null) {
    width = "width:".concat(options.width, "%;");
  }

  if (options.left != null) {
    height = "height:".concat(options.height, "%;");
  }

  if (options.borderDebug) {
    border = 'border-style:solid;border-width:1px;border-color:red;';
  }

  if (options.classes) {
    classes = " class=\"".concat(options.classes, "\"");
  }

  var elementsToUse;

  if (Array.isArray(options.element)) {
    elementsToUse = options.element;
  } else {
    elementsToUse = [options.element];
  }

  elementsToUse.forEach(function (element) {
    // eslint-disable-next-line no-param-reassign
    element.tieToHTML.element = options.id; // eslint-disable-next-line no-param-reassign

    element.tieToHTML.scale = options.scale;

    if (options.window != null) {
      if (Array.isArray(options.window)) {
        // eslint-disable-next-line no-param-reassign
        element.tieToHTML.window = new Rect(options.window[0], options.window[1], options.window[2], options.window[3]);
      } else {
        // eslint-disable-next-line no-param-reassign
        element.tieToHTML.window = options.window;
      }
    }
  });
  return "<div id=\"".concat(options.id, "\" style=\"").concat(width).concat(height).concat(topMargin).concat(leftMargin).concat(border, "\"").concat(classes, "></div>");
}



/***/ }),

/***/ "./src/js/Lesson/SimpleLesson.js":
/*!***************************************!*\
  !*** ./src/js/Lesson/SimpleLesson.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import Fig from 'figureone';
// import SimpleLessonContent from './SimpleLessonContent';
// import { PresentationLessonContent } from './PresentationLessonContent';
// import Diagram from '../diagram/Diagram';
// const { Diagram } = Fig;
var SimpleLesson =
/*#__PURE__*/
function () {
  function SimpleLesson(content) {
    _classCallCheck(this, SimpleLesson);

    this.content = content;
    this.type = 'simple';
  }

  _createClass(SimpleLesson, [{
    key: "initialize",
    value: function initialize() {
      this.content.initialize();
    }
  }]);

  return SimpleLesson;
}();

/* harmony default export */ __webpack_exports__["default"] = (SimpleLesson);

/***/ }),

/***/ "./src/js/Lesson/SimpleLessonContent.js":
/*!**********************************************!*\
  !*** ./src/js/Lesson/SimpleLessonContent.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _tools_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/misc */ "./src/js/tools/misc.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // Fetch polyfill
// import getLessonIndex from '../../Lessons/LessonsCommon/lessonindex';


var Diagram = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Diagram,
    Rect = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Rect;

var SimpleLessonContent =
/*#__PURE__*/
function () {
  function SimpleLessonContent() {
    var htmlId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lesson__content';

    _classCallCheck(this, SimpleLessonContent);

    this.htmlId = htmlId;
    this.sections = [];
    this.iconLink = '/';
    this.iconLinkGrey = '/';
    this.setTitle();
    this.key = 0;
  }

  _createClass(SimpleLessonContent, [{
    key: "initialize",
    value: function initialize() {
      this.setContent();
    }
  }, {
    key: "setTitle",
    value: function setTitle() {
      this.title = '';
    } // eslint-disable-next-line class-methods-use-this, no-unused-vars

  }, {
    key: "setContent",
    value: function setContent() {} // eslint-disable-next-line class-methods-use-this

  }, {
    key: "loadQR",
    value: function loadQR(qr, path) {
      var link = "/qr/".concat(path);
      Object(whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"])(link, {
        credentials: 'same-origin'
      }).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).then(function (data) {
        if (data.status === 'ok') {
          var jsFile = "/static/dist/".concat(path, "/").concat(data.js);
          var cssFile = "/static/dist/".concat(path, "/").concat(data.css);
          Object(_tools_misc__WEBPACK_IMPORTED_MODULE_2__["loadRemoteCSS"])("".concat(qr, "CSS"), cssFile, function () {
            Object(_tools_misc__WEBPACK_IMPORTED_MODULE_2__["loadRemote"])("".concat(qr, "Script"), jsFile, function () {});
          });
        }
      })["catch"](function () {});
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "loadQRs",
    value: function loadQRs(qrs) {
      var _this = this;

      qrs.forEach(function (qr) {
        var splitQR = qr.replace(/^\//, '').replace(/\/$/, '').split('/');
        var versionUID = splitQR.slice(-1)[0];
        var lessonUID = splitQR.slice(-2, -1)[0];
        var path = splitQR.slice(0, -2).join('/');

        _this.loadQR(qr, "Lessons/".concat(path, "/").concat(lessonUID, "/quickReference/").concat(versionUID));
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "prepareToShowQR",
    value: function prepareToShowQR() {
      // this.qrDiagram.container.style.zIndex = '10';
      var overlay = document.getElementById('simple_lesson__qr__overlay');

      if (overlay != null) {
        overlay.style.zIndex = '10';
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "prepareToHideQR",
    value: function prepareToHideQR() {
      var overlay = document.getElementById('simple_lesson__qr__overlay');

      if (overlay != null) {
        overlay.style.zIndex = '-1';
      }
    }
  }, {
    key: "showQR",
    value: function showQR(qrPath, qrid) {
      var qr = document.getElementById('id_lesson__qr__content_pres');

      if (qr != null) {
        qr.classList.remove('lesson__hide');
      }

      if (this.qrDiagram == null) {
        this.qrDiagram = new Diagram({
          htmlId: 'id_qr_diagram',
          // limits: this.diagram.limits,
          limits: new Rect(-3, -2, 6, 4),
          updateFontSize: true
        });
      } // this.qrDiagram.updateFontSize = false;


      this.prepareToShowQR(); // const [uid, versionUid] = combinedUid.split('/');

      var collection = new window.quickReference["".concat(qrPath, "/").concat(qrid)](this.qrDiagram);

      if (collection != null) {
        this.qrDiagram.elements.hide();
        this.qrDiagram.resize();
        this.qrDiagram.clearContext();
        this.qrDiagram.setElementsToCollection(collection);
        this.qrDiagram.elements.show();
        this.qrDiagram.elements.prepareToHideAll = this.prepareToHideQR.bind(this);
        this.qrDiagram.animateNextFrame();
      }
    }
  }]);

  return SimpleLessonContent;
}();

/* harmony default export */ __webpack_exports__["default"] = (SimpleLessonContent);

/***/ }),

/***/ "./src/js/Lesson/lessonDescription.js":
/*!********************************************!*\
  !*** ./src/js/Lesson/lessonDescription.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LessonDescription; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // Fetch polyfill

var Point = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Point;

var LessonDescription =
/*#__PURE__*/
function () {
  // versions: {[vuid: string]: {
  //   title: string;
  //   description: string;
  //   onPath: boolean;
  //   topics: Array<string>;
  //   qr: Array<string>;
  //   path: string,
  // }};
  // topics: {
  //   [versionName: string]: {
  //     title: string;
  //     description: string;
  //     onPath: boolean;
  //     qr: Array<string>;
  //     path: string;
  //     aveRating: number;
  //     numRatings: number;
  //     numHighRatings: number;
  //   };
  // };
  function LessonDescription(lesson) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, LessonDescription);

    this.title = lesson.title;
    this.path = lesson.path;
    this.uid = lesson.uid;
    this.dependencies = lesson.dependencies;
    this.location = new Point(0, 0);
    this.id = id;
    this.imgLink = "".concat(this.path, "/").concat(this.uid, "/tile.svg");
    this.imgLinkSelected = "".concat(this.path, "/").concat(this.uid, "/tile_ffffff.svg");
    this.imgLinkDisabled = "".concat(this.path, "/").concat(this.uid, "/tile_aaaaaa.svg");

    if (id === '') {
      this.id = "id_lesson__navigator_tile_".concat(lesson.uid);
    } // this.topics = {};
    // Object.keys(lesson.topics).forEach((topic) => {
    //   this.topics[topic] = lesson.topics[topic];
    // });


    this.topics = lesson.topics; // this.versions = {};       // Deprecate
    // Object.keys(lesson.versions).forEach((key) => {
    //   const version = lesson.versions[key];
    //   const {
    //     title, description, onPath, topics, qr, path,
    //   } = version;
    //   this.versions[key] = {
    //     title, description, onPath, topics, qr, path,
    //   };
    // });

    this.enabled = lesson.enabled; // this.topics = {};
    // this.numVersions = 0;
    // this.callbackCount = 0;
    // Object.keys(lesson.versions).forEach((versionName) => {
    //   const version = lesson.versions[versionName];
    //   const {
    //     title, description, onPath, topics, qr, path,
    //   } = version;
    //   topics.forEach((topicName) => {
    //     const v = {
    //       title,
    //       description,
    //       onPath,
    //       qr,
    //       path,
    //       aveRating: 0,
    //       numRatings: 0,
    //       numHighRatings: 0,
    //     };
    //     if (this.topics[topicName] == null) {   // $FlowFixMe
    //       this.topics[topicName] = {};
    //     }
    //     this.topics[topicName][versionName] = v;
    //     this.numVersions += 1;
    //   });
    // });
  }

  _createClass(LessonDescription, [{
    key: "waitThenCallback",
    value: function waitThenCallback(callback) {
      this.callbackCount += 1;

      if (this.callbackCount === this.numVersions) {
        callback();
      }
    }
  }, {
    key: "getRatings",
    value: function getRatings(callback) {
      var _this = this;

      this.callbackCount = 0;
      this.numVersions = 0;
      Object.keys(this.topics).forEach(function (topicName) {
        var topic = _this.topics[topicName];
        _this.numVersions += Object.keys(topic).length;
        Object.keys(topic).forEach(function (versionUID) {
          var version = topic[versionUID];
          var link = "/rating/".concat(_this.uid, "/").concat(topicName, "/").concat(versionUID);
          Object(whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"])(link, {
            credentials: 'same-origin'
          }).then(function (response) {
            if (!response.ok) {
              _this.waitThenCallback(callback);

              throw Error(response.statusText);
            }

            return response.json();
          }).then(function (data) {
            if (data.status === 'ok') {
              version.aveRating = data.aveRating;
              version.numRatings = data.numRatings;
              version.numHighRatings = data.numHighRatings;
              version.userRating = data.userRating;
            }

            _this.waitThenCallback(callback);
          })["catch"](function () {
            _this.waitThenCallback(callback);
          });
        });
      });
    }
  }]);

  return LessonDescription;
}();



/***/ }),

/***/ "./src/js/Lesson/lessonTree.js":
/*!*************************************!*\
  !*** ./src/js/Lesson/lessonTree.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeLessonTree; });
/* harmony import */ var _Lessons_LessonsCommon_lessonindex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Lessons/LessonsCommon/lessonindex */ "./src/Lessons/LessonsCommon/lessonindex.js");


// first array of arrays: all uids with no dependencies
// second array of arrays: all uids with dependencies alreay in the done list
function splitIndexIntoLearningPaths(lessonIndex) {
  var pathDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var learningPaths = {};
  Object.keys(lessonIndex).forEach(function (key) {
    var lesson = lessonIndex[key];
    var fullPath = lesson.path.split('/');
    var name = fullPath[pathDepth];
    var path = fullPath.slice(0, pathDepth + 1).join('/');

    if (!(name in learningPaths)) {
      learningPaths[name] = {
        path: path,
        lessons: [],
        name: name.replace(/_/, ' ')
      };
    }

    learningPaths[name].lessons.push(lesson);
  });
  return learningPaths;
}

function makeLessonTree() {
  var lessonIndex = Object(_Lessons_LessonsCommon_lessonindex__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var lessonLearningPaths = splitIndexIntoLearningPaths(lessonIndex);
  var lessonTrees = {};
  Object.keys(lessonLearningPaths).forEach(function (learningPath) {
    var lessons = lessonLearningPaths[learningPath].lessons;
    var lessonTree = [];
    var remainingUIDs = {};
    var existingUIDs = {};
    var allUIDs = [];
    lessons.forEach(function (lesson) {
      remainingUIDs[lesson.uid] = lesson;
      allUIDs.push(lesson.uid);
    });
    var index = 0;
    var max = lessons.length;

    var _loop = function _loop() {
      var lessonTreeNode = [];
      var newExisting = {}; // eslint-disable-next-line no-loop-func

      Object.keys(remainingUIDs).forEach(function (uid) {
        var lesson = remainingUIDs[uid];
        var canAddToExisting = true;
        lesson.dependencies.forEach(function (dependency) {
          if (!(dependency in existingUIDs) && allUIDs.indexOf(dependency) > -1) {
            canAddToExisting = false;
          }
        });

        if (canAddToExisting) {
          newExisting[uid] = uid;
          lessonTreeNode.push(lesson);
          delete remainingUIDs[uid];
        }
      });
      existingUIDs = Object.assign(newExisting, existingUIDs);
      lessonTree.push(lessonTreeNode);
      index += 1;
    };

    while (Object.keys(remainingUIDs).length > 0 && index < max) {
      _loop();
    }

    lessonTrees[learningPath] = {
      tree: lessonTree,
      name: lessonLearningPaths[learningPath].name,
      path: lessonLearningPaths[learningPath].path
    };
  });
  return lessonTrees;
}

/***/ }),

/***/ "./src/js/components/button.js":
/*!*************************************!*\
  !*** ./src/js/components/button.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tools_misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/misc */ "./src/js/tools/misc.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Button =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      // const props = Object.assign({}, this.props);
      var props = this.props;
      var Tag = props.href ? 'a' : 'button';
      var label = props.label || props.children || '';
      var className = Object(_tools_misc__WEBPACK_IMPORTED_MODULE_1__["classify"])('btn', props.className || ''); // delete props.label;

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Tag, _extends({}, props, {
        className: className
      }), label); //   if (props.href != null) {
      //     return <a href={props.href} className={className}>
      //       {label}
      //     </a>;
      //   }
      //   return <button className={className}>
      //     {label}
      //   </button>;
    }
  }]);

  return Button;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/dropDownButton.js":
/*!*********************************************!*\
  !*** ./src/js/components/dropDownButton.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropDownButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dropDownButtonBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropDownButtonBase */ "./src/js/components/dropDownButtonBase.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import Fig from 'figureone';



var DropDownButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropDownButton, _React$Component);

  function DropDownButton() {
    _classCallCheck(this, DropDownButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropDownButton).apply(this, arguments));
  }

  _createClass(DropDownButton, [{
    key: "render",
    value: function render() {
      // const props = Object.assign({}, this.props);
      var props = this.props;
      var listItems = [];

      if (props.list != null) {
        props.list.forEach(function (listElement) {
          listItems.push({
            label: listElement.label,
            link: listElement.link,
            active: listElement.active
          });
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_dropDownButtonBase__WEBPACK_IMPORTED_MODULE_1__["default"], {
        label: props.label,
        id: props.id,
        direction: props.direction,
        xAlign: props.xAlign,
        list: listItems,
        selected: props.selected
      }); // const label = props.label || '';
      // this.xAlign = props.xAlign || 'left';
      // this.direction = props.direction || 'down';
      // let arrowDirectionClass = ' dropdown_button_arrow_down';
      // if (this.direction === 'up') {
      //   arrowDirectionClass = ' dropdown_button_arrow_up';
      // }
      // let buttonClasses = 'dropdown_button_container';
      // if (props.selected != null && props.selected === true) {
      //   buttonClasses = `${buttonClasses} dropdown_button_selected`;
      // }
      // this.id = props.id || generateUniqueId('id__dropdown_button');
      // const listContent = [];
      // props.list.forEach((listItem, index) => {
      //   let classes = '';
      //   if (listItem.active) {
      //     classes = `${classes} dropdown_button_list_item_active`;
      //   }
      //   if (listItem.separator) {
      //     classes = `${classes} dropdown_button_list_item_separator`;
      //   }
      //   if (listItem.link == null) {
      //     classes = `${classes} dropdown_button_list_item_disabled`;
      //   }
      //   let item;
      //   if (listItem.link != null) {
      //     let linkRedirect = listItem.link;
      //     if (typeof listItem.link === 'string') {
      //       linkRedirect = () => {
      //         window.location = listItem.link;
      //       };
      //     }
      //     const closeThenRedirect = () => {
      //       this.close();
      //       if (linkRedirect != null && typeof linkRedirect === 'function') {
      //         linkRedirect();
      //       }
      //     };
      //     item = <div onClick={closeThenRedirect}>
      //       {this.renderListLabel(listItem)}
      //       </div>;
      //   } else {
      //     item = <div>{this.renderListLabel(listItem)}</div>;
      //   }
      //   if (item != null) {
      //     listContent.push(
      //       <div className={`dropdown_button_list_item${classes}`}
      //            key={index}>
      //         {item}
      //       </div>,
      //     );
      //   }
      // });
      // return <div className={buttonClasses}
      //   id={`${this.id}`}>
      //   <div className="dropdown_button_label_container"
      //        id={`${this.id}_label`}>
      //     <div className="dropdown_button_label">
      //       {label}
      //     </div>
      //     <div className={`dropdown_button_arrow${arrowDirectionClass}`}>
      //     </div>
      //   </div>
      //   <div className="dropdown_button_list dropdown_button_list_hide"
      //        id={`${this.id}_list`}>
      //     {listContent}
      //   </div>
      // </div>;
    }
  }]);

  return DropDownButton;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/dropDownButtonBase.js":
/*!*************************************************!*\
  !*** ./src/js/components/dropDownButtonBase.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropDownButtonBase; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var generateUniqueId = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc.generateUniqueId;

var DropDownButtonBase =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropDownButtonBase, _React$Component);

  // bodyElement: HTMLElement;
  function DropDownButtonBase(props) {
    var _this;

    _classCallCheck(this, DropDownButtonBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDownButtonBase).call(this, props));
    _this.id = '';
    return _this;
  }

  _createClass(DropDownButtonBase, [{
    key: "offButtonEvent",
    value: function offButtonEvent(event) {
      if (event.target instanceof HTMLElement) {
        var parent = event.target.parentElement;

        if (parent instanceof HTMLElement) {
          if (event.target !== this.labelElement) {
            this.close();

            if (event.target instanceof HTMLElement && parent.parentElement === this.itemList) {
              event.target.click();
            }
          }
        }
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.itemList.classList.add('dropdown_button_list_hide');
      this.itemList.style.left = '';
      this.itemList.style.top = '';
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.itemList.classList.contains('dropdown_button_list_hide')) {
        this.itemList.style.visibility = 'hidden'; // this.itemList.style.top = '-10000px';

        this.itemList.classList.remove('dropdown_button_list_hide');
        var rect = this.buttonElement.getBoundingClientRect();
        var listRect = this.itemList.getBoundingClientRect(); // $FlowFixMe

        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        var left = 0;

        if (this.direction === 'down') {
          this.itemList.style.top = "".concat(rect.height, "px");
        } else {
          this.itemList.style.top = "".concat(-listRect.height, "px");
        }

        if (this.xAlign === 'left') {
          left = 0;
        } else if (this.xAlign === 'right') {
          left = rect.width - listRect.width;
        } else if (this.xAlign === 'center') {
          left = rect.width / 2 - listRect.width / 2;
        }

        if (rect.left + left + listRect.width > windowWidth) {
          var delta = rect.left + left + listRect.width - windowWidth;
          left -= delta + 5;
        }

        this.itemList.style.left = "".concat(left, "px");
        this.itemList.style.visibility = 'visible';
      } else {
        this.itemList.style.left = '';
        this.itemList.style.top = '';
        this.itemList.classList.add('dropdown_button_list_hide');
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var button = document.getElementById(this.id);
      var label = document.getElementById("".concat(this.id, "_label"));
      var _document = document,
          body = _document.body;
      var itemList = document.getElementById("".concat(this.id, "_list"));

      if (button != null && body != null && itemList != null && label != null) {
        this.buttonElement = button;
        this.labelElement = label; // this.bodyElement = body;

        this.itemList = itemList;
        button.addEventListener('mousedown', this.toggle.bind(this));
        body.addEventListener('mousedown', this.offButtonEvent.bind(this), true);
        button.addEventListener('keydown', function (event) {
          if (event.keyCode === 13 || event.keyCode === 32) {
            _this2.toggle();
          }
        }); // button.addEventListener('focusout', () => {
        //   this.close();
        // });
      }

      window.addEventListener('resize', this.close.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // const props = Object.assign({}, this.props);
      var props = this.props;
      var label = props.label || '';
      this.xAlign = props.xAlign || 'left';
      this.direction = props.direction || 'down';
      var arrowDirectionClass = ' dropdown_button_arrow_down';

      if (this.direction === 'up') {
        arrowDirectionClass = ' dropdown_button_arrow_up';
      }

      var buttonClasses = 'dropdown_button_container';

      if (props.selected != null && props.selected === true) {
        buttonClasses = "".concat(buttonClasses, " dropdown_button_selected");
      }

      if (props.classes) {
        buttonClasses = "".concat(buttonClasses, " ").concat(props.classes);
      }

      this.id = props.id || generateUniqueId('id__dropdown_button');
      var listContent = [];

      if (props.list != null) {
        props.list.forEach(function (listItem, index) {
          var classes = '';

          if (listItem.active) {
            classes = "".concat(classes, " dropdown_button_list_item_active");
          }

          if (listItem.separator) {
            classes = "".concat(classes, " dropdown_button_list_item_separator");
          }

          if (listItem.link == null) {
            classes = "".concat(classes, " dropdown_button_list_item_disabled");
          }

          var item;

          if (listItem.link != null) {
            var linkRedirect = listItem.link;

            if (typeof listItem.link === 'string') {
              linkRedirect = function linkRedirect() {
                window.location = listItem.link;
              };
            }

            var closeThenRedirect = function closeThenRedirect() {
              _this3.close();

              if (linkRedirect != null && typeof linkRedirect === 'function') {
                linkRedirect();
              }
            };

            var keyboardCloseThenRedirect = function keyboardCloseThenRedirect(event) {
              if (event.keyCode === 13 || event.keyCode === 32) {
                closeThenRedirect();
              }
            };

            item = react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
              onClick: closeThenRedirect,
              tabIndex: 0,
              role: "button",
              onKeyDown: keyboardCloseThenRedirect,
              className: "dropdown_button_list_item_link"
            }, listItem.label);
          } else {
            item = react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, listItem.label);
          }

          if (item != null) {
            listContent.push(react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
              className: "dropdown_button_list_item".concat(classes),
              key: index
            }, item));
          }
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: buttonClasses,
        tabIndex: 0,
        role: "button",
        id: "".concat(this.id)
      }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: "dropdown_button_label_container",
        id: "".concat(this.id, "_label")
      }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: "dropdown_button_label"
      }, label), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: "dropdown_button_arrow".concat(arrowDirectionClass)
      })), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: "dropdown_button_list dropdown_button_list_hide",
        id: "".concat(this.id, "_list")
      }, listContent));
    }
  }]);

  return DropDownButtonBase;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./src/js/components/footer.js":
/*!*************************************!*\
  !*** ./src/js/components/footer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Footer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    // eslint-disable-next-line class-methods-use-this
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "footer__container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "footer_contact"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
        href: "mailto:feedback@thisiget.com?Subject=Feedback",
        className: "footer_email"
      }, "feedback@thisiget.com")));
    }
  }]);

  return Footer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/lesson.js":
/*!*************************************!*\
  !*** ./src/js/components/lesson.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LessonComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _lessonNavigator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lessonNavigator */ "./src/js/components/lessonNavigator.js");
/* harmony import */ var _lessonTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lessonTitle */ "./src/js/components/lessonTitle.js");
/* harmony import */ var _Lessons_LessonsCommon_lessonindex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Lessons/LessonsCommon/lessonindex */ "./src/Lessons/LessonsCommon/lessonindex.js");
/* harmony import */ var _Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Lesson/lessonDescription */ "./src/js/Lesson/lessonDescription.js");
/* harmony import */ var _topicButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./topicButton */ "./src/js/components/topicButton.js");
/* harmony import */ var _rating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rating */ "./src/js/components/rating.js");
/* harmony import */ var _tools_misc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../tools/misc */ "./src/js/tools/misc.js");
/* harmony import */ var _presentationLesson__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./presentationLesson */ "./src/js/components/presentationLesson.js");
/* harmony import */ var _simpleLesson__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./simpleLesson */ "./src/js/components/simpleLesson.js");
/* harmony import */ var _singlePageLesson__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./singlePageLesson */ "./src/js/components/singlePageLesson.js");
/* harmony import */ var _linksLesson__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./linksLesson */ "./src/js/components/linksLesson.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Fetch polyfill
// import '../../css/style.scss';
// import Lesson from '../Lesson/Lesson';
// import Button from './button';

 // import LessonTilePath from './lessonPathTile';



 // import DropDownButton from './dropDownButton';









function getLessonDescription(uid) {
  var lessons = Object(_Lessons_LessonsCommon_lessonindex__WEBPACK_IMPORTED_MODULE_4__["default"])();
  return lessons[uid];
}

var LessonComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LessonComponent, _React$Component);

  // diagrams: Object;
  function LessonComponent(props) {
    var _this;

    _classCallCheck(this, LessonComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LessonComponent).call(this, props));
    _this.lesson = props.lesson;
    var path = window.location.pathname.replace(/\/$/, '').split('/'); // const lessonUID = path.slice(-3, -2)[0];
    // const topic = path.slice(-2, -1)[0];
    // const versionUID = path.slice(-1)[0];
    // this.lessonDetails = props.lessonDetails;

    /* eslint-disable prefer-destructuring */

    _this.lessonUID = path.slice(-3, -2)[0];
    _this.versionUID = path.slice(-1)[0];
    _this.topic = path.slice(-2, -1)[0];
    /* eslint-enable */

    _this.lessonDescription = getLessonDescription(_this.lessonUID);
    _this.state = {
      userRating: 0,
      ratings: _this.fillRatings()
    }; // this.versionDetails = props.versionDetails;
    // const [topic] = window.location.pathname.split('/').slice(-2, -1);
    // this.topic = topic;

    _this.key = 0;
    _this.showNavigator = false;

    _this.getRating(_this.topic);

    if (_this.lessonDescription != null) {
      _this.lessonDescription.getRatings(_this.gotRatings.bind(_assertThisInitialized(_this)));
    }

    return _this;
  }

  _createClass(LessonComponent, [{
    key: "fillRatings",
    value: function fillRatings() {
      var lessonDescription = this.lessonDescription;

      if (lessonDescription != null) {
        var ratings = {};
        Object.keys(lessonDescription.topics).forEach(function (topicName) {
          var topic = lessonDescription.topics[topicName];

          if (!(topicName in ratings)) {
            ratings[topicName] = {};
          }

          Object.keys(topic).forEach(function (versionUID) {
            var version = topic[versionUID];
            ratings[topicName][versionUID] = {
              aveRating: version.aveRating,
              numRatings: version.numRatings,
              numHighRatings: version.numHighRatings,
              userRating: version.userRating
            };
          });
        });
        return ratings;
      }

      return {};
    }
  }, {
    key: "gotRatings",
    value: function gotRatings() {
      this.setState({
        ratings: this.fillRatings()
      });
    }
  }, {
    key: "getRating",
    value: function getRating(topic) {
      var _this2 = this;

      // const lessonUid = this.lessonDetails.details.uid;
      // const versionUid = this.versionDetails.details.uid;
      var link = "/rating/".concat(this.lessonUID, "/").concat(topic, "/").concat(this.versionUID);
      Object(whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"])(link, {
        credentials: 'same-origin'
      }).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).then(function (data) {
        if (data.status === 'ok') {
          if (data.userRating && data.userRating !== 'not rated' && data.userRating !== 'not logged in') {
            // this.setUserRating(data.userRating);
            _this2.setState({
              userRating: data.userRating
            });
          }
        }
      })["catch"](function () {});
    }
  }, {
    key: "setUserRating",
    value: function setUserRating(rating) {
      var _this3 = this;

      var _document = document,
          cookie = _document.cookie;

      if (cookie != null) {
        var username = cookie.match(/username=[^;]*;/);

        if (username != null) {
          if (username[0].split('=')[1].slice(0, -1) === '') {
            return;
          }
        }
      }

      var page = parseInt(Object(_tools_misc__WEBPACK_IMPORTED_MODULE_8__["getCookie"])('page'), 10) - 1 || 0;
      var link = "/rate/".concat(this.lessonUID, "/").concat(this.topic, "/").concat(this.versionUID, "/").concat(rating, "?page=").concat(page + 1, ";pages=").concat(this.lesson.content.sections.length);
      Object(whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"])(link, {
        credentials: 'same-origin'
      }).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).then(function (data) {
        if (data.status === 'done') {
          _this3.setState({
            userRating: rating
          });
        } else {// console.log('failed to set rating:', data.message);
        }
      })["catch"](function () {});
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(title) {
      this.key += 1;
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title",
        key: this.key
      }, title);
    }
  }, {
    key: "titleAsTile",
    value: function titleAsTile() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__title_tile",
        className: "lesson__title_tile"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", {
        src: '/static/',
        className: "navigator__lesson_tile_image"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_tile_containter lesson__title_tile_shadow"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_tile_title"
      }, this.lesson.content.title)));
    }
  }, {
    key: "calcTitleHeight",
    value: function calcTitleHeight() {
      var lessonDescription = this.lessonDescription;
      var count = 0;

      if (lessonDescription != null) {
        // count = lessonDescription.paths.length;
        count = 9;
      }

      if (count === 1) {
        return ' lesson__title_bar_force_low';
      }

      if (count > 8) {
        return ' lesson__title_bar_force_high';
      }

      return '';
    }
  }, {
    key: "getTopics",
    value: function getTopics() {
      var _this4 = this;

      var topics = {}; // const [currentTopic, currentVersion] = window.location.href.split('/').slice(-2);

      var lessonDescription = this.lessonDescription;

      if (lessonDescription != null) {
        Object.keys(this.state.ratings).forEach(function (topicName) {
          var topic = _this4.state.ratings[topicName];
          Object.keys(topic).forEach(function (versionUID) {
            var version = lessonDescription.topics[topicName][versionUID];
            var label = version.title;
            var link = "".concat(lessonDescription.path, "/").concat(lessonDescription.uid, "/").concat(topicName, "/").concat(versionUID);

            if (topicName === 'dev') {
              link = "/dev".concat(lessonDescription.path, "/").concat(lessonDescription.uid, "/quickReference/").concat(versionUID);
            } // const { description } = version;


            var fullLesson = version.fullLesson;
            var type = version.type;
            var rating = _this4.state.ratings[topicName][versionUID];
            var userRating = rating.userRating;

            if (!(topicName in topics)) {
              topics[topicName] = {};
            }

            var active = false; // console.log(currentExplanation, version, topic)

            if (_this4.versionUID === versionUID && _this4.topic === topicName) {
              active = true;
              userRating = _this4.state.userRating;
            }

            topics[topicName][versionUID] = {
              label: label,
              link: link,
              userRating: userRating,
              rating: rating.aveRating,
              numReviews: rating.numRatings,
              numHighRatings: rating.numHighRatings,
              description: '',
              active: active,
              fullLesson: fullLesson,
              type: type
            };
          });
        });
      }

      return topics;
    }
  }, {
    key: "addTopics",
    value: function addTopics() {
      var _this5 = this;

      var output = [];
      var topics = this.getTopics();
      var topicNames = ['summary', 'explanation', 'implications', 'history', 'references', 'quiz'];
      Object.keys(topics).forEach(function (topicName) {
        if (topicNames.indexOf(topicName) === -1) {
          topicNames.push(topicName);
        }
      }); // const currentTopic = window.location.href.split('/').slice(-2, -1)[0];

      topicNames.forEach(function (name) {
        if (topics[name] != null && name !== 'quickReference') {
          var topic = topics[name]; // $FlowFixMe - onPath is there and boolean

          var fullLessonCount = Object.keys(topic).filter(function (ver) {
            return topic[ver].fullLesson;
          }).length; // $FlowFixMe - onPath is there and boolean

          var partialLessonCount = Object.keys(topic).filter(function (ver) {
            return !topic[ver].fullLesson;
          }).length;
          var selected = false;

          if (_this5.topic === name) {
            selected = true;
          }

          var vUIDs = Object.keys(topic);
          vUIDs = vUIDs.sort(function (aKey, bKey) {
            var a = topic[aKey];
            var b = topic[bKey];

            if (a.rating < b.rating) {
              return 1;
            }

            if (a.rating > b.rating) {
              return -1;
            }

            if (a.numReviews < b.numReviews) {
              return 1;
            }

            if (a.numReviews > b.numReviews) {
              return -1;
            }

            var labelA = a.label.toUpperCase();
            var labelB = b.label.toUpperCase();

            if (labelA > labelB) {
              return 1;
            }

            if (labelA < labelB) {
              return -1;
            }

            return 0;
          });
          vUIDs = vUIDs.sort(function (aKey, bKey) {
            var a = topic[aKey];
            var b = topic[bKey];

            if (a.fullLesson === true && b.fullLesson === false) {
              return -1;
            }

            if (a.fullLesson === false && b.fullLesson === true) {
              return 1;
            }

            return 0;
          });
          var listItems = [];
          vUIDs.forEach(function (vUID) {
            listItems.push(topic[vUID]);

            if (name === 'quickReference') {
              listItems.slice(-1)[0].label = vUID;
            }
          });
          _this5.key += 1;

          if (partialLessonCount > 0 && name === 'explanation') {
            listItems.splice(fullLessonCount, 0, {
              label: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
                className: "topic_button__portion_separator"
              }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
                className: "topic_button__portion_separator_label"
              }, 'Portion of Lesson')),
              separator: true
            });
            listItems.splice(0, 0, {
              label: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
                className: "topic_button__portion_separator"
              }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
                className: "topic_button__portion_separator_label"
              }, 'Full Lesson')),
              separator: true
            });
          }

          if (listItems.length === 1) {
            var singleItemClass = 'dropdown_button_container';

            if (selected) {
              singleItemClass = "".concat(singleItemClass, " dropdown_button_selected");
            }

            output.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
              className: "lesson__path_tile",
              key: _this5.key
            }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
              className: singleItemClass
            }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
              href: listItems[0].link || '/',
              className: "topic_button__single_item_label"
            }, name.charAt(0).toUpperCase() + name.slice(1)))));
          } else {
            output.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
              className: "lesson__path_tile",
              key: _this5.key
            }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_topicButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
              id: "id__lesson__topic_button_".concat(name),
              label: name.charAt(0).toUpperCase() + name.slice(1),
              direction: "down",
              xAlign: "left",
              selected: selected,
              list: listItems
            })));
          }
        }
      });
      return output;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "getTopic",
    value: function getTopic() {
      // const topicName = window.location.href.split('/').slice(-2, -1)[0];
      return this.topic.charAt(0).toUpperCase() + this.topic.slice(1);
    }
  }, {
    key: "renderLesson",
    value: function renderLesson() {
      if (this.lesson.type === 'presentation') {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_presentationLesson__WEBPACK_IMPORTED_MODULE_9__["default"], {
          lesson: this.lesson
        });
      }

      if (this.lesson.type === 'singlePage') {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_singlePageLesson__WEBPACK_IMPORTED_MODULE_11__["default"], {
          lesson: this.lesson
        });
      }

      if (this.lesson.type === 'links') {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_linksLesson__WEBPACK_IMPORTED_MODULE_12__["default"], {
          lesson: this.lesson,
          isLoggedIn: this.props.isLoggedIn
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_simpleLesson__WEBPACK_IMPORTED_MODULE_10__["default"], {
        lesson: this.lesson
      });
    }
  }, {
    key: "ratingLabel",
    value: function ratingLabel() {
      var topicName = this.topic.charAt(0).toUpperCase() + this.topic.slice(1);

      if (this.props.isLoggedIn) {
        if (this.lesson.type === 'links') {
          return 'Are these links helpful?';
        }

        return "Is this ".concat(topicName, " helpful?");
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
        className: "rating__login",
        onClick: _tools_misc__WEBPACK_IMPORTED_MODULE_8__["login"]
      }, "Login"), " to rate ", topicName, ":");
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      // console.log(`${window.location.pathname}/tile.svg`)
      var path = window.location.pathname.replace(/\/$/, '').split('/').slice(0, -2);

      if (path[1] === 'dev') {
        path = [''].concat(_toConsumableArray(window.location.pathname.replace(/\/$/, '').split('/').slice(2, -2)));
      }

      var imgLink = "/static/dist".concat(path.join('/'), "/tile.svg");
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_bar".concat(this.calcTitleHeight())
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_lessonTitle__WEBPACK_IMPORTED_MODULE_3__["default"] // imgLink={`${this.lesson.content.iconLinkGrey}`}
      , {
        imgLink: imgLink // imgLink={`${window.location.pathname}/tile.svg`}
        // imgLink={`${this.lesson.lessonDetails.imgLink}`}
        ,
        key: "1",
        label: this.lesson.content.title
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__path_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__path_mid_tiles"
      }, this.addTopics())), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_rating__WEBPACK_IMPORTED_MODULE_7__["default"], {
        topic: this.topic,
        rating: this.state.userRating,
        ratingCallback: this.setUserRating.bind(this),
        isLoggedIn: this.props.isLoggedIn,
        label: this.ratingLabel()
      })), this.renderLesson(), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__white_spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_lessonNavigator__WEBPACK_IMPORTED_MODULE_2__["default"], {
        selected: this.lesson.content.title,
        learningPath: 'Geometry_1',
        ref: function ref(lessonNavigator) {
          _this6.lessonNavigator = lessonNavigator;
        }
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__white_spacer"
      }));
    }
  }]);

  return LessonComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/lessonNavigator.js":
/*!**********************************************!*\
  !*** ./src/js/components/lessonNavigator.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LessonNavigator; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lessonTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lessonTile */ "./src/js/components/lessonTile.js");
/* harmony import */ var _Lesson_lessonDescription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Lesson/lessonDescription */ "./src/js/Lesson/lessonDescription.js");
/* harmony import */ var _Lesson_lessonTree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Lesson/lessonTree */ "./src/js/Lesson/lessonTree.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import '../../css/style.scss';




var Point = figureone__WEBPACK_IMPORTED_MODULE_1___default.a.Point,
    Rect = figureone__WEBPACK_IMPORTED_MODULE_1___default.a.Rect;
var getDefinedCSSVariables = figureone__WEBPACK_IMPORTED_MODULE_1___default.a.tools.css.getDefinedCSSVariables;

var LessonNavigator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LessonNavigator, _React$Component);

  function LessonNavigator(props) {
    var _this;

    _classCallCheck(this, LessonNavigator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LessonNavigator).call(this, props));
    _this.lessonTrees = Object(_Lesson_lessonTree__WEBPACK_IMPORTED_MODULE_4__["default"])();
    _this.lessonIndex = _this.lessonTrees[props.learningPath].tree;
    _this.learningPathPath = _this.lessonTrees[props.learningPath].path;
    _this.learningPathName = _this.lessonTrees[props.learningPath].name;

    _this.getVariables();

    _this.layoutLessonTiles();

    _this.key = 0;
    _this.selected = props.selected || '';
    _this.asTitle = false;

    if (_this.selected !== '') {
      _this.asTitle = true;
    }

    _this.learningPath = props.learningPath;
    return _this;
  }

  _createClass(LessonNavigator, [{
    key: "getVariables",
    value: function getVariables() {
      var _document = document,
          body = _document.body;

      if (body) {
        var vars = getDefinedCSSVariables(body, ['--navigator__tile_width', '--navigator__tile_height', '--navigator__tile_vSpace', '--navigator__tile_hSpace'], '--navigator__');
        this.tileWidth = vars.tileWidth;
        this.tileHeight = vars.tileHeight;
        this.tileVSpace = vars.tileVSpace;
        this.tileHSpace = vars.tileHSpace;
      }
    }
  }, {
    key: "layoutLessonTiles",
    value: function layoutLessonTiles() {
      var _this2 = this;

      this.lessonArray = []; // const y = this.tileHeight * 2 + vSpace * 2;

      var width = this.tileWidth;
      var height = this.tileHeight;
      var vSpace = this.tileVSpace;
      var hSpace = this.tileHSpace;
      var x = hSpace;
      this.lessonArray = [];
      var maxParallel = 1;
      this.lessonIndex.forEach(function (lesson) {
        if (Array.isArray(lesson)) {
          if (lesson.length > maxParallel) {
            maxParallel = lesson.length;
          }
        }
      });
      var yMiddle = (maxParallel * this.tileHeight + (maxParallel - 1) * vSpace + vSpace * 2) / 2;
      this.lessonIndex.forEach(function (lesson) {
        if (Array.isArray(lesson)) {
          var len = lesson.length;
          var totalHeight = len * height + (len - 1) * vSpace;
          var yStart = yMiddle - totalHeight / 2 + height / 2;

          if (yStart < yMiddle - 2 * height - 2 * vSpace) {
            yStart = yMiddle - 2 * height - 2 * vSpace;
          }

          lesson.forEach(function (parallelLesson, index) {
            var yLocation = yStart + index * (height + vSpace); // eslint-disable-next-line no-param-reassign

            parallelLesson.location = new Point(x, yLocation - _this2.tileHeight / 2);

            _this2.lessonArray.push(parallelLesson);
          });
        } else {
          // eslint-disable-next-line no-param-reassign
          lesson.location = new Point(x, yMiddle - _this2.tileHeight / 2);

          _this2.lessonArray.push(lesson);
        }

        x += width + hSpace;
      });
      this.getLessonTilesBounds();
    }
  }, {
    key: "createLessonJsx",
    value: function createLessonJsx(lesson) {
      this.key += 1;
      var state = '';
      var _lesson$location = lesson.location,
          x = _lesson$location.x,
          y = _lesson$location.y;

      if (lesson.title === this.selected) {
        state = 'selected';
        this.selectedLesson = lesson;
      }

      var title = lesson.title;

      if (lesson.enabled === false) {
        state = 'disabled';
        title = "".concat(title);
      }

      var linkToUse = '';
      var topicsOrder = ['explanation', 'summary', 'examples', 'links'];
      var versionsOrder = ['base', 'static'];

      var getVersion = function getVersion(topic) {
        var versions = lesson.topics[topic];

        for (var i = 0; i < versionsOrder.length; i += 1) {
          var version = versionsOrder[i];

          if (version in versions) {
            linkToUse = "".concat(lesson.path, "/").concat(lesson.uid, "/").concat(topic, "/").concat(version);
            return;
          }
        }

        if (linkToUse === '' && Object.keys(versions).length > 0) {
          linkToUse = "".concat(lesson.path, "/").concat(lesson.uid, "/").concat(topic, "/").concat(Object.keys(versions)[0]);
        }
      };

      for (var t = 0; t < topicsOrder.length; t += 1) {
        var topic = topicsOrder[t];

        if (topic in lesson.topics) {
          getVersion(topic);

          if (linkToUse !== '') {
            break;
          }
        }
      }

      if (linkToUse === '' && Object.keys(lesson.topics).length > 0) {
        getVersion(Object.keys(lesson.topics)[0]);
      }

      if (linkToUse === '') {
        state = 'disabled';
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_lessonTile__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: lesson.id,
        link: linkToUse,
        imgLink: lesson.imgLink,
        imgLinkSelected: lesson.imgLinkSelected,
        imgLinkDisabled: lesson.imgLinkDisabled,
        key: this.key,
        label: title,
        state: state,
        left: "".concat(x, "px"),
        top: "".concat(y, "px"),
        title: false
      });
    }
  }, {
    key: "lessons",
    value: function lessons() {
      var _this3 = this;

      var lessons = [];
      this.lessonIndex.forEach(function (lesson) {
        if (Array.isArray(lesson)) {
          lesson.forEach(function (parallelLesson) {
            lessons.push(_this3.createLessonJsx(parallelLesson));
          });
        } else {
          lessons.push(_this3.createLessonJsx(lesson));
        }
      });
      return lessons;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.centerLessons(); // window.addEventListener('resize', this.centerLessons.bind(this));

      this.scrollToSelected();
    }
  }, {
    key: "scrollToSelected",
    value: function scrollToSelected() {
      var navScroll = document.getElementById("id_navigator__scroll_container_".concat(this.learningPath));
      var navigatorContainer = document.getElementById("id_navigator__container_".concat(this.learningPath));

      if (navScroll != null && navigatorContainer != null) {
        var navRect = navigatorContainer.getBoundingClientRect();
        var xMargin = Math.min(this.tileWidth, navRect.width / 2 - this.tileWidth / 2);
        var yMargin = (navRect.height - this.lessonTilesBounds.height) / 2;

        if (this.selected !== '') {
          navScroll.scrollLeft = this.selectedLesson.location.x + xMargin - navScroll.clientWidth / 2 + this.tileWidth / 2;
          navScroll.scrollTop = this.selectedLesson.location.y + yMargin - navScroll.clientHeight / 2 + this.tileHeight / 2;
        } else {
          navScroll.scrollLeft = this.lessonArray[0].location.x + xMargin - navScroll.clientWidth / 2 + this.tileWidth / 2;
          navScroll.scrollTop = this.lessonArray[0].location.y + yMargin - navScroll.clientHeight / 2 + this.tileHeight / 2;
        }
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "centerLessons",
    value: function centerLessons() {
      var navigatorContainer = document.getElementById("id_navigator__container_".concat(this.learningPath));
      var lessonsContainer = document.getElementById("id_navigator__lessons_positions_container_".concat(this.learningPath));

      if (lessonsContainer != null && navigatorContainer != null) {
        var navRect = navigatorContainer.getBoundingClientRect();
        var navHeight = navRect.height; // const xMargin = navRect.width / 2 - this.tileWidth / 2;

        var xMargin = Math.min(this.tileWidth, navRect.width / 2 - this.tileWidth / 2);
        lessonsContainer.style.left = "".concat(xMargin, "px");
        lessonsContainer.style.top = "".concat((navHeight - this.lessonTilesBounds.height) / 2, "px");
        lessonsContainer.style.width = "".concat(this.lessonTilesBounds.width + xMargin, "px");
        lessonsContainer.style.height = "".concat(this.lessonTilesBounds.height, "px");
      }
    }
  }, {
    key: "getLessonTilesBounds",
    value: function getLessonTilesBounds() {
      var _this4 = this;

      var xMax = 0;
      var yMax = 0;
      var yMin = 0;
      var xMin = 0;
      var firstElement = true;
      this.lessonArray.forEach(function (lesson) {
        if (firstElement) {
          xMin = lesson.location.x;
          xMax = lesson.location.x + _this4.tileWidth;
          yMin = lesson.location.y;
          yMax = lesson.location.y + _this4.tileHeight;
          firstElement = false;
        } else {
          if (lesson.location.x + _this4.tileWidth > xMax) {
            xMax = lesson.location.x + _this4.tileWidth;
          }

          if (lesson.location.y + _this4.tileHeight > yMax) {
            yMax = lesson.location.y + _this4.tileHeight;
          }

          if (lesson.location.y < yMin) {
            yMin = lesson.location.y;
          }
        }
      });
      yMin -= this.tileVSpace;
      yMax += this.tileVSpace;
      xMin -= this.tileHSpace;
      xMax += this.tileHSpace;
      this.lessonTilesBounds = new Rect(xMin, yMin, xMax - xMin, yMax - yMin);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "render",
    value: function render() {
      var classStr = 'naviagator__container navigator__container_with_shadow';
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__topic_title_subtext"
      }, 'Learning path'), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__topic_title_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", {
        src: "/static/dist/".concat(this.learningPathPath, "/topic.png"),
        className: "navigator__topic_title_img",
        alt: "Icon for ".concat(this.learningPathName)
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__topic_title"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__topic_title_text"
      }, this.learningPathName))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_navigator__container_".concat(this.learningPath),
        className: classStr
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__left_side"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__right_side"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_navigator__scroll_container_".concat(this.learningPath),
        className: "navigator__scroll_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_navigator__lessons_positions_container_".concat(this.learningPath),
        className: "navigator__lessons_positions_container"
      }, this.lessons()))));
    }
  }]);

  return LessonNavigator;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/lessonTile.js":
/*!*****************************************!*\
  !*** ./src/js/components/lessonTile.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LessonTile; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import '../../css/style.scss';
// import img from '../../tile.png';

var LessonTile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LessonTile, _React$Component);

  function LessonTile() {
    _classCallCheck(this, LessonTile);

    return _possibleConstructorReturn(this, _getPrototypeOf(LessonTile).apply(this, arguments));
  }

  _createClass(LessonTile, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var isTitle = false;

      if (props.title != null) {
        isTitle = props.title;
      } // const Tag = props.href ? 'a' : 'button';


      var label = props.label || '';
      var id = props.id || '';
      var style = {};

      if (props.left != null || props.top != null) {
        var left = props.left || 0;
        var top = props.top || 0;
        style = {
          left: left,
          top: top
        };
      }

      var link = props.link || '/';
      var classText = 'navigator__lesson_tile_containter navigator__lesson_shadow';

      if (isTitle) {
        classText = 'navigator__lesson_tile_containter navigator__lesson_tile_containter_title';
      }

      var imgLink = '/static/assets/defaultTile.png';

      if (props.imgLink != null) {
        imgLink = '/static/dist'.concat(props.imgLink);
      }

      if (props.state === 'disabled') {
        classText = "".concat(classText, " navigator__lesson_tile_disabled");

        if (props.imgLinkDisabled != null) {
          imgLink = '/static/dist'.concat(props.imgLinkDisabled);
        }
      }

      if (props.state === 'selected') {
        classText = "".concat(classText, " navigator__lesson_tile_selected");

        if (props.imgLinkSelected != null) {
          imgLink = '/static/dist'.concat(props.imgLinkSelected);
        }
      }

      var content = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: classText
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", {
        src: imgLink,
        className: "navigator__lesson_tile_image",
        alt: "Icon for ".concat(label)
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__lesson_tile_title_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__lesson_tile_title"
      }, label)));

      if (isTitle || props.state === 'disabled') {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          id: id,
          style: style,
          className: "navigator__lesson_tile"
        }, content);
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
        href: link,
        id: id,
        style: style,
        className: "navigator__lesson_tile"
      }, content);
    }
  }]);

  return LessonTile;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/lessonTitle.js":
/*!******************************************!*\
  !*** ./src/js/components/lessonTitle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LessonTitle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import '../../css/style.scss';
// import img from '../../tile.png';

var LessonTitle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LessonTitle, _React$Component);

  function LessonTitle() {
    _classCallCheck(this, LessonTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(LessonTitle).apply(this, arguments));
  }

  _createClass(LessonTitle, [{
    key: "render",
    value: function render() {
      // const props = Object.assign({}, this.props);
      // let isTitle = false;
      // if (props.title != null) {
      //   isTitle = props.title;
      // }
      // const Tag = props.href ? 'a' : 'button';
      var label = this.props.label || ''; // const link = props.link || '/';
      // let classText = 'lesson__title_container';
      // if (isTitle) {
      //   classText = 'navigator__lesson_tile_containter navigator__lesson_tile_containter_title';
      // }
      // if (props.state === 'disabled') {
      //   classText = `${classText} navigator__lesson_tile_disabled`;
      // }
      // if (props.state === 'selected') {
      //   classText = `${classText} navigator__lesson_tile_selected`;
      // }

      var imgLink = '/static/assets/defaultTile.png';

      if (this.props.imgLink != null) {
        imgLink = "".concat(this.props.imgLink);
      } // const content = <div className={classText}>
      //     <img src={imgLink} className="navigator__lesson_tile_image" />
      //     <div className="navigator__lesson_tile_title_container">
      //       <div className="navigator__lesson_tile_title">
      //         {label}
      //       </div>
      //     </div>
      //   </div>;


      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_centering_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_img_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", {
        src: imgLink,
        className: "lesson__title_image",
        alt: "Icon for lesson title"
      })), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_text_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__title_text"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, label)))));
    }
  }]);

  return LessonTitle;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/linksLesson.js":
/*!******************************************!*\
  !*** ./src/js/components/linksLesson.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LinksLessonComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lesson_SimpleLesson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lesson/SimpleLesson */ "./src/js/Lesson/SimpleLesson.js");
/* harmony import */ var _linksTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linksTable */ "./src/js/components/linksTable.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var LinksLessonComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LinksLessonComponent, _React$Component);

  function LinksLessonComponent(props) {
    var _this;

    _classCallCheck(this, LinksLessonComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinksLessonComponent).call(this, props));
    _this.lesson = props.lesson;
    _this.key = 0;
    return _this;
  }

  _createClass(LinksLessonComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Instantiate diagram now that the canvas elements have been
      // created.
      this.lesson.initialize();
    }
  }, {
    key: "renderSections",
    value: function renderSections() {
      var _this2 = this;

      var sections = [];
      this.lesson.content.sections.forEach(function (section, index) {
        if (section.links != null) {
          sections.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
            key: index
          }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_linksTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
            links: section.links,
            isLoggedIn: _this2.props.isLoggedIn
          })));
        } else {
          sections.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
            key: index
          }, section));
        }
      });
      return sections;
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: this.lesson.content.htmlId,
        className: "simple_lesson__container"
      }, this.renderSections());
    } // render() {
    //   return <div id={this.lesson.content.htmlId}>
    //     <div key={0} className="simple_lesson__container">
    //       <LinksTable links={version.links} />
    //     </div>,
    //     {this.lesson.content.sections[0]}
    //   </div>;
    // }

  }]);

  return LinksLessonComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/linksTable.js":
/*!*****************************************!*\
  !*** ./src/js/components/linksTable.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LinksTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rating */ "./src/js/components/rating.js");
/* harmony import */ var _tools_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/misc */ "./src/js/tools/misc.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Fetch polyfill


 // import { getCookie } from '../tools/misc';
// import '../../css/style.scss';
// import img from '../../tile.png';

var LinksTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LinksTable, _React$Component);

  function LinksTable(props) {
    var _this;

    _classCallCheck(this, LinksTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinksTable).call(this, props));
    var path = window.location.pathname.replace(/\/$/, '').split('/');
    _this.links = [];
    props.links.forEach(function (link) {
      _this.links.push({
        url: link.url,
        hash: link.hash,
        type: link.type || 'generic',
        title: link.author || link.publisher || '',
        description: link.description || '',
        numHighRatings: null,
        userRating: 0,
        userRatingIsHigh: false
      });
    });
    _this.hasDescription = false;

    _this.links.forEach(function (link) {
      if (link.description) {
        _this.hasDescription = true;
      }
    });
    /* eslint-disable prefer-destructuring */


    _this.lessonUID = path.slice(-3, -2)[0];
    _this.versionUID = path.slice(-1)[0];
    _this.topic = path.slice(-2, -1)[0]; // /* eslint-enable */
    // this.lessonDescription = getLessonDescription(this.lessonUID);

    _this.state = {
      ratings: _this.fillRatings()
    }; // // this.versionDetails = props.versionDetails;
    // // const [topic] = window.location.pathname.split('/').slice(-2, -1);
    // // this.topic = topic;
    // this.key = 0;
    // this.showNavigator = false;
    // this.getRating(this.topic);

    _this.getLinkRatings(_this.gotLinkRatings.bind(_assertThisInitialized(_this))); // if (this.lessonDescription != null) {
    //   this.lessonDescription.getRatings(this.gotRatings.bind(this));
    // }


    return _this;
  }

  _createClass(LinksTable, [{
    key: "fillRatings",
    value: function fillRatings() {
      var ratings = [];
      this.links.forEach(function (link) {
        ratings.push({
          userRating: link.userRating,
          numHighRatings: link.numHighRatings
        });
      });
      return ratings;
    }
  }, {
    key: "gotLinkRatings",
    value: function gotLinkRatings() {
      this.setState({
        ratings: this.fillRatings()
      });
    }
  }, {
    key: "waitThenCallback",
    value: function waitThenCallback(callback) {
      this.callbackCount += 1;

      if (this.callbackCount === this.props.links.length) {
        callback();
      }
    }
  }, {
    key: "getLinkRatings",
    value: function getLinkRatings(callback) {
      var _this2 = this;

      this.callbackCount = 0;
      this.numLinks = 0;
      this.links.forEach(function (link) {
        var endpoint = "/linkrating/".concat(_this2.lessonUID, "/").concat(_this2.topic, "/").concat(_this2.versionUID, "/").concat(link.hash);
        Object(whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"])(endpoint, {
          credentials: 'same-origin'
        }).then(function (response) {
          if (!response.ok) {
            _this2.waitThenCallback(callback);

            throw Error(response.statusText);
          }

          return response.json();
        }).then(function (data) {
          var userRatingIsHigh = false;

          if (data.userRating != null && data.userRating > 3) {
            userRatingIsHigh = true;
          }

          if (data.status === 'ok') {
            /* eslint-disable no-param-reassign */
            link.numHighRatings = data.numHighRatings;
            link.userRating = data.userRating || 0;
            link.userRatingIsHigh = userRatingIsHigh;
            /* eslint-enable */
          }

          _this2.waitThenCallback(callback);
        })["catch"](function () {
          _this2.waitThenCallback(callback);
        });
      });
    }
  }, {
    key: "setUserRating",
    value: function setUserRating(rating, index) {
      var _this3 = this;

      var _document = document,
          cookie = _document.cookie;

      if (cookie != null) {
        var username = cookie.match(/username=[^;]*;/);

        if (username != null) {
          if (username[0].split('=')[1].slice(0, -1) === '') {
            return;
          }
        }
      } // const page = parseInt(getCookie('page'), 10) - 1 || 0;


      this.links[index].userRating = rating;
      var endpoint = "/ratelink/".concat(this.lessonUID, "/").concat(this.topic, "/").concat(this.versionUID, "/").concat(this.links[index].hash, "/").concat(rating);
      var updateState = false;

      if (this.links[index].userRatingIsHigh && rating < 4) {
        if (this.links[index].numHighRatings != null) {
          this.links[index].numHighRatings -= 1;
        }

        this.links[index].userRatingIsHigh = false;
        updateState = true;
      }

      if (this.links[index].userRatingIsHigh === false && rating > 3) {
        if (this.links[index].numHighRatings != null) {
          this.links[index].numHighRatings += 1;
        } else {
          this.links[index].numHighRatings = 1;
        }

        this.links[index].userRatingIsHigh = true;
        updateState = true;
      }

      if (updateState) {
        this.setState({
          ratings: this.fillRatings()
        });
      }

      Object(whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"])(endpoint, {
        credentials: 'same-origin'
      }).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).then(function (data) {
        if (data.status === 'done') {
          _this3.setState({
            ratings: _this3.fillRatings()
          });
        } else {// console.log('failed to set rating:', data.message);
        }
      })["catch"](function () {});
    }
  }, {
    key: "renderLinks",
    value: function renderLinks() {
      var _this4 = this;

      var links = [];
      var key = 0;
      this.links.forEach(function (link, index) {
        // let rating = <div className="lesson__links_table__disabled">{'-'}</div>;
        // if (this.props.isLoggedIn) {
        var userRatingValue = _this4.state.ratings[index].userRating;

        if (typeof userRatingValue !== 'number') {
          userRatingValue = 0;
        }

        var rating = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_rating__WEBPACK_IMPORTED_MODULE_2__["default"], {
          topic: _this4.topic,
          rating: userRatingValue,
          ratingCallback: function ratingCallback(r, i) {
            _this4.setUserRating(r, i);
          },
          isLoggedIn: _this4.props.isLoggedIn,
          index: index
        }); // }

        var numHighRatings = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__disabled"
        }, '-');

        if (_this4.state.ratings[index].numHighRatings) {
          numHighRatings = _this4.state.ratings[index].numHighRatings;
        }

        var title = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
          className: "lesson__links_table__title_text",
          href: link.url,
          rel: "noreferrer noopener",
          target: "_blank"
        }, link.title);
        var typeClass = 'lesson__links_table__icon lesson__links_table__icon_generic';
        var type = link.type;

        if (type === 'presentation') {
          typeClass = 'lesson__links_table__icon lesson__links_table__icon_presentation';
        } else if (type === 'singlePage') {
          typeClass = 'lesson__links_table__icon lesson__links_table__icon_single_page';
        } else if (type === 'video') {
          typeClass = 'lesson__links_table__icon lesson__links_table__icon_video';
        }

        var description = null;

        if (_this4.hasDescription) {
          description = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
            className: "lesson__links_table__description"
          }, link.description);
        }

        links.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", {
          key: key,
          className: "lesson__links_table__large_screen"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__type"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
          className: typeClass,
          href: link.url,
          rel: "noreferrer noopener",
          target: "_blank",
          "aria-label": link.title
        })), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__title"
        }, title), description, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__your_rating"
        }, rating), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__total_rating"
        }, numHighRatings)));
        key += 1; // if (!this.props.isLoggedIn) {
        //   rating = <span className="rating__login" onClick={login}>{'Login'}</span>
        // }

        links.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", {
          key: key,
          className: "lesson__links_table__small_screen"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__small_screen__content"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__type_container"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__type"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
          className: typeClass,
          href: link.url,
          rel: "noreferrer noopener",
          target: "_blank",
          "aria-label": link.title
        }))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__link_container"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__link"
        }, title)))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, description), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__total_rating"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__title"
        }, 'Total Ratings ≥4:'), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__value"
        }, numHighRatings))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__links_table__small_screen__title"
        }, _this4.yourRatingTitle(true)), rating)))))));
        key += 1;
      });
      return links;
    }
  }, {
    key: "yourRatingTitle",
    value: function yourRatingTitle() {
      var useColon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var colon = '';

      if (useColon) {
        colon = ':';
      }

      var title = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
        className: "rating__login",
        onClick: _tools_misc__WEBPACK_IMPORTED_MODULE_3__["login"]
      }, 'Login'), " to rate".concat(colon));

      if (this.props.isLoggedIn) {
        title = 'Your\nRating';
      }

      return title;
    }
  }, {
    key: "render",
    value: function render() {
      var description = null;

      if (this.hasDescription) {
        description = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
          className: "lesson__links_table__description lesson__links_table__description_title"
        }, "Description");
      } // const props = Object.assign({}, this.props);


      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", {
        className: "lesson__links_table"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", {
        className: "lesson__links_table__title_row lesson__links_table__large_screen"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "lesson__links_table__type_title lesson__links_table__type"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "lesson__links_table__title_title lesson__links_table__title"
      }, "Link"), description, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "lesson__links_table__your_rating_title lesson__links_table__your_rating"
      }, this.yourRatingTitle()), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "lesson__links_table__total_rating_title lesson__links_table__total_rating"
      }, "Total Ratings \u22654")), this.renderLinks()));
    }
  }]);

  return LinksTable;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/navbar.js":
/*!*************************************!*\
  !*** ./src/js/components/navbar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navbar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tools_misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/misc */ "./src/js/tools/misc.js");
/* harmony import */ var _dropDownButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropDownButton */ "./src/js/components/dropDownButton.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

// type State = {
//   loginLink: string;
//   loginText: string;
// };
var Navbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Navbar).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: "loginout",
    // state: State;
    // constructor(props: Props) {
    //   super(props);
    //   this.state = {
    //     // isLoggedIn: false,
    //     loginText: 'Login',
    //     loginLink: '/login',
    //   };
    // }
    // componentDidMount() {
    //   const handleVisibilityChange = () => {
    //     this.checkIsLoggedIn();
    //   };
    //   window.addEventListener('focus', handleVisibilityChange);
    //   this.checkIsLoggedIn();
    //   // this.checkIsLoggedIn();
    //   // this.checkLoggedInFromPage();
    // }
    // checkIsLoggedIn() {
    //   // // console.log('checking1')
    //   // fetchPolyfill('/isloggedin', { credentials: 'same-origin' })
    //   //   .then((response) => {
    //   //     if (!response.ok) {
    //   //       throw Error(response.statusText);
    //   //     }
    //   //     // console.log(response, response.json());
    //   //     return response.json();
    //   //   })
    //   //   .then(data => this.setLogin(data.username))
    //   //   .catch(() => {});
    //   // console.log(document.cookie)
    //   const { cookie } = document;
    //   if (cookie != null) {
    //     // $FlowFixMe
    //     let username = cookie.match(/username=[^;]*/);
    //     // console.log(username)
    //     if (username != null) {
    //       username = username[0].trim();
    //       if (username.slice(-1).charAt(0) === ';') {
    //         username = username.slice(0, -1);
    //       }
    //       this.setLogin(username.split('=')[1]);
    //     }
    //   }
    // }
    // // checkLoggedInFromPage() {
    // //   if (document.getElementById('logged_in')) {
    // //     this.setLogin(null);
    // //     this.checkIsLoggedIn();
    // //   } else {
    // //     this.setLogin('');
    // //   }
    // // }
    // setLogin(username: string | null) {
    //   if (username === '') {
    //     this.setState({
    //       loginText: 'Login',
    //       loginLink: '/login',
    //     });
    //   } else if (username !== null) {
    //     this.setState({
    //       loginText: `Logout ${username}`,
    //       loginLink: '/logout',
    //     });
    //   } else {
    //     this.setState({
    //       loginText: 'Logout',
    //       loginLink: '/logout',
    //     });
    //   }
    // }
    value: function loginout() {
      if (this.props.isLoggedIn) {
        Object(_tools_misc__WEBPACK_IMPORTED_MODULE_1__["logout"])();
      } else {
        Object(_tools_misc__WEBPACK_IMPORTED_MODULE_1__["login"])();
      }
    } // getLoginLink() {
    //   let page = getCookie('page');
    //   if (page === '') {
    //     page = '0';
    //   }
    //   const next = `?next=${window.location.pathname}&page=${page}`;
    //   if (this.props.isLoggedIn) {
    //     return `/logout${next}`;
    //   }
    //   return `/login${next}`;
    // }

  }, {
    key: "getLoginLabel",
    value: function getLoginLabel() {
      if (this.props.isLoggedIn) {
        if (this.props.username !== '') {
          return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, "Logged in as ", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
            className: "navbar_login__loggedin_label_username"
          }, this.props.username));
        }

        return 'Logout';
      }

      return 'Login';
    }
  }, {
    key: "getLoginButton",
    value: function getLoginButton() {
      if (this.props.isLoggedIn) {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "navbar-button navbar-right navbar_login"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_dropDownButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: this.getLoginLabel(),
          id: "id_navbar_loginout",
          direction: "down",
          xAlign: "right",
          list: [{
            label: 'Logout',
            link: this.loginout.bind(this),
            active: false
          }],
          selected: false
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navbar-text navbar-right login_button"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        onClick: this.loginout.bind(this),
        className: "navbar_login",
        id: "id_navbar_loginout"
      }, this.getLoginLabel()));
    }
  }, {
    key: "renderHomeButton",
    value: function renderHomeButton() {
      if (this.props.includeHome) {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
          className: "navbar-icon-container",
          href: "/"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", {
          className: "navbar-icon",
          src: "/static/assets/logo20.svg",
          alt: "navbar home icon"
        }));
      }

      return '';
    }
  }, {
    key: "render",
    value: function render() {
      // const props = Object.assign({}, this.props);
      // delete props.active;
      var body = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navbar-container"
      }, this.renderHomeButton(), this.getLoginButton()));
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, body);
    }
  }]);

  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/navbarSpacer.js":
/*!*******************************************!*\
  !*** ./src/js/components/navbarSpacer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavbarSpacer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var NavbarSpacer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NavbarSpacer, _React$Component);

  function NavbarSpacer() {
    _classCallCheck(this, NavbarSpacer);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavbarSpacer).apply(this, arguments));
  }

  _createClass(NavbarSpacer, [{
    key: "render",
    // eslint-disable-next-line class-methods-use-this
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navbar__spacer"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__left_side"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "navigator__right_side"
      }));
    }
  }]);

  return NavbarSpacer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/presentationLesson.js":
/*!*************************************************!*\
  !*** ./src/js/components/presentationLesson.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PresentationLessonComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lesson_PresentationLesson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lesson/PresentationLesson */ "./src/js/Lesson/PresentationLesson.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button */ "./src/js/components/button.js");
/* harmony import */ var _dropDownButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropDownButton */ "./src/js/components/dropDownButton.js");
/* harmony import */ var _tools_misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/misc */ "./src/js/tools/misc.js");
/* harmony import */ var _presentationQR__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./presentationQR */ "./src/js/components/presentationQR.js");
/* harmony import */ var _staticQR__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./staticQR */ "./src/js/components/staticQR.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import Fig from 'figureone';






 // import '../../css/presentationLesson.scss';
// const { DiagramElementCollection } = Fig;

var PresentationLessonComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PresentationLessonComponent, _React$Component);

  // refreshCallback: ?() => void;
  function PresentationLessonComponent(props) {
    var _this;

    _classCallCheck(this, PresentationLessonComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PresentationLessonComponent).call(this, props));
    _this.firstPage = parseInt(Object(_tools_misc__WEBPACK_IMPORTED_MODULE_4__["getCookie"])('page'), 10) - 1 || 0;

    if (_this.firstPage === -1) {
      _this.firstPage = 0;
    }

    _this.lesson = props.lesson;
    _this.state = {
      htmlText: '',
      numPages: 0,
      page: 0,
      listOfSections: [],
      qr: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_staticQR__WEBPACK_IMPORTED_MODULE_6__["default"], {
        content: "Loading Reference",
        link: "",
        title: ""
      }),
      presQR: {
        title: '',
        link: ''
      }
    };
    _this.key = 0;
    _this.lesson.refresh = _this.refreshText.bind(_assertThisInitialized(_this));
    _this.componentUpdateCallback = null;
    _this.centerLessonFlag = false; // this.refreshCallback = null;

    return _this;
  }

  _createClass(PresentationLessonComponent, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.componentUpdateCallback) {
        var callback = this.componentUpdateCallback;
        this.componentUpdateCallback = null;
        callback();
      } else {
        this.lesson.setOnclicks();
      } // if (this.refreshCallback != null) {
      //   this.refreshCallback();
      // }


      this.lesson.content.diagram.updateHTMLElementTie();
    }
  }, {
    key: "refreshText",
    value: function refreshText(htmlText, page) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.updateGoToButtonListHighlight();

      if (htmlText !== this.state.htmlText || page !== this.state.page) {
        this.componentUpdateCallback = callback;
        this.setState({
          htmlText: htmlText,
          page: page
        });
        Object(_tools_misc__WEBPACK_IMPORTED_MODULE_4__["createCookie"])('page', "".concat(page + 1), 30, window.location.pathname.replace(/\/$/, ''));
      } else if (callback) {
        callback();
      }

      var nextButton = document.getElementById('lesson__button-next');

      if (nextButton) {
        if (this.lesson.currentSectionIndex === this.lesson.content.sections.length - 1) {
          nextButton.classList.add('lesson__button-next-disabled');
        } else {
          nextButton.classList.remove('lesson__button-next-disabled');
        }
      }

      var prevButton = document.getElementById('lesson__button-previous');

      if (prevButton) {
        if (this.lesson.currentSectionIndex === 0) {
          prevButton.classList.add('lesson__button-prev-disabled');
        } else {
          prevButton.classList.remove('lesson__button-prev-disabled');
        }
      }
    }
  }, {
    key: "goToNext",
    value: function goToNext() {
      this.lesson.nextSection();
    }
  }, {
    key: "goToPrevious",
    value: function goToPrevious() {
      this.lesson.prevSection();
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "resize",
    value: function resize() {
      var style = window.getComputedStyle(document.documentElement);

      if (style) {
        var docElem = document.documentElement;

        if (docElem) {
          // docElem.style.setProperty('--pres__vw', `${window.innerWidth}px`);
          docElem.style.setProperty('--pres__vw1', "".concat(window.innerWidth)); // docElem.style.setProperty('--pres__vh', `${window.innerHeight}px`);
        }
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "setCSSVariables",
    value: function setCSSVariables(elementId) {
      var container = document.getElementById('lesson__content_diagram');

      if (container != null) {
        var containerRect = container.getBoundingClientRect();
        var width = Math.min(containerRect.width * 0.7, 600);
        var doc = document.documentElement;

        if (doc != null) {
          doc.style.setProperty('--lesson__qr__content_width', "".concat(width, "px"));
          doc.style.setProperty('--lesson__qr__content_height', "calc(".concat(width / 1.5, "px)"));
        }
      }

      var diagramHTML = document.getElementById('id_diagram__html');
      var element = document.getElementById(elementId);

      if (diagramHTML != null && element != null) {
        var diagramFontSize = parseFloat(diagramHTML.style.fontSize);
        var bodyFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
        element.style.fontSize = "".concat(Math.min(diagramFontSize, bodyFontSize), "px");
      }
    }
  }, {
    key: "showStaticQR",
    value: function showStaticQR(id, parameters) {
      var presQR = document.getElementById('id_lesson__qr__pres_container');

      if (presQR != null) {
        presQR.classList.add('lesson__hide');
      }

      this.setState({
        qr: window.quickReference[parameters]
      });
      this.setCSSVariables('id_lesson__qr__static_container');
      var element = document.getElementById('id_lesson__qr__static_container');

      if (element != null) {
        element.classList.remove('lesson__hide');
      }
    }
  }, {
    key: "showPresQR",
    value: function showPresQR(id, parameters) {
      var staticQR = document.getElementById('id_lesson__qr__static_container');

      if (staticQR != null) {
        staticQR.classList.add('lesson__hide');
      }

      this.setCSSVariables('id_lesson__qr__pres_container');
      var path = parameters.split('/').slice(0, -1).join('/');
      var qrid = parameters.split('/').slice(-1)[0];
      this.lesson.content.showQR(path, qrid);
      var element = document.getElementById('id_lesson__qr__pres_container');

      if (element != null) {
        element.classList.remove('lesson__hide');
      }

      this.lesson.content.qrDiagram.resize();
      this.lesson.content.qrDiagram.animateNextFrame();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.resize();
      window.addEventListener('resize', this.resize.bind(this)); // Instantiate diagram now that the canvas elements have been
      // created.

      window.lessonFunctions = {
        qr: function qr(id, parameters) {
          if (react__WEBPACK_IMPORTED_MODULE_0__["isValidElement"](window.quickReference[parameters])) {
            _this2.showStaticQR(id, parameters);
          } else {
            _this2.showPresQR(id, parameters);
          }
        }
      };
      this.lesson.initialize();
      this.lesson.content.diagram.resize();
      this.setState({
        listOfSections: this.addListOfSections(),
        numPages: this.lesson.content.sections.length
      });

      if (this.firstPage != null && this.firstPage < this.lesson.content.sections.length) {
        this.lesson.goToSection(this.firstPage);
      } else {
        this.lesson.goToSection(0);
      }

      var nextButton = document.getElementById('lesson__button-next');

      if (nextButton instanceof HTMLElement) {
        nextButton.onclick = this.goToNext.bind(this);
      }

      var prevButton = document.getElementById('lesson__button-previous');

      if (prevButton instanceof HTMLElement) {
        prevButton.onclick = this.goToPrevious.bind(this);
      }

      var infoButton = document.getElementById('id_lesson__info_button');

      if (infoButton instanceof HTMLElement) {
        infoButton.onclick = this.lesson.content.toggleInfo.bind(this.lesson.content);
      } // window.addEventListener('resize', this.centerLesson.bind(this));
      // window.addEventListener('orientationchange', this.orientationChange.bind(this));
      // uncomment this if the lesson should be centered on going to it
      // this.orientationChange();
      // this.centerLessonFlag = !this.centerLessonFlag;
      // this.centerLesson();

    }
  }, {
    key: "orientationChange",
    value: function orientationChange() {
      var doc = document.documentElement;

      if (doc) {
        // if currently in portrait, then want to center.
        if (doc.clientHeight > doc.clientWidth) {
          this.centerLessonFlag = true;
        }
      }
    }
  }, {
    key: "centerLesson",
    value: function centerLesson() {
      // console.log("Asdf1");
      if (this.centerLessonFlag) {
        var lesson = document.getElementById('lesson__container_name');

        if (lesson) {
          var y = this.centerLessonPosition(lesson); // setTimeout(function center() { window.scroll(0, a); }, 500);

          setTimeout(function () {
            return window.scroll(0, y);
          }, 500);
        }
      }

      this.centerLessonFlag = false;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "centerLessonPosition",
    value: function centerLessonPosition(element) {
      var doc = document.documentElement;

      if (element != null && doc != null) {
        var r = element.getBoundingClientRect();
        var top = r.top + window.pageYOffset;
        var height = r.height;
        var windowHeight = doc.clientHeight;

        if (windowHeight >= height) {
          return top - (windowHeight - height) / 2;
        }

        return top;
      }

      return 0;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('orientationchange', this.centerLesson.bind(this));
    }
  }, {
    key: "renderContent",
    value: function renderContent(content) {
      this.key += 1;
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        key: this.key,
        className: "lesson__diagram_text",
        id: "id_lesson__diagram_text",
        dangerouslySetInnerHTML: {
          __html: content.slice(0, content.length - 1)
        }
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "addPrevButton",
    value: function addPrevButton() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
        label: "",
        id: "lesson__button-previous",
        className: " lesson__np_button lesson__button-prev-enabled",
        "aria-label": "Previous slide"
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "addNextButton",
    value: function addNextButton() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
        label: "",
        id: "lesson__button-next",
        className: " lesson__np_button lesson__button-next-enabled",
        "aria-label": "Next slide"
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "addInfoButton",
    value: function addInfoButton() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__info_button",
        className: "lesson__info_button lesson__info_hide"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__info_button_label_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__info_button_label"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__info_button_label_text"
      }, "i"))));
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "addInteractiveElementButton",
    value: function addInteractiveElementButton() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__interactive_element_button__container",
        className: "lesson__interactive_element_button__container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__interactive_element_button",
        className: "lesson__interactive_element_button lesson__interactive_element_button__hide",
        onClick: this.lesson.highlightNextInteractiveItem.bind(this.lesson)
      }));
    }
  }, {
    key: "addGoToButton",
    value: function addGoToButton() {
      if (this.state.listOfSections.length > 0) {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__button-goto_container",
          id: "id__lesson__button-goto_container"
        }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_dropDownButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: "id__lesson__goto_button",
          label: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
            className: "pres__goto_button_label"
          }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
            className: "pres__goto_button_label_page"
          }, "".concat(this.state.page + 1, " ")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
            className: "pres__goto_button_label_num_pages"
          }, "of ".concat(this.state.numPages))),
          direction: "up",
          xAlign: "right",
          list: this.state.listOfSections
        }));
      }

      return '';
    }
  }, {
    key: "belongsTo",
    value: function belongsTo(index) {
      var i = index;

      while (i > 0) {
        var title = this.lesson.content.sections[i].title;

        if (title) {
          break;
        }

        i -= 1;
      }

      return i;
    }
  }, {
    key: "clickList",
    value: function clickList(index) {
      this.lesson.goToSection(index);
    }
  }, {
    key: "updateGoToButtonListHighlight",
    value: function updateGoToButtonListHighlight() {
      var button = document.getElementById('id__lesson__button-goto_container');

      if (button != null) {
        var activeItems = button.getElementsByClassName('dropdown_button_list_item_active');
        [].forEach.call(activeItems, function (item) {
          return item.classList.remove('dropdown_button_list_item_active');
        });
        var listItems = document.getElementById('id__lesson__goto_button_list');
        var activeSection = this.belongsTo(this.lesson.currentSectionIndex);
        var titleIndeces = this.lesson.content.sections.map(function (section, index) {
          if (section.title) {
            return index;
          }

          return -1;
        }).filter(function (index) {
          return index !== -1;
        });
        var listIndex = titleIndeces.indexOf(activeSection);

        if (listItems) {
          var children = listItems.children;

          if (children.length > 0) {
            children[listIndex].classList.add('dropdown_button_list_item_active');
          }
        }
      }
    }
  }, {
    key: "addListOfSections",
    value: function addListOfSections() {
      var _this3 = this;

      var output = [];
      var activeSection = this.belongsTo(this.lesson.currentSectionIndex);
      this.lesson.content.sections.forEach(function (section, index) {
        if (section.title) {
          var isActive = false;

          if (index === activeSection) {
            isActive = true;
          }

          _this3.key += 1;
          output.push({
            label: section.title,
            link: _this3.clickList.bind(_this3, index),
            active: isActive
          });
        }
      });
      return output;
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("main", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__widescreen_backdrop",
        id: this.lesson.content.htmlId
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "lesson__container_name",
        className: "lesson__container"
      }, this.addPrevButton(), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: this.lesson.content.diagramHtmlId,
        className: "diagram__container lesson__diagram"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", {
        id: "id_diagram__gl__low",
        className: "diagram__gl"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", {
        id: "id_diagram__text__low",
        className: "diagram__text"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_diagram__html",
        className: "diagram__html"
      }, this.renderContent(this.state.htmlText), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "diagram__text_measure",
        id: "".concat(this.lesson.content.diagramHtmlId, "_measure")
      }, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr__static_container",
        className: "lesson__qr__container lesson__hide"
      }, this.state.qr), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr__pres_container",
        className: "lesson__qr__container lesson__hide"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_presentationQR__WEBPACK_IMPORTED_MODULE_5__["default"], {
        id: "id_lesson__qr__content_pres__overlay",
        onClose: this.lesson.content.prepareToHideQR.bind(this.lesson.content)
      }))), this.addGoToButton(), this.addNextButton(), this.addInfoButton(), this.addInteractiveElementButton()))));
    }
  }]);

  return PresentationLessonComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/presentationQR.js":
/*!*********************************************!*\
  !*** ./src/js/components/presentationQR.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PresentationQR; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _quickReferencePopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quickReferencePopup */ "./src/js/components/quickReferencePopup.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PresentationQR =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PresentationQR, _React$Component);

  function PresentationQR() {
    _classCallCheck(this, PresentationQR);

    return _possibleConstructorReturn(this, _getPrototypeOf(PresentationQR).apply(this, arguments));
  }

  _createClass(PresentationQR, [{
    key: "renderContent",
    value: function renderContent() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: this.props.id,
        className: "lesson__presentation_qr__container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_qr_diagram",
        className: "diagram__container lesson__diagram"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", {
        id: "id_qr_diagram__text",
        className: "diagram__text"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", {
        id: "id_qr_diagram__gl",
        className: "diagram__gl"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_qr_diagram__html",
        className: "diagram__html"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr_diagram_container"
      }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr_description_container",
        className: "lesson__qr_description_container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr_description_table_cell"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr_description_relative"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr_description_text",
        id: "id_lesson__qr_description"
      })))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "diagram__text_measure",
        id: "".concat(this.props.id, "_measure")
      }, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'))));
    }
  }, {
    key: "render",
    value: function render() {
      var title = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr__title_text__pres"
      });
      var link = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
        className: "lesson__qr__link_link",
        id: "id_lesson__qr__link_link__pres",
        href: '',
        rel: "noreferrer noopener",
        target: "_blank"
      }, "Go to lesson to see why");
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_quickReferencePopup__WEBPACK_IMPORTED_MODULE_1__["default"], {
        id: "id_lesson__qr__content_pres",
        content: this.renderContent(),
        title: title,
        link: link,
        closeId: "id_lesson__qr__pres_container",
        onClose: this.props.onClose
      });
    }
  }]);

  return PresentationQR;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/quickReferencePopup.js":
/*!**************************************************!*\
  !*** ./src/js/components/quickReferencePopup.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuickReferencePopup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

var QuickReferencePopup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(QuickReferencePopup, _React$Component);

  function QuickReferencePopup() {
    _classCallCheck(this, QuickReferencePopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(QuickReferencePopup).apply(this, arguments));
  }

  _createClass(QuickReferencePopup, [{
    key: "renderContent",
    // id: string;
    value: function renderContent() {
      if (typeof this.props.content === 'string') {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "lesson__qr__content",
          dangerouslySetInnerHTML: {
            __html: this.props.content
          }
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__content"
      }, this.props.content);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "close",
    value: function close() {
      if (this.props.onClose != null) {
        this.props.onClose();
      }

      var element = document.getElementById(this.props.closeId);

      if (element != null) {
        element.classList.add('lesson__hide');
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.close.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.close.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var link = '';

      if (typeof this.props.link === 'string') {
        link = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
          className: "lesson__qr__link_link",
          id: "id_lesson__qr__link_link",
          href: "".concat(window.location.origin, "/Lessons/").concat(this.props.link),
          rel: "noreferrer noopener",
          target: "_blank"
        }, "Go to lesson to see why");
      }

      if (react__WEBPACK_IMPORTED_MODULE_0__["isValidElement"](this.props.link)) {
        link = this.props.link;
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: this.props.id,
        className: "lesson__qr"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__title"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__title_text" // id="id_lesson__qr__title_text"

      }, this.props.title), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__title_close__container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__title_close__cell"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__title_close",
        onClick: this.close.bind(this)
      }, "X")))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__content_container"
      }, this.renderContent()), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "lesson__qr__link_container"
      }, link));
    }
  }]);

  return QuickReferencePopup;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/rating.js":
/*!*************************************!*\
  !*** ./src/js/components/rating.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rating; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star */ "./src/js/components/star.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { getCookie } from '../tools/misc';
// import { login } from '../tools/misc';

var Rating =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Rating, _React$Component);

  function Rating() {
    _classCallCheck(this, Rating);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rating).apply(this, arguments));
  }

  _createClass(Rating, [{
    key: "stars",
    value: function stars() {
      var stars = []; // const link = `/rate/${this.props.lessonId}/${this.props.topic}/${this.props.versionId}`;

      for (var i = 0; i < this.props.rating; i += 1) {
        stars.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_star__WEBPACK_IMPORTED_MODULE_1__["default"], {
          isFull: true,
          key: i,
          callback: this.props.ratingCallback,
          index: this.props.index || 0,
          num: i + 1,
          isLoggedIn: this.props.isLoggedIn
        }));
      }

      for (var _i = this.props.rating; _i < 5; _i += 1) {
        stars.push(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_star__WEBPACK_IMPORTED_MODULE_1__["default"], {
          isFull: false,
          num: _i + 1,
          key: _i,
          callback: this.props.ratingCallback,
          index: this.props.index || 0,
          isLoggedIn: this.props.isLoggedIn
        }));
      }

      return stars;
    } // getRatingLabel() {
    //   const topic = this.props.topic.charAt(0).toUpperCase() + this.props.topic.slice(1);
    //   // let page = getCookie('page');
    //   // if (page === '') {
    //   //   page = '0';
    //   // }
    //   if (this.props.isLoggedIn) {
    //     return `Is this ${topic} helpful?`;
    //   }
    //   // const link = `/login?next=${window.location.pathname}&page=${page}`;
    //   // <a href={link}>Login</a> to rate {topic}:
    //   return <div>
    //     <span className="rating__login" onClick={login}>Login</span> to rate {topic}:
    //   </div>;
    // }

  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "rating__container"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "rating__label"
      }, this.props.label || ''), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "rating__stars"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "rating__stars_table"
      }, this.stars())));
    }
  }]);

  return Rating;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/simpleLesson.js":
/*!*******************************************!*\
  !*** ./src/js/components/simpleLesson.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleLessonComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Lesson_SimpleLesson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lesson/SimpleLesson */ "./src/js/Lesson/SimpleLesson.js");
/* harmony import */ var _staticQR__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staticQR */ "./src/js/components/staticQR.js");
/* harmony import */ var _presentationQR__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presentationQR */ "./src/js/components/presentationQR.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




 // import '../../css/simpleLesson.scss';

function align(elementId, containerId, linkId) {
  var element = document.getElementById(elementId);
  var container = document.getElementById(containerId);
  var link = document.getElementById(linkId);

  if (element == null || container == null || link == null) {
    return;
  } // element.classList.remove('lesson__hide');


  var containerRect = container.getBoundingClientRect();
  var linkRect = link.getBoundingClientRect();
  var windowWidth = window.innerWidth;

  if (windowWidth < containerRect.width) {
    element.style.left = '20px';
    return;
  }

  var linkLeft = linkRect.left - containerRect.left;
  element.style.left = '0';
  var newRect = element.getBoundingClientRect();
  var proposedLeft = linkLeft + linkRect.width / 2 - newRect.width / 2;
  var overFlow = containerRect.width - (proposedLeft + newRect.width);
  element.style["float"] = '';

  if (proposedLeft <= 20) {
    element.style.left = '20px';
  } else if (overFlow > 20) {
    element.style.left = "".concat(proposedLeft, "px");
  } else {
    element.style.left = '';
    element.style.right = '20px';
  }

  var windowHeight = window.innerheight;

  if (windowHeight < containerRect.height) {
    element.style.top = '10px';
    return;
  }

  var linkTop = linkRect.top - containerRect.top;
  element.style.top = '0';
  var proposedTop = linkTop + linkRect.height;
  element.style.top = "".concat(proposedTop, "px");
}

var SimpleLessonComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleLessonComponent, _React$Component);

  function SimpleLessonComponent(props) {
    var _this;

    _classCallCheck(this, SimpleLessonComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleLessonComponent).call(this, props));
    _this.lesson = props.lesson;
    _this.key = 0;
    _this.state = {
      qr: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_staticQR__WEBPACK_IMPORTED_MODULE_2__["default"], {
        content: "Loading Reference",
        link: "",
        title: ""
      })
    };
    _this.afterUpdate = null;
    return _this;
  }

  _createClass(SimpleLessonComponent, [{
    key: "showStaticQR",
    value: function showStaticQR(id, parameters) {
      this.setState({
        qr: window.quickReference[parameters]
      });
      var presQR = document.getElementById('id_lesson__qr__pres_container');

      if (presQR != null) {
        presQR.classList.add('lesson__hide');
      }

      var element = document.getElementById('id_lesson__qr__static_container');

      if (element != null) {
        element.classList.remove('lesson__hide');
      }

      align('id_lesson__qr__static_container', 'lesson__content', id);

      this.afterUpdate = function () {
        align('id_lesson__qr__static_container', 'lesson__content', id);
      };
    }
  }, {
    key: "showPresQR",
    value: function showPresQR(id, parameters) {
      var container = document.getElementById('lesson__content');

      if (container != null) {
        var containerRect = container.getBoundingClientRect();
        var width = Math.min(containerRect.width - 40, 600);
        var doc = document.documentElement;

        if (doc != null) {
          doc.style.setProperty('--lesson__qr__content_width', "calc(".concat(width, "px - 1em)"));
          doc.style.setProperty('--lesson__qr__content_height', "calc((".concat(width, "px - 1em) / 1.5)"));
        }
      }

      var staticQR = document.getElementById('id_lesson__qr__static_container');

      if (staticQR != null) {
        staticQR.classList.add('lesson__hide');
      }

      var element = document.getElementById('id_lesson__qr__pres_container');

      if (element != null) {
        element.classList.remove('lesson__hide');
      }

      var path = parameters.split('/').slice(0, -1).join('/');
      var qrid = parameters.split('/').slice(-1)[0];
      this.lesson.content.showQR(path, qrid);
      align('id_lesson__qr__pres_container', 'lesson__content', id);
      this.lesson.content.qrDiagram.resize();
      this.lesson.content.qrDiagram.animateNextFrame();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.afterUpdate != null) {
        this.afterUpdate();
        this.afterUpdate = null;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.lessonFunctions = {
        qr: function qr(id, parameters) {
          if (react__WEBPACK_IMPORTED_MODULE_0__["isValidElement"](window.quickReference[parameters])) {
            _this2.showStaticQR(id, parameters);
          } else {
            _this2.showPresQR(id, parameters);
          }
        }
      };
      this.lesson.initialize();
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "close",
    value: function close() {
      var element = document.getElementById('id_lesson__qr__static_container');

      if (element != null) {
        element.classList.add('lesson__hide');
      }

      element = document.getElementById('id_lesson__qr__pres_container');

      if (element != null) {
        element.classList.add('lesson__hide');
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: this.lesson.content.htmlId,
        className: "simple_lesson__container" // onClick={this.close.bind(this)}

      }, this.lesson.content.sections, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr__static_container",
        className: "lesson__qr__container lesson__hide"
      }, this.state.qr), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        id: "id_lesson__qr__pres_container",
        className: "lesson__qr__container lesson__hide"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_presentationQR__WEBPACK_IMPORTED_MODULE_3__["default"], {
        id: "id_lesson__qr__content_pres__overlay"
      })));
    }
  }]);

  return SimpleLessonComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/singlePageLesson.js":
/*!***********************************************!*\
  !*** ./src/js/components/singlePageLesson.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SinglePageLessonComponent; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Lesson_SimpleLesson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Lesson/SimpleLesson */ "./src/js/Lesson/SimpleLesson.js");
/* harmony import */ var _staticQR__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./staticQR */ "./src/js/components/staticQR.js");
/* harmony import */ var _presentationQR__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presentationQR */ "./src/js/components/presentationQR.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // import '../../css/singlePageLesson.scss';




function align(elementId, containerId, linkId) {
  var element = document.getElementById(elementId);
  var container = document.getElementById(containerId);
  var link = document.getElementById(linkId);

  if (element == null || container == null || link == null) {
    return;
  } // element.classList.remove('lesson__hide');


  var containerRect = container.getBoundingClientRect();
  var linkRect = link.getBoundingClientRect();
  var windowWidth = window.innerWidth;

  if (windowWidth < containerRect.width) {
    element.style.left = '20px';
    return;
  }

  var linkLeft = linkRect.left - containerRect.left;
  element.style.left = '0';
  var newRect = element.getBoundingClientRect();
  var proposedLeft = linkLeft + linkRect.width / 2 - newRect.width / 2;
  var overFlow = containerRect.width - (proposedLeft + newRect.width);
  element.style["float"] = '';

  if (proposedLeft <= 20) {
    element.style.left = '20px';
  } else if (overFlow > 20) {
    element.style.left = "".concat(proposedLeft, "px");
  } else {
    element.style.left = '';
    element.style.right = '20px';
  }

  var windowHeight = window.innerheight;

  if (windowHeight < containerRect.height) {
    element.style.top = '10px';
    return;
  }

  var linkTop = linkRect.top - containerRect.top;
  element.style.top = '0';
  var proposedTop = linkTop + linkRect.height;
  element.style.top = "".concat(proposedTop, "px");
} // let updates = 0;
// const { DrawContext2D, Point, Rect } = Fig;


var _Fig$tools$html = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.html,
    applyModifiers = _Fig$tools$html.applyModifiers,
    setOnClicks = _Fig$tools$html.setOnClicks;

var applyMDModifiers = function applyMDModifiers(inputText, modifiers) {
  var outputText = '';

  if (inputText.trim().startsWith('##')) {
    outputText = "<div class=\"single_page_lesson__header2\">".concat(inputText.slice(2), "</div>");
  } else if (inputText.trim().startsWith('#')) {
    outputText = "<div class=\"single_page_lesson__header1\">".concat(inputText.slice(1), "</div>");
  } else {
    outputText = "<p class=\"single_page_lesson__text\">".concat(applyModifiers(inputText, modifiers), "</p>");
  }

  return outputText;
};

var SinglePageLessonComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SinglePageLessonComponent, _React$Component);

  function SinglePageLessonComponent(props) {
    var _this;

    _classCallCheck(this, SinglePageLessonComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SinglePageLessonComponent).call(this, props));
    _this.lesson = props.lesson;
    _this.key = 10;
    _this.contentChange = false;
    _this.state = {
      content: [],
      qr: react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_staticQR__WEBPACK_IMPORTED_MODULE_3__["default"], {
        content: "Loading Reference",
        link: "",
        title: ""
      })
    };
    _this.afterUpdate = null;
    return _this;
  }

  _createClass(SinglePageLessonComponent, [{
    key: "showStaticQR",
    value: function showStaticQR(id, parameters) {
      this.setState({
        qr: window.quickReference[parameters]
      });
      var presQR = document.getElementById('id_lesson__qr__pres_container');

      if (presQR != null) {
        presQR.classList.add('lesson__hide');
      }

      var element = document.getElementById('id_lesson__qr__static_container');

      if (element != null) {
        element.classList.remove('lesson__hide');
      }

      align('id_lesson__qr__static_container', 'id_single_page_lesson__text_container', id);

      this.afterUpdate = function () {
        align('id_lesson__qr__static_container', 'lesson__content', id);
      };
    }
  }, {
    key: "showPresQR",
    value: function showPresQR(id, parameters) {
      var container = document.getElementById('id_single_page_lesson__text_container');

      if (container != null) {
        var containerRect = container.getBoundingClientRect();
        var width = Math.min(containerRect.width - 40, 600);
        var doc = document.documentElement;

        if (doc != null) {
          doc.style.setProperty('--lesson__qr__content_width', "calc(".concat(width, "px - 1em)"));
          doc.style.setProperty('--lesson__qr__content_height', "calc((".concat(width, "px - 1em) / 1.5)"));
        }
      }

      var staticQR = document.getElementById('id_lesson__qr__static_container');

      if (staticQR != null) {
        staticQR.classList.add('lesson__hide');
      }

      var element = document.getElementById('id_lesson__qr__pres_container');

      if (element != null) {
        element.classList.remove('lesson__hide');
      }

      var path = parameters.split('/').slice(0, -1).join('/');
      var qrid = parameters.split('/').slice(-1)[0];
      this.lesson.content.showQR(path, qrid);
      align('id_lesson__qr__pres_container', 'id_single_page_lesson__text_container', id);
      this.lesson.content.qrDiagram.resize();
      this.lesson.content.qrDiagram.animateNextFrame();
    } // shouldComponentUpdate() {
    //   // if (updates > 5) {
    //   //   return false;
    //   // }
    //   // updates += 1
    //   return true;
    // }
    // componentWillMount() {
    //   // Instantiate diagram now that the canvas elements have been
    //   // created.
    // }
    // resizer() {
    //   console.log('resiser')
    //   // this.lesson.content.diagram.renderAllElementsToTiedCanvases(true);
    //   // console.log(this.lesson.content.diagram.webglLow)
    // }

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.lessonFunctions = {
        qr: function qr(id, parameters) {
          if (react__WEBPACK_IMPORTED_MODULE_1__["isValidElement"](window.quickReference[parameters])) {
            _this2.showStaticQR(id, parameters);
          } else {
            _this2.showPresQR(id, parameters);
          }
        }
      };
      this.lesson.initialize(); // this.lesson.content.setDiagram(this.lesson.content.diagramHtmlId);
      // this.lesson.content.diagram.resize();

      this.contentChange = true;
      this.setState({
        content: this.lesson.content.sections[0]
      });
      this.lesson.content.diagram.enableScrolling(); // window.addEventListener('resize', this.resizer.bind(this));
      // window.addEventListener('scroll', this.handleScroll.bind(this));
    } // componentWillUnmount() {
    //   window.removeEventListener('scroll', this.handleScroll.bind(this));
    // }
    // handleScroll() {
    //   this.lesson.content.diagram.updateHTMLElementTie();
    //   this.lesson.content.diagram.animateNextFrame();
    // }
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "close",
    value: function close() {
      var element = document.getElementById('id_lesson__qr__content_static');

      if (element != null) {
        element.classList.add('lesson__hide');
      }

      element = document.getElementById('id_lesson__qr__content_pres');

      if (element != null) {
        element.classList.add('lesson__hide');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      if (this.afterUpdate != null) {
        this.afterUpdate();
        this.afterUpdate = null;
      }

      setOnClicks(this.lesson.content.modifiers);
      var d = this.lesson.content.diagram;

      if (this.contentChange) {
        this.lesson.content.diagram.resize();
        d.renderAllElementsToTiedCanvases();
        var loadingElements = d.elements.getLoadingElements();

        var _loop = function _loop(i) {
          var element = loadingElements[i];

          if (element.drawingObject.state === 'loading') {
            element.drawingObject.onLoad = function () {
              element.unrender();
              d.renderAllElementsToTiedCanvases();

              _this3.lesson.content.diagram.setFirstTransform();
            };
          }
        };

        for (var i = 0; i < loadingElements.length; i += 1) {
          _loop(i);
        }

        this.contentChange = false; // this.lesson.content.diagram.resize();
      } // console.log(this.lesson.content.diagram.elements)
      // console.log('1')


      this.lesson.content.diagram.setFirstTransform();
      this.lesson.content.diagram.updateHTMLElementTie(); // console.log('2')

      d.animateNextFrame(); // this.lesson.content.diagram.updateHTMLElementTie();
      // d.renderElementToTiedCanvas('fig1');
      // d.renderElementToTiedCanvas('fig2');
      // d.renderElementToTiedCanvas('fig4');
      // d.renderElementToTiedCanvas('fig5');
      // d.renderElementToTiedCanvas('fig6');
      // d.renderElementToTiedCanvas('fig7');
      // d.renderElementToTiedCanvas('fig8');
      // fig1.hide()
      // fig2.hide()
      // fig3.hide();
      // d.drawQueued = true;
      // fig2.show()
      // oldPos = fig2.getPosition();
      // fig2.setPosition(0, 0);
      // d.renderToCanvas(document.getElementById('id_figure2_asdf'));
      // fig2.hide()
      // fig2.setPosition(oldPos);
      // d.drawQueued = true;
      // fig1.show()
      // oldPos = fig1.getPosition();
      // fig1.setPosition(0, 0);
      // d.renderToCanvas(document.getElementById('id_figure1_asdf'));
      // fig1.hide()
      // fig1.setPosition(oldPos);
      // fig2.show()
      // fig3.show()
      // d.draw(-1);
      // console.log(d.elements)
      // fig3.setScale(oldScale);
      // d._fig2.hide();
      // d._fig3.hide();
      // d._fig4.hide();
      // d._fig5.hide();
      // d._fig6.hide();
      // d._fig7.hide();
      // d._fig8.hide();
      // const canvas2 = document.getElementById('id_figure2_asdf');
      // console.log(canvas2)
      // const draw2D2 = new DrawContext2D(canvas2)
      // console.log(draw2D2)
      // const dim2 = this.lesson.content.diagram.elements._fig2._dimensions;
      // const d = this.lesson.content.diagram.elements._fig2._dimensions._d;
      // const c = this.lesson.content.diagram.elements._fig2._dimensions._c;
      // dim2.updateContext(draw2D);
      // d.setScale(10, -80)
      // c.setScale(10, 80)
      // const dim4 = this.lesson.content.diagram.elements._fig4._dimensions;
      // const d4 = this.lesson.content.diagram.elements._fig4._dimensions._d;
      // const c4 = this.lesson.content.diagram.elements._fig4._dimensions._c;
      // dim4.updateContext(draw2D);
      // d4.setScale(10, -80)
      // c4.setScale(10, 80)
      // console.log(this.lesson.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm())
      // this.lesson.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm().arrange(
      //   1,
      //   'left',
      //   'baseline',
      // );
      // this.lesson.content.diagram.elements.resize();
      // this.lesson.content.diagram.elements._fig3._dimensions._eqn.getCurrentForm().arrange(
      //   1,
      //   'left',
      //   'baseline',
      // );
      // console.log(this.lesson.content.diagram.elements._fig3._dimensions._eqn)
      // this.lesson.content.diagram.elements._fig3._dimensions._eqn.showForm('0');
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this4 = this;

      var output = '';
      this.state.content.forEach(function (element) {
        // if (typeof element === 'string' && element.charAt(0) === '<') {
        //   output += element.slice();
        //   // output.push(<div key={this.key}
        //   //   dangerouslySetInnerHTML={ {
        //   //     __html: element.slice(0, element.length - 1),
        //   //   } }>
        //   //   </div>);
        // } else if (typeof element === 'string') {
        //   output += applyMDModifiers(element, this.lesson.content.modifiers);
        //   // output.push(<div key={this.key}
        //   //   dangerouslySetInnerHTML={ {
        //   //     __html: applyMDModifiers(element, this.lesson.content.modifiers),
        //   //   } }>
        //   // </div>);
        // }
        if (typeof element === 'string') {
          output += applyMDModifiers(element, _this4.lesson.content.modifiers);
        }
      });
      return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        id: "id_single_page_lesson__text_container",
        className: "single_page_lesson__text_container"
      }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        className: "single_page_lesson__text_container_text",
        dangerouslySetInnerHTML: {
          __html: output
        }
      }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        id: "id_lesson__qr__static_container",
        className: "lesson__qr__container lesson__hide"
      }, this.state.qr), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        id: "id_lesson__qr__pres_container",
        className: "lesson__qr__container lesson__hide"
      }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_presentationQR__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: "id_lesson__qr__content_pres__overlay"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        id: this.lesson.content.htmlId,
        className: "single_page_lesson__container"
      }, this.renderContent(), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("canvas", {
        id: "hidden_offscreen"
      }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        id: this.lesson.content.diagramHtmlId,
        className: "diagram__container lesson__diagram single_page_lesson__diagram_container"
      }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("canvas", {
        id: "id_diagram__gl__offscreen",
        className: "diagram__gl__offscreen"
      }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("canvas", {
        id: "id_diagram__text__offscreen",
        className: "diagram__text__offscreen"
      }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("canvas", {
        id: "id_diagram__gl__low",
        className: "diagram__gl"
      }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("canvas", {
        id: "id_diagram__text__low",
        className: "diagram__text"
      }), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        id: "id_diagram__html",
        className: "diagram__html"
      })));
    }
  }]);

  return SinglePageLessonComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./src/js/components/star.js":
/*!***********************************!*\
  !*** ./src/js/components/star.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Star; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

var Star =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Star, _React$Component);

  function Star() {
    _classCallCheck(this, Star);

    return _possibleConstructorReturn(this, _getPrototypeOf(Star).apply(this, arguments));
  }

  _createClass(Star, [{
    key: "setRating",
    // postRating() {
    //   this.props.callback()
    //   fetchPolyfill(this.props.link, { credentials: 'same-origin' })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw Error(response.statusText);
    //       }
    //     })
    //     .catch(() => {});
    // }
    value: function setRating() {
      this.props.callback(this.props.num, this.props.index);
    }
  }, {
    key: "star",
    value: function star() {
      if (this.props.isFull) {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "rating__stars_full"
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "rating__stars_empty"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var link = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null);

      var keydown = function keydown(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
          _this.setRating();
        }
      };

      if (this.props.isLoggedIn) {
        link = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
          className: "rating__stars_link rating__stars_star_active",
          onClick: this.setRating.bind(this),
          tabIndex: 0,
          role: "button",
          onKeyDown: keydown,
          "aria-label": "Rate as ".concat(this.props.index, " star")
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "rating__stars_star"
      }, this.star(), link);
    }
  }]);

  return Star;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/staticQR.js":
/*!***************************************!*\
  !*** ./src/js/components/staticQR.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StaticQR; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _quickReferencePopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quickReferencePopup */ "./src/js/components/quickReferencePopup.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { fetch as fetchPolyfill } from 'whatwg-fetch';    // Fetch polyfill

var StaticQR =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StaticQR, _React$Component);

  function StaticQR() {
    _classCallCheck(this, StaticQR);

    return _possibleConstructorReturn(this, _getPrototypeOf(StaticQR).apply(this, arguments));
  }

  _createClass(StaticQR, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_quickReferencePopup__WEBPACK_IMPORTED_MODULE_1__["default"], {
        id: "id_lesson__qr__content_static",
        content: this.props.content,
        title: this.props.title,
        link: this.props.link,
        closeId: "id_lesson__qr__static_container"
      });
    }
  }]);

  return StaticQR;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/topicButton.js":
/*!******************************************!*\
  !*** ./src/js/components/topicButton.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TopicButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dropDownButtonBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropDownButtonBase */ "./src/js/components/dropDownButtonBase.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import Fig from 'figureone';

 // const { round } = Fig.tools.math;

var TopicButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TopicButton, _React$Component);

  function TopicButton() {
    _classCallCheck(this, TopicButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(TopicButton).apply(this, arguments));
  }

  _createClass(TopicButton, [{
    key: "renderListLabel",
    // eslint-disable-next-line class-methods-use-this
    value: function renderListLabel(listItem) {
      if (listItem.separator === true) {
        return listItem.label;
      }

      var numReviews = listItem.numReviews || 0; // let rating = listItem.rating || 0;

      var numHighRatings = listItem.numHighRatings || 0;
      var userRating = '';

      if (numReviews > 0) {
        // rating = '\u2605'.repeat(Math.round(listItem.rating || 0));
        // if (rating === '') {
        //   rating = '-';
        // }
        // rating = (rating).toLocaleString('en');
        numReviews = "".concat(numReviews.toLocaleString('en')); // numHighRatings = `${round(parseInt(numHighRatings, 10)
        // / parseInt(numReviews, 10) * 100, 0)}%`;
      }

      if (listItem.userRating != null && listItem.userRating > 0) {
        for (var i = 0; i < listItem.userRating; i += 1) {
          userRating = "".concat(userRating, "\u2605");
        }
      }

      if (numReviews === 0) {
        numReviews = ''; // rating = '';

        numHighRatings = ''; // highRatingsSubText = '';
      }

      var label = '';
      var description = '';

      if (listItem.label != null) {
        label = listItem.label;
      }

      if (listItem.description != null) {
        description = listItem.description;
      }

      var typeClass = 'topic_button__type_icon_generic';
      var type = listItem.type;

      if (type === 'presentation') {
        typeClass = 'topic_button__type_icon_presentation';
      } else if (type === 'singlePage') {
        typeClass = 'topic_button__type_icon_singlePage';
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", {
        className: "topic_button__listItem"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__type"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: typeClass
      })), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__label"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__label_text"
      }, label), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__label_description"
      }, description)), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__rating"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__rating_value"
      }, userRating || '-')), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__rating"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__rating_value"
      }, numHighRatings || '-')))));
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "renderTitle",
    value: function renderTitle() {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", {
        className: "topic_button__listItem topic_button_listItem_title"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__label",
        colSpan: "2"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__label_title"
      }, "Version")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__rating"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__rating_num_reviews"
      }, "Your"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__rating_num_reviews"
      }, "Rating")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", {
        className: "topic_button__rating"
      }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__rating_num_reviews"
      }, 'Total'), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
        className: "topic_button__rating_num_reviews"
      }, //  '\u2605\u2605\u2605\u2605'
      'Ratings ≥4')))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      // const props = Object.assign({}, this.props);
      var props = this.props;
      var listItems = []; // let addTitle = true;
      // props.list.forEach((listElement) => {
      //   if (listElement.numReviews != null && listElement.numReviews > 0) {
      //     addTitle = true;
      //   }
      // });
      // if (addTitle) {

      listItems.push({
        label: this.renderTitle()
      }); // }

      if (props.list != null) {
        props.list.forEach(function (listElement) {
          listItems.push({
            label: _this.renderListLabel(listElement),
            link: listElement.link,
            active: listElement.active,
            separator: listElement.separator == null ? false : listElement.separator
          });
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_dropDownButtonBase__WEBPACK_IMPORTED_MODULE_1__["default"], {
        label: props.label,
        id: props.id,
        direction: props.direction,
        xAlign: props.xAlign,
        list: listItems,
        selected: props.selected,
        classes: "topic_button"
      });
    }
  }]);

  return TopicButton;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/components/view.js":
/*!***********************************!*\
  !*** ./src/js/components/view.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _navbarSpacer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbarSpacer */ "./src/js/components/navbarSpacer.js");
/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar */ "./src/js/components/navbar.js");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer */ "./src/js/components/footer.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// This is a React Higher order component pattern where a component can be
// wrapped by another component that will look after login state and send
// through the state information as props to the wrapped component.





var withLoginManager = function loginManager(WrappedComponent) {
  var includeHome = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(ViewBase, _React$Component);

      function ViewBase(props) {
        var _this;

        _classCallCheck(this, ViewBase);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewBase).call(this, props));
        _this.state = {
          isLoggedIn: false,
          username: ''
        };
        return _this;
      }

      _createClass(ViewBase, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          var _this2 = this;

          var handleVisibilityChange = function handleVisibilityChange() {
            _this2.checkIsLoggedInFromCookie();
          };

          window.addEventListener('focus', handleVisibilityChange);
          this.checkIsLoggedInFromCookie();
        } // function checkIsLoggedInCookie() {
        //   const { cookie } = document;
        //   if (cookie != null) {
        //     // $FlowFixMe
        //     const username = cookie.match(/username=[^;]*;/);
        //     if (username != null) {
        //       this.setLogin(username[0]
        //         .split('=')[1]
        //         .slice(0, -1));
        //     }
        //   }
        // }

      }, {
        key: "checkIsLoggedInFromCookie",
        value: function checkIsLoggedInFromCookie() {
          var _document = document,
              cookie = _document.cookie;

          if (cookie != null) {
            // $FlowFixMe
            var username = cookie.match(/username=[^;]*/); // console.log(username)

            if (username != null) {
              username = username[0].trim();

              if (username.slice(-1).charAt(0) === ';') {
                username = username.slice(0, -1);
              }

              this.setLogin(username.split('=')[1]);
            }
          }
        }
      }, {
        key: "setLogin",
        value: function setLogin(username) {
          if (username === '') {
            this.setState({
              isLoggedIn: false,
              username: ''
            });
          } else if (username !== null) {
            this.setState({
              isLoggedIn: true,
              username: username
            });
          } else {
            this.setState({
              isLoggedIn: true,
              username: ''
            });
          }
        }
      }, {
        key: "render",
        value: function render() {
          return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_navbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
            active: "Single Page Lesson",
            isLoggedIn: this.state.isLoggedIn,
            username: this.state.username,
            includeHome: includeHome
          }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_navbarSpacer__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WrappedComponent, _extends({}, this.props, {
            username: this.state.username,
            isLoggedIn: this.state.isLoggedIn
          })), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_footer__WEBPACK_IMPORTED_MODULE_3__["default"], null));
        }
      }]);

      return ViewBase;
    }(react__WEBPACK_IMPORTED_MODULE_0__["Component"])
  );
};

/* harmony default export */ __webpack_exports__["default"] = (withLoginManager);

/***/ }),

/***/ "./src/js/components/viewLesson.js":
/*!*****************************************!*\
  !*** ./src/js/components/viewLesson.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewLesson; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lesson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lesson */ "./src/js/components/lesson.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import { LessonContent } from '../Lesson/LessonContent';
// import Lesson from '../Lesson/Lesson';

var ViewLesson =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ViewLesson, _React$Component);

  function ViewLesson() {
    _classCallCheck(this, ViewLesson);

    return _possibleConstructorReturn(this, _getPrototypeOf(ViewLesson).apply(this, arguments));
  }

  _createClass(ViewLesson, [{
    key: "render",
    // constructor(props: Props) {
    //   super(props);
    //   this.lesson = new Lesson(this.props.lesson);
    // }
    value: function render() {
      // const props = Object.assign({}, this.props);
      // delete props.active;
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_lesson__WEBPACK_IMPORTED_MODULE_1__["default"], {
        lesson: this.props.lesson // lessonUID={this.props.lessonUID}
        // topicName={this.props.topicName}
        // versionUID={this.props.versionUID}
        // lessonDetails={this.props.lessonDetails}
        // versionDetails={this.props.versionDetails}
        ,
        isLoggedIn: this.props.isLoggedIn
      });
    }
  }]);

  return ViewLesson;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/tools/misc.js":
/*!******************************!*\
  !*** ./src/js/tools/misc.js ***!
  \******************************/
/*! exports provided: classify, loadRemote, loadRemoteCSS, getCookie, login, logout, logInOut, createCookie, activator, attachQuickReference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classify", function() { return classify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRemote", function() { return loadRemote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRemoteCSS", function() { return loadRemoteCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logInOut", function() { return logInOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCookie", function() { return createCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activator", function() { return activator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachQuickReference", function() { return attachQuickReference; });
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! figureone */ "figureone");
/* harmony import */ var figureone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(figureone__WEBPACK_IMPORTED_MODULE_0__);

var Point = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.Point;
var joinObjects = figureone__WEBPACK_IMPORTED_MODULE_0___default.a.tools.misc.joinObjects;

var classify = function classify(key, value) {
  var nonEmpty = value || key;
  var withKey = nonEmpty[0] === '-' || nonEmpty.startsWith("".concat(key, "-")) ? "".concat(key, " ").concat(nonEmpty) : nonEmpty;
  var joinStr = " ".concat(key, "-");
  return "".concat(withKey.split(' -').join(joinStr));
};

function loadRemote(scriptId, url) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var existingScript = document.getElementById(scriptId);

  if (!existingScript) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = scriptId; // e.g., googleMaps or stripe

    if (document.body) {
      document.body.appendChild(script);
    }

    script.onload = function () {
      if (callback != null) {
        callback(scriptId, url);
      }
    };
  } else if (callback != null) {
    callback(scriptId, url);
  }
}

function loadRemoteCSS(id, url) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var existingScript = document.getElementById(id);

  if (!existingScript) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.id = id; // e.g., googleMaps or stripe

    if (document.body) {
      document.body.appendChild(link);
    }

    link.onload = function () {
      if (callback != null) {
        callback(id, url);
      }
    };
  } else if (callback != null) {
    callback(id, url);
  }
}

function getCookie(key) {
  var _document = document,
      cookie = _document.cookie;

  if (cookie != null) {
    var re = RegExp("".concat(key, "=[^;]*")); // $FlowFixMe

    var keyValue = cookie.match(re); // console.log(username)

    if (keyValue != null) {
      keyValue = keyValue[0].trim();

      if (keyValue.slice(-1).charAt(0) === ';') {
        keyValue = keyValue.slice(0, -1);
      }

      return keyValue.split('=')[1];
    }
  }

  return '';
}

function createCookie(name, value) {
  var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var expires = '';

  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=".concat(date.toUTCString());
  }

  document.cookie = "".concat(name, "=").concat(value).concat(expires, "; path=").concat(path);
}

function logInOut(isLoggedIn) {
  // let page = getCookie('page');
  // if (page === '') {
  //   page = '0';
  // }
  var logText = '/logout';

  if (isLoggedIn === false) {
    logText = '/login';
  }

  var next = "?next=".concat(window.location.pathname.replace(/\/$/, ''));
  window.location = "".concat(logText).concat(next);
}

function login() {
  logInOut(false);
}

function logout() {
  logInOut(true);
}

function activator(width, height) // color: [number, number, number, number] = [0, 0, 0, 0],
{
  var defaultOptions = {
    color: [0, 0, 0, 0],
    position: new Point(0, 0),
    width: 1,
    height: 1,
    interactiveLocation: new Point(0, 0)
  };
  var options = joinObjects({}, defaultOptions);

  if (typeof width === 'number') {
    options.width = width;
  } else {
    options = joinObjects({}, options, width);
  }

  if (height) {
    if (typeof height === 'number') {
      options.height = height;
    } else {
      options = joinObjects({}, options, height);
    }
  }

  for (var _len = arguments.length, inputOptions = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    inputOptions[_key - 2] = arguments[_key];
  }

  if (inputOptions != null && inputOptions.length > 0) {
    options = joinObjects.apply(void 0, [{}, options].concat(inputOptions));
  }

  var points = [new Point(-options.width / 2, -options.height / 2), new Point(-options.width / 2, options.height / 2), new Point(options.width / 2, options.height / 2), new Point(options.width / 2, -options.height / 2)].map(function (p) {
    return p.add(options.position);
  });
  return {
    name: 'activator',
    method: 'polyLine',
    options: {
      points: points,
      color: options.color,
      close: true
    },
    mods: {
      isTouchable: true,
      touchInBoundingRect: true,
      interactiveLocation: options.interactiveLocation
    }
  };
}

function attachQuickReference(lessonPath, lessonUID, versionUID, qrs) {
  // if (window.quickReference == null) {
  //   window.quickReference = {};
  // }
  // if (window.quickReference[lessonUID] == null) {
  //   window.quickReference[lessonUID] = {};
  // }
  // window.quickReference[lessonUID][versionUID] = qrs;
  if (window.quickReference == null) {
    window.quickReference = {};
  }

  Object.keys(qrs).forEach(function (name) {
    window.quickReference["".concat(lessonPath, "/").concat(lessonUID, "/").concat(versionUID, "/").concat(name)] = qrs[name];
  });
} // function attachStaticQuickReference(
//   lessonPath: string,
//   lessonUID: string,
//   versionUID: string,
//   qrs: {
//     [name: string]: Object,
//   },
// ) {
//   if (window.quickReference == null) {
//     window.quickReference = {};
//   }
//   Object.keys(qrs).forEach((name) => {
//     window.quickReference[`${lessonPath}/${lessonUID}/${versionUID}/${name}`] = qrs[name];
//   });
// }




/***/ })

}]);
//# sourceMappingURL=tools.js.map