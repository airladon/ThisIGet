// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  // DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  EquationLabel,
  Transform,
} = Fig;

export default class CommonCollection extends CommonDiagramCollection {
  _rect: {
    _left: { label: EquationLabel, _label: CommonDiagramCollection } & DiagramObjectLine;
    _top: { label: EquationLabel, _label: CommonDiagramCollection } & DiagramObjectLine;
    _right: { label: EquationLabel, _label: CommonDiagramCollection } & DiagramObjectLine;
    _bottom: { label: EquationLabel, _label: CommonDiagramCollection } & DiagramObjectLine;
    _diagonal: { label: EquationLabel, _label: CommonDiagramCollection } & DiagramObjectLine;
    _bottomLeft: DiagramObjectAngle;
    _topLeft: DiagramObjectAngle;
    _topRight: DiagramObjectAngle;
    _bottomRight: DiagramObjectAngle;
    _bottomRightDiag: DiagramObjectAngle;
    _topLeftDiag: DiagramObjectAngle;
  } & DiagramElementCollection;

  opposite: boolean;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.hasTouchableElements = true;
    this.opposite = false;
  }

  setRectLabels(label: string) {
    this._rect._left.label.setText(label.charAt(0));
    this._rect._top.label.setText(label.charAt(1));
    this._rect._right.label.setText(label.charAt(2));
    this._rect._bottom.label.setText(label.charAt(3));
    this._rect._diagonal.label.setText('');
  }

  resetColors() {
    this._rect._left.setColor(this.layout.colors.sides);
    this._rect._top.setColor(this.layout.colors.sides);
    this._rect._right.setColor(this.layout.colors.sides);
    this._rect._bottom.setColor(this.layout.colors.sides);
    this._rect._diagonal.setColor(this.layout.colors.sides);
    this._rect._bottomLeft.setColor(this.layout.colors.angles);
    this._rect._topLeft.setColor(this.layout.colors.angles);
    this._rect._topRight.setColor(this.layout.colors.angles);
    this._rect._bottomRight.setColor(this.layout.colors.angles);
    this._rect._bottomRightDiag.setColor(this.layout.colors.angles);
    this._rect._topLeftDiag.setColor(this.layout.colors.angles);
  }

  disableElements(elements: Array<DiagramElementCollection>) {
    this.resetColors();
    elements.forEach((element) => {
      element.setColor(this.layout.colors.disabled);
    });
    this.diagram.animateNextFrame();
  }

  pulseSides() {
    this._rect._left._label.pulseScaleNow(1, 2.3);
    this._rect._right._label.pulseScaleNow(1, 2.3);
    this._rect._top._label.pulseScaleNow(1, 2.3);
    this._rect._bottom._label.pulseScaleNow(1, 2.3);
    this.diagram.animateNextFrame();
  }

  pulseBottom() {
    this._rect._bottom.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseLeftRight() {
    this._rect._left.pulseWidth({ line: 5 });
    this._rect._right.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseTopBottom() {
    this._rect._top.pulseWidth({ line: 5 });
    this._rect._bottom.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    this._rect._topLeft.pulseScaleNow(1, 1.3);
    this._rect._bottomRight.pulseScaleNow(1, 1.3);
    this._rect._topRight.pulseScaleNow(1, 1.3);
    this._rect._bottomLeft.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseBottomRightDiag() {
    this._rect._bottomRightDiag.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseBottomRightAngles() {
    this._rect._bottomLeft.pulseScaleNow(1, 1.3);
    this._rect._bottomRight.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  pulseTopLeftDiag() {
    this._rect._topLeftDiag.pulseScaleNow(1, 1.3);
    this.diagram.animateNextFrame();
  }

  toggleOppositeSides() {
    this.opposite = !this.opposite;
    if (this.opposite) {
      this.pulseTopBottom();
    } else {
      this.pulseLeftRight();
    }
  }
}
