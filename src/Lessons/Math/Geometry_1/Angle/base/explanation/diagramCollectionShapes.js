// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const {
  Point, Transform, DiagramElementPrimative, DiagramElementCollection,
} = Fig;

const layout = lessonLayout();
const { colors } = layout;

const lineColor = colors.lines;
const cornerColor = colors.corners;
const moreSharpColor = colors.moreSharp;
const lessSharpColor = colors.lessSharp;
const lineWidth = 0.02;
const cornerWidth = 0.06;
const cornerLength = 0.15;

type typeShape = {
  _lines: DiagramElementPrimative;
  _corners: DiagramElementPrimative;
  _lessSharpCorners: DiagramElementPrimative;
  _moreSharpCorners: DiagramElementPrimative;
} & DiagramElementCollection ;


function makeSquare(shapes: Object, location: Point) {
  const { radius } = layout.square;
  const vertices = [
    new Point(-radius, -radius),
    new Point(radius, -radius),
    new Point(radius, radius),
    new Point(-radius, radius),
  ];

  const lines = shapes.polyLineLegacy(vertices, true, lineWidth, lineColor);
  const corners = shapes.polyLineCorners(
    vertices, true, cornerLength,
    cornerWidth, cornerColor,
  );
  const lessSharp = shapes.polyLineCorners(
    vertices, true, cornerLength,
    cornerWidth, lessSharpColor,
  );

  const square: typeShape = shapes.collection(location);
  square.add('lines', lines);
  square.add('corners', corners);
  square.add('lessSharpCorners', lessSharp);
  return square;
}

function makeTriangle(shapes: Object, location: Point) {
  const { radius } = layout.tri;
  const vertices = [
    new Point(0, radius),
    new Point(0, radius).rotate(2 * Math.PI / 3),
    new Point(0, radius).rotate(4 * Math.PI / 3),
  ];
  const lines = shapes.polyLineLegacy(vertices, true, lineWidth, lineColor);
  const corners = shapes.polyLineCorners(
    vertices, true, cornerLength,
    cornerWidth, cornerColor,
  );

  const moreSharp = shapes.polyLineCorners(
    vertices, true, cornerLength,
    cornerWidth, moreSharpColor,
  );

  const triangle: typeShape = shapes.collection(location);
  triangle.add('lines', lines);
  triangle.add('corners', corners);
  triangle.add('moreSharpCorners', moreSharp);
  return triangle;
}

function makePent(shapes: Object, location: Point) {
  function makeCorner(v, color) {
    return shapes.polyLineCorners(v, false, cornerLength, cornerWidth, color);
  }
  const vertices = layout.pent.vertices.slice();

  const lines = shapes.polyLineLegacy(vertices, true, lineWidth, lineColor);
  const corners = shapes.polyLineCorners(
    vertices, true, cornerLength,
    cornerWidth, cornerColor,
  );

  const v = vertices;
  const moreSharpCorners = shapes.collection();
  const sharpCorner1 = makeCorner([v[4], v[0], v[1]], moreSharpColor);
  const sharpCorner2 = makeCorner([v[0], v[1], v[2]], moreSharpColor);
  const sharpCorner3 = makeCorner([v[2], v[3], v[4]], moreSharpColor);
  moreSharpCorners.add('sharpCorner1', sharpCorner1);
  moreSharpCorners.add('sharpCorner2', sharpCorner2);
  moreSharpCorners.add('sharpCorner3', sharpCorner3);

  const lessSharpCorners = shapes.collection();
  const lessCorner1 = makeCorner([v[1], v[2], v[3]], lessSharpColor);
  const lessCorner2 = makeCorner([v[3], v[4], v[0]], lessSharpColor);
  lessSharpCorners.add('lessCorner1', lessCorner1);
  lessSharpCorners.add('lessCorner2', lessCorner2);

  const pent: typeShape = shapes.collection(location);
  pent.add('lines', lines);
  pent.add('corners', corners);
  pent.add('moreSharpCorners', moreSharpCorners);
  pent.add('lessSharpCorners', lessSharpCorners);
  return pent;
}

