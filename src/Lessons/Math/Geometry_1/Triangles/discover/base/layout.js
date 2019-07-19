// @flow
// import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

// const {
//   Point,
//   // Rect,
//   // Transform,
//   // Line,
// } = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'angles',
  'pads',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  const { colors } = layout;
  layout.width = 0.03;

  layout.defaultTri = [
    [2, -1.1],
    [-2, -1.1],
    [-1, 0.7],
  ];
  layout.triangle = {
    name: 'triangle',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
      pad: {
        color: [1, 1, 1, 0.01],
        radius: 0.3,
        sides: 30,
        fill: true,
        isMovable: true,
        touchRadius: 0.4,
        boundary: [-2.8, -1.5, 5.6, 2.8],
      },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        label: {
          radius: 0.31,
        },
        autoRightAngle: false,
      },
      side: {
        label: {
          offset: 0.1,
          precision: 2,
        },
      },
    },
  };

  layout.total = {
    name: 'total',
    method: 'text',
    options: {
      position: [-1.2, -1.7],
      // alignH: 'left',
      hAlign: 'left',
      size: 0.17,
      color: colors.angles,
      text: 'Total Angle = ',
    },
  };

  layout.addElements = [
    layout.triangle,
    layout.total,
  ];
  return layout;
}
