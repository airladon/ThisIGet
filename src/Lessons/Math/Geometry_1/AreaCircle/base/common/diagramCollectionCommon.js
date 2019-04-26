// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // DiagramEquation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _tri: {
      _height: DiagramObjectLine;
      _base: DiagramObjectLine;
    } & DiagramElementCollection;
    _polyFill: DiagramElementPrimative;
    _lightCircle: DiagramElementPrimative;
    _poly: {
      _border: DiagramElementPrimative;
      _borderHighlight: DiagramElementPrimative;
      _lines: DiagramElementPrimative;
    } & DiagramElementCollection;
    _polyFillMore: DiagramElementPrimative;
    _polyMore: {
      _border: DiagramElementPrimative;
      _borderHighlight: DiagramElementPrimative;
      _lines: DiagramElementPrimative;
    } & DiagramElementCollection;
    _polyFillMost: DiagramElementPrimative;
    _polyMost: {
      _border: DiagramElementPrimative;
      _borderHighlight: DiagramElementPrimative;
      _lines: DiagramElementPrimative;
    } & DiagramElementCollection;
    _circleFill: DiagramElementPrimative;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
  }

  toggleTri(targetIn: ?number = null) {
    let target = targetIn;
    if (target == null) {
      let r = this._fig._tri.getRotation();
      r += Math.PI * 2 / this.layout.polygonSides[0];
      target = r;
    }
    this._fig._tri.setRotation(target);
    this._fig._tri._height.updateLabel(target);
    this._fig._tri._base.updateLabel(target);
    this.diagram.animateNextFrame();
  }

  pulseBorder() {
    this._fig._poly._borderHighlight.pulseThickNow(1, 1.03, 7);
    this.diagram.animateNextFrame();
  }

  pulseCircumference() {
    this._fig._lightCircle.pulseThickNow(1, 1.035, 11);
    this.diagram.animateNextFrame();
  }

  showTrianglesArea() {
    if (this._fig._circleFill.isShown) {
      this._fig._circleFill.hide();
      this._fig._polyFill.show();
    } else if (this._fig._polyFill.isShown) {
      this._fig._polyFill.hide();
    } else {
      this._fig._polyFill.show();
    }
    this.diagram.animateNextFrame();
  }

  showCircleArea() {
    if (this._fig._polyFill.isShown) {
      this._fig._circleFill.show();
      this._fig._polyFill.hide();
    } else if (this._fig._circleFill.isShown) {
      this._fig._circleFill.hide();
    } else {
      this._fig._circleFill.show();
    }
    this.diagram.animateNextFrame();
  }

  showLeastSides() {
    this._poly.
  }
}