class ShapesCollection extends CommonDiagramCollection {
  _square: typeShape;
  _triangle: typeShape;
  _pent: typeShape;

  constructor(
    diagram: CommonLessonDiagram,
    locations: Object,
    transform: Transform = new Transform(),
  ) {
    super(diagram, layout, transform);
    this.diagram = diagram;
    const { shapes } = diagram;

    const square = makeSquare(shapes, locations.square.center);
    this.add('square', square);

    const triangle = makeTriangle(shapes, locations.tri.center);
    this.add('triangle', triangle);

    const pent = makePent(shapes, locations.pent.center);
    this.add('pent', pent);
  }

  // $FlowFixMe
  resize(locations: Object) {
    this._square.transform.updateTranslation(
      locations.square.center.x,
      locations.square.center.y,
    );
    this._triangle.transform.updateTranslation(
      locations.tri.center.x,
      locations.tri.center.y,
    );
    this._pent.transform.updateTranslation(
      locations.pent.center.x,
      locations.pent.center.y,
    );
  }

  toggleCorners(toggle: boolean = true, show: boolean = true) {
    if (toggle) {
      this._square._corners.toggleShow();
      this._triangle._corners.toggleShow();
      this._pent._corners.toggleShow();
    } else if (show) {
      this._square._corners.show();
      this._triangle._corners.show();
      this._pent._corners.show();
    } else {
      this._square._corners.hide();
      this._triangle._corners.hide();
      this._pent._corners.hide();
    }

    if (this._square._corners.isShown) {
      this._square._corners.pulseScaleNow(1, 1.08);
      this._triangle._corners.pulseScaleNow(1, 1.08);
      this._pent._corners.pulseScaleNow(1, 1.08);
      this.toggleMoreSharpCorners(false, false);
      this.toggleLessSharpCorners(false, false);
    }
    this.diagram.animateNextFrame();
  }

  toggleMoreSharpCorners(toggle: boolean = true, show: boolean = true) {
    if (toggle) {
      this._triangle._moreSharpCorners.toggleShow();
      this._pent._moreSharpCorners.toggleShow();
    } else if (show) {
      this._triangle._moreSharpCorners.show();
      this._pent._moreSharpCorners.show();
    } else {
      this._triangle._moreSharpCorners.hide();
      this._pent._moreSharpCorners.hide();
    }

    if (this._triangle._moreSharpCorners.isShown) {
      this._triangle._moreSharpCorners.pulseScaleNow(1, 1.08);
      this._pent._moreSharpCorners.pulseScaleNow(1, 1.08);
      this.toggleCorners(false, false);
      this.toggleLessSharpCorners(false, false);
    }
    this.diagram.animateNextFrame();
  }

  toggleLessSharpCorners(toggle: boolean = true, show: boolean = true) {
    if (toggle) {
      this._square._lessSharpCorners.toggleShow();
      this._pent._lessSharpCorners.toggleShow();
    } else if (show) {
      this._square._lessSharpCorners.show();
      this._pent._lessSharpCorners.show();
    } else {
      this._square._lessSharpCorners.hide();
      this._pent._lessSharpCorners.hide();
    }

    if (this._square._lessSharpCorners.isShown) {
      this._square._lessSharpCorners.pulseScaleNow(1, 1.08);
      this._pent._lessSharpCorners.pulseScaleNow(1, 1.08);
      this.toggleCorners(false, false);
      this.toggleMoreSharpCorners(false, false);
    }
    this.diagram.animateNextFrame();
  }

  pulseShapes() {
    const mag = 1.05;
    const lines = 5;
    const time = 1;
    this._square._lines.pulseThickNow(time, mag, lines);
    this._triangle._lines.pulseThickNow(time, mag, lines);
    this._pent._lines.pulseThickNow(time, mag, lines);
    this.diagram.animateNextFrame();
  }
}

export default ShapesCollection;
