// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point, Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'notParallel',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.length = 1.5;
  layout.width = 0.03;
  layout.scale = {
    long: 2.55,
    short: 0.5,
  };
  layout.line = {
    method: 'line',
    options: {
      length: layout.length,
      width: layout.width,
      color: colors.lines,
      vertexSpaceStart: 'center',
      move: {
        type: 'centerTranslateEndRotation',
        middleLengthPercent: 0.5,
        translationBounds: new Rect(-3, -1.6, 6, 2.55),
      },
    },
    mods: {
      scenarios: {
        center: { position: new Point(0, 0.4), rotation: 0, scale: 1 },
      },
      _line: {
        isInteractive: true,
        interactiveLocation: new Point(layout.length / 3 * 0.8, 0),
      },
      _midLine: {
        isInteractive: true,
      },
    },
  };
  layout.line1 = joinObjects({}, layout.line, {
    name: 'line1',
  });
  layout.line2 = joinObjects({}, layout.line, {
    name: 'line2',
    mods: {
      scenarios: {
        center: { position: new Point(0, -0.4) },
      },
    },
  });
  layout.addElements = [
    layout.line1,
    layout.line2,
  ];
  return layout;
}
