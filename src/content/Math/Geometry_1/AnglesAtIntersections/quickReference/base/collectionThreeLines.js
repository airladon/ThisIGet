// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  // DiagramElementPrimitive,
  DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  // DiagramObjectPolyLine,
  // Equation,
  Transform,
  Point,
} = Fig;

export type TypeIndexAngle = {
  lineIndex: number;
  angleIndex: number;
} & DiagramObjectAngle;


export default class QRCollectionOpposite extends CommonDiagramCollection {
  _fig: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _angleA1: TypeIndexAngle;
    _angleA2: TypeIndexAngle;
    _angleB1: TypeIndexAngle;
    _angleB2: TypeIndexAngle;
    _angleC1: TypeIndexAngle;
    _angleC2: TypeIndexAngle;
    _angleD1: TypeIndexAngle;
    _angleD2: TypeIndexAngle;
  } & DiagramElementCollection;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this, this.layout.addElementsThreeLines);

    this._fig._line1.makeTouchable();
    this._fig._line2.makeTouchable();
    this._fig._line3.makeTouchable();
    this._fig._line1.move.element = this._fig;
    this._fig._line2.move.element = this._fig;
    this._fig._line3.move.maxTransform.updateRotation(Math.PI - Math.PI / 3.7);
    this._fig._line3.move.minTransform.updateRotation(Math.PI / 3.7);
    this._fig._line3.setTransformCallback = (t: Transform) => {
      this._fig._line1.updateMoveTransform(t);
      this.updateIntersectingLineAngle();
    };
    this._fig.setTransformCallback = () => {
      this.updateIntersectingLineAngle();
    };
  }

  updateAngle(angle: TypeIndexAngle, intersect: Point, r: number) {
    if (angle.isShown === false) {
      return;
    }
    const figRot = this._fig.getRotation();
    // angle.setPosition(intersect);
    if (angle.angleIndex === 0) {
      angle.setAngle({
        position: intersect, rotation: 0, angle: r, rotationOffset: figRot,
      });
    } else if (angle.angleIndex === 1) {
      angle.setAngle({
        position: intersect, rotation: r, angle: Math.PI - r, rotationOffset: figRot,
      });
    } else if (angle.angleIndex === 2) {
      angle.setAngle({
        position: intersect, rotation: Math.PI, angle: r, rotationOffset: figRot,
      });
    } else if (angle.angleIndex === 3) {
      angle.setAngle({
        position: intersect, rotation: r + Math.PI, angle: Math.PI - r, rotationOffset: figRot,
      });
    }
  }

  pulseIntersecting() {
    this._fig._line3.pulseWidth();
    this.diagram.animateNextFrame();
  }

  pulseParallel() {
    this._fig._line1.pulseWidth();
    this._fig._line2.pulseWidth();
    this.diagram.animateNextFrame();
  }

  updateIntersectingLineAngle() {
    const r = this._fig._line3.getRotation();
    const t1 = this._fig._line1.getPosition();
    const t2 = this._fig._line2.getPosition();
    const t3 = this._fig._line3.getPosition();
    const intersectT1 = new Point(
      (t1.y - t3.y) / Math.tan(r) + t3.x,
      (t1.y - t3.y),
    );
    const intersectT2 = new Point(
      (t2.y - t3.y) / Math.tan(r) + t3.x,
      (t2.y - t3.y),
    );
    this.updateAngle(this._fig._angleA1, intersectT1, r);
    this.updateAngle(this._fig._angleA2, intersectT2, r);
    this.updateAngle(this._fig._angleB1, intersectT1, r);
    this.updateAngle(this._fig._angleB2, intersectT2, r);
    this.updateAngle(this._fig._angleC1, intersectT1, r);
    this.updateAngle(this._fig._angleC2, intersectT2, r);
    this.updateAngle(this._fig._angleD1, intersectT1, r);
    this.updateAngle(this._fig._angleD2, intersectT2, r);
  }

  setAngle(angleId: string, color: Array<number>, text: string) {
    const angle = this._fig[`_angle${angleId}`];
    const { isShown } = angle;
    angle.setColor(color);
    angle.label.setText(text);
    if (!isShown) {
      angle.hide();
    }
  }

  showAngles(angles: Array<DiagramObjectAngle> | DiagramObjectAngle) {
    let anglesArray = [];
    if (!Array.isArray(angles)) {
      anglesArray = [angles];
    } else {
      anglesArray = angles;
    }
    const fig = this._fig;
    const possible = [
      fig._angleA1, fig._angleA2,
      fig._angleB1, fig._angleB2,
      fig._angleC1, fig._angleC2,
      fig._angleD1, fig._angleD2,
    ];
    possible.forEach((angle) => {
      if (anglesArray.indexOf(angle) > -1) {
        angle.showAll();
        angle.pulseScaleNow(1, 1.2);
      } else {
        angle.hide();
      }
    });
  }

  toggleCorresponding() {
    if (this._fig._angleA1.isShown) {
      this.showAngles([this._fig._angleB1, this._fig._angleB2]);
    } else if (this._fig._angleB1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleC2]);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles([this._fig._angleD1, this._fig._angleD2]);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles([this._fig._angleA1, this._fig._angleA2]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleAlternate() {
    if (this._fig._angleA1.isShown) {
      this.showAngles([this._fig._angleB1, this._fig._angleD2]);
    } else if (this._fig._angleB1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleA2]);
    } else if (this._fig._angleC1.isShown) {
      this.showAngles([this._fig._angleD1, this._fig._angleB2]);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles([this._fig._angleA1, this._fig._angleC2]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }

  toggleInterior() {
    if (this._fig._angleC1.isShown) {
      this.showAngles([this._fig._angleD1, this._fig._angleA2]);
    } else if (this._fig._angleD1.isShown) {
      this.showAngles([this._fig._angleC1, this._fig._angleB2]);
    }
    this.updateIntersectingLineAngle();
    this.diagram.animateNextFrame();
  }
}
