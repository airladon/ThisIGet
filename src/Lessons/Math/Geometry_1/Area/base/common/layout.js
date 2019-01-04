// @flow
import Fig from 'figureone';
// import getCssColors from '../../../../../../js/tools/getCssColors';
import baseLayout from '../../../../../LessonsCommon/layout';

const { Point } = Fig;

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

  // //////////////////////////////////////////////////////
  //     Shapes
  // //////////////////////////////////////////////////////
  const width = 0.03;
  layout.shapesPosition = new Point(0, -0.5);
  layout.square1 = {
    position: new Point(-1, 0),
    sideLength: 2,
  };
  layout.square2 = {
    position: new Point(1.5, 0),
    sideLength: 1,
  };
  layout.circle = {
    position: new Point(-1, 0),
    radius: 1,
    numSides: 300,
  };

  // //////////////////////////////////////////////////////
  //     Measure
  // //////////////////////////////////////////////////////
  layout.measurePosition = new Point(0, -0.5);
  layout.lengthMeasure = {
    position: new Point(0, -0.5),
    length: 4,
    width: 0.02,
    sections: 4,
    referenceOffset: 0.5,
    tickLength: 0.1,
  };
  layout.angleMeasure = {
    position: new Point(-1, -0.7),
    length: 2,
    width: 0.02,
    angle: Math.PI / 3,
    majorTickLength: 0.1,
    minorTickLength: 0.05,
  };
  layout.grid = {
    length: 5.7,
    height: 2.7,
  };
  layout.mediumGrid = {
    length: 5.7,
    height: 1.8,
  };
  layout.smallGrid = {
    xNum: 4,
    yNum: 4,
  };
  layout.circles = {
    position: new Point(0.15, 0.35),
    smallPosition: new Point(2, 0.15),
    radius: 0.15,
    sides: 25,
    width: 0.01,
  };
  layout.genericGrid = {
    position: new Point(0, 0.2),
    smallPosition: new Point(-2, 0),
    sideLength: 0.3,
    waveMag: 0.015,
    width: 0.01,
    segments: 20,
  };
  layout.squareGrid = {
    position: new Point(0, 0.2),
    smallPosition: new Point(0, 0),
    mediumPosition: new Point(0, 0.05),
    sideLength: 0.3,
    // width: 0.07,
  };

  layout.squareA = {
    position: new Point(-1.95, 0.05),
    sideLength: 1.2,
    width,
    labelOffset: -0.8,
  };
  layout.circleA = {
    position: new Point(0, 0.05),
    radius: 0.6,
    width,
    numSides: 100,
    labelOffset: -0.8,
  };
  layout.triangleA = {
    position: new Point(1.8, -0.15),
    sideLength: 1.39,
    width,
    labelOffset: -0.6,
  };
  layout.cross = {
    width,
    length: 1,
  };

  // //////////////////////////////////////////////////////
  //     Size
  // //////////////////////////////////////////////////////
  layout.sizePosition = new Point(0, -0.5);
  layout.mmSquare = {
    position: new Point(0, 0.3),
    sideLength: 0.25,
    width: 0.01,
    lineOffset: 0.15,
    labelOffset: 0.05,
  };
  layout.mSquare = {
    position: new Point(0, 0.3),
    sideLength: 2,
    width: 0.01,
    lineOffset: 0.2,
    labelOffset: 0.05,
  };
  layout.arrow = {
    width: 0.05,
    height: 0.05,
  };
  layout.countLength = {
    position: new Point(0, 0),
    sideLength: 0.5,
    count: 4,
    width: 0.01,
    labelOffset: 0.05,
  };

  // //////////////////////////////////////////////////////
  //     Rect Area
  // //////////////////////////////////////////////////////
  layout.rectPosition = new Point(0, -0.5);
  layout.gridRect = {
    position: new Point(0, 0),
    smallPosition: new Point(0, 0),
    spacing: 0.25,
    length: 2.5,
    height: 1.5,
  };

  layout.rect = {
    position: new Point(0, 0),
    length: 2.5,
    height: 1.5,
    width,
    labelOffset: 0.1,
  };
  layout.rectSimpleEqnPosition = new Point(0, 1.2);
  layout.rectNumSquaresEqnPosition = new Point(0, 1.2);
  layout.rectEqnPosition = new Point(-0.2, 1.35);
  layout.rectEqnNavPosition = new Point(0.2, -0.25);
  layout.rectSimpleAreaEqnPosition = new Point(0, 1.2);
  layout.rectSquareEqnPosition = new Point(0, 1.2);
  return layout;
}
