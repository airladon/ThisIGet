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
  colors.dull = colors.get('grey', 'dark').rgb;
  colors.marks = colors.get('grey', 'dark').rgb;
  colors.radianLines = colors.get('blue').rgb;
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
        sides: 400,
        radius: radius / 4,
      },
      color: colors.angles,
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

  const marks = (numMarks: number, inner: number = radius, outer: number = radius * 1.1) => ({
    name: `marks${numMarks}`,
    method: 'radialLines',
    options: {
      innerRadius: inner,
      outerRadius: outer,
      color: colors.marks,
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
      layout.degrees,
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
        arcDegrees: ['_arc', 'equals', '_angle', 'x', '_radius', 'x_1', { frac: ['π', 'v_1', '_180'] }],
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

  const dFrac = (numerator, symbol, denominator) => ({
    frac: {
      numerator,
      denominator,
      symbol,
      overhang: 0,
      scale: 0.8,
    },
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
        cos: { style: 'normal' },
        times: `  ${String.fromCharCode(215)}  `,
        minus: '– ',
        equals: '  =  ',
        v_1: { symbol: 'vinculum' },
        v_2: { symbol: 'vinculum', color: colors.angles },
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
        _180: { color: colors.angles },
        π: { color: colors.angles },
        _2_3: { color: colors.angles },
        _2_4: { color: colors.angles },
      },
      defaultFormAlignment: {
        fixTo: 'equals',    // Points can also be defined as objects
        xAlign: 'right',
        yAlign: 'bottom',
      },
      forms: {
        radFirst: [
          dFrac('d', 'v_1', 'dx'), ' ', { sub: ['sin', 'r_1', 0.4] }, ' ', { sub: ['x_1', 'r_2', 0.4] }, 'equals', { sub: ['cos', 'r_3', 0.4] }, ' ', { sub: ['x_3', 'r_4', 0.4] },
        ],
        radSecond: [
          dFrac({ sup: ['d', [' ', '_2_1']] }, 'v_1', { sup: ['dx', '_2_2'] }), ' ', { sub: ['sin', 'r_1', 0.4] }, ' ', { sub: ['x_1', 'r_2', 0.4] }, 'equals', 'minus', { sub: ['sin_1', 'r_3', 0.4] }, ' ', { sub: ['x_3', 'r_4', 0.4] },
        ],
        degFirst: [
          dFrac('d', 'v_1', 'dx'), ' ', { sub: ['sin', 'd_1', 0.4] }, ' ', { sub: ['x_1', 'd_2', 0.4] }, 'equals', dFrac('π', 'v_2', '_180'), 'times', { sub: ['cos', 'd_3', 0.4] }, ' ', { sub: ['x_3', 'd_4', 0.4] },
        ],
        degSecond: [
          dFrac({ sup: ['d', [' ', '_2_1']] }, 'v_1', { sup: ['dx', '_2_2'] }), ' ', { sub: ['sin', 'd_1', 0.4] }, ' ', { sub: ['x_1', 'd_2', 0.4] }, 'equals', dFrac({ sup: ['π', '_2_3'] }, 'v_2', { sup: ['_180', '_2_4'] }), 'times', 'minus', { sub: ['sin_1', 'd_3', 0.4] }, ' ', { sub: ['x_3', 'd_4', 0.4] },
        ],
      },
    },
    mods: {
      scenarios: {
        topLeft: { position: new Point(-1.3, 0.6), scale: 1.1 },
        bottomLeft: { position: new Point(-1.3, -0.6), scale: 1.1 },
        topRight: { position: new Point(1.1, 0.6), scale: 1.1 },
        bottomRight: { position: new Point(1.1, -0.6), scale: 1.1 },
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

  const frac = (numerator, symbol, denominator) => ({
    frac: {
      numerator,
      symbol,
      denominator,
      overhang: 0.05,
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
    layout.eqn,
    layout.radEqnNav,
    layout.degEqnNav,
    exampleEquation('ex1'),
    exampleEquation('ex2'),
    exampleEquation('ex3'),
    exampleEquation('ex4'),
  ];
  return layout;
}
