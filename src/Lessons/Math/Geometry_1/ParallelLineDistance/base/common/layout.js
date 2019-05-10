// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

// const {
//   Point,
//   Transform,
//   Line,
// } = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'distance',
  'angles',
  'disabled',
  'points',
  'rectangle',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const leftX = -1;
  const rightX = 1;
  const bottomY = -1.2;
  const topY = 0.5;

  const line = (name, y) => ({
    name,
    method: 'line',
    options: {
      width: 0.03,
      color: colors.lines,
      vertexSpaceStart: 'center',
      length: 4,
      position: [0, y],
    },
  });
  const topLine = line('topLine', topY);
  const bottomLine = line('bottomLine', bottomY);

  const distanceLine = (name, x) => ({
    name,
    method: 'line',
    options: {
      width: 0.01,
      color: colors.distance,
      angle: -Math.PI / 2,
      vertexSpaceStart: 'start',
      length: topY - bottomY,
      position: [x, topY],
    },
  });

  const leftLine = distanceLine('leftLine', leftX);
  const rightLine = distanceLine('rightLine', rightX);
  const middleLine = distanceLine('middleLine', 0);

  const angle = (name, x, y, rotation) => ({
    name,
    method: 'angle',
    options: {
      color: colors.angles,
      autoRightAngle: true,
      angle: Math.PI / 2,
      rotation,
      curve: {
        width: 0.01,
        radius: 0.2,
      },
      position: [x, y],
    },
  });

  const bottomLeftAngle = angle('bottomLeftAngle', leftX, bottomY, 0);
  const topLeftAngle = angle('topLeftAngle', leftX, topY, Math.PI / 2 * 3);
  const bottomRightAngle = angle('bottomRightAngle', rightX, bottomY, 0);
  const topRightAngle = angle('topRightAngle', rightX, topY, Math.PI / 2 * 3);
  const bottomRightAngleInside = angle('bottomRightAngleInside', rightX, bottomY, Math.PI / 2);
  const topRightAngleInside = angle('topRightAngleInside', rightX, topY, Math.PI);
  const bottomMiddleAngle = angle('bottomMiddleAngle', 0, bottomY, 0);
  const topMiddleAngle = angle('topMiddleAngle', 0, topY, Math.PI / 2 * 3);

  const point = {
    name: 'point',
    method: 'polygon',
    options: {
      sides: 100,
      color: colors.points,
      radius: 0.05,
      fill: true,
      position: [leftX, topY],
    },
    mods: {
      scenarios: {
        left: { position: [leftX, topY] },
        right: { position: [rightX, topY] },
      },
    },
  };

  const rectangle = {
    name: 'rectangle',
    method: 'polyLine',
    options: {
      points: [
        [leftX, bottomY],
        [leftX, topY],
        [rightX, topY],
        [rightX, bottomY],
      ],
      close: true,
      width: 0.02,
      color: colors.rectangle,
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      bottomRightAngleInside,
      topRightAngleInside,
      topLeftAngle,
      bottomLeftAngle,
      bottomRightAngle,
      bottomMiddleAngle,
      topMiddleAngle,
      topRightAngle,
      leftLine,
      rightLine,
      middleLine,
      topLine,
      bottomLine,
      point,
      rectangle,
    ],
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
