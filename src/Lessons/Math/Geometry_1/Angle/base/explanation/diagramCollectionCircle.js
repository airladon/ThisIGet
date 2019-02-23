// @flow
import Fig from 'figureone';
import type { TypeRotationDirection } from 'figureone';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { DiagramElementPrimative } = Fig;
const {
  Point, Transform, minAngleDiff, normAngle,
} = Fig.tools.g2;

const layout = lessonLayout();
const { colors } = layout;


function makeLine(
  shapes: Object,
  location: Point,
  length: number,
  width: number,
  color: Array<number>,
  pointOrTransform: Point | Transform,
): DiagramElementPrimative {
  const line = shapes.horizontalLine(
    location, length, width,
    0, color, pointOrTransform,
  );
  line.pulse.transformMethod = s => new Transform().scale(1, s);
  return line;
}

function makeRadius(shapes: Object) {
  const radius = makeLine(
    shapes, new Point(0, 0), layout.radius, layout.linewidth,
    colors.radius, new Transform().rotate(0).translate(
      0,
      0,
    ),
  );
  radius.isTouchable = true;
  radius.isMovable = true;
  radius.pulse.transformMethod = s => new Transform().scale(1, s);

  for (let i = 0; i < radius.drawingObject.border[0].length; i += 1) {
    radius.drawingObject.border[0][i].y *= 10;
  }
  return radius;
}

function makeArc(shapes: Object) {
  return shapes.polygon({
    sides: layout.anglePoints,
    radius: layout.radius,
    width: layout.linewidth,
    color: colors.arc,
    point: new Point(0, 0),
  });
}

function makeCircle(shapes: Object) {
  return shapes.polygon({
    sides: layout.anglePoints,
    radius: layout.radius,
    width: layout.linewidth,
    color: colors.arc,
    point: new Point(0, 0),
  });
}

function makeAnchor(shapes: Object) {
  return shapes.polygon({
    sides: layout.anchorPoints,
    radius: layout.linewidth * 2,
    color: colors.anchor,
    point: new Point(0, 0),
    fill: true,
  });
}

function makeAngle(shapes: Object) {
  return shapes.polygon({
    sides: layout.anglePoints,
    radius: layout.angleRadius,
    color: colors.angle,
    point: new Point(0, 0),
    fill: true,
  });
}

function makeReference(shapes: Object) {
  return makeLine(
    shapes, new Point(0, 0), layout.radius, layout.linewidth,
    colors.reference, new Transform().rotate(0).translate(0, 0),
  );
}

function makeFakeRadius(shapes: Object) {
  return makeLine(
    shapes, new Point(0, 0), layout.radius, layout.linewidth,
    colors.reference, new Transform().rotate(0).translate(0, 0),
  );
}

function makeCorner(shapes: Object, pointOrTransform: Point | Transform) {
  return makeLine(
    shapes, new Point(0, 0), layout.cornerLength, layout.linewidth * 3,
    colors.corners, pointOrTransform,
  );
}

function makeArrow(shapes: Object) {
  return shapes.arrowLegacy(
    layout.arrow.width, layout.arrow.legWidth, layout.arrow.height,
    layout.arrow.legHeight, colors.arrow,
    new Transform().rotate(0).translate(
      new Point(0, 0).x + layout.arrow.x,
      new Point(0, 0).y,
    ),
  );
}

class CircleCollection extends CommonDiagramCollection {
  _anchor: DiagramElementPrimative;
  _arrow: DiagramElementPrimative;
  _arc: DiagramElementPrimative;
  _angle: DiagramElementPrimative;
  _radius: DiagramElementPrimative;
  _fakeRadius: DiagramElementPrimative;
  _reference: DiagramElementPrimative;
  _cornerRef: DiagramElementPrimative;
  _cornerRad: DiagramElementPrimative;
  diagram: CommonLessonDiagram;
  layout: Object;
  colors: Object;

