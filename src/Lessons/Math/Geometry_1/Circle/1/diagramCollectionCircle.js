// @flow
import Fig from 'figureone';
import type { TypeRotationDirection } from 'figureone';
import lessonLayout from './layout';
import textureMap from '../../../../LessonsCommon/images/textureMaps/circles.png';

const {
  Diagram, DiagramElementCollection, DiagramElementPrimative,
} = Fig;
const {
  Point, Transform, minAngleDiff, normAngle, Rect,
} = Fig.tools.g2;
const tools = Fig.tools.math;

const layout = lessonLayout();
const { colors } = layout;

const textureFile = `/static/dist/${textureMap}`;

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

function makeWheel(shapes: Object) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.wheel.radius,
    color: colors.anchor,
    point: new Point(0, 0),
    textureLocation: textureFile,
    textureCoords: new Rect(0.3333, 0, 0.2222, 0.2222),
    fill: true,
  });
}

function makeBall(shapes: Object) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.ball.radius,
    color: colors.anchor,
    point: new Point(0, 0),
    textureLocation: textureFile,
    textureCoords: new Rect(0.5555, 0, 0.1667, 0.1667),
    fill: true,
  });
}

function makeMoon(shapes: Object) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.moon.radius,
    color: colors.anchor,
    point: new Point(0, 0),
    textureLocation: textureFile,
    textureCoords: new Rect(0, 0, 0.3333, 0.3333),
    fill: true,
  });
}

function makeRing(shapes: Object) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.ring.radius,
    color: colors.anchor,
    point: new Point(0, 0),
    textureLocation: textureFile,
    textureCoords: new Rect(0.7222, 0.1481, 0.1481, 0.1481),
    fill: true,
  });
}

function makeCircleShape(shapes: Object, radius) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius,
    width: layout.linewidth,
    color: colors.circle,
    transform: new Transform().scale(1, 1).translate(0, 0),
  });
}


function makeRadius(shapes: Object) {
  const radius = makeLine(
    shapes, new Point(0, 0), layout.circle.radius, layout.linewidth,
    colors.radius, new Transform().rotate(0).translate(0, 0),
  );
  radius.isTouchable = true;
  radius.isMovable = true;
  radius.pulse.transformMethod = s => new Transform().scale(1, s);

  for (let i = 0; i < radius.drawingObject.border[0].length; i += 1) {
    radius.drawingObject.border[0][i].y *= 20;
  }
  return radius;
}

function makeDiameter(shapes: Object) {
  const diameter = shapes.collection(new Transform().rotate(0).translate(0, 0));
  diameter.add(
    'radius1',
    makeLine(
      shapes, new Point(0, 0), layout.circle.radius, layout.linewidth,
      colors.diameter, new Transform().rotate(0).translate(0, 0),
    ),
  );
  diameter.add(
    'radius2',
    makeLine(
      shapes, new Point(0, 0), layout.circle.radius, layout.linewidth,
      colors.diameter, new Transform().rotate(Math.PI).translate(0, 0),
    ),
  );
  diameter.isTouchable = true;
  diameter.isMovable = true;
  diameter.touchInBoundingRect = true;
  for (let i = 0; i < diameter._radius2.drawingObject.border[0].length; i += 1) {
    diameter._radius1.drawingObject.border[0][i].y *= 10;
    diameter._radius2.drawingObject.border[0][i].y *= 10;
  }
  return diameter;
}
function makeArc(shapes: Object) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.circle.radius,
    width: layout.linewidth,
    color: colors.circle,
    point: new Point(0, 0),
  });
}

function makeCircumference(shapes: Object, radius: number) {
  return shapes.polygon({
    sides: layout.circlePoints,
    radius,
    width: layout.linewidth,
    color: colors.circle,
    point: new Point(0, 0),
  });
}

function makeAnchor(shapes: Object, radius: number = layout.linewidth * 2) {
  return shapes.polygon({
    sides: layout.anchorPoints,
    radius,
    color: colors.anchor,
    point: new Point(0, 0),
    fill: true,
  });
}

