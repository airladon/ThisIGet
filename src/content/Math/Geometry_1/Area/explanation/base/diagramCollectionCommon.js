// @flow
import Fig from 'figureone';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const {
  DiagramElementPrimitive,
  // DiagramObjectAngle,
  DiagramObjectLine,
  DiagramElementCollection,
  Transform,
  Point,
  Equation,
  EqnNavigator,
} = Fig;

const {
  range, roundNum,
} = Fig.tools.math;

export default class CommonCollection extends CommonDiagramCollection {
  _measure: {
    _length: {
      _line: DiagramObjectLine;
      _measureLine: DiagramObjectLine;
      _label: DiagramElementPrimitive;
      _grid: DiagramElementPrimitive;
    } & DiagramElementCollection;
  } & DiagramElementCollection;

  _unitShape: {
    _circle: DiagramElementPrimitive;
    _grid: DiagramElementPrimitive;
    _genericGrid: DiagramElementPrimitive;
    _circleGrid: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _shapes: {
    _circleLabel: DiagramElementPrimitive;
    _squareLabel: DiagramElementPrimitive;
    _triangleLabel: DiagramElementPrimitive;
    _square: DiagramElementPrimitive;
    _circle: DiagramElementPrimitive;
    _triangle: DiagramElementPrimitive;
    _triangleHtmlLabel: DiagramElementPrimitive;
    _squareHtmlLabel: DiagramElementPrimitive;
    _circleHtmlLabel: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _rectangle: {
    _row: DiagramElementPrimitive;
    _line: DiagramObjectLine;
    _grid: DiagramElementPrimitive;
    _labelB: DiagramElementPrimitive;
    _labelA: DiagramElementPrimitive;
    _labelHeight: DiagramElementPrimitive;
    _labelWidth: DiagramElementPrimitive;
    _label6: DiagramElementPrimitive;
    _label10: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _square: {
    _line: DiagramObjectLine;
    _grid: DiagramElementPrimitive;
    _labelB1: DiagramElementPrimitive;
    _labelB2: DiagramElementPrimitive;
  } & DiagramElementCollection;

  _eqn: Equation;
  _nav: EqnNavigator;

  row: number;

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
    const hSegment = this.diagram.shapes.polyline(
      {
        points: hPoints,
        close: false,
        width: lay.width,
        color: this.layout.colors.grid,
        widthIs: 'mid',
      },
    );
    const hLines = this.diagram.shapes.repeatPatternVertex({
      element: hSegment,
      xNum: length / sideLength,
      yNum: height / sideLength + 1,
      xStep: sideLength,
      yStep: sideLength,
    });

    const vPoints = this.makeWaveSegment(
      sideLength, lay.waveMag,
      lay.segments, new Point(-length / 2 + lay.waveMag, -height / 2), Math.PI / 2,
    );
    const vSegment = this.diagram.shapes.polyline(
      {
        points: vPoints,
        close: false,
        width: lay.width,
        color: this.layout.colors.grid,
        widthIs: 'mid',
      },
    );
    const vLines = this.diagram.shapes.repeatPatternVertex({
      element: vSegment,
      xNum: length / sideLength + 1,
      yNum: height / sideLength,
      xStep: sideLength,
      yStep: lay.sideLength,
    });

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
    group.setPosition(0, -0.25 - 0.125);
    this._unitShape.add('genericGrid', group);
  }

  constructor(
    diagram: CommonTopicDiagram,
    layout: Object,
    transform: Transform = new Transform('Common').rotate(0).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.setPosition(this.layout.position);
    this.diagram.addElements(this.layout.addElements, this);
    this.hasTouchableElements = true;
    this.makeUnitCircleGrid();
    this.addGenericGrid();
    this._eqn.isTouchable = false;
  }

  makeUnitCircleGrid() {
    const grid = this.diagram.shapes.repeatPatternVertex({
      element: this._unitShape._circle._dup(),
      xNum: 20,
      xStep: 0.25,
      yNum: 7,
      yStep: 0.25,
    });
    grid.setPosition(-2.5 + 0.125, -1.125);
    this._unitShape.add('circleGrid', grid);
  }

  pulseMeasureLine() {
    this._measure._length._line.pulseWidth({ line: 5 });
    this.diagram.animateNextFrame();
  }

  toggleGrid() {
    if (this._unitShape._grid.isShown) {
      this._unitShape._grid.hide();
      this._unitShape._circleGrid.show();
    } else if (this._unitShape._circleGrid.isShown) {
      this._unitShape._circleGrid.hide();
      this._unitShape._genericGrid.showAll();
    } else {
      this._unitShape._genericGrid.hide();
      this._unitShape._grid.show();
    }
    this.diagram.animateNextFrame();
  }

  setAreaToSquares() {
    this._shapes._circleLabel.drawingObject.setText('Area = 19.6 squares');
    this._shapes._squareLabel.drawingObject.setText('Area = 25 squares');
    this._shapes._triangleLabel.drawingObject.setText('Area = 14.5 squares');
  }

  // setAreaToSquares() {
  //   this._shapes._circleLabel.drawingObject.setText('Area = 19.6 m2');
  //   this._shapes._squareLabel.drawingObject.setText('Area = 25 squares');
  //   this._shapes._triangleLabel.drawingObject.setText('Area = 14.5 squares');
  // }

  toggleRow() {
    this._rectangle._row.show();
    this.row = (this.row + 1) % 6;
    this._rectangle._row.setScenario(`${this.row}`);
    this.diagram.animateNextFrame();
  }
}
