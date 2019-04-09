// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'angle1',
  'angle2',
  'angle3',
  'angle4',
  'disabled',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.length = 2.5;
  layout.width = 0.03;
  layout.angleRadius = 0.4;

  layout.line = {
    method: 'line',
    options: {
      length: layout.length,
      width: layout.width,
      color: colors.lines,
      vertexSpaceStart: 'center',
      move: {
        type: 'rotation',
      },
    },
    mods: {
      isInteractive: true,
      interactiveLocation: new Point(layout.length / 3 * 0.8, 0),
    },
  };

  layout.angle = {
    method: 'angle',
    options: {
      curve: {
        width: layout.width / 3 * 2,
        sides: 400,
        radius: layout.angleRadius,
      },
      label: {
        text: '',
        radius: layout.angleRadius * 1.05,
        autoHide: 0.2,
      },
    },
  };

  layout.oppositeLine1 = joinObjects({}, layout.line, { name: 'line1' });
  layout.oppositeLine2 = joinObjects({}, layout.line, {
    name: 'line2',
    // mods: { scenarios: { center: { rotation: 1 } } },
  });
  layout.oppositeAngle1 = joinObjects({}, layout.angle, {
    name: 'angle1',
    options: { color: colors.angle1 },
  });
  layout.oppositeAngle2 = joinObjects({}, layout.angle, {
    name: 'angle2',
    options: { color: colors.angle2 },
  });
  layout.oppositeAngle3 = joinObjects({}, layout.angle, {
    name: 'angle3',
    options: { color: colors.angle3 },
  });
  layout.oppositeAngle4 = joinObjects({}, layout.angle, {
    name: 'angle4',
    options: { color: colors.angle4 },
  });

  layout.oppositeEqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      elements: {
        a: { color: colors.angle1 },
        b: { color: colors.angle2 },
        c: { color: colors.angle3 },
        d: { color: colors.angle4 },
        equals: { text: ' = ' },
        plus: { text: ' + ' },
        minus: { text: ' – ' },
        _180: { text: '180º' },
      },
      defaultFormAlignment: {
        alignV: 'baseline',
        alignH: 'center',
        fixTo: 'equals',
      },
      scale: 1.1,
      forms: {
        'b': ['b', 'equals', '_180', 'minus', 'a'],
        'd': ['d', 'equals', '_180', 'minus', 'a'],
      },
    },
    mods: {
      scenarios: {
        top: { position: [-0.3, 1.2], scale: 1 },
      },
    },
  };

  layout.oppositeFig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      layout.oppositeAngle1,
      layout.oppositeAngle2,
      layout.oppositeAngle3,
      layout.oppositeAngle4,
      layout.oppositeLine1,
      layout.oppositeLine2,
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2], scale: 1 },
      },
    },
  };

  layout.addElements = [
    layout.oppositeFig,
    layout.oppositeEqn,
  ];
  return layout;
}