type circleCollectionType = {
  _anchor: DiagramElementPrimative;
  _arc: DiagramElementPrimative;
  _angle: DiagramElementPrimative;
  _radius: DiagramElementPrimative;
  _circumference: DiagramElementPrimative;
  _touchingCircle: DiagramElementPrimative;
  _diameter: {
    _radius2: DiagramElementPrimative;
    _radius1: DiagramElementPrimative;
  } & DiagramElementCollection;
  updateBoundaries: (?number) => void;
  scaleTo: (number) => void;
} & DiagramElementCollection;


function makeCircle(numSections: Array<number>, shapes: Object) {
  const circle = shapes.collection(new Transform()
    .scale(1, 1).rotate(0).translate(layout.circle.center));

  circle.add('arc', makeArc(shapes));
  circle.add('circumference', makeCircumference(shapes, layout.circle.radius));
  circle.add('radius', makeRadius(shapes));
  circle.add('diameter', makeDiameter(shapes));
  circle.add('anchor', makeAnchor(shapes));
  circle.isTouchable = true;
  circle.isMovable = true;
  circle.touchInBoundingRect = true;
  circle.hasTouchableElements = true;

  circle.updateBoundaries = (minWidth: number = 0) => {
    const s = circle.transform.s();
    if (s) {
      const percent = s.x;
      circle.move.minTransform.updateTranslation(
        layout.grid.position.x
          + Math.max(layout.circle.radius * percent, minWidth),
        layout.grid.position.y + layout.circle.radius * percent,
      );
      circle.move.maxTransform.updateTranslation(
        layout.grid.position.x + layout.grid.width
          - Math.max(layout.circle.radius * percent, minWidth),
        layout.grid.position.y + layout.grid.height
          - layout.circle.radius * percent,
      );
    }
  };
  circle.updateBoundaries();

  circle.scaleTo = (number) => {
    circle.transform.updateScale(number, number);
  };

  // circle.moveLocation = () => {
  //   circle.movable = 'location';
  // };

  // circle.moveRadius = () => {
  //   circle.movable = 'radius';
  // };

  // circle.moveRadius();

  return circle;
}

type StraightCircumferenceType = {
  _leftLine: DiagramElementPrimative;
  _rightLine: DiagramElementPrimative;
  _leftArc: DiagramElementPrimative;
  _rightArc: DiagramElementPrimative;
  straighten: (number) => void;
  bend: (number) => void;
} & DiagramElementCollection;

function makeStraightCircumference(shapes: Object) {
  const color = colors.circle;
  // const centerY = layout.circle.radius;
  const rightLine = makeLine(
    shapes, new Point(0, layout.linewidth / 2), layout.circle.radius * Math.PI, layout.linewidth,
    color, new Transform().scale(1, 1).rotate(0).translate(0, -layout.circle.radius),
  );
  const leftLine = makeLine(
    shapes, new Point(0, -layout.linewidth / 2), layout.circle.radius * Math.PI, layout.linewidth,
    color, new Transform().scale(1, 1).rotate(Math.PI).translate(0, -layout.circle.radius),
  );
  const leftArc = shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.circle.radius,
    width: layout.linewidth,
    clockwise: true,
    sidesToDraw: layout.circlePoints / 2,
    color,
    transform: new Transform()
      .scale(1, 1).rotate(-Math.PI / 2)
      .translate(0, 0),
  });
  const rightArc = shapes.polygon({
    sides: layout.circlePoints,
    radius: layout.circle.radius,
    width: layout.linewidth,
    sidesToDraw: layout.circlePoints / 2,
    color,
    transform: new Transform()
      .scale(1, 1).rotate(-Math.PI / 2)
      .translate(0, 0),
  });

  const dullCircle = makeCircumference(shapes, layout.circle.radius);
  dullCircle.color = colors.grid;

  const circumference = shapes.collection(new Transform().scale(1, 1)
    .rotate(0).translate(layout.circle.center.x, layout.circle.center.y));

  circumference.add('dullCircle', dullCircle);
  circumference.add('leftLine', leftLine);
  circumference.add('rightLine', rightLine);
  circumference.add('leftArc', leftArc);
  circumference.add('rightArc', rightArc);

  return circumference;
}

type sliderType = {
  _value: DiagramElementPrimative;
  _negValue: DiagramElementPrimative;
  _circle: DiagramElementPrimative;
  travel: number;
  start: number;
  set: (number) => void;
} & DiagramElementCollection;

