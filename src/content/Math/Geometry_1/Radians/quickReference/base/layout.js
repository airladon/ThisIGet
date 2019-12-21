// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;
const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrRadians_lines = colors.get('blue').rgb;
  colors.qrRadians_angles = colors.get('green').rgb;
  colors.qrRadians_arc = colors.get('red').rgb;
  colors.qrRadians_marks = colors.get('grey', 'dark').rgb;
  colors.qrRadians_radianLines = colors.get('yellow').rgb;
  colors.qrRadians_degrees = colors.get('blue', 'lighter').rgb;
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
      color: colors.qrRadians_lines,
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
      color: colors.qrRadians_lines,
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
      color: colors.qrRadians_angles,
    },
  };
  layout.arc = {
    name: 'arc',
    method: 'polygon',
    options: {
      width,
      radius,
      color: colors.qrRadians_arc,
      sides: 400,
    },
  };

  const marks = (numMarks: number, inner: number = radius) => ({
    name: `marks${numMarks}`,
    method: 'radialLines',
    options: {
      innerRadius: inner,
      outerRadius: radius * 1.1,
      color: colors.qrRadians_marks,
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
      width: width / 2,
      radius: radius + width,
      sides: 314,
      sidesToDraw: sides,
      rotation: rotation + 1 / 314,
      color: colors.qrRadians_radianLines,
    },
  });
  layout.radianLines = {
    name: 'radianLines',
    method: 'collection',
    addElements: [
      radianLine(0),
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
          color: colors.qrRadians_radianLines,
          width: width / 2,
          position: new Point(0, -width / 4),
        },
      },
      {
        name: 'arc',
        method: 'polygon',
        options: {
          width: width / 2,
          radius: radius + width,
          sides: 314 * 4,
          sidesToDraw: 50 * 4,
          rotation: 3 * Math.PI / 2,
          center: [0, radius + width - width / 2],
          color: colors.qrRadians_radianLines,
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
          color: colors.qrRadians_angles,
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
          color: colors.qrRadians_angles,
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
        bottomRight: { position: new Point(0.2, -1.5) },
        bottomLeft: { position: new Point(-1.2, -1.2) },
        bottom: { position: new Point(-0.2, -1.5) },
        summary: { position: new Point(-0.2, -1.5) },
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
        'center': { position: new Point(0, -0.3), scale: 1 },
        'centerSmaller': { position: new Point(0, -0.3), scale: 0.9 },
        'centerSmall': { position: new Point(0, -0.3), scale: 0.8 },
        'bottom': { position: new Point(0, -0.4), scale: 1 },
        'right': { position: new Point(1.2, -0.1), scale: 0.9 },
        'top': { position: new Point(0, 0.1), scale: 0.8 },
        'summary': { position: new Point(1.5, 0.1 ), scale: 0.9 },
        'qr': { position: new Point(0, 0 ), scale: 1 },
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
          direction,
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
        arc: { text: 'arc length', color: colors.qrRadians_arc },
        _arc: { text: 'arc length', color: colors.qrRadians_arc, mods: mods('up', 0.4) },
        radius: { text: 'radius', color: colors.qrRadians_lines },
        _radius: { text: 'radius', color: colors.qrRadians_lines, mods: mods('down', 0.7) },
        angle: { text: 'angle', color: colors.qrRadians_angles },
        _angle: { text: 'angle', color: colors.qrRadians_angles, mods: mods('down', 0.4) },
        radiusLength1: { text: 'radius length', color: colors.qrRadians_radianLines },
        radiusLengths2: { text: 'radius lengths', color: colors.qrRadians_radianLines },
        radiusLengths3: { text: 'radius lengths', color: colors.qrRadians_radianLines },
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
        _1: { text: ' 1 ', color: colors.qrRadians_angles },
        _2: { text: ' 2 ', color: colors.qrRadians_angles },
        _3: { text: ' 3 ', color: colors.qrRadians_angles },
        x: `  ${String.fromCharCode(215)}  `,
        equals: '  =  ',
        v: { symbol: 'vinculum' },
        largeBrace: {
          symbol: 'brace', side: 'top', color: colors.qrRadians_marks,
        },
        smallBrace: {
          symbol: 'brace', side: 'top', color: colors.qrRadians_marks,
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
        'radius': ['_radius', 'equals', { frac: ['_arc', 'v', '_angle'] }],
        'angle': ['_angle', 'equals', { frac: ['_arc', 'v', '_radius'] }],
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
              inSize: false,
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
        lowerLeft: { position: new Point(-1, -1), scale: 1 },
        top: { position: new Point(0, 1.3), scale: 1 },
        center: { position: new Point(0 ,0), scale: 1.3 },
        // summary: { position: new Point(0, 0), scale: 1 },
        'qr': { position: new Point(0, -1.8 ), scale: 1.2 },
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
