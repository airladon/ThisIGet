// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const { Point, Line, Transform } = Fig;
const cssColorNames = [
  'square1',
  'square2',
  'circle',
  'reference',
  'line',
  'grid',
  'cross',
  'row',
  'unit',
  'construction',
  'construction1',
  'constructionFill',
  'construction1Fill',
  'construction2Fill',
  'fillLabel',
  'lineLabel',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function commonLessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);

  const width = 0.03;

  layout.triRectEqnPosition = new Point(0, 1.2);
  // //////////////////////////////////////////////////////
  //     Triangle Area
  // //////////////////////////////////////////////////////
  layout.triPosition = new Point(0, -0.5);
  layout.gridTri = {
    position: new Point(0, 0),
    smallPosition: new Point(0, 0),
    spacing: 0.25,
    length: 4,
    height: 2,
  };
  layout.triLabelOffset = 0.07;
  layout.triIntro = {
    points: [
      new Point(-0.75, -0.75),
      new Point(0.75, -0.75),
      new Point(0, 0.75),
    ],
    width,
  };
  layout.triRect = {
    points: [
      new Point(-1.25, -0.75),
      new Point(1.25, -0.75),
      new Point(1.25, 0.75),
      new Point(-1.25, 0.75),
    ],
    width,
  };
  layout.tri2 = {
    points: [
      new Point(-1.5, -0.75),
      new Point(1.5, -0.75),
      new Point(0.3, 0.4),
    ],
    width,
  };

  layout.tri2Rect1 = {
    points: [
      layout.tri2.points[0],
      new Point(layout.tri2.points[2].x, layout.tri2.points[0].y),
      layout.tri2.points[2],
      new Point(layout.tri2.points[0].x, layout.tri2.points[2].y),
    ],
    width: width / 3,
  };
  layout.tri2Rect2 = {
    points: [
      new Point(layout.tri2.points[2].x, layout.tri2.points[1].y),
      layout.tri2.points[1],
      new Point(layout.tri2.points[1].x, layout.tri2.points[2].y),
      layout.tri2.points[2],
    ],
    width: width / 3,
  };
  layout.tri2Rect1Tri = {
    points: [
      layout.tri2Rect1.points[0],
      layout.tri2Rect1.points[1],
      layout.tri2Rect1.points[2],
    ],
    // midPoint: new Point(
    //   (layout.tri2Rect1.points[1].x - layout.tri2Rect1.points[0].x) / 1.5
    //     + layout.tri2Rect1.points[0].x,
    //   (layout.tri2Rect1.points[2].y - layout.tri2Rect1.points[0].y) / 3
    //     + layout.tri2Rect1.points[0].y,
    // ),
  };
  layout.tri2Rect2Tri = {
    points: [
      layout.tri2Rect2.points[0],
      layout.tri2Rect2.points[1],
      layout.tri2Rect2.points[3],
    ],
    // midPoint: new Point(
    //   (layout.tri2Rect2.points[1].x - layout.tri2Rect2.points[0].x)  / 3
    //     + layout.tri2Rect2.points[0].x,
    //   (layout.tri2Rect2.points[3].y - layout.tri2Rect2.points[0].y) / 3
    //     + layout.tri2Rect2.points[0].y,
    // ),
  };
  layout.tri2AreaEqnPosition = new Point(-0.5, 1.2);
  layout.tri2AreaEqnNavPosition = new Point(0, -0.25);

  // //////////////////////////////////////////////////////
  //     Rotated triangle area
  // //////////////////////////////////////////////////////
  const side = new Line(layout.tri2.points[0], layout.tri2.points[2]);
  const angle = side.angle() - Math.PI;
  layout.tri2Scenario = {
    rotation: 0,
    position: new Point(0, 0),
  };
  layout.tri3Scenario = {
    rotation: -angle,
    position: new Point(-0.3, -0.55),
  };
  const t = new Transform()
    .rotate(layout.tri3Scenario.rotation)
    .translate(layout.tri3Scenario.position);

  layout.tri3 = {
    points: layout.tri2.points.map(p => p.transformBy(t.m())),
    width,
  };
  const delta = width / 3 / 2;
  layout.tri3Rect1 = {
    points: [
      new Point(layout.tri3.points[2].x, layout.tri3.points[1].y - delta),
      layout.tri3.points[1].add(delta, -delta),
      new Point(layout.tri3.points[1].x + delta, layout.tri3.points[2].y + delta),
      layout.tri3.points[2].add(0, delta),
    ],
    width: width / 3,
  };
  layout.tri3Rect2 = {
    points: [
      layout.tri3.points[0].add(0, -delta),
      new Point(layout.tri3.points[1].x - delta, layout.tri3.points[0].y  - delta),
      layout.tri3.points[1].add(-delta, delta),
      new Point(layout.tri3.points[0].x, layout.tri3.points[1].y + delta),
    ],
    width: width / 3,
  };
  layout.tri3Tri = {
    points: layout.tri3.points,
  };
  layout.tri3Rect1Tri = {
    points: [
      layout.tri3Rect1.points[3],
      layout.tri3Rect1.points[1],
      layout.tri3Rect1.points[2],
    ],
  };
  layout.tri3Rect2Tri = {
    points: [
      layout.tri3Rect2.points[0],
      layout.tri3Rect2.points[1],
      layout.tri3Rect2.points[2],
    ],
  };

  layout.tri3AreaEqnPosition = new Point(-0.5, 1.2);
  layout.tri3AreaEqnNavPosition = new Point(0, -0.25);

  // //////////////////////////////////////////////////////
  //     Same Area Triangle
  // //////////////////////////////////////////////////////
  layout.samePosition = new Point(0, -0.1);
  layout.same = {
    width: 0.03,
    points: [
      new Point(-0.5, -0.75),
      new Point(0.5, -0.75),
      new Point(0, 0.75),
    ],
    baseY: -1.25,
    heightX: 2.6,
    lineLabelOffset: 0.08,
    pad: {
      sides: 50,
      radius: 0.15,
    },
    basePadMinSeparation: 0.5,
    grid:{
      position: new Point(0, 0),
      smallPosition: new Point(0, 0),
      spacing: 0.25,
      length: 5,
      height: 2.25,
    },
    label: {
      position: new Point(0, -1.7),
    },
  };
  // layout.same.grid.height = 2.25;
  // layout.same.baseY = -1.25;
  // layout.samePosition = new Point(0, 0);
  return layout;
}
