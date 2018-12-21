// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const {
  DiagramElementCollection, DiagramElementPrimative, DiagramObjectLine,
} = Fig;
const {
  Transform, Point, Rect, polarToRect,
} = Fig.tools.g2;
const {
  range, roundNum,
} = Fig.tools.math;
const { generateUniqueId } = Fig.tools.misc;

export default class MeasureCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  _angle: {
    _line: DiagramElementPrimative;
    _minorTicks: DiagramElementPrimative;
    _majorTicks: DiagramElementPrimative;
  } & DiagramElementCollection;

  _circleA: DiagramElementPrimative;
  _circleGrid: DiagramElementCollection;
  _circleLabel: DiagramElementPrimative;
  _circleLabelMeters: DiagramElementPrimative;
  _crossCircle: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
  } & DiagramElementCollection;

  _crossGeneric: {
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
  } & DiagramElementCollection;

  _genericGrid: {
    _hLines: DiagramElementPrimative;
    _vLines: DiagramElementPrimative;
  } & DiagramElementCollection;

  _length: {
    _line: DiagramObjectLine;
    _line0: DiagramObjectLine;
    _line1: DiagramObjectLine;
    _line2: DiagramObjectLine;
    _line3: DiagramObjectLine;
    _ticks: DiagramElementPrimative;
  } & DiagramElementCollection;

  _mediumGrid: DiagramElementPrimative;
  _smallCircleGrid: DiagramElementCollection;
  _smallGenericGrid: DiagramElementCollection;
  _smallSquareGrid: DiagramElementPrimative;
  _squareA: DiagramElementPrimative;
  _squareGrid: DiagramElementPrimative;
  _squareLabel: DiagramElementPrimative;
  _squareLabelMeters: DiagramElementPrimative;
  _triLabel: DiagramElementPrimative;
  _triLabelMeters: DiagramElementPrimative;
  _triangleA: DiagramElementPrimative;

  addEmptyShapes() {
    const sq = this.layout.squareA;
    const circ = this.layout.circleA;
    const tri = this.layout.triangleA;
    const col = this.layout.colors.line;
    const square = this.diagram.shapes.polygon({
      sides: 4,
      length: Math.sqrt(((sq.sideLength / 2) ** 2) * 2),
      width: sq.width,
      rotation: Math.PI / 4,
      color: col,
      transform: new Transform('sA').translate(sq.position),
    });
    this.add('squareA', square);

    const circle = this.diagram.shapes.polygon({
      sides: circ.numSides,
      radius: circ.radius,
      width: circ.width,
      color: col,
      transform: new Transform('cA').translate(circ.position),
    });
    this.add('circleA', circle);

    const triangle = this.diagram.shapes.polygon({
      sides: 3,
      length: tri.sideLength / 2 / Math.cos(Math.PI / 6),
      width: tri.width,
      rotation: -Math.PI / 6,
      color: col,
      transform: new Transform('cA').translate(tri.position),
    });
    this.add('triangleA', triangle);
  }

  addLengthMeasure() {
    const lay = this.layout.lengthMeasure;
    const col = this.layout.colors;
    const lengthMeasure = this.diagram.shapes.collection({
      transform: new Transform('lengthMeasure')
        .translate(lay.position),
    });

    const makeL = (position, length, labelText, name, labelPos, color, width) => {
      const line = this.diagram.objects.line({
        vertexSpaceStart: 'center',
        position,
        length,
        width,
        color,
      });
      // line.setPosition(position);
      // line.setLength(length);
      line.addLabel(labelText, 0.05, 'top', 'left', 'horizontal');
      lengthMeasure.add(`line${name}`, line);
    };
    makeL(new Point(0, 0), lay.length, '4m', '', 'bottom', col.line, lay.width);
    const sectionLength = lay.length / lay.sections;
    let start = -lay.length / 2 + sectionLength / 2;
    for (let i = 0; i < lay.sections; i += 1) {
      const label = i === 0 ? '1m' : '';
      makeL(
        new Point(start + i * sectionLength, lay.referenceOffset),
        sectionLength,
        label, `${i}`, 'top', col.reference, lay.width / 2,
      );
    }
    start = -lay.length / 2;
    const grid = this.diagram.shapes.grid(new Rect(
      start,
      lay.referenceOffset - lay.tickLength / 2,
      lay.length,
      lay.tickLength,
    ), lay.length / lay.sections, 0, 2, col.reference);
    lengthMeasure.add('ticks', grid);
    this.add('length', lengthMeasure);
  }

  addAngleMeasure() {
    const lay = this.layout.angleMeasure;
    const angleMeasure = this.diagram.shapes.collection(
      {
        transform: new Transform('angleM')
          .translate(lay.position),
      },
    );
    const col = this.layout.colors;
    const line = this.diagram.shapes.polyLineLegacy([
      new Point(lay.length, 0),
      new Point(0, 0),
      new Point(lay.length * Math.cos(lay.angle), lay.length * Math.sin(lay.angle)),
    ], false, lay.width, col.line);
    angleMeasure.add('line', line);

    const tick = (angle, radius, length) => [
      polarToRect(radius, angle),
      polarToRect(radius - length, angle),
    ];
    const minorTickLines = range(1, 59)
      .map(a => tick(a * Math.PI / 180, lay.length, lay.minorTickLength));
    const minorTicks = this.diagram.shapes.lines(minorTickLines, 1, col.reference);
    const majorTickLines = range(10, 50, 10)
      .map(a => tick(a * Math.PI / 180, lay.length, lay.majorTickLength));
    const majorTicks = this.diagram.shapes.lines(majorTickLines, 1, col.reference);
    angleMeasure.add('minorTicks', minorTicks);
    angleMeasure.add('majorTicks', majorTicks);
    this.add('angle', angleMeasure);
  }

  makeCircleGrid(xNum: number, yNum: number, radius: number) {
    const lay = this.layout.circles;
    const col = this.layout.colors.grid;
    const length = xNum * radius * 2;
    const height = yNum * radius * 2;
    const circle = this.diagram.shapes.polygon({
      sides: lay.sides,
      radius,
      width: lay.width,
      color: col,
      point: new Point(-length / 2, -height / 2),
    });
    const circles = this.diagram.shapes.repeatPattern(
      circle,
      xNum, yNum,
      radius * 2, radius * 2, new Transform().translate(0, 0),
    );
    return circles;
  }

  addSmallCircleGrid() {
    const lay = this.layout.circles;
    const grid = this.layout.smallGrid;
    const circles = this.makeCircleGrid(grid.xNum, grid.yNum, lay.radius);
    circles.setPosition(lay.smallPosition);
    this.add('smallCircleGrid', circles);
  }

  addCircleGrid() {
    const lay = this.layout.circles;
    const { grid } = this.layout;
    const circles = this.makeCircleGrid(
      roundNum(grid.length / lay.radius / 2, 4),
      roundNum(grid.height / lay.radius / 2, 4),
      lay.radius,
    );
    circles.setPosition(lay.position);
    this.add('circleGrid', circles);
  }

  // eslint-disable-next-line class-methods-use-this
  makeWaveSegment(
    length: number,
    mag: number,
    segments: number,
    start: Point = new Point(0, 0),
    rotation: number = 0,
  ) {
    const step = length / segments;
    const xPoints = range(0, length, step);
    const points = xPoints.map(x => new Point(
      x,
      mag * Math.cos(x / length * 2 * Math.PI),
    ));
    const transform = new Transform().rotate(rotation).translate(start);
    const tPoints: Array<Point> = points.map(p => p.transformBy(transform.m()));
    return tPoints;
  }

  makeGenericGrid(xNum: number, yNum: number, sideLength: number) {
    const lay = this.layout.genericGrid;
    const length = xNum * sideLength;
    const height = yNum * sideLength;
    const hPoints = this.makeWaveSegment(
      sideLength, lay.waveMag,
      lay.segments, new Point(-length / 2, -height / 2 - lay.waveMag),
    );
    const hSegment = this.diagram.shapes.polyLineLegacy(
      hPoints, false, lay.width, this.layout.colors.grid,
      'never',
    );
    const hLines = this.diagram.shapes.repeatPatternVertex(
      hSegment,
      length / sideLength, height / sideLength + 1,
      sideLength, sideLength,
    );

    const vPoints = this.makeWaveSegment(
      sideLength, lay.waveMag,
      lay.segments, new Point(-length / 2 + lay.waveMag, -height / 2), Math.PI / 2,
    );
    const vSegment = this.diagram.shapes.polyLineLegacy(
      vPoints, false, lay.width, this.layout.colors.grid,
      'never',
    );
    const vLines = this.diagram.shapes.repeatPatternVertex(
      vSegment, length / sideLength + 1,
      height / sideLength, sideLength, lay.sideLength,
    );

    const group = this.diagram.shapes.collection({ transform: new Transform().translate(0, 0) });
    group.add('vLines', vLines);
    group.add('hLines', hLines);
    return group;
  }

  addGenericGrid() {
    const lay = this.layout.genericGrid;
    const { grid } = this.layout;
    const group = this.makeGenericGrid(
      roundNum(grid.length / lay.sideLength, 4),
      roundNum(grid.height / lay.sideLength, 4),
      lay.sideLength,
    );
    group.setPosition(lay.position);
    this.add('genericGrid', group);
  }

  addSmallGenericGrid() {
    const lay = this.layout.genericGrid;
    const grid = this.layout.smallGrid;
    const group = this.makeGenericGrid(
      grid.xNum,
      grid.yNum,
      lay.sideLength,
    );
    group.setPosition(lay.smallPosition);
    this.add('smallGenericGrid', group);
  }

  addSquareGrid() {
    const lay = this.layout.squareGrid;
    const { grid } = this.layout;
    const squares = this.diagram.shapes.grid(
      new Rect(
        -grid.length / 2, -grid.height / 2,
        grid.length, grid.height,
      ),
      lay.sideLength, lay.sideLength, 2, this.layout.colors.grid,
      new Transform().translate(lay.position),
    );
    this.add('squareGrid', squares);
  }

  addMediumGrid() {
    const lay = this.layout.squareGrid;
    const grid = this.layout.mediumGrid;
    const squares = this.diagram.shapes.grid(
      new Rect(
        -grid.length / 2, -grid.height / 2,
        grid.length, grid.height,
      ),
      lay.sideLength, lay.sideLength, 2, this.layout.colors.grid,
      new Transform().translate(lay.mediumPosition),
    );
    this.add('mediumGrid', squares);
  }

  addSmallSquareGrid() {
    const lay = this.layout.squareGrid;
    const grid = this.layout.smallGrid;
    const length = grid.xNum * lay.sideLength;
    const height = grid.yNum * lay.sideLength;
    const squares = this.diagram.shapes.grid(
      new Rect(
        -length / 2, -height / 2,
        length, height,
      ),
      lay.sideLength, lay.sideLength, 3, this.layout.colors.grid,
      new Transform().translate(lay.smallPosition),
    );
    this.add('smallSquareGrid', squares);
  }

  addCrosses() {
    const lay = this.layout.cross;
    const col = this.layout.colors.cross;
    const makeCross = (position) => {
      const cross = this.diagram.shapes.collection({ transform: new Transform().translate(0, 0) });
      const line1 = this.diagram.objects.line({
        vertexSpaceStart: 'center',
        length: lay.length,
        width: lay.width,
        color: col,
        angle: Math.PI / 3,
      });
      // line1.setLength(lay.length);
      // line1.transform.updateRotation(Math.PI / 3);
      cross.add('line1', line1);

      const line2 = this.diagram.objects.line({
        vertexSpaceStart: 'center',
        length: lay.length,
        width: lay.width,
        color: col,
        angle: Math.PI / 3 * 2,
      });
      // line2.setLength(lay.length);
      // line2.transform.updateRotation(Math.PI / 3 * 2);
      cross.add('line2', line2);
      cross.setPosition(position);
      return cross;
    };
    this.add('crossCircle', makeCross(this.layout.circles.smallPosition.sub(new Point(this.layout.circles.radius, this.layout.circles.radius))));
    this.add('crossGeneric', makeCross(this.layout.genericGrid.smallPosition));
  }

  addLabels() {
    const unitArea = this.layout.squareGrid.sideLength ** 2;

    const tri = this.layout.triangleA;
    const triArea = 0.5 * tri.sideLength * tri.sideLength * Math.sin(Math.PI / 3) / unitArea;
    const triLabel = this.diagram.shapes.htmlText(
      `Area = ${roundNum(triArea, 1)} squares`,
      generateUniqueId('id_label1'),
      'lesson__area_intro__area_label', new Point(0, 0), 'middle', 'center',
    );
    triLabel.setPosition(tri.position.add(new Point(0, tri.labelOffset)));
    this.add('triLabel', triLabel);
    const triLabelMeters = this.diagram.shapes.htmlText(
      `Area = ${roundNum(triArea, 1)} m<sup>2</sup>`,
      generateUniqueId('id_label1m'),
      'lesson__area_intro__area_label', new Point(0, 0), 'middle', 'center',
    );
    triLabelMeters.setPosition(tri.position.add(new Point(0, tri.labelOffset)));
    this.add('triLabelMeters', triLabelMeters);

    const square = this.layout.squareA;
    const squareArea = square.sideLength ** 2 / unitArea;
    const squareLabel = this.diagram.shapes.htmlText(
      `Area = ${roundNum(squareArea, 1)} squares`,
      generateUniqueId('id_label2'),
      'lesson__area_intro__area_label', new Point(0, 0), 'middle', 'center',
    );
    squareLabel.setPosition(square.position.add(new Point(0, square.labelOffset)));
    this.add('squareLabel', squareLabel);
    const squareLabelMeters = this.diagram.shapes.htmlText(
      `Area = ${roundNum(squareArea, 1)} m<sup>2</sup>`,
      generateUniqueId('id_label2Meters'),
      'lesson__area_intro__area_label', new Point(0, 0), 'middle', 'center',
    );
    squareLabelMeters.setPosition(square.position.add(new Point(0, square.labelOffset)));
    this.add('squareLabelMeters', squareLabelMeters);

    const circle = this.layout.circleA;
    const circleArea = circle.radius ** 2 * Math.PI / unitArea;
    const circleLabel = this.diagram.shapes.htmlText(
      `Area = ${roundNum(circleArea, 1)} squares`,
      generateUniqueId('id_label3'),
      'lesson__area_intro__area_label', new Point(0, 0), 'middle', 'center',
    );
    circleLabel.setPosition(circle.position.add(new Point(0, circle.labelOffset)));
    this.add('circleLabel', circleLabel);
    const circleLabelMeters = this.diagram.shapes.htmlText(
      `Area = ${roundNum(circleArea, 1)} m<sup>2</sup>`,
      generateUniqueId('id_label3Meters'),
      'lesson__area_intro__area_label', new Point(0, 0), 'middle', 'center',
    );
    circleLabelMeters.setPosition(circle.position.add(new Point(0, circle.labelOffset)));
    this.add('circleLabelMeters', circleLabelMeters);
  }

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform().translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.addCircleGrid();
    this.addSmallCircleGrid();
    this.addGenericGrid();
    this.addSmallGenericGrid();
    this.addSquareGrid();
    this.addMediumGrid();
    this.addSmallSquareGrid();
    this.addCrosses();

    this.addLengthMeasure();
    this.addAngleMeasure();
    this.addEmptyShapes();
    this.addLabels();

    this.setPosition(this.layout.measurePosition);
    this.hasTouchableElements = true;
  }

  toggleGrid() {
    if (this._squareGrid.isShown) {
      this._squareGrid.hide();
      this._genericGrid.showAll();
      this._circleGrid.hideAll();
    } else if (this._genericGrid.isShown) {
      this._squareGrid.hide();
      this._genericGrid.hideAll();
      this._circleGrid.showAll();
    } else {
      this._squareGrid.show();
      this._genericGrid.hideAll();
      this._circleGrid.hideAll();
    }
    this.diagram.animateNextFrame();
  }
}
