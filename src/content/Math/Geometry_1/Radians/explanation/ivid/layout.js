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
  // colors.angleFill = colors.get('green').rgb;
  // colors.angleFill[3] = 0.8;
  colors.arc = colors.get('red').rgb;
  colors.dull = colors.get('grey', 'dark').rgb;
  colors.marks = colors.get('grey', 'dark').rgb;
  colors.radianLines = colors.get('blue').rgb;
  colors.degrees = colors.get('blue', 'lighter').rgb;
  layout.position = new Point(0, 0);
  const radius = 1.2;
  layout.radius = radius;
  const width = 0.03;
  layout.width = width;

  layout.box = {
    name: 'box',
    method: 'box',
    options: {
      lineWidth: 0.008,
      color: colors.angles,
    },
  };
  layout.circleDull = {
    name: 'circle',
    method: 'polygon',
    options: {
      color: colors.dull,
      width: width / 4,
      sides: 300,
      radius: layout.radius,
    },
  };

  layout.line1 = {
    name: 'line1',
    method: 'line',
    options: {
      length: radius,
      width,
      // widthIs: 'outside',
      color: colors.lines,
      move: {
        type: 'rotation',
        middleLengthPercent: 0,
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
      scenarios: {
        connected: { position: [0, 0], rotation: 0 },
        unconnected: { position: [-2, 0], rotation: Math.PI / 2 },
        default: { position: [0, 0] },
      },
    },
    // scenario: 'connected',
  };

  layout.corner = {
    name: 'corner',
    method: 'polyline',
    options: {
      width,
      cornerStyle: 'fill',
      color: colors.lines,
      // color: [1, 0, 1, 1],
      points: [[radius, 0], [0, 0], [radius, 0]],
    },
    mods: {
      dependantTransform: true,
    },
  };
  layout.line2 = {
    name: 'line2',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.lines,
    },
    mods: {
      scenarios: {
        connected: { position: [0, 0], rotation: 0 },
        unconnected: { position: [2, 0], rotation: Math.PI / 2 },
        default: { position: [0, 0] },
      },
    },
    // scenario: 'connected',
  };
  layout.angle = {
    name: 'angle',
    method: 'angle',
    options: {
      curve: {
        width: radius / 4,
        sides: 300,
        radius: radius / 4,
      },
      color: colors.angles,
    },
    mods: {
      dependantTransform: true,
    },
  };
  layout.arc = {
    name: 'arc',
    method: 'shapes.polygonSweep',
    options: {
      width,
      radius,
      color: colors.arc,
      sides: 400,
    },
  };

  const marks = (numMarks: number, inner: number = radius, outer: number = radius * 1.1, color: colors.marks) => ({
    name: `marks${numMarks}`,
    method: 'radialLines',
    options: {
      innerRadius: inner,
      outerRadius: outer,
      color,
      width: width / 4,
      dAngle: Math.PI * 2 / numMarks,
    },
  });

  layout.radians = joinObjects(marks(Math.PI * 2, 0, radius), { name: 'radians' });
  layout.degrees = {
    name: 'degrees',
    method: 'collection',
    addElements: [
      marks(360, radius * 1.05),
      marks(36, radius * 1.025),
    ],
  };

  layout.degreesHighlight = {
    name: 'degreesHighlight',
    method: 'collection',
    addElements: [
      marks(360, radius * 1.05, radius * 1.1, colors.angles),
      marks(36, radius * 1.025, radius * 1.1, colors.angles),
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
        method: 'shapes.polygonSweep',
        options: {
          width: width / 2,
          radius: radius + width,
          sides: 314 * 4,
          sidesToDraw: 50 * 4,
          rotation: 3 * Math.PI / 2,
          offset: [0, radius + width - width / 2],
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
          weight: 100,
          family: 'Times New Roman, Times, serif',
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
          family: 'Times New Roman, Times, serif',
          xAlign: 'left',
          size: 0.14,
        },
      },
    ],
    mods: {
      scenarios: {
        bottomDeg: { position: new Point(0.2, -1.6) },
        bottomRad: { position: new Point(-0.1, -1.6) },
        bottom: { position: new Point(0, -1.6) },
      },
    },
  };

  layout.circle = {
    name: 'circle',
    method: 'collection',
    addElements: [
      layout.circleDull,
      layout.degrees,
      layout.degreesHighlight,
      layout.radians,
      layout.radianLines,
      layout.angle,
      layout.arc,
      layout.line2,
      layout.line1,
      layout.corner,
      layout.angleText,
      layout.bendLine,
    ],
    mods: {
      scenarios: {
        'center': { position: new Point(0, 0), scale: 1 },
        'left': { position: new Point(-0.9, 0), scale: 1 },
        'centerLeft': { position: new Point(-0.6, 0), scale: 1 },
        'title': { position: new Point(-0.4, -1), scale: 0.7 },
      },
    },
    scenario: 'center',
  };

  layout.limRad = 3;
  const limAngleProportion = 20;
  const { limRad } = layout;
  const limAngle = 2 * Math.PI / limAngleProportion;
  layout.lim = {
    name: 'lim',
    method: 'collection',
    addElements: [
      {
        name: 'sin',
        method: 'line',
        options: {
          color: colors.diagram.text.base,
          p1: [limRad * Math.cos(limAngle) - 0.01, 0],
          p2: [limRad * Math.cos(limAngle) - 0.01, limRad * Math.sin(limAngle) + 0.005],
          width: 0.015,
          label: {
            text: 'sin x',
            location: 'left',
            offset: 0.01,
          },
        },
      },
      {
        name: 'angle',
        method: 'angle',
        options: {
          angle: limAngle,
          color: colors.angles,
          curve: {
            radius: 0.7,
            width: 0.02,
            sides: 300,
          },
          label: {
            text: 'x',
            radius: 0.6,
          },
        },
      },
      {
        name: 'x',
        method: 'angle',
        options: {
          angle: limAngle,
          color: colors.arc,
          label: {
            text: 'x',
            radius: limRad * 0.85,
          },
        },
      },
      {
        name: 'arc',
        method: 'shapes.polygonSweep',
        options: {
          radius: limRad,
          sides: 600,
          // sidesToDraw: 400 / limAngleProportion,
          width: 0.02,
          color: colors.arc,
        },
      },
      {
        name: 'xAxis',
        method: 'shapes.polyline',
        options: {
          color: colors.dull,
          points: [
            [0, 0],
            [limRad, 0],
          ],
          width: 0.01,
          dash: [0.05, 0.02],
        },
      },
      {
        name: 'radius',
        method: 'line',
        options: {
          color: colors.lines,
          angle: limAngle,
          length: limRad,
          width: 0.02,
          label: {
            text: 'r = 1',
            offset: 0.1,
            location: 'top',
          },
          move: {
            type: 'rotation',
            middleLengthPercent: 0,
          },
        },
        mods: {
          interactiveLocation: new Point(limRad * 0.8, 0),
        },
      },
      
    ],
    mods: {
      scenarios: {
        center: { position: [-1.5, -0.8] },
        bottom: { position: [-1.5, -1.5] },
      },
    },
  };

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

  layout.eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        _arc: { text: 'arc length', color: colors.arc, mods: mods('up', 0.4) },
        _radius: { text: 'radius', color: colors.lines, mods: mods('down', 0.7) },
        _angle: { text: 'angle', color: colors.angles, mods: mods('down', 0.4) },
        _1: { color: colors.lines },
        forRad1: { text: 'for radius = 1', color: colors.lines, scale: 0.8 },
        arc: { text: 'arc length', color: colors.arc },
        circumference: { color: colors.arc },
        twoPi: { text: '2π' },
        twoPi_2: { text: '2π' },
        twoPi_3: { text: '2π' },
        two: { text: '2' },
        pi: { text: 'pi' },
        _360: { text: '360' },
        deg: { text: 'º' },
        r: { color: colors.lines },
        circle: 'circle',
        d_g: { color: colors.angles },
        radians: ' radians',
        twoPiAngle: { text: '2π', color: colors.angles },
        radius: { color: colors.lines },
        radius_1: { color: colors.lines },
        radius_2: { color: colors.lines },
        angle: { color: colors.angles },
        angle_1: { color: colors.angles },
        angle_2: { color: colors.angles },
        radiusLengths: { text: 'radius lengths', color: colors.radianLines },
        value: { text: '0.00', color: colors.angles },
        x: `  ${String.fromCharCode(215)}  `,
        x_1: `  ${String.fromCharCode(215)}  `,
        equals: '  =  ',
        v_1: { symbol: 'vinculum' },
        v_2: { symbol: 'vinculum' },
        s_1: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_2: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_3: { symbol: 'strike', style: 'cross', color: colors.dull },
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
        yAlign: 'bottom',
      },
      forms: {
        'circ': {
          content: ['circumference', 'equals', 'twoPi', 'r'],
          scale: 1.1,
          alignment: {
            fixTo: '',
            xAlign: 'center',
            yAlign: 'bottom',
          },
        },
        'circle': {
          content: ['circle', 'equals', 'twoPiAngle', 'radians'],
          scale: 1.1,
          alignment: {
            fixTo: '',
            xAlign: 'center',
            yAlign: 'bottom',
          },
        },
        'value': ['arc', 'equals', 'value', '   ', 'radiusLengths'],
        'generalize': [
          'arc',
          'equals',
          {
            topComment: {
              content: '_value',
              comment: 'angle',
              symbol: 'smallBrace',
              contentSpace: 0.04,
              inSize: false,
            },
          },
          '   ',
          {
            topComment: ['radiusLengths', 'radius', 'largeBrace', 0.04, 0.06],
          },
        ],
        'arc': ['_arc', 'equals', '_angle', 'x', '_radius'],
        '_arc': ['arc', 'equals', 'angle', 'x', 'radius'],
        'angle': ['_angle', 'equals', { frac: ['_arc', 'v_1', '_radius'] }],
        'radius': ['_radius', 'equals', { frac: ['_arc', 'v_1', '_angle'] }],
        radiusEquals1_0: ['angle', 'equals', { frac: ['arc', 'v_1', 'radius'] }],
        radiusEquals1_1: ['angle', 'equals', { frac: ['arc', 'v_1', '_1'] }],
        radiusEquals1_2: ['angle', 'equals', { frac: ['arc', 'v_1', { strike: ['_1', 's_1'] }] }],
        radiusEquals1_3: ['angle', 'equals', 'arc'],
        radiusEquals1_4: ['angle', 'equals', { bottomComment: ['arc', 'forRad1'] }],
        arcDegrees: ['arc', 'equals', { sub: ['angle', 'd_g'] }, 'x', 'radius', 'x_1', { frac: ['π', 'v_1', '_180'] }],
      },
      formSeries: ['arc', 'radius', 'angle'],
    },
    mods: {
      scenarios: {
        top: { position: new Point(-0.2, 1.5), scale: 1 },
        topCirc: { position: new Point(0, 1.5), scale: 1 },
        topCircle: { position: new Point(0, 1.5), scale: 1 },
        center: { position: new Point(0 ,0), scale: 1.3 },
        left: { position: new Point(-0.5 ,0), scale: 1.3 },
      },
    },
    scenario: 'top',
  };

  const frac = (numerator, symbol, denominator) => ({
    frac: {
      numerator,
      symbol,
      denominator,
      overhang: 0.05,
    },
  });

  const dFrac = (numerator, symbol, denominator) => ({
    frac: {
      numerator,
      denominator,
      symbol,
      overhang: 0,
      scale: 0.8,
    },
  });

  const supBrac = (left, content, right, superscript) => ({
    sup: {
      content: {
        brac: {
          left,
          right,
          content,
          insideSpace: 0.01,
          topSpace: 0.02,
          bottomSpace: 0.02,
        },
      },
      superscript,
      offset: [-0.02, 0.02],
    },
  });

  const bracket = side => ({
    symbol: 'bracket',
    side,
    lineWidth: 0.012,
    // color: colors.angles,
    color: [0, 1, 0, 1],
  });

  const exampleEquation = name => ({
    name,
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        sin: { style: 'normal' },
        sin_1: { style: 'normal' },
        lim: { style: 'normal' },
        cos: { style: 'normal' },
        xTo0: 'x \u2192 0',
        times: `  ${String.fromCharCode(215)}  `,
        minus: '– ',
        minus_1: '  –  ',
        minus_2: '  –  ',
        plus_1: '  +  ',
        plus_2: '  +  ',
        dots: '...',
        equals: '  =  ',
        v_1: { symbol: 'vinculum' },
        v_2: { symbol: 'vinculum', color: colors.angles },
        v_3: { symbol: 'vinculum' },
        v_4: { symbol: 'vinculum' },
        v_5: { symbol: 'vinculum', color: colors.angles },
        v_6: { symbol: 'vinculum', color: colors.angles },
        v_7: { symbol: 'vinculum', color: colors.angles },
        v_8: { symbol: 'vinculum', color: colors.angles },
        lb: bracket('left'),
        rb: bracket('right'),
        lb1: bracket('left'),
        rb1: bracket('right'),
        lb2: bracket('left'),
        rb2: bracket('right'),
        _3_g: { color: colors.angles },
        _5_g: { color: colors.angles },
        _7_g: { color: colors.angles },
        _180: { color: colors.angles },
        _180_1: { color: colors.angles },
        _180_2: { color: colors.angles },
        _180_3: { color: colors.angles },
        π: { color: colors.angles },
        π_1: { color: colors.angles },
        π_2: { color: colors.angles },
        π_3: { color: colors.angles },
        _2_3: { color: colors.angles },
        _2_4: { color: colors.angles },
        _3f: { text: '3!' },
        _5f: { text: '5!' },
        _7f: { text: '7!' },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'bottom',
      },
      forms: {
        radFirst: [
          dFrac('d', 'v_1', 'dx'), ' ', { sub: ['sin', '', 0.4] }, ' ', { sub: ['x_1', '', 0.4] }, 'equals', { sub: ['cos', '', 0.4] }, ' ', { sub: ['x_3', '', 0.4] },
        ],
        // radFirst: [
        //   dFrac('d', 'v_1', 'dx'), ' ', { sub: ['sin', 'r_1', 0.4] }, ' ', { sub: ['x_1', 'r_2', 0.4] }, 'equals', { sub: ['cos', 'r_3', 0.4] }, ' ', { sub: ['x_3', 'r_4', 0.4] },
        // ],
        radSecond: [
          dFrac({ sup: ['d', [' ', '_2_1']] }, 'v_1', { sup: ['dx', ''] }), ' ', { sub: ['sin', '', 0.4] }, ' ', { sub: ['x_1', '', 0.4] }, 'equals', 'minus', { sub: ['sin_1', '', 0.4] }, ' ', { sub: ['x_3', 'r_4', 0.4] },
        ],
        // radSecond: [
        //   dFrac({ sup: ['d', [' ', '_2_1']] }, 'v_1', { sup: ['dx', '_2_2'] }), ' ', { sub: ['sin', 'r_1', 0.4] }, ' ', { sub: ['x_1', 'r_2', 0.4] }, 'equals', 'minus', { sub: ['sin_1', 'r_3', 0.4] }, ' ', { sub: ['x_3', 'r_4', 0.4] },
        // ],
        degFirst: [
          dFrac('d', 'v_1', 'dx'), ' ', { sub: ['sin', 'd_1', 0.4] }, ' ', { sub: ['x_1', 'd_2', 0.4] }, 'equals', dFrac('π', 'v_2', '_180'), 'times', { sub: ['cos', 'd_3', 0.4] }, ' ', { sub: ['x_3', 'd_4', 0.4] },
        ],
        degSecond: [
          dFrac({ sup: ['d', [' ', '_2_1']] }, 'v_1', { sup: ['dx', '_2_2'] }), ' ', { sub: ['sin', 'd_1', 0.4] }, ' ', { sub: ['x_1', 'd_2', 0.4] }, 'equals', dFrac({ sup: ['π', '_2_3'] }, 'v_2', { sup: ['_180', '_2_4'] }), 'times', 'minus', { sub: ['sin_1', 'd_3', 0.4] }, ' ', { sub: ['x_3', 'd_4', 0.4] },
        ],
        lim: [
          { bottomComment: { content: 'lim', comment: 'xTo0' } }, ' ',
          frac(['sin', ' ', 'x_1'], 'v_1', 'x_2'),
          'equals', '_1',

        ],
        limDeg: [
          { bottomComment: { content: 'lim', comment: 'xTo0' } }, ' ',
          frac([{ sub: ['sin', 'd_1'] }, ' ', { sub: ['x_1', 'd_2'] }], 'v_1', { sub: ['x_2', 'd_3'] }),
          'equals', frac('π_1', 'v_2', '_180_1'),

        ],
        sin: {
          content: [
            'sin', ' ', 'x_1', 'equals',
            'x_2',
            'minus_1', dFrac({ sup: ['x_3', '_3'] }, 'v_1', '_3f'),
            'plus_1', dFrac({ sup: ['x_4', '_5'] }, 'v_3', '_5f'),
            'minus_2', dFrac({ sup: ['x_5', '_7'] }, 'v_4', '_7f'),
            'plus_2', ' ', 'dots',
          ],
          // alignment: {
          //   fixTo: null,
          //   xAlign: 'center',
          // },
        },
        sinDeg: {
          content: [
            { sub: ['sin', 'd'] }, ' ', { sub: ['x_1', 'd_1'] }, 'equals',
            dFrac('π', 'v_5', '_180'), ' ', { sub: ['x_2', 'd_2'] },
            'minus_1',
            supBrac('lb', dFrac('π_1', 'v_6', '_180_1'), 'rb', '_3_g'), ' ',
            dFrac({ supSub: ['x_3', '_3', 'd_3'] }, 'v_1', '_3f'),
            'plus_1',
            supBrac('lb1', dFrac('π_2', 'v_7', '_180_2'), 'rb1', '_5_g'), ' ',
            dFrac({ supSub: ['x_4', '_5', 'd_4'] }, 'v_3', '_5f'),
            'minus_2',
            supBrac('lb2', dFrac('π_3', 'v_8', '_180_3'), 'rb2', '_7_g'), ' ',
            dFrac({ supSub: ['x_5', '_7', 'd_5'] }, 'v_4', '_7f'),
            'plus_2', ' ', 'dots',
          ],
          // alignment: {
          //   fixto: new Point(0, 0),
          //   xAlign: 'center',
          // },
        },
      },
    },
    mods: {
      scenarios: {
        left: { position: [0.6, -1.5], scale: 1.3 },
        topLeft: { position: new Point(-0.8, 0.6), scale: 1.3 },
        // lowBottom: { position: new Point(), scale: 1.3 },
        bottomLeft: { position: new Point(-1.8, -0.6), scale: 1.3 },
        // topRight: { position: new Point(1.3, 0.6), scale: 1.3 },
        // bottomRight: { position: new Point(1.3, -0.6), scale: 1.3 },
        top: { position: new Point(0.4, 0.6), scale: 1.3 },
        bottom: { position: new Point(0.4, -0.6), scale: 1.3 },
        center: { position: new Point(0.4, 0), scale: 1.3 },
      },
    },
  });


  const container = content => ({
    container: {
      content,
      width: 0.8,
      descent: 0.3,
      ascent: 0.3,
      yAlign: 'top',
    },
  });

  const sub = (content, subscript) => ({
    container: {
      content: {
        sub: {
          content,
          subscript,
          // inSize: false,
        },
      },
      fit: 'width',
      descent: 0.05,
    },
  });

  const cont2 = content => ({
    container: {
      content,
      width: 0.5,
      height: 0.2,
    },
  });

  layout.radEqn = {
    name: 'radEqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        twoPi: { text: '2π' },
        twoPi_1: { text: '2π' },
        two: { text: '2' },
        // box: { symbol: 'box' },
        // box2: { symbol: 'box' },
        // box3: { symbol: 'box' },
        blank1: { text: '  =  ', color: [0, 0, 0, 0.001] },
        pi: { text: 'π' },
        _360: { text: '360' },
        _180: { text: '180' },
        degSym: { text: 'º' },
        rad: { color: colors.angles },
        deg: { text: 'deg', color: colors.angles },
        radians: ' radians',
        x_1: `  ${String.fromCharCode(215)}  `,
        x_2: `  ${String.fromCharCode(215)}  `,
        equals: '  =  ',
        v_1: { symbol: 'vinculum' },
        v_2: { symbol: 'vinculum' },
        s_1: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_2: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_3: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_4: { symbol: 'strike', style: 'cross', color: colors.dull },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'center',
        yAlign: 'bottom',
      },
      forms: {
        'start': [],
        '0': {
          content: [
            container(sub('angle_1', 'rad')),
            cont2('blank1'),
            container(sub('angle_2', 'deg')),
          ],
          alignment: {
            fixTo: 'blank1',
            xAlign: 'center',
          },
        },
        '1': [
          container(frac(sub('angle_1', 'rad'), 'v_1', 'twoPi')),
          cont2('equals'),
          container(frac(sub('angle_2', 'deg'), 'v_2', '_360')),
        ],
        '2': [
          'twoPi_1', 'x_1',
          container(frac(sub('angle_1', 'rad'), 'v_1', 'twoPi')),
          cont2('equals'),
          container(frac(sub('angle_2', 'deg'), 'v_2', '_360')),
          'x_2', 'two', 'pi',
        ],
        '3': [
          { strike: ['twoPi_1', 's_1'] }, 'x_1',
          container(frac(
            sub('angle_1', 'rad'),
            'v_1',
            { strike: ['twoPi', 's_2'] },
          )),
          cont2('equals'),
          container(frac(
            sub('angle_2', 'deg'),
            'v_2',
            {
              sub: {
                content: { strike: ['_360', 's_3'] },
                subscript: '_180',
                offset: [0.05, 0],
                inSize: false,
              },
            },
          )),
          'x_2', { strike: ['two', 's_4'] }, 'pi',
        ],
        '4': [
          sub('angle_1', 'rad'),
          cont2('equals'),
          frac(
            sub('angle_2', 'deg'),
            'v_2',
            '_180',
          ),
          'x_2', 'pi',
        ],
        '5': [
          sub('angle_1', 'rad'),
          cont2('equals'),
          frac(
            [sub('angle_2', 'deg'), 'x_2', 'pi'],
            'v_2',
            '_180',
          ),
        ],
        '6': [
          sub('angle_1', 'rad'),
          cont2('equals'),
          sub('angle_2', 'deg'),
          'x_2',
          frac(
            'pi',
            'v_2',
            '_180',
          ),
        ],
      },
      formSeries: ['0', '1', '2', '3', '4', '5', '6'],
    },
    mods: {
      scenarios: {
        center: { position: new Point(0, 0), scale: 1.3 },
        up: { position: new Point(-0.4, 0.6), scale: 1.3 },
      },
    },
    scenario: 'top',
  };

  layout.radEqnNav = {
    name: 'radEqnNav',
    method: 'addNavigator',
    options: {
      equation: layout.radEqn,
      type: 'equationOnly',
    },

    mods: {
      scenarios: {
        center: { position: new Point(0, 0), scale: 1.3 },
        // bottom: { position: new Point(0, -1.6), scale: 0.9 },
      },
    },
  };

  layout.degEqn = {
    name: 'degEqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      elements: {
        twoPi: { text: '2π' },
        twoPi_1: { text: '2π' },
        two: { text: '2' },
        pi: { text: 'π' },
        _360: { text: '360' },
        _180: { text: '180' },
        degSym: { text: 'º' },
        blank1: { text: '  =  ', color: [0, 0, 0, 0.001] },
        // box: { symbol: 'box' },
        // box2: { symbol: 'box' },
        // box3: { symbol: 'box' },
        rad: { color: colors.angles },
        deg: { color: colors.angles },
        radians: ' radians',
        x_1: `  ${String.fromCharCode(215)}  `,
        x_2: `  ${String.fromCharCode(215)}  `,
        equals: '  =  ',
        v_1: { symbol: 'vinculum' },
        v_2: { symbol: 'vinculum' },
        s_1: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_2: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_3: { symbol: 'strike', style: 'cross', color: colors.dull },
        s_4: { symbol: 'strike', style: 'cross', color: colors.dull },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'center',
        yAlign: 'bottom',
      },
      forms: {
        // '0': [
        //   container(['_360', 'degSym']),
        //   'equals',
        //   container({ bottomComment: [['two', 'pi'], 'radians'] }),
        // ],
        '0': {
          content: [
            container(sub('angle_2', 'deg')),
            cont2('blank1'),
            container(sub('angle_1', 'rad')),
          ],
          alignment: {
            fixTo: 'blank1',
            xAlign: 'center',
          },
        },
        '1': [
          container(frac(sub('angle_2', 'deg'), 'v_2', '_360')),
          cont2('equals'),
          container(frac(sub('angle_1', 'rad'), 'v_1', ['two', 'pi'])),
        ],
        '2': [
          '_360_2', 'x_2',
          container(frac(sub('angle_2', 'deg'), 'v_2', '_360')),
          cont2('equals'),
          container(frac(sub('angle_1', 'rad'), 'v_1', ['two', 'pi'])),
          'x_1', '_360_1',
        ],
        '3': [
          { strike: ['_360_2', 's_4'] }, 'x_2',
          container(frac(
            sub('angle_2', 'deg'),
            'v_2',
            { strike: ['_360', 's_3'] },
          )),
          cont2('equals'),
          container(frac(
            sub('angle_1', 'rad'),
            'v_1',
            [{ strike: ['two', 's_2'] }, 'pi'],
          )),
          'x_1',
          {
            sub: {
              content: { strike: ['_360_1', 's_1'] },
              subscript:'_180',
              offset: [-0.05, -0.05],
              inSize:false,
            },
          },
        ],
        '4': [
          sub('angle_2', 'deg'),
          cont2('equals'),
          container(frac(
            sub('angle_1', 'rad'),
            'v_1',
            'pi',
          )),
          'x_1',
          '_180',
        ],
        '5': [
          sub('angle_2', 'deg'),
          cont2('equals'),
          frac(
            [sub('angle_1', 'rad'), 'x_1', '_180'],
            'v_1',
            'pi',
          ),
        ],
        '6': [
          sub('angle_2', 'deg'),
          cont2('equals'),
          sub('angle_1', 'rad'),
          'x_1',
          frac(
            '_180',
            'v_1',
            'pi',
          ),
        ],
      },
      formSeries: ['0', '1', '2', '3', '4', '5', '6'],
    },
    mods: {
      scenarios: {
        down: { position: new Point(-0.4 , -0.6), scale: 1.3 },
      },
    },
    scenario: 'top',
  };

  layout.degEqnNav = {
    name: 'degEqnNav',
    method: 'addNavigator',
    options: {
      equation: layout.degEqn,
      type: 'equationOnly',
    },

    mods: {
      scenarios: {
        center: { position: new Point(0, 0), scale: 1.3 },
      },
    },
  };


  layout.addElements = [
    layout.circle,
    layout.box,
    layout.eqn,
    layout.radEqnNav,
    layout.degEqnNav,
    exampleEquation('ex1'),
    exampleEquation('ex2'),
    exampleEquation('ex3'),
    exampleEquation('ex4'),
    layout.lim,
  ];
  return layout;
}
