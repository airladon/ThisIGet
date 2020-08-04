// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive, DiagramObjectAngle, DiagramObjectLine,
  DiagramElementCollection, Equation,
  Transform,
} = Fig;

const { round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _circle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _angle: DiagramObjectAngle;
    _arc: DiagramElementPrimitive;
    _radians: DiagramElementPrimitive;
    _degrees: {
      _marks36: DiagramElementPrimitive;
      _marks360: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _bendLine: {
      _line: DiagramObjectLine;
      _arc: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _angleText: {
      _label: DiagramElementPrimitive;
      _value: DiagramElementPrimitive;
    } & DiagramElementCollection;
    _radianLines: {
      _line0: DiagramElementPrimitive;
      _line1: DiagramElementPrimitive;
      _line2: DiagramElementPrimitive;
      _line3: DiagramElementPrimitive;
      _line4: DiagramElementPrimitive;
      _line5: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _equation: {
    _arc: DiagramElementPrimitive;
    __arc: DiagramElementPrimitive;
    _radius: DiagramElementPrimitive;
    __radius: DiagramElementPrimitive;
    _angle: DiagramElementPrimitive;
    __angle: DiagramElementPrimitive;
    _radiusLength1: DiagramElementPrimitive;
    _radiusLengths2: DiagramElementPrimitive;
    _radiusLengths3: DiagramElementPrimitive;
  } & Equation;

  _radDegEqn: Equation;

  marks: number;
  decimals: number;
  units: string;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Iso').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
    // this.hasTouchableElements = true;
    this._circle._line1.makeTouchable();
    this._circle._line1.setTransformCallback = this.updateAngle.bind(this);

    this._equation.__arc.onClick = this.goToArcForm.bind(this);
    this._equation.__radius.onClick = this.goToRadiusForm.bind(this);
    this._equation.__angle.onClick = this.goToAngleForm.bind(this);
    this._equation.__arc.makeTouchable();
    this._equation.__radius.makeTouchable();
    this._equation.__angle.makeTouchable();

    this.decimals = 1;
    this.marks = 12;
  }

  goToRadiusForm() {
    this._equation.goToForm({
      name: 'radius',
      duration: 2,
      animate: 'move',
      ifAnimating: {
        cancelGoTo: false,
        skipToTarget: false,
      },
    });
    this.diagram.animateNextFrame();
  }


  toggleRadians() {
    if (this._circle._radianLines.isShown) {
      this._circle._radianLines.hide();
    } else {
      this._circle._radianLines.showAll();
    }
    this.diagram.animateNextFrame();
  }

  goToArcForm() {
    this._equation.goToForm({
      name: 'arc',
      duration: 2,
      animate: 'move',
      ifAnimating: {
        cancelGoTo: false,
        skipToTarget: false,
      },
    });
    this.diagram.animateNextFrame();
  }

  goToAngleForm() {
    this._equation.goToForm({
      name: 'angle',
      duration: 2,
      animate: 'move',
      ifAnimating: {
        cancelGoTo: false,
        skipToTarget: false,
      },
    });
    this.diagram.animateNextFrame();
  }

  updateAngle() {
    const r = this._circle._line1.getRotation('0to360');
    if (this._circle._angle.isShown) {
      this._circle._angle.setAngle({ angle: r });
    }
    if (this._circle._arc.isShown) {
      this._circle._arc.setAngleToDraw(r + 0.01);
    }
    if (this._circle._angleText.isShown) {
      const text = `${round(r * this.marks / Math.PI / 2, this.decimals).toFixed(this.decimals)} ${this.units}`;
      this._circle._angleText._value.drawingObject.setText(text);
    }
  }

  setAngleTextProperties(marks: number, decimals: number, units: string) {
    this.marks = marks;
    this.decimals = decimals;
    this.units = units;
  }

  setAngleMarks(
    marks: 'degrees' | 'radians' = 'degrees',
  ) {
    this._circle._degrees.hide();
    this._circle._radians.hide();
    if (marks === 'degrees') {
      this.setAngleTextProperties(360, 0, 'º');
      this._circle._degrees.showAll();
    } else if (marks === 'radians') {
      this.setAngleTextProperties(Math.PI * 2, 2, 'radians');
      this._circle._radians.showAll();
    }
    this.updateAngle();
    this.diagram.animateNextFrame();
  }

  bend(percent: number) {
    const line = this._circle._bendLine._line;
    const arc = this._circle._bendLine._arc;
    const { radius } = this.layout;

    line.setLength((1 - percent) * radius);
    arc.transform.updateTranslation(
      (1 - percent) * radius,
      0,
    );
    arc.angleToDraw = (percent * 0.99);
  }

  bendLineToEnd() {
    const bendLine = this._circle._bendLine;
    const { radius, width } = this.layout;
    bendLine.showAll();
    bendLine.stop('cancel');
    this.bend(1);
    bendLine.setPosition(radius + width / 2, 0);
    bendLine.setRotation(Math.PI / 2);
    this.diagram.animateNextFrame();
  }

  bendRadius(finished: ?() => void = null) {
    const line1 = this._circle._line1;
    const bendLine = this._circle._bendLine;
    const { radius, width } = this.layout;
    bendLine.showAll();
    bendLine.stop('cancel');
    this.bend(0);
    bendLine.setPosition(line1.getPosition());
    bendLine.setRotation(line1.getRotation(''));
    const target = bendLine.transform._dup();
    target.updateRotation(Math.PI / 2);
    target.updateTranslation(radius + width / 2, 0);
    bendLine.animations.new()
      .transform({ target, duration: 1 })
      .custom({ callback: this.bend.bind(this), duration: 1 })
      .rotation({
        element: this._circle._line1, target: 1, duration: 1, direction: 2,
      })
      .whenFinished(finished)
      .start();
    this.diagram.animateNextFrame();
  }

  pulseAngle() {
    this._circle._angle.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._circle._line1.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseArc() {
    this._circle._arc.pulseThickNow(1, 1.03, 5);
    this.diagram.animateNextFrame();
  }
}
