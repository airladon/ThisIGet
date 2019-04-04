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
  'angleA',
  'angleB',
  'angleC',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  const radius = 1.4;
  const width = 0.03;

  const line = {
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.lines,
      move: {
        type: 'rotation',
        middleLengthPercent: 0,
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
    },
  };

  const angle = {
    method: 'angle',
    options: {
      curve: {
        width,
        sides: 400,
        radius: radius / 4,
      },
      label: {
        radius: radius / 4,
        autoHide: 0.2,
      },
    },
  };

  layout.line1 = joinObjects({}, line, { name: 'line1' });
  layout.line2 = joinObjects({}, line, { name: 'line2', options: { length: radius * 1 } });
  layout.line3 = joinObjects({}, line, { name: 'line3' });
  layout.angleA = joinObjects({}, angle, {
    name: 'angleA',
    options: { label: { text: 'a' }, color: colors.angleA },
  });
  layout.angleB = joinObjects({}, angle, {
    name: 'angleB',
    options: { label: { text: 'b' }, color: colors.angleB },
  });
  layout.angleC = joinObjects({}, angle, {
    name: 'angleC',
    options: {
      curve: {
        radius: radius * 0.8,
      },
      label: {
        text: 'c',
        radius: radius * 0.7,
        autoHide: 0.1,
      },
      color: colors.angleC,
    },
  });

  layout.fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      layout.angleA,
      layout.angleB,
      
      
      layout.line1,
      layout.line2,
      layout.angleC,
      layout.line3,
    ],
    mods: {
      scenarios: {
        center: { position: new Point(0, -0.3), scale: 1 },
      },
    },
  };

  layout.addElements = [
    layout.fig,
  ];
  return layout;
}