function makeSlider(shapes: Object) {
  const slider = shapes.collection(new Transform()
    .scale(1, 1).rotate(0).translate(layout.slider.position));
  const travel = layout.slider.length - layout.slider.circleWidth;
  const start = layout.slider.circleWidth / 2;
  slider.travel = travel;
  slider.start = start;

  // const y = -layout.slide.circleWidth / 2;
  const value = makeLine(
    shapes, new Point(0, 0), layout.slider.length, layout.slider.width,
    colors.slider, new Transform().scale(1, 1).rotate(0).translate(0, 0),
  );

  const negValue = makeLine(
    shapes, new Point(0, 0),
    layout.slider.length, layout.slider.width,
    colors.disabled, new Transform().rotate(Math.PI).scale(1, 1).translate(layout.slider.length, 0),
  );
  const circle = makeAnchor(shapes, layout.slider.circleWidth / 2);
  circle.isTouchable = true;
  circle.isMovable = true;
  circle.move.minTransform.updateTranslation(start, 0);
  circle.move.maxTransform.updateTranslation(start + travel, 0);
  circle.move.bounce = false;
  circle.color = colors.slider.slice();
  circle.move.canBeMovedAfterLoosingTouch = true;
  slider.hasTouchableElements = true;

  slider.add('value', value);
  slider.add('negValue', negValue);
  slider.add('circle', circle);

  slider.set = (percent: number) => {
    slider._circle.transform.updateTranslation(percent * travel + start, 0);
    slider._negValue.transform.updateScale(1 - percent, 1);
  };

  return slider;
}

type propertyTextType = {
  _text: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _value: DiagramElementPrimative;
} & DiagramElementCollection;

function makeRadiusText(shapes: Object) {
  const text = shapes.collection(layout.radiusText.position);
  text.add('text', shapes.htmlText(
    'Radius:', 'id_radius_text', 'property_text action_word',
    new Point(0, 0), 'middle', 'left',
  ));
  // text.add('equals', shapes.htmlText(
  //   '=', 'id_radius_equals', 'property_text',
  //   new Point(1.0, 0), 'middle', 'left',
  // ));
  text.add('value', shapes.htmlText(
    '0', 'id_radius_value', 'property_text',
    new Point(1.65, 0), 'middle', 'right',
  ));
  return text;
}

function makeDiameterText(shapes: Object) {
  const text = shapes.collection(layout.diameterText.position);
  text.add('text', shapes.htmlText(
    'Diameter:', 'id_diameter_text', 'property_text action_word',
    new Point(0, 0), 'middle', 'left',
  ));
  // text.add('equals', shapes.htmlText(
  //   '=', 'id_diameter_equals', 'property_text',
  //   new Point(1.0, 0), 'middle', 'left',
  // ));
  text.add('value', shapes.htmlText(
    '0', 'id_diameter_value', 'property_text',
    new Point(1.65, 0), 'middle', 'right',
  ));
  return text;
}

function makeCircumferenceText(shapes: Object) {
  const text = shapes.collection(layout.circumferenceText.position);
  text.add('text', shapes.htmlText(
    'Circumference:', 'id_circumference_text', 'property_text action_word',
    new Point(0, 0), 'middle', 'left',
  ));
  // text.add('equals', shapes.htmlText(
  //   '=', 'id_circumference_equals', 'property_text',
  //   new Point(1.0, 0), 'middle', 'left',
  // ));
  text.add('value', shapes.htmlText(
    '0', 'id_circumference_value', 'property_text',
    new Point(1.65, 0), 'middle', 'right',
  ));
  return text;
}

function makeGridLinesAndLabels(shapes: Object) {
  const axes = shapes.axes(
    layout.grid.width, layout.grid.height, layout.grid.range,
    0, 0, layout.grid.step, layout.grid.step,
    0.1, true, colors.axis, colors.grid, layout.grid.position,
  );
  return axes;
}


type locationTextType = {
  _text: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _x: DiagramElementPrimative;
  _y: DiagramElementPrimative;
  _comma: DiagramElementPrimative;
} & DiagramElementCollection;

