// @flow
import Fig from 'figureone';

const {
  Transform, Point, Rect, polarToRect,
} = Fig.tools.g2;

function makeWaveSegment(
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

function makeGenericGrid(xNum: number, yNum: number, sideLength: number) {
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

function addGenericGrid() {
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

  function addSmallGenericGrid() {
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

export default function grid() {
}