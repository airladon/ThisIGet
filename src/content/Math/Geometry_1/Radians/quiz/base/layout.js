// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const cssColorNames = [
//   'lines', 'angles', 'arc', 'marks', 'radianLines',
// ];

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.lines = colors.get('blue').rgb;
  colors.angles = colors.get('green').rgb;
  colors.arc = colors.get('red').rgb;
  colors.marks = colors.get('grey', 'dark').rgb;
  colors.radianLines = colors.get('yellow').rgb;
  layout.position = new Point(0, 0);
  const radius = 1;
  layout.radius = radius;
  const width = 0.03;
  layout.width = width;

  layout.line1 = {
    name: 'line1',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.lines,
      move: {
        type: 'rotation',
        middleLengthPercent: 0,
      },
      label: {
        text: '',
        offset: 0.05,
        // precision: 2,
        location: 'outside',
        orientation: 'horizontal',
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
      scenarios: {
        start: { rotation: 1.3 },
      },
    },
    scenario: 'start',
  };
  layout.line2 = {
    name: 'line2',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.marks,
    },
  };
  layout.angle = {
    name: 'angle',
    method: 'angle',
    options: {
      curve: {
        width,
        sides: 400,
        radius: radius / 4,
      },
      label: {
        text: '',
        units: 'radians',
        precision: 2,
      },
      color: colors.angles,
    },
  };
  layout.arc = {
    name: 'arc',
    method: 'angle',
    options: {
      curve: {
        width,
        sides: 400,
        radius,
      },
      label: {
        text: '',
        radius: radius * 0.9,
      },
      color: colors.arc,
    },
  };

  layout.circle = {
    name: 'circle',
    method: 'collection',
    addElements: [
      layout.angle,
      layout.arc,
      layout.line2,
      layout.line1,
    ],
    mods: {
      scenarios: {
        'center': { position: new Point(0, 0) },
      },
    },
    scenario: 'center',
  };

  layout.question = {
    name: 'question',
    method: 'text',
    options: {
      size: 0.2,
      style: 'normal',
      family: 'helvetica',
      hAlign: 'left',
      vAlign: 'baseline',
      text: '',
      color: colors.diagram.text.base,
      position: new Point(-2, 1.5),
    },
  };

  layout.addElements = [
    layout.circle,
    layout.question,
  ];
  return layout;
}
