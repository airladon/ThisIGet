// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import './style.scss';

const {
  Point, Rect,
  Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrParallelLines_lines',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.length = 2.5;
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
      color: colors.qrParallelLines_lines,
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

  const size = 0.08;
  const marking = name => ({
    name,
    method: 'polyLine',
    options: {
      points: [[-size, size], [0, 0], [-size, -size]],
      color: colors.qrParallelLines_lines,
    },
  });
  const lineWithMark = (name, position, angle) => ({
    name,
    method: 'collection',
    addElements: [
      joinObjects({}, layout.line, { name: 'line' }),
      marking('mark'),
    ],
    options: {
      transform: new Transform().translate(position).rotate(angle),
    },
  });
  layout.perpendicularMarkings = {
    name: 'markings',
    method: 'collection',
    addElements: [
      lineWithMark('l1', new Point(-1.2, 0), 0),
      lineWithMark('l2', new Point(-1.2, -1), 0),
    ],
  };
  layout.addElements = [
    layout.line1,
    layout.line2,
    layout.perpendicularMarkings,
  ];
  return layout;
}
