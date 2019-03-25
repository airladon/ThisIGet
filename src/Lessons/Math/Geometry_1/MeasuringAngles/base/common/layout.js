// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const cssColorNames = [
  'lines', 'angles', 'arc', 'marks', 'radianLines',
];

const { joinObjects } = Fig.tools.misc;
const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  layout.position = new Point(0, 0);
  const radius = 1.4;
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
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
      scenarios: {
        start: { rotation: 1 },
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
      color: colors.lines,
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
      color: colors.angles,
    },
  };
  layout.arc = {
    name: 'arc',
    method: 'polygon',
    options: {
      width,
      radius,
      color: colors.arc,
      sides: 400,
    },
  };

  const marks = (numMarks: number, inner: number = radius) => ({
    name: `marks${numMarks}`,
    method: 'radialLines',
    options: {
      innerRadius: inner,
      outerRadius: radius * 1.1,
      color: colors.marks,
      width: width / 2,
      dAngle: Math.PI * 2 / numMarks,
    },
  });
  layout.marks12 = marks(12);
  layout.marks20 = marks(20);
  layout.marks50 = marks(50);
  layout.marks100 = marks(100);
  layout.radians = joinObjects(marks(Math.PI * 2), { name: 'radians' });
  layout.degrees = {
    name: 'degrees',
    method: 'collection',
    addElements: [
      marks(360, radius * 1.05),
      marks(36),
    ],
  };

  const radianLine = (rotation: number, sides: number = 49) => ({
    name: `line${round(rotation, 0)}`,
    method: 'polygon',
    options: {
      width,
      radius: radius + width,
      sides: 314,
      sidesToDraw: sides,
      rotation: rotation + 1 / 314,
      color: colors.radianLines,
    },
  });
  layout.radianLines = {
    name: 'radianLines',
    method: 'collection',
    addElements: [
      radianLine(0),
      radianLine(1),
      radianLine(2),
      radianLine(3),
      radianLine(4),
      radianLine(5),
      radianLine(6, 13),
    ],
  };

  layout.bendLine = {
    name: 'bendLine',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'line',
        options: {
          length: radius,
          color: colors.angles,
          width,
        },
      },
      {
        name: 'arc',
        method: 'polygon',
        options: {
          width,
          radius: radius + width,
          sides: 314 * 4,
          sidesToDraw: 50 * 4,
          rotation: 3 * Math.PI / 2,
          center: [0, radius + width - width / 2],
          color: colors.angles,
        },
      },
    ],
  };

  layout.angleText = {
    name: 'angleText',
    method: 'collection',
    addElements: [
      {
        name: 'label',
        method: 'text',
        options: {
          text: 'Angle:',
          color: colors.angles,
          // style: 'normal',
          weight: 700,
          family: 'Helvetica',
          position: [-0.1, 0],
          hAlign: 'right',
          size: 0.17,
        },
        mods: {
          interactiveLocation: new Point(-0.05, 0.06),
        },
      },
      {
        name: 'value',
        method: 'text',
        options: {
          color: colors.lines,
          weight: 500,
          family: 'Helvetica',
          hAlign: 'left',
          size: 0.17,
        },
      },
    ],
    mods: {
      scenarios: {
        topLeft: { position: new Point(-1.7, 1.5) },
        bottomRight: { position: new Point(1.7, -1.3) },
      },
    },
  };

  layout.circle = {
    name: 'circle',
    method: 'collection',
    addElements: [
      layout.marks12,
      layout.marks20,
      layout.marks50,
      layout.marks100,
      layout.degrees,
      layout.radians,
      layout.radianLines,
      layout.angle,
      layout.arc,
      layout.line2,
      layout.line1,
      layout.angleText,
      layout.bendLine,
    ],
    mods: {
      scenarios: {
        'center': { position: new Point(0, -0.3) },
      },
    },
    scenario: 'center',
  };

  // ///////////////////////////////////////////////////////
  // Equation
  // ///////////////////////////////////////////////////////
  layout.equation = {
    name: 'equation',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        arc: {
          text: 'arc length',
          color: colors.arc,
          elementOptions: {
            isTouchable: true,
          },
        },
        radius: {
          text: 'radius',
          color: colors.lines,
          elementOptions: {
            isTouchable: true,
          },
        },
        _2p: {
          text: '2π',
          elementOptions: {
            animations: {
              options: {
                translation: {
                  style: 'curved',
                  magnitude: 0.6,
                  direction: 'down',
                },
              },
            },
          },
        },
        x: ` ${String.fromCharCode(215)} `,
        equals: ' = ',
        v: { symbol: 'vinculum' },
      },
      forms: {
        'arc': ['arc', 'equals', '_2p', 'x', 'radius'],
        'radius': [{ frac: ['arc', '_2p', 'v'] }, 'equals', 'radius'],
      },
      formSeries: ['arc', 'radius'],
    },
    mods: {
      scenarios: {
        lowerLeft: { position: new Point(-1, -1) },
      },
    },
    scenario: 'lowerLeft',
  };
  layout.addElements = [
    layout.circle,
    layout.equation,
  ];
  return layout;
}