function makeLocationText(shapes: Object) {
  const locationText = shapes.collection(layout.locationText.bottom.position);
  locationText.add('text', shapes.htmlText(
    'Center:', 'id_location_text', 'action_word',
    new Point(0, 0), 'middle', 'left',
  ));

  locationText.add('x', shapes.htmlText(
    '0', 'id_location_x', '',
    new Point(1.3, 0), 'middle', 'right',
  ));

  locationText.add('comma', shapes.htmlText(
    ',', 'id_location_comma', '',
    new Point(1.32, 0), 'middle', 'left',
  ));

  locationText.add('y', shapes.htmlText(
    '0', 'id_location_y', '',
    new Point(1.65, 0), 'middle', 'right',
  ));
  return locationText;
}

type gridType = {
  _locationText: locationTextType;
  _circumferenceText: propertyTextType;
  _diameterText: propertyTextType;
  _radiusText: propertyTextType;
  _slider: sliderType;
  _linesAndLabels: DiagramElementCollection;
} & DiagramElementCollection;

function makeGrid(shapes: Object) {
  const grid = shapes.collection(new Transform().translate(0, 0));
  grid.add('locationText', makeLocationText(shapes));
  grid.add('linesAndLabels', makeGridLinesAndLabels(shapes));
  grid.add('circumferenceText', makeCircumferenceText(shapes));
  grid.add('diameterText', makeDiameterText(shapes));
  grid.add('radiusText', makeRadiusText(shapes));
  grid.add('slider', makeSlider(shapes));
  grid.hasTouchableElements = true;
  return grid;
}

export type CircleCollectionType = {
  _circle: circleCollectionType;
  _ball: DiagramElementPrimative;
  _wheel: DiagramElementPrimative;
  _moon: DiagramElementPrimative;
  _ring: DiagramElementPrimative;
  _wheelShape: DiagramElementPrimative;
  _moonShape: DiagramElementPrimative;
  _ringShape: DiagramElementPrimative;
  _ballShape: DiagramElementPrimative;
  _circleShape: DiagramElementPrimative;
  // _movingCircle: movingCircleType;
  _grid: gridType;
  _straightCircumference: StraightCircumferenceType;
 } & DiagramElementCollection;

class CircleCollection extends DiagramElementCollection {
  _circle: circleCollectionType;
  _ball: DiagramElementPrimative;
  _wheel: DiagramElementPrimative;
  _moon: DiagramElementPrimative;
  _ring: DiagramElementPrimative;
  _wheelShape: DiagramElementPrimative;
  _moonShape: DiagramElementPrimative;
  _ringShape: DiagramElementPrimative;
  _ballShape: DiagramElementPrimative;
  _circleShape: DiagramElementPrimative;
  _grid: gridType;
  _straightCircumference: StraightCircumferenceType;

  varState: {
    shapeTurn: number,
    rotation: number,
    straightening: boolean,
    scaledRadius: number,
    percentStraight: number,
  };

  numSections: Array<number>;
  diagram: Diagram;

  constructor(diagram: Diagram, transform: Transform = new Transform()) {
    super(transform, diagram.limits);
    this.diagram = diagram;
    this.varState = {
      shapeTurn: 0,
      rotation: 0,
      straightening: false,
      scaledRadius: layout.circle.radius,
      percentStraight: 0,
    };
    this.numSections = [12, 100];

    const { shapes } = diagram;

    this.add('ring', makeRing(shapes));
    this.add('ball', makeBall(shapes));
    this.add('moon', makeMoon(shapes));
    this.add('wheel', makeWheel(shapes));
    this.add('wheelShape', makeCircleShape(shapes, layout.wheel.radius));
    this.add('moonShape', makeCircleShape(shapes, layout.moon.radius));
    this.add('ballShape', makeCircleShape(shapes, layout.ball.radius));
    this.add('ringShape', makeCircleShape(shapes, layout.ring.radius));
    this.add('circleShape', makeCircleShape(shapes, layout.wheel.radius));

    this.add('grid', makeGrid(shapes));
    this.add('circle', makeCircle(this.numSections, shapes));
    this.add('straightCircumference', makeStraightCircumference(shapes));
    this._circle.setTransformCallback = this.updateLocation.bind(this);
    this._grid._slider._circle.setTransformCallback = this.updateSlider.bind(this);
    this._circle._radius.setTransformCallback = this.updateRotation.bind(this);
    this._circle._diameter.setTransformCallback = this.updateDiameterRotation.bind(this);
    this.hasTouchableElements = true;
    this._circle.hasTouchableElements = true;
  }

