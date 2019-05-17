// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import './style.scss';

// const {
//   Point,
//   Transform,
//   Line,
// } = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrParallelLineDistance_lines',
  'qrParallelLineDistance_distance',
  'qrParallelLineDistance_angles',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const bottomY = -1;
  const topY = 0.5;

  const line = (name, y) => ({
    name,
    method: 'line',
    options: {
      width: 0.03,
      color: colors.qrParallelLineDistance_lines,
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
      color: colors.qrParallelLineDistance_distance,
      angle: -Math.PI / 2,
      vertexSpaceStart: 'start',
      length: topY - bottomY,
      position: [x, topY],
    },
  });
  const middleLine = distanceLine('middleLine', 0);

  const angle = (name, x, y, rotation) => ({
    name,
    method: 'angle',
    options: {
      color: colors.qrParallelLineDistance_angles,
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

  const bottomMiddleAngle = angle('bottomMiddleAngle', 0, bottomY, 0);
  const topMiddleAngle = angle('topMiddleAngle', 0, topY, Math.PI / 2 * 3);

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      bottomMiddleAngle,
      topMiddleAngle,
      middleLine,
      topLine,
      bottomLine,
    ],
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
