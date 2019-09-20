// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimative,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  Equation,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _fig: {
    _lightCircle: DiagramElementPrimative;
    _circle: DiagramElementPrimative;
    _poly: {
      _fill: DiagramElementPrimative;
      _triFill: DiagramElementPrimative;
      _height: DiagramObjectLine;
      _radius: DiagramObjectLine;
      _base: DiagramObjectLine;
      _border: DiagramElementPrimative;
      _borderHighlight: DiagramElementPrimative;
      _lines: DiagramElementPrimative;
    } & DiagramElementCollection;
    _polyMore: {
      _fill: DiagramElementPrimative;
      _triFill: DiagramElementPrimative;
      _height: DiagramObjectLine;
      _radius: DiagramObjectLine;
      _base: DiagramObjectLine;
      _border: DiagramElementPrimative;
      _borderHighlight: DiagramElementPrimative;
      _lines: DiagramElementPrimative;
    } & DiagramElementCollection;
    _polyMost: {
      _fill: DiagramElementPrimative;
      _triFill: DiagramElementPrimative;
      _height: DiagramObjectLine;
      _radius: DiagramObjectLine;
      _base: DiagramObjectLine;
      _border: DiagramElementPrimative;
      _borderHighlight: DiagramElementPrimative;
      _lines: DiagramElementPrimative;
    } & DiagramElementCollection;
    _circleFill: DiagramElementPrimative;
  } & DiagramElementCollection;

  _eqn: Equation;

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
      let r = this._fig._poly.getRotation();
      r += Math.PI * 2 / this.layout.polygonSides[0];
      target = r;
    }
    this._fig._poly.setRotation(target);
    this._fig._poly._height.updateLabel(target);
    this._fig._poly._base.updateLabel(target);
    this.diagram.animateNextFrame();
  }

  pulseBorder() {
    this._fig._poly._borderHighlight.pulseThickNow(1, 1.03, 7);
    this.diagram.animateNextFrame();
  }

  pulseMostBorder() {
    this._fig._polyMost._borderHighlight.pulseThickNow(1, 1.03, 7);
    this.diagram.animateNextFrame();
  }

  pulseCircumference() {
    this._fig._lightCircle.pulseThickNow(1, 1.035, 11);
    this.diagram.animateNextFrame();
  }

  showTrianglesArea() {
    if (this._fig._circleFill.isShown) {
      this._fig._circleFill.hide();
      this._fig._poly._fill.show();
    } else if (this._fig._poly._fill.isShown) {
      this._fig._poly._fill.hide();
    } else {
      this._fig._poly._fill.show();
    }
    this.diagram.animateNextFrame();
  }

  showCircleArea() {
    if (this._fig._poly._fill.isShown) {
      this._fig._circleFill.show();
      this._fig._poly._fill.hide();
    } else if (this._fig._circleFill.isShown) {
      this._fig._circleFill.hide();
    } else {
      this._fig._circleFill.show();
    }
    this.diagram.animateNextFrame();
  }

  showLeastSides() {
    this._fig._poly.setRotation(0);
    this._fig._poly._height.updateLabel(0);
    this._fig._poly._base.updateLabel(0);
    this._fig._poly._lines.show();
    this._fig._poly._height.showAll();
    this._fig._poly._fill.show();
    this._fig._poly._borderHighlight.show();
    this._fig._polyMore.hide();
    this._fig._polyMost.hide();
    this.diagram.animateNextFrame();
  }

  showMoreSides() {
    this._fig._polyMore.setRotation(0);
    this._fig._polyMore._height.updateLabel(0);
    this._fig._polyMore._base.updateLabel(0);
    this._fig._polyMore._lines.show();
    this._fig._polyMore._height.showAll();
    this._fig._polyMore._fill.show();
    this._fig._polyMore._borderHighlight.show();
    this._fig._poly.hide();
    this._fig._polyMost.hide();
    this.diagram.animateNextFrame();
  }

  showMostSides() {
    this._fig._polyMost.setRotation(0);
    this._fig._polyMost._height.updateLabel(0);
    this._fig._polyMost._base.updateLabel(0);
    this._fig._polyMost._lines.show();
    this._fig._polyMost._height.showAll();
    this._fig._polyMost._fill.show();
    this._fig._polyMost._borderHighlight.show();
    this._fig._polyMore.hide();
    this._fig._poly.hide();
    this.diagram.animateNextFrame();
  }
}