  updateRotation() {
    let rotation = this._circle._radius.transform.r();
    if (rotation) {
      if (rotation > Math.PI * 2) {
        rotation -= Math.PI * 2;
      }
      if (rotation < 0) {
        rotation += Math.PI * 2;
      }
      const r = normAngle(rotation);
      this.varState.rotation = r;
      this._circle._radius.transform.updateRotation(r);
      this._circle._arc.angleToDraw = r + 0.01;
    }
  }

  updateDiameterRotation() {
    let rotation = this._circle._diameter.transform.r();
    if (rotation) {
      if (rotation > Math.PI * 2) {
        rotation -= Math.PI * 2;
      }
      if (rotation < 0) {
        rotation += Math.PI * 2;
      }
      const r = normAngle(rotation);
      this.varState.rotation = r;
      this._circle._diameter.transform.updateRotation(r);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  percentToScale(percent: number) {
    return 0.3 + percent * 0.7;
  }

  updateSlider() {
    const t = this._grid._slider._circle.transform.t();
    if (t) {
      const position = t.x;
      const percent = (position - this._grid._slider.start) / this._grid._slider.travel;
      this._grid._slider.set(percent);
      const scale = this.percentToScale(percent);
      this._circle.scaleTo(scale);

      const width = this.widthOfCircumference();
      this._circle.updateBoundaries(width);
      this._circle.setTransform(this._circle.transform);

      const dimensionScale = layout.grid.range.width / layout.grid.width;
      const newRadius = tools.roundNum(scale * layout.circle.radius * dimensionScale, 2);
      const radiusText = newRadius.toFixed(2);
      const diameterText = (newRadius * 2).toFixed(2);
      const circumferenceText = tools.roundNum(newRadius * 2 * Math.PI, 2).toFixed(2);
      // $FlowFixMe
      this._grid._radiusText._value.drawingObject.element.innerHTML =
        `${radiusText}`;
      // $FlowFixMe
      this._grid._diameterText._value.drawingObject.element.innerHTML =
        `${diameterText}`;
      // $FlowFixMe
      this._grid._circumferenceText._value.drawingObject.element.innerHTML =
        `${circumferenceText}`;

      this.varState.scaledRadius = scale * layout.circle.radius;
      const p = this._circle.transform.t();
      if (p) {
        this._straightCircumference.transform.updateScale(scale, scale);
        this._straightCircumference.transform.updateTranslation(
          p.x,
          p.y,
        );
      }
    }
  }

  updateLocation() {
    const t = this._circle.transform.t();
    const s = this._circle.transform.s();
    if (t) {
      // $FlowFixMe
      this._grid._locationText._x.drawingObject.element.innerHTML =
        `${tools.roundNum((t.x - layout.grid.position.x) / layout.grid.width * layout.grid.range.width, 1).toFixed(1)}`;
      // $FlowFixMe
      this._grid._locationText._y.drawingObject.element.innerHTML =
        `${tools.roundNum((t.y - layout.grid.position.y) / layout.grid.height * layout.grid.range.height, 1).toFixed(1)}`;

      this._straightCircumference.transform.updateTranslation(
        t.x,
        t.y,
      );
    }
    if (s) {
      this._straightCircumference.transform.updateScale(s);
    }
  }

  straightenCircumference() {
    const s = this._straightCircumference._rightLine.transform.s();
    let currentPercent = 0;
    if (s) {
      currentPercent = s.x;
    }
    if (!this.varState.straightening || this.varState.percentStraight === 0) {
      this.animateCustomToWithDelay(
        0, this.straighten.bind(this), 5, currentPercent, null, false,
      );
      this.varState.straightening = true;
    } else {
      this.animateCustomToWithDelay(
        0, this.bend.bind(this), 5, 1 - currentPercent, null, false,
      );
      this.varState.straightening = false;
    }
    this.diagram.animateNextFrame();
  }

  straighten(percent: number) {
    const rightLine = this._straightCircumference._rightLine;
    const leftLine = this._straightCircumference._leftLine;
    const rightArc = this._straightCircumference._rightArc;
    const leftArc = this._straightCircumference._leftArc;
    const centerY = 0;

    rightLine.transform.updateScale(percent, 1);
    leftLine.transform.updateScale(percent, 1);

    rightArc.transform.updateTranslation(
      percent * layout.circle.radius * Math.PI,
      centerY,
    );
    rightArc.angleToDraw = (1 - percent) * Math.PI;
    if (rightArc.angleToDraw === Math.PI) {
      rightArc.angleToDraw = -1;
    }

    leftArc.transform.updateTranslation(
      -percent * layout.circle.radius * Math.PI,
      centerY,
    );
    leftArc.angleToDraw = (1 - percent) * Math.PI;
    if (leftArc.angleToDraw === Math.PI) {
      leftArc.angleToDraw = -1;
    }

    this.varState.percentStraight = percent;

    const width = this.widthOfCircumference();
    this._circle.updateBoundaries(width);
    this._circle.setTransform(this._circle.transform);
  }

  widthOfCircumference() {
    const percent = this.varState.percentStraight;
    let arcWidth = layout.circle.radius;
    if (percent > 0.5) {
      arcWidth = Math.sin(percent * Math.PI) * layout.circle.radius;
    }
    const scale = this._circle.transform.s();
    if (scale) {
      const width = (percent * layout.circle.radius * Math.PI + arcWidth) * scale.x;
      return width;
    }
    return layout.circle.radius;
  }

  bend(percent: number) {
    this.straighten(1 - percent);
  }

  bendCircumference() {
    this.animateCustomTo(this._straightCircumference.bend, 1);
    this.diagram.animateNextFrame();
  }

  pulseAnchor() {
    this._circle._anchor.pulseScaleNow(1, 2);
    this.diagram.animateNextFrame();
  }

  // pulseMovingCircleAnchor() {
  //   this._movingCircle._circle._anchor.pulseScaleNow(1, 2);
  //   this.diagram.animateNextFrame();
  // }

  pushCircle() {
    let t = this._circle.transform.t();
    if (t === null || t === undefined) {
      t = new Point(0.001, 0.001);
    }
    if (t.x === 0) {
      t.x = 0.001;
    }
    if (t.y === 0) {
      t.y = 0.001;
    }

    this._circle.state.movement.velocity.updateTranslation(
      Math.random() * 10 * t.x / Math.abs(t.x) * -1,
      Math.random() * 10 * t.y / Math.abs(t.y) * -1,
    );

    this._circle.startMovingFreely();
    this.diagram.animateNextFrame();
  }

  pulseRadius() {
    this._circle._radius.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseDiameter() {
    this._circle._diameter._radius1.pulseScaleNow(1, 2.5);
    this._circle._diameter._radius2.pulseScaleNow(1, 2.5);
    this.diagram.animateNextFrame();
  }

  pulseArc() {
    this._circle._arc.pulseThickNow(1, 1.01, 3);
    this.diagram.animateNextFrame();
  }

  pulseCircumference() {
    this._circle._circumference.pulseThickNow(1, 1.04, 5);
    this.diagram.animateNextFrame();
  }

  pushRadius() {
    const angle = this._circle._radius.transform.r();
    let targetAngle = angle + Math.PI / 6;
    if (targetAngle > Math.PI * 2) {
      targetAngle -= Math.PI * 2;
    }
    this._circle._radius.animateRotationTo(targetAngle, 1, 1);
    this.diagram.animateNextFrame();
  }

  rotateToRandom(time: number) {
    const angle = Math.random() * Math.PI * 2;
    this.rotateTo(angle, 1, time, () => {});
    this.diagram.animateNextFrame();
  }

  rotateTo(
    angle: number,
    direction: TypeRotationDirection,
    time: number,
    callback: () => void = () => {},
  ) {
    if (angle === this._circle._radius.transform.r()) {
      callback();
      return;
    }

    let d = direction;
    if (d === 0) {
      const r = this._circle._radius.transform.r();
      d = 1;
      if (r) {
        const delta = minAngleDiff(angle, r);
        d = delta / Math.abs(delta) === 1 ? 1 : -1;
      }
    }
    this._circle._radius.animateRotationTo(angle, d, time, callback);
    this.diagram.animateNextFrame();
  }

  spinDiameter() {
    const angle = this._circle._diameter.transform.r() + Math.PI;
    this._circle._diameter.animateRotationTo(angle, 1, 2, null);
    this.diagram.animateNextFrame();
  }

  spinRadius() {
    const angle = this._circle._radius.transform.r() + Math.PI * 1.999;
    this._circle._radius.animateRotationTo(angle, 1, 2, null);
    this.diagram.animateNextFrame();
  }

  // eslint-disable-next-line class-methods-use-this
  transitionShape(
    shape: DiagramElementPrimative,
    center: Point,
    radius: number,
  ) {
    // eslint-disable-next-line no-param-reassign
    shape.animate.transform.callback = null;
    shape.stopAnimating(false);
    shape.stopAnimatingColor(false);
    // eslint-disable-next-line no-param-reassign
    shape.color[3] = 1;
    shape.show();
    shape.transform.updateScale(1, 1);
    shape.transform.updateTranslation(center);

    shape.animateTranslationAndScaleTo(
      layout.circleShape.center,
      layout.circleShape.radius / radius,
      2,
      shape.disolveOut.bind(
        shape, 1,
        shape.hide.bind(shape),
      ),
    );
  }

  toggleShape() {
    if (this.varState.shapeTurn === 0) {
      this.transitionShape(this._moonShape, layout.moon.center, layout.moon.radius);
    } else if (this.varState.shapeTurn === 1) {
      this.transitionShape(this._wheelShape, layout.wheel.center, layout.wheel.radius);
    } else if (this.varState.shapeTurn === 2) {
      this.transitionShape(this._ballShape, layout.ball.center, layout.ball.radius);
    } else if (this.varState.shapeTurn === 3) {
      this.transitionShape(this._ringShape, layout.ring.center, layout.ring.radius);
    }
    this.varState.shapeTurn += 1;
    if (this.varState.shapeTurn > 3) {
      this.varState.shapeTurn = 0;
    }
    this.diagram.animateNextFrame();
  }

  resetCircle(position: string = 'center') {
    this._circle.transform.updateTranslation(layout.circle[position]);
    this._circle.transform.updateScale(1, 1);
    this._straightCircumference.transform.updateTranslation(layout.circle[position]);
    this._straightCircumference.transform.updateScale(1, 1);
    this._circle.isMovable = false;
  }

  transitionCircle(done: () => void, toPosition: string = 'center', scale: number = 1) {
    this._circle.isMovable = false;
    const t = this._circle.transform.t();
    const s = this._circle.transform.s();
    if (s && t) {
      if (t.isNotEqualTo(layout.circle[toPosition]) || s.x !== scale) {
        this._circle.animateTranslationAndScaleTo(
          layout.circle[toPosition],
          scale,
          1,
          done,
        );
        return;
      }
    }
    done();
  }

  resetColors() {
    this._circle._radius.color = colors.radius.slice();
    this._circle._anchor.color = colors.anchor.slice();
    this._circle._arc.color = colors.circle.slice();
    this._circle._circumference.color = colors.circle.slice();
  }

  toggleRadius() {
    if (this._circle._radius.isShown) {
      this._circle._radius.hide();
    } else {
      // this._circle._diameter.hideAll();
      this._circle._radius.show();
      this.pulseRadius();
    }
    this.diagram.animateNextFrame();
  }

  toggleDiameter() {
    if (this._circle._diameter.isShown) {
      this._circle._diameter.hideAll();
    } else {
      // this._circle._radius.hide();
      this._circle._diameter.showAll();
      this.pulseDiameter();
    }
    this.diagram.animateNextFrame();
  }
  // greyColors() {
  //   this._circle._radius.color = colors.disabled.slice();
  //   this._circle._anchor.color = colors.disabled.slice();
  //   this._circle._arc.color = colors.disabled.slice();
  //   this._circle._circumference.color = colors.disabled.slice();
  // }
}

export default CircleCollection;
