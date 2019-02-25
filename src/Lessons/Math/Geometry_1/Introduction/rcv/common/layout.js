// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const cssColorNames = [
  'graph',
  'summer',
  'spring',
  'winter',
  'autumn',
];
/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  const colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.colors = colors;

  const plotWidth = 2.5;
  const axisWidth = 0.015;
  const barWidth = 0.3;
  const plotHeight = 2.5;
  const plotStart = new Point(-2, -1.7);
  layout.plotHeight = plotHeight;
  layout.plotStart = plotStart;
  layout.barWidth = barWidth;
  layout.barSeparation = 0.4;
  layout.barVerticalSeparation = 0.005;
  // const candidateWidth = 0.2;
  // const step = 0.4;

  layout.zero = {
    name: 'zeroLine',
    method: 'line',
    options: {
      color: colors.graph,
      length: plotWidth,
      position: plotStart,
      width: axisWidth,
      label: {
        text: '0',
        location: 'end1',
        offset: 0.1,
      },
    },
  };

  layout.halfLine = {
    name: 'halfLine',
    method: 'line',
    options: {
      color: colors.graph,
      length: plotWidth,
      position: plotStart.add(0, plotHeight / 2),
      width: axisWidth,
      label: {
        text: '50',
        location: 'end1',
        offset: 0.1,
      },
    },
  };

  layout.fullLine = {
    name: 'fullLine',
    method: 'line',
    options: {
      color: colors.graph,
      length: plotWidth,
      position: plotStart.add(0, plotHeight),
      width: axisWidth,
      label: {
        text: '100',
        location: 'end1',
        offset: 0.1,
      },
    },
  };

  // layout.candidate1 = {
  //   name: 'candidate1',
  //   method: 'line',
  //   options: {
  //     color: colors.candidate1,
  //     length: 1,
  //     width: candidateWidth,
  //     angle: Math.PI / 2,
  //     position: plotStart.add(step, 0),
  //     vertexSpaceStart: 'start',
  //     label: {
  //       text: '35',
  //       color: [0, 0, 0, 1],
  //     },
  //   }
  // }

  // layout.candidate2 = {
  //   name: 'candidate2',
  //   method: 'line',
  //   options: {
  //     color: colors.candidate2,
  //     length: 1,
  //     width: candidateWidth,
  //     angle: Math.PI / 2,
  //     position: plotStart.add(step * 2, 0),
  //     vertexSpaceStart: 'start',
  //     label: {
  //       text: '35',
  //       color: [0, 0, 0, 1],
  //     },
  //   },
  // },

  // layout.candidate3 = {
  //   name: 'candidate3',
  //   method: 'line',
  //   options: {
  //     color: colors.candidate3,
  //     length: 1,
  //     width: candidateWidth,
  //     angle: Math.PI / 2,
  //     position: plotStart.add(step * 3, 0),
  //     vertexSpaceStart: 'start',
  //     label: {
  //       text: '35',
  //       color: [0, 0, 0, 1],
  //     },
  //   },
  // },

  // layout.candidate4 = {
  //   name: 'candidate4',
  //   method: 'line',
  //   options: {
  //     color: colors.candidate4,
  //     length: 1,
  //     width: candidateWidth,
  //     angle: Math.PI / 2,
  //     position: plotStart.add(step * 4, 0),
  //     vertexSpaceStart: 'start',
  //     label: {
  //       text: '35',
  //       color: [0, 0, 0, 1],
  //     },
  //   },
  // },

  layout.addElements = [
    layout.zero,
    layout.halfLine,
    layout.fullLine,
    // layout.candidate1,
    // layout.candidate2,
    // layout.candidate3,
    // layout.candidate4,
  ];

  return layout;
}
