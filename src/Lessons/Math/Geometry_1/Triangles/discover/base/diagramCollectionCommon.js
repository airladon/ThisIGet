// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementPrimative,
  DiagramObjectAngle,
  DiagramObjectLine,
  // DiagramElementCollection,
  DiagramObjectPolyLine,
  // Equation,
  Transform,
} = Fig;

const { removeRandElement, round, rand } = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  triangle: {
    _line: DiagramElementPrimative;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _triangle: {
    _line: DiagramElementPrimative;
    _pad0: DiagramElementPrimative;
    _pad1: DiagramElementPrimative;
    _pad2: DiagramElementPrimative;
    _angle0: DiagramObjectAngle;
    _angle1: DiagramObjectAngle;
    _angle2: DiagramObjectAngle;
    _side01: DiagramObjectLine;
    _side12: DiagramObjectLine;
    _side20: DiagramObjectLine;
  } & DiagramObjectPolyLine;

  _total: DiagramElementPrimative;
  _line: DiagramObjectLine;

  updateTri: boolean;
  updateSides: boolean;
  updateTotal: boolean;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElements);
    this.triangle = this._triangle;
    this.triangle.updatePointsCallback = this.updatePoints.bind(this);
    this.triangle._pad0.makeTouchable();
    this.updateTri = true;
    // this.hasTouchableElements = true;
  }

  updatePoints() {
    if (this.updateTotal) {
      let a0 = round(this.triangle._angle0.getAngle('deg'), 0);
      let a1 = round(this.triangle._angle1.getAngle('deg'), 0);
      let a2 = round(this.triangle._angle2.getAngle('deg'), 0);
      if (this.triangle._angle0.isShown) {
        // $FlowFixMe
        a0 = parseInt(this.triangle._angle0.label.getText(), 10);
        // $FlowFixMe
        a1 = parseInt(this.triangle._angle1.label.getText(), 10);
        // $FlowFixMe
        a2 = parseInt(this.triangle._angle2.label.getText(), 10);
      } else {
        if (a0 < 0) {
          a0 += 360;
        }
        if (a1 < 0) {
          a1 += 360;
        }
        if (a2 < 0) {
          a2 += 360;
        }
        const diff = a0 + a1 + a2 - 180;
        // console.log(diff, a0, a1, a2)
        if (a0 > 5 && a0 < 175) {
          a0 -= diff;
        } else if (a1 > 5 && a1 < 175) {
          a1 -= diff;
        } else {
          a2 -= diff;
        }
      }
      const a0Text = a0 < 100 ? ` ${a0}` : `${a0}`;
      const a1Text = a1 < 100 ? ` ${a1}` : `${a1}`;
      const a2Text = a2 < 100 ? ` ${a2}` : `${a2}`;
      this._total.drawingObject.setText(`Total Angle = ${a0Text}º + ${a1Text}º + ${a2Text}º = ${180}º`);
    }
  }

  randomTriangle() {
    const quadrants = [1, 2, 3, 4];
    const pads = [0, 1, 2];
    pads.forEach((pad) => {
      const quadrant = removeRandElement(quadrants);
      let x = rand(0.8, 2);
      let y = rand(0.8, 1.3);
      if (quadrant === 2 || quadrant === 3) {
        x *= -1;
      }
      if (quadrant === 3 || quadrant === 4) {
        y *= -1;
      }
      this.triangle[`_pad${pad}`].scenarios.next = {
        position: [x, y],
        rotation: 0,
      };
    });
  }

  isInPosition() {
    const pad0 = this.triangle._pad0.getPosition();
    const pad1 = this.triangle._pad1.getPosition();
    const pad2 = this.triangle._pad2.getPosition();
    const next0 = this.triangle._pad0.scenarios.next.position;
    const next1 = this.triangle._pad1.scenarios.next.position;
    const next2 = this.triangle._pad2.scenarios.next.position;

    // $FlowFixMe
    if (pad0.x !== next0[0] || pad0.y !== next0[1]) {
      return false;
    }
    // $FlowFixMe
    if (pad1.x !== next1[0] || pad1.y !== next1[1]) {
      return false;
    }
    // $FlowFixMe
    if (pad2.x !== next2[0] || pad2.y !== next2[1]) {
      return false;
    }
    return true;
  }

  goToTri(
    type: 'acute' | 'right' | 'obtuse' | 'equilateral' | 'isosceles' | 'scalene' | 'random' | 'default',
    duration: number = 1,
    callback: ?() => void = null,
    pulseIfSame: boolean = false,
  ) {
    let points = [];
    if (type === 'acute') {
      points = [[-1, -1], [0.5, 1], [1.5, -1]];
      // this.triangle.hideSides();
      // this.triangle.showAngles();
    } else if (type === 'right') {
      points = [[-1, -1], [1.3, 0.8], [1.3, -1]];
      // this.triangle.hideSides();
      // this.triangle.showAngles();
    } else if (type === 'obtuse') {
      points = [[-1.5, -1], [0.5, 0.4], [2, -1]];
      // this.triangle.hideSides();
      // this.triangle.showAngles();
    } else if (type === 'equilateral') {
      points = [[-1, -1], [0, 0.73], [1, -1]];
      // this.triangle.showSides();
      // this.triangle.hideAngles();
    } else if (type === 'isosceles') {
      points = [[-0.7, -1], [0, 1.1], [0.7, -1]];
      // this.triangle.showSides();
      // this.triangle.hideAngles();
    } else if (type === 'scalene') {
      points = [[-1.5, -1], [1, 0.7], [2, -1]];
      // this.triangle.showSides();
      // this.triangle.hideAngles();
    } else if (type === 'default') {
      points = this.layout.defaultTri;
    }

    this.triangle._pad0.scenarios.next = { position: points[0] };
    this.triangle._pad1.scenarios.next = { position: points[1] };
    this.triangle._pad2.scenarios.next = { position: points[2] };

    if (type === 'random') {
      this.randomTriangle();
    }

    if (this.isInPosition()) {
      if (pulseIfSame) {
        this.triangle.pulseScaleNow(1, 1.2, 0, callback);
      } else if (callback != null) {
        callback();
      }
    } else {
      this.triangle.stop(true, 'noComplete');
      this.triangle.animations.new()
        .scenarios({ target: 'next', duration })
        .whenFinished(callback)
        .start();
    }
    this.diagram.animateNextFrame();
  }

  pulseTri() {
    this.triangle.pulseScaleNow(1, 1.2);
    this.diagram.animateNextFrame();
  }

  pulseAngles() {
    if (!this.triangle._angle0.isShown) {
      this.goToTri('random', 1, () => {
        this.pulseAngles();
      });
      return;
    }
    this.triangle._angle0.pulseScaleNow(1, 1.5);
    this.triangle._angle1.pulseScaleNow(1, 1.5);
    this.triangle._angle2.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseSides() {
    // $FlowFixMe
    this.triangle._side01._label.pulseScaleNow(1, 1.5);    // $FlowFixMe
    this.triangle._side12._label.pulseScaleNow(1, 1.5);   // $FlowFixMe
    this.triangle._side20._label.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  toggleParallelLine() {
    if (this._line.isShown) {
      this._line.hide();
    } else {
      this._line.showAll();
    }
    this.diagram.animateNextFrame();
  }
}
