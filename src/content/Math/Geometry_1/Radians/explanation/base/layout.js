// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

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
  colors.lines = colors.get('blue').rgb;
  colors.angles = colors.get('green').rgb;
  colors.arc = colors.get('red').rgb;
  colors.marks = colors.get('grey', 'dark').rgb;
  colors.radianLines = colors.get('yellow').rgb;
  colors.degrees = colors.get('blue', 'lighter').rgb;
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
          xAlign: 'right',
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
          color: colors.angles,
          weight: 500,
          family: 'Helvetica',
          xAlign: 'left',
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
        arc: { text: 'arc length', color: colors.arc },
        _arc: { text: 'arc length', color: colors.arc, mods: mods('up', 0.4) },
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
          symbol: 'brace',
          side: 'top',
          color: colors.marks,
          lineWidth: 0.012,
          width: 0.05,
        },
        smallBrace: {
          symbol: 'brace', side: 'top', color: colors.marks, lineWidth: 0.012, width: 0.05,
        },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'top',
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
            topComment: ['radiusLengths3', 'radius', 'largeBrace', 0.04, 0.06],
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

  layout.circumferenceEqn = {
    name: 'circumferenceEqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        radius: { text: 'radius', color: colors.lines },
        circumference: { text: 'circumference', color: colors.arc },
        x: `  ${String.fromCharCode(215)}  `,
        _2pi: { text: '2π', color: colors.angles },
        equals: '  =  ',
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'top',
      },
      forms: {
        '0': ['circumference', 'equals', '_2pi', 'x', 'radius'],
      },
    },
    mods: {
      scenarios: {
        center: { position: new Point(0 , 0), scale: 1.3 },
        bottom: { position: new Point(0.2 , -1.2), scale: 1 },
      },
    },
  };


  layout.arcEqn = {
    name: 'arcEqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        radius: { text: 'radius', color: colors.lines },
        arc: { text: 'arc length', color: colors.arc },
        circumference: { text: 'of circumference', color: colors.arc },
        x: `  ${String.fromCharCode(215)}  `,
        _2pi: { text: '2π', color: colors.angles },
        angle: { text: 'angle', color: colors.angles },
        equals: '  =  ',
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'top',
      },
      forms: {
        '0': ['arc', 'equals', 'angle', 'x', 'radius'],
        '1': [
          {
            annotate: {
              content: 'arc',
              annotation: {
                content: 'circumference',
                xPosition: 'center',
                yPosition: 'bottom',
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.5,
              },
            },
          },
          'equals',
          {
            annotate: {
              content: 'angle',
              annotation: {
                content: '_2pi',
                xPosition: 'center',
                yPosition:  1.5,
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.6,
              },
            },
          },
          'x', 'radius',
        ],
        '2': [
          {
            annotate: {
              content: 'arc',
              annotation: {
                content: 'circumference',
                xPosition: 'center',
                yPosition:  'bottom',
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.5,
              },
            },
          },
          'equals',
          {
            annotate: {
              content: '_2pi',
              annotation: {
                content: 'angle',
                xPosition: 'center',
                yPosition: -0.3,
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.5,
              },
            },
          },
          'x', 'radius',
        ],
      },
      formSeries: ['0', '1', '2'],
    },

    mods: {
      scenarios: {
        center: { position: new Point(0, 0), scale: 1.3 },
        bottom: { position: new Point(0, -1.6), scale: 0.9 },
      },
    },
  };

  layout.arcEqnNav = {
    name: 'arcEqnNav',
    method: 'addNavigator',
    options: {
      equation: layout.arcEqn,
      type: 'equationOnly',
    },

    mods: {
      scenarios: {
        center: { position: new Point(0, 0), scale: 1.3 },
        bottom: { position: new Point(0, -1.6), scale: 0.9 },
      },
    },
  };

  layout.radDegEqn = {
    name: 'radDegEqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        circle: { text: 'of a circle', color: colors.diagram.text.base },
        angle: { text: 'angle', color: colors.diagram.text.base },
        _angle: { text: 'angle', color: colors.diagram.text.base },
        equals: '  =  ',
        _equals: '  =  ',
        _2pi: { text: '2π', color: colors.radianLines },
        x: `  ${String.fromCharCode(215)}  `,
        _pi: { text: 'π', color: colors.arc },
        _360: { text: '360', color: colors.degrees },
        deg: { text: 'º', color: colors.degrees },
        _180: { text: '180', color: colors.arc },
        _radians: { text: 'radians', color: colors.radianLines },
        question: { text: '?', color: colors.arc },
        v: { symbol: 'vinculum', color: colors.arc },
        degrees: { text: 'degrees', color: colors.degrees },
        radians: { text: 'radians', color: colors.radianLines },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'baseline',
      },
      forms: {
        '0': [
          {
            annotate: {
              content: 'angle',
              annotation: {
                content: 'circle',
                xPosition: 'center',
                yPosition: 'bottom',
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.5,
              },
            },
          },
          '_equals',
          '_360', 'deg',
          'equals',
          '_2pi', '  ', '_radians',
        ],
        '1': ['question', 'x' , '_360', 'equals', '_2pi'],
        '2': [
          {
            frac: ['question', 'v', '_180'],
          }, 'x', '_360',
          'equals',
          '_2pi',
        ],
        '3': [
          {
            frac: ['_pi', 'v', '_180'],
          }, 'x', '_360',
          'equals',
          '_2pi',
        ],
        '4': [
          {
            frac: ['_pi', 'v', '_180'],
          }, 'x',
          {
            annotate: {
              content: '_360',
              annotation: {
                content: 'degrees',
                xPosition: 'center',
                yPosition: -0.2,
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.5,
              },
              inSize: false,
            },
          },
          'equals',
          {
            annotate: {
              content: '_2pi',
              annotation: {
                content: 'radians',
                xPosition: 'center',
                yPosition: -0.2,
                xAlign: 'center',
                yAlign: 'top',
                scale: 0.5,
              },
              inSize: false,
            },
          },
        ],
        '5': [
          {
            frac: ['_pi', 'v', '_180'],
          }, 'x',
          'degrees',
          'equals', 'radians',
        ],
        '6': [
          'radians', 'equals',
          'degrees',
          'x',
          {
            frac: ['_pi', 'v', '_180'],
          },
        ],
      },
      formSeries: ['0', '1', '2', '3', '4', '5'],
    },

    mods: {
      scenarios: {
        center: { position: new Point(0.5, 0), scale: 1.3 },
        // summary: { position: new Point(-0.8, 0.9), scale: 1.3 },
      },
    },
  };

  layout.radDegEqnNav = {
    name: 'radDeg',
    method: 'addNavigator',
    options: {
      equation: layout.radDegEqn,
      type: 'equationOnly',
    },

    mods: {
      scenarios: {
        center: { position: new Point(0.5, 0), scale: 1.3 },
        // summary: { position: new Point(-0.8, 0.9), scale: 1.3 },
      },
    },
  };

  layout.degRadEqn = {
    name: 'degRadEqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        equals: '  =  ',
        x: `  ${String.fromCharCode(215)}  `,
        _pi: { text: 'π', color: colors.arc },
        _180: { text: '180', color: colors.arc },
        v: { symbol: 'vinculum', color: colors.arc },
        degrees: { text: 'degrees', color: colors.degrees },
        radians: { text: 'radians', color: colors.radianLines },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'baseline',
      },
      forms: {
        '0': [
          'degrees', 'equals',
          'radians', 'x',
          {
            frac: ['_180', 'v', '_pi'],
          },
        ],
      },
      formSeries: ['0'],
    },

    mods: {
      scenarios: {
        center: { position: new Point(-0.4, -0.8), scale: 1.3 },
        // summary: { position: new Point(-0.8, -1.2), scale: 1.3 },
      },
    },
  };

  layout.addElements = [
    layout.circle,
    layout.equation,
    layout.circumferenceEqn,
    // layout.arcEqn,
    layout.arcEqnNav,
    layout.radDegEqnNav,
    layout.degRadEqn,
  ];
  return layout;
}
