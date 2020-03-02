// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  DiagramObjectPolyLine,
  Equation,
  Transform,
  Point,
  Line,
} = Fig;

const { rand, round } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _tri: {
    _theta: DiagramObjectAngle;
    _line: DiagramObjectPolyLine;
    _complemenet: DiagramObjectAngle;
    _right: DiagramObjectAngle;
    _hyp: { _label: Equation } & DiagramObjectLine;
    _opp: { _label: Equation } & DiagramObjectLine;
    _adj: { _label: Equation } & DiagramObjectLine;
  } & DiagramElementCollection;

  _history: {
    _circle: DiagramElementPrimitive;
    _arc: DiagramElementPrimitive;
    _axis: DiagramObjectLine;
    _sin: DiagramObjectLine;
    _bowString: DiagramObjectLine;
    _mirrorString: DiagramObjectLine;
    _tri: {
      _line: DiagramObjectPolyLine;
      _right: DiagramObjectAngle;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _rotator: {
    _line: DiagramObjectLine;
    _pad: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _similar: {
    _tri1: DiagramObjectPolyLine;
    _tri2: DiagramObjectPolyLine;
  } & DiagramElementCollection;

  _table: {
    _sineHeading: Equation;
    _angleHeading: Equation;
  } & DiagramElementCollection;

  _eqnSame: {
    _value: DiagramElementPrimitive;
  } & Equation;

  _eqn: {
    _equals: DiagramElementPrimitive;
  } & Equation;

  _eqnCos: Equation;
  _eqnSin: Equation;
  _eqnTan: Equation;
  _powerSeries: Equation;

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    // this.hasTouchableElements = true;
    this.custom.counter = 0;
    this.custom.constantCounter = 2;
    this.custom.eqnCounter = 1;
    this.custom.maxRotation = 90 * Math.PI / 180;
    this.custom.minRotation = 0 * Math.PI / 180;
    this.custom.minLineLength = 1.2;
    this.custom.maxLineLength = 3;
    this.custom.maxHeight = 2;
    this._rotator._line.move.maxTransform.updateRotation(this.custom.maxRotation);
    this._rotator._line.move.minTransform.updateRotation(this.custom.minRotation);
    this._rotator._line.setTransformCallback = this.updateRotation.bind(this, null);
    this._rotator._pad.setTransformCallback = this.updatePad.bind(this, null);
    // this._rotator._v.setTransformCallback = this.updateV.bind(this);
    this._rotator._pad.move.transformClip = this.limitPadMovement.bind(this);
    this._rotator._line.interactiveLocation = new Point(this.custom.maxLineLength / 2, 0);
    // this._rotator._v.move.canBeMovedAfterLosingTouch = true;
  }

  toggleSides() {
    const options = [
      ['AonB', 'side12', 'side20'],
      ['AonC', 'side12', 'side01'],
      ['BonC', 'side20', 'side01'],
      ['BonA', 'side12', 'side20'],
      ['ConA', 'side12', 'side01'],
      ['ConB', 'side20', 'side01'],
    ];
    this.custom.counter = (this.custom.counter + 1) % 6;
    const option = options[this.custom.counter];
    this._eqn.showForm(option[0]);
    this.accent(this._similar._tri2, [option[1], option[2]]);
    // this._eqn.pulseScaleNow(1, 1.2);
    this._eqn.exec(
      ['pulse', { centerOn: this._eqn._equals, time: 1, scale: 1.5 }],
      [
        's_11', 'times_11', 's_12', 'times_12',
        'equals', 'v_11',
        'v_12',
        'A_11', 'B_11', 'C_11',
        'A_12', 'B_12', 'C_12',
      ],
    );
    this.diagram.animateNextFrame();
  }

  toggleConstancePhrase() {
    this.custom.constantCounter = (this.custom.constantCounter + 1) % 3;
    const options = [
      ['oppOnHyp', 'tri.opp', 'tri.hyp'], // , 'eqnSame.opp', 'eqnSame.hyp'],
      ['adjOnHyp', 'tri.adj', 'tri.hyp'], // , 'eqnSame.adj', 'eqnSame.hyp'],
      ['oppOnAdj', 'tri.opp', 'tri.adj'], // , 'eqnSame.opp', 'eqnSame.adj'],
    ];
    const option = options[this.custom.constantCounter];
    this._eqnSame.showForm(option[0]);
    this.diagram.setFirstTransform();
    // console.log(option)
    // this.accent(this, [option]);
    this.exec(
      ['pulse', { time: 1, scale: 1.4 }],
      [...option.slice(1, 3)],
    );
    this._eqnSame.pulse({ centeredOn: this._eqnSame, scale: 1.3, time: 1 });
    this.diagram.animateNextFrame();
  }

  toggleConstant() {
    this.custom.constantCounter = (this.custom.constantCounter + 1) % 3;
    const options = [
      ['eqnSin', 'tri.opp', 'tri.hyp'],
      ['eqnCos', 'tri.adj', 'tri.hyp'],
      ['eqnTan', 'tri.opp', 'tri.adj'],
    ];
    const option = options[this.custom.constantCounter];
    // console.log(option)
    // this.accent(this, [option]);
    this.exec(
      ['pulse', { time: 1, scale: 1.4 }],
      [...option],
    );
    this.diagram.animateNextFrame();
  }

  pulseConstant() {
    this._eqn.exec(
      ['pulse', { centerOn: this._eqn._v_12, time: 1, scale: 2 }],
      [
        'v_12',
        'A_12', 'B_12', 'C_12',
      ],
    );
    this.diagram.animateNextFrame();
  }

  goToRotation(angle: ?number = null, duration: ?number = null, done: ?() => void = null) {
    let r = angle;
    if (r == null) {
      const rotationSweep = this.custom.maxRotation - this.custom.minRotation;
      const halfRotation = rotationSweep / 2 + this.custom.minRotation;
      const delta = rand(rotationSweep / 4, rotationSweep / 2);
      const currentR = this._rotator._line.getRotation();
      if (currentR > halfRotation) {
        r = currentR - delta;
      } else {
        r = currentR + delta;
      }
    }
    if (duration == null) {
      this._rotator._line.animations.new()
        .rotation({ target: r, velocity: 0.3 })
        .whenFinished(done)
        .start();
    } else {
      this._rotator._line.animations.new()
        .rotation({ target: r, duration })
        .whenFinished(done)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  limitPadMovement(transform: Transform) {
    const clipped = transform._dup();
    const position = transform.t();
    // console.log(position)
    if (position != null) {
      let line = new Line(new Point(0, 0), position);
      if (line.angle() > Math.PI / 2) {
        clipped.updateTranslation(0.001, position.y);
        position.x = 0.001;
        line = new Line(new Point(0, 0), position);
      }
      if (line.angle() < 0) {
        clipped.updateTranslation(position.x, 0.001);
        position.y = 0.001;
        line = new Line(new Point(0, 0), position);
      }
      if (position.y > this.custom.maxHeight) {
        position.y = this.custom.maxHeight;
        clipped.updateTranslation(position.x, position.y);
        line = new Line(new Point(0, 0), position);
      }
      if (line.length() < this.custom.minLineLength) {
        clipped.updateTranslation(
          line.pointAtPercent(this.custom.minLineLength / line.length()),
        );
      }
      if (line.length() > this.custom.maxLineLength) {
        clipped.updateTranslation(
          line.pointAtPercent(this.custom.maxLineLength / line.length()),
        );
      }
      return clipped;
    }
    return transform;
  }

  updatePad() {
    // let r = this._rotator._line.getRotation();
    // const len = new Line(new Point(0, 0), this._rotator._pad.getPosition()).length();
    const p = this._rotator._pad.getPosition();
    const points = [
      new Point(0, 0),
      new Point(p.x, 0),
      new Point(p.x, p.y),
    ];
    this._tri._line.updatePoints(points);
    // this.updateRotation(null);
    this.updateTri();
    this._rotator._line.setEndPoints(new Point(0, 0), points[2]);
    // this._rotator._v.setEndPoints(points[1], points[2]);
  }

  resetTri(done: ?() => void) {
    this._rotator._pad.stop();
    this._rotator._pad.animations.new()
      .position({ target: this.layout.points[2], velocity: 0.5 })
      .whenFinished(done)
      .start();
    this.diagram.animateNextFrame();
  }

  // updateV() {
  //   let r = this._rotator._line.getRotation();
  //   let x = this._rotator._v.getP1().x;
  //   const len = Math.min(x / Math.cos(r), this.custom.maxLineLength);
  //   const points = [
  //     new Point(0, 0),
  //     new Point(len * Math.cos(r), 0),
  //     new Point(len * Math.cos(r), len * Math.sin(r)),
  //   ];
  //   this._tri._line.updatePoints(points);
  //   // this.updateRotation(null);
  //   this.updateTri();
  //   this._rotator._line.setEndPoints(new Point(0, 0), points[2]);
  //   this._rotator._v.setEndPoints(points[1], points[2]);
  //   this._rotator._pad.transform.updateTranslation(points[2]);
  // }

  goToLength(toLength: ?number = null) {
    const line = new Line(new Point(0, 0), this._tri._line.points[2]);
    const ceiling = new Line(
      new Point(0, this.custom.maxHeight),
      new Point(5, this.custom.maxHeight),
    );
    const intercept = line.intersectsWith(ceiling);
    if (intercept.intersect == null) {
      return;
    }
    const maxLine = new Line(new Point(0, 0), intercept.intersect);
    const maxLen = Math.min(this.custom.maxLineLength, maxLine.length());
    const lenRange = maxLen - this.custom.minLineLength;
    const halfLen = maxLen - lenRange / 2;
    const lenDelta = rand(lenRange / 4, lenRange / 2);
    let newLen = line.length() - lenDelta;
    if (line.length() < halfLen) {
      newLen = line.length() + lenDelta;
    }
    if (toLength != null) {
      newLen = toLength;
    }
    const target = new Point(
      newLen * Math.cos(line.angle()),
      newLen * Math.sin(line.angle()),
    );
    this._rotator._pad.animations.new()
      .position({ target, velocity: 0.5 })
      .start();
    this.diagram.animateNextFrame();
  }

  updateRotation(setAngle: ?number = null) {
    let r = this._rotator._line.getRotation();
    if (setAngle != null) {
      r = setAngle;
    }
    const len = new Line(new Point(0, 0), this._tri._line.points[2]).length();
    const points = [
      new Point(0, 0),
      new Point(len * Math.cos(r), 0),
      new Point(len * Math.cos(r), Math.min(len * Math.sin(r), 2)),
    ];
    this._tri._line.updatePoints(points);
    // this._rotator._v.setEndPoints(points[1], points[2]);
    this._rotator._pad.transform.updateTranslation(points[2]);
    this._rotator._line.setEndPoints(new Point(0, 0), points[2]);
    this.updateTri();
  }

  updateTri() {
    const { points } = this._tri._line;
    this._tri._right.setAngle({
      p1: points[2],
      p2: points[1],
      p3: points[0],
    });
    this._tri._hyp.setEndPoints(points[0], points[2]);
    this._tri._opp.setEndPoints(points[2], points[1]);
    if (this._tri._hyp.isShown) {
      this._tri._theta.setAngle({
        p1: points[1],
        p2: points[0],
        p3: points[2],
      });
      const theta = parseFloat(this._tri._theta.getLabel()) * Math.PI / 180;
      const len = new Line(new Point(0, 0), points[2]).length()
      const hyp = round((len - 0.5) ** 3, 4);
      const opp = round(hyp * Math.sin(theta), 4);
      this._tri._hyp.setLabel(`${hyp.toFixed(4)}`);
      this._tri._opp.setLabel(`${opp.toFixed(4)}`);
      this._eqnSame._value.drawingObject.setText(`${round(Math.sin(theta), 4).toFixed(4)}`);
      // const r = this._rotator._line.getRotation();
      if (points[1].x < 1.3 || points[2].y < 0.35) {
        this._tri._right.hide();
      } else {
        this._tri._right.showAll();
      }
      const curveOptions = {
        radius: undefined,
        curveRadius: undefined,
        curveOffset: undefined,
      };
      if (points[1].x < 0.85) {
        const radius = Math.max(points[1].x - 0.25, 0.01);
        curveOptions.radius = radius;
        curveOptions.curveRadius = radius;
      }
      if (points[2].y < 0.2) {
        curveOptions.curveOffset = -(0.2 - points[2].y);
      }
      if (points[2].y >= 0.2 && curveOptions.curveOffset !== 0) {
        curveOptions.curveOffset = 0;
      }
      if (curveOptions.radius != null
        || curveOptions.curveRadius != null
        || curveOptions.curveOffset != null
      ) {
        this._tri._theta.change(curveOptions);
      }
    }
    this.diagram.animateNextFrame();
  }

  tableForm(fromForm: string, toForm: string, fromOnly: boolean = true) {
    const elements = [];
    Object.keys(this._table.elements).forEach((elementName) => {
      if (elementName.slice(0, 4) === 'eqn_') {
        const element = this._table.elements[elementName];
        if (fromOnly) {
          elements.push([element, fromForm]);
        } else {
          elements.push([element, fromForm, toForm]);
        }
      }
    });
    return elements;
  }

  toggleEqn() {
    this.custom.eqnCounter = (this.custom.eqnCounter + 1) % 2;
    const options = ['opp', 'hyp'];
    const option = options[this.custom.eqnCounter];
    this._eqnSame.goToForm({
      name: option,
      animate: 'move',
      duration: 2,
    });
    this.diagram.animateNextFrame();
  }
}
