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
  const radius = 1.2;
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

  layout.radians = joinObjects(marks(Math.PI * 2), { name: 'radians' });
  layout.degrees = {
    name: 'degrees',
    method: 'collection',
    addElements: [
      marks(360, radius * 1.05),
      marks(36, radius * 1.025),
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
      // radianLine(6, 13),
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
          color: colors.radianLines,
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
          color: colors.radianLines,
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
          size: 0.14,
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
          size: 0.14,
        },
      },
    ],
    mods: {
      scenarios: {
        topLeft: { position: new Point(-1.7, 1.5) },
        bottomRight: { position: new Point(1.7, -1.3) },
        bottomLeft: { position: new Point(-1.2, -1.2) },
        bottom: { position: new Point(-0.2, -1.5) },
        bottomSlightRight: { position: new Point(0.1, -1.5) },
      },
    },
  };

  layout.circle = {
    name: 'circle',
    method: 'collection',
    addElements: [
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
        'right': { position: new Point(1, -0.3) },
      },
    },
    scenario: 'center',
  };

  // ///////////////////////////////////////////////////////
  // Equation
  // ///////////////////////////////////////////////////////
  const mods = (direction, mag) => ({
    animations: {
      options: {
        translation: {
          style: 'curved',
          magnitude: mag,
          direction: direction,
        },
      },
    },
  });
  layout.equation = {
    name: 'equation',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        arc: { text: 'arc length', color: colors.arc },
        _arc: { text: 'arc length', color: colors.arc, mods: mods('up', 0.4)},
        radius: { text: 'radius', color: colors.lines },
        _radius: { text: 'radius', color: colors.lines, mods: mods('down', 0.7) },
        angle: { text: 'angle', color: colors.angles },
        _angle: { text: 'angle', color: colors.angles, mods: mods('down', 0.4) },
        radiusLength1: { text: 'radius length', color: colors.radianLines },
        radiusLengths2: { text: 'radius lengths', color: colors.radianLines },
        radiusLengths3: { text: 'radius lengths', color: colors.radianLines },
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
        _1: { text: ' 1 ', color: colors.angles },
        _2: { text: ' 2 ', color: colors.angles },
        _3: { text: ' 3 ', color: colors.angles },
        x: `  ${String.fromCharCode(215)}  `,
        equals: '  =  ',
        v: { symbol: 'vinculum' },
        largeBrace: {
          symbol: 'brace', side: 'top', numLines: 6, color: colors.marks,
        },
        smallBrace: {
          symbol: 'brace', side: 'top', numLines: 1, color: colors.marks,
        },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        alignH: 'right',
        alignV: 'top',
      },
      forms: {
        'arc': ['_arc', 'equals', '_angle', 'x', '_radius'],
        // 'radius': [{ frac: ['_arc', '_angle', 'v'] }, 'equals', '_radius'],
        // 'angle': [{ frac: ['_arc', '_radius', 'v'] }, 'equals', '_angle'],
        'radius': ['_radius', 'equals', { frac: ['_arc', '_angle', 'v'] }],
        'angle': ['_angle', 'equals', { frac: ['_arc', '_radius', 'v'] }],
        '1rad': ['arc', 'equals', '_1',  '   ', 'radiusLength1'],
        '2rad': ['arc', 'equals', '_2',  '   ', 'radiusLengths2'],
        '3rad': ['arc', 'equals', '_3', '   ', 'radiusLengths3'],
        '3rad1': [
          'arc',
          'equals',
          {
            topComment: {
              content: '_3',
              comment: 'angle',
              symbol: 'smallBrace',
              contentSpace: 0.04,
              includeInSize: false,
            },
          },
          '   ',
          {
            topComment: ['radiusLengths3', 'radius', 'largeBrace'],
          },
        ],
        'general': ['arc', 'equals', 'angle', 'x', 'radius'],
      },
      formSeries: ['arc', 'radius', 'angle'],
    },
    mods: {
      scenarios: {
        lowerLeft: { position: new Point(-1, -1) },
        top: { position: new Point(0, 1.3) },
        center: { position: new Point(0 ,0) },
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
