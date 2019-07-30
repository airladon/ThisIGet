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
  'parallel',
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
      // makeConsistent: 'triangle',
      makeValid: {
        shape: 'triangle',
        hide: {
          minAngle: 15 * Math.PI / 180,
          maxAngle: 150 * Math.PI / 180,
          minSide: 0.8,
        },
      },
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
          // autoHideMin: Math.PI / 10,
          // autoHideMax: Math.PI * 0.9,
        },
        label: {
          radius: 0.31,
          precision: 0,
          // autoHide: Math.PI / 10,
          // autoHideMax: Math.PI * 0.9,
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
    mods: {
      scenarios: {
        right: { position: [1.5, 0], scale: 0.7 },
        default: { position: [0, 0], scale: 1 },
      },
    },
  };

  layout.fixed = {
    name: 'fixed',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.lines,
      width: layout.width,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        label: {
          text: ['b', 'a', 'c'],
          radius: 0.31,
          scale: 1,
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

  layout.parallelLine = {
    name: 'line',
    method: 'line',
    options: {
      p1: [-2, layout.defaultTri[2][1] + 0.02],
      p2: [2, layout.defaultTri[2][1] + 0.02],
      color: colors.parallel,
      width: 0.015,
    },
  };

  layout.addElements = [
    layout.parallelLine,
    layout.triangle,
    layout.total,
    layout.fixed,
  ];
  return layout;
}