  constructor(diagram: CommonLessonDiagram, transform: Transform = new Transform()) {
    super(diagram, layout, transform);
    this.colors = colors;
    this.layout = layout;

    const { shapes } = diagram;

    const origin = new Point(0, 0);
    const t = new Transform().rotate(0).translate(0, 0);

    this.add('arrow', makeArrow(shapes));
    this.add('angle', makeAngle(shapes));
    this.add('reference', makeReference(shapes));
    this.add('fakeRadius', makeFakeRadius(shapes));
    this.add('arc', makeArc(shapes));
    this.add('circle', makeCircle(shapes));

    const radius = makeRadius(shapes);
    radius.setTransformCallback = this.updateRotation.bind(this);
    this.add('radius', radius);
    this.add('cornerRef', makeCorner(shapes, origin));
    this.add('cornerRad', makeCorner(shapes, t));
    this.add('anchor', makeAnchor(shapes));
    this.isTouchable = true;
    this.isMovable = true;
  }

  resize(locations: Object) {
    this.transform.updateTranslation(
      locations.circle.center.x,
      locations.circle.center.y,
    );
  }

  updateRotation() {
    let rotation = this._radius.transform.r();
    if (rotation) {
      if (rotation > Math.PI * 2) {
        rotation -= Math.PI * 2;
      }
      if (rotation < 0) {
        rotation += Math.PI * 2;
      }
      if (this._arrow.isShown) {
        const angleToDisappear = 0.35;
        if (rotation > angleToDisappear) {
          this._arrow.color[3] = 0;
        } else {
          this._arrow.color[3] = (angleToDisappear - rotation) / angleToDisappear;
          this._arrow.transform.updateRotation(rotation);
          this._arrow.transform.updateTranslation(
            this.layout.arrow * Math.cos(rotation),
            this.layout.arrow * Math.sin(rotation),
          );
        }
      }
      const r = normAngle(rotation);
      this._radius.transform.updateRotation(r);
      this._cornerRad.transform.updateRotation(r);
      this._angle.angleToDraw = r + 0.01;
      this._arc.angleToDraw = r + 0.01;
    }
  }

  pulseArrow() {
    this._arrow.pulseScaleNow(0, 1.2, 0.7);
    this.diagram.animateNextFrame();
  }

  pulseAngle() {
    this._angle.pulseScaleNow(1, 1.5);
    this.diagram.animateNextFrame();
  }

  pulseAnchor() {
    this._anchor.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._radius.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseReference() {
    this._reference.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseFakeRadius() {
    this._fakeRadius.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  pulseLines() {
    this.pulseRadius();
    this.pulseReference();
    this.pulseFakeRadius();
  }

  pushRadius() {
    const angle = this._radius.transform.r();
    let targetAngle = angle + Math.PI / 6;
    if (targetAngle > Math.PI * 2) {
      targetAngle -= Math.PI * 2;
    }
    this._radius.animateRotationTo(targetAngle, 1, 1);
    this.diagram.animateNextFrame();
  }

  rotateToRandomSmall(time: number = 1, callback: () => void = () => {}) {
    const angle = Math.random() * Math.PI / 3;
    this.rotateTo(angle, 0, time, callback);
  }

  rotateToRandomLarge(time: number = 1, callback: () => void = () => {}) {
    const angle = Math.PI - Math.PI / 20 - Math.random() * Math.PI / 3;
    this.rotateTo(angle, 0, time, callback);
  }

  rotateTo(
    angle: number,
    direction: TypeRotationDirection,
    time: number,
    callback: () => void = () => {},
  ) {
    let d = direction;
    if (d === 0) {
      const r = this._radius.transform.r();
      d = 1;
      if (r) {
        const delta = minAngleDiff(angle, r);
        d = delta / Math.abs(delta) === 1 ? 1 : -1;
      }
    }
    this._radius.animateRotationTo(angle, d, time, callback);
    this.diagram.animateNextFrame();
  }

  toggleCorners() {
    if (this._cornerRad.isShown) {
      this._cornerRad.hide();
      this._cornerRef.hide();
    } else {
      this._cornerRad.show();
      this._cornerRef.show();
      this._cornerRad.pulseScaleNow(1, 2);
      this._cornerRef.pulseScaleNow(1, 2);
    }
    this.diagram.animateNextFrame();
  }
}

export default CircleCollection;
