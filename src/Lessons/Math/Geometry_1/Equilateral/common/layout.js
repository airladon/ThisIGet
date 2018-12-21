// @flow
import Fig from 'figureone';
// import {
//   Point, Line, Transform,
// } from '../../../../../js/diagram/tools/g2';
// import getCssColors from '../../../../../js/tools/getCssColors';
import baseLayout from '../../../../LessonsCommon/layout';

const { Point, Transform, Line } = Fig.tools.g2;

const cssColorNames = [
  'lines',
  'angles',
  'equalLength',
  'points',
  'construction',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function commonLessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);

  const isoPoints = [
    new Point(-0.8, -1),
    new Point(0.8, -1),
    new Point(0, 1),
  ];

  layout.grid = {
    position: new Point(0, 0),
    smallPosition: new Point(0, 0),
    spacing: 0.5,
    length: 3,
    height: 3,
  };

  const mid = new Point(0, isoPoints[0].y);
  layout.iso = {
    position: new Point(0, 0),
    scenario: {
      center: { position: new Point(0, 0) },
      bottom: { position: new Point(0, -0.5) },
    },
    main: {
      tri: {
        points: isoPoints,
        width: 0.015,
        close: true,
        borderToPoint: 'alwaysOn',
        position: new Point(0, 0),
        color: layout.colors.lines,
      },
      sideLength: {
        color: layout.colors.lines,
        offset: 0.15,
        label: {
          text: 'A',
          location: 'outside',
          orientation: 'horizontal',
        },
        showLine: false,
      },
      side12: {
        p1: isoPoints[1],
        p2: isoPoints[0],
        label: { text: 'B' },
        // offset: 0.5,
      },
      side23: {
        p1: isoPoints[2],
        p2: isoPoints[1],
        color: layout.colors.equalLength,
      },
      side31: {
        p1: isoPoints[0],
        p2: isoPoints[2],
        color: layout.colors.equalLength,
      },
      sideH: {
        p1: isoPoints[2],
        p2: mid,
        color: layout.colors.height,
        offset: 0.1,
        label: {
          linePosition: 0.6,
        },
      },
      angle: {
        curve: {
          radius: 0.2,
          sides: 150,
          width: 0.02,
        },
        label: {
          text: 'a',
          radius: 0.18,
        },
        color: layout.colors.angles,
      },
      angle1: {
        p1: isoPoints[1],
        p2: isoPoints[0],
        p3: isoPoints[2],
      },
      angle2: {
        p1: isoPoints[2],
        p2: isoPoints[1],
        p3: isoPoints[0],
      },
      angle3: {
        p1: isoPoints[0],
        p2: isoPoints[2],
        p3: isoPoints[1],
        curve: { radius: 0.3 },
        label: { text: 'b', radius: 0.28 },
      },
    },
    left: {
      scenario: {
        center: { position: new Point(0, 0) },
        left: { position: new Point(-0.5, 0) },
      },
      tri: {
        points: [
          isoPoints[0],
          mid,
          isoPoints[2],
        ],
        width: 0.015,
        close: true,
        borderToPoint: 'alwaysOn',
        position: new Point(0, 0),
        color: layout.colors.lines,
      },
      angle1: {
        p1: mid,
        p2: isoPoints[0],
        p3: isoPoints[2],
        label: { text: 'a' },
      },
      angle2: {
        p1: isoPoints[2],
        p2: mid,
        p3: isoPoints[0],
        curve: { radius: 0.17 },
        label: { text: 'b', radius: 0.15 },
      },
      angle3: {
        p1: isoPoints[0],
        p2: isoPoints[2],
        p3: mid,
        curve: { radius: 0.3 },
        label: { text: 'c', radius: 0.28 },
      },
      side12: {
        p1: mid,
        p2: isoPoints[0],
        label: {
          text: {
            eqn: 'fractionPre',
            numerator: '1',
            denominator: '2',
            main: 'B',
          },
        },
      },
      side23: {
        p1: isoPoints[2],
        p2: mid,
        offset: 0.1,
        label: { text: 'C', linePosition: 0.6 },
      },
      side31: {
        p1: isoPoints[0],
        p2: isoPoints[2],
        color: layout.colors.equalLength,
        label: { text: 'A' },
      },
    },
    right: {
      scenario: {
        center: { position: new Point(0, 0) },
        right: { position: new Point(0.5, 0) },
      },
      tri: {
        points: [
          mid,
          isoPoints[1],
          isoPoints[2],
        ],
        width: 0.015,
        close: true,
        borderToPoint: 'alwaysOn',
        position: new Point(0, 0),
        color: layout.colors.lines,
      },
      angle1: {
        p1: isoPoints[1],
        p2: mid,
        p3: isoPoints[2],
        curve: { radius: 0.17 },
        label: { text: 'b', radius: 0.15 },
      },
      angle2: {
        p1: isoPoints[2],
        p2: isoPoints[1],
        p3: mid,
        label: { text: 'a' },
      },
      angle3: {
        p1: mid,
        p2: isoPoints[2],
        p3: isoPoints[1],
        curve: { radius: 0.3 },
        label: { text: 'c', radius: 0.28 },
      },
      side12: {
        p1: isoPoints[1],
        p2: mid,
        label: {
          text: {
            eqn: 'fractionPre',
            numerator: '1',
            denominator: '2',
            main: 'B',
          },
        },
      },
      side23: {
        p1: isoPoints[2],
        p2: isoPoints[1],
        color: layout.colors.equalLength,
        label: { text: 'A' },
      },
      side31: {
        p1: mid,
        p2: isoPoints[2],
        offset: 0.1,
        label: { text: 'C', linePosition: 0.4 },
      },
    },
    splitLine: {
      p1: isoPoints[2].sub(0, 0.04),
      p2: new Line(isoPoints[0], isoPoints[1]).midpoint(),
      width: 0.015,
      color: layout.colors.lines,
    },
    point: {
      sides: 100,
      radius: 0.001,
      fill: true,
      color: layout.colors.points,
    },
    topPoint: {
      transform: new Transform('topPoint').translate(isoPoints[2]),
    },
    midPoint: {
      transform: new Transform('midPoint')
        .translate(new Line(isoPoints[0], isoPoints[1]).midpoint()),
    },
    rect: {
      tri1: {
        line: {
          points: [
            isoPoints[0],
            new Point(isoPoints[0].x, isoPoints[2].y),
            isoPoints[2],
          ],
          width: 0.01,
          close: false,
          borderToPoint: 'alwaysOn',
          position: new Point(0, 0),
          color: layout.colors.construction,
        },
        closeLine: {
          p1: isoPoints[2],
          p2: isoPoints[0],
          color: layout.colors.construction,
          width: 0.01,
        },
        angle1: {
          p1: new Point(isoPoints[0].x, isoPoints[2].y),
          p2: isoPoints[2],
          p3: isoPoints[0],
          // curve: { radius: 0.3 },
          // label: {
          //   text: '90º - a',
          //   radius: 0.25,
          //   textScale: 0.7,
          //   curvePosition: 2.5,
          // },
        },
        angle2: {
          p1: isoPoints[0],
          p2: new Point(isoPoints[0].x, isoPoints[2].y),
          p3: isoPoints[2],
          autoRightAngle: true,
          curve: { radius: 0.2 },
          label: { text: '' },
        },
        angle1R: {
          p1: isoPoints[1],
          p2: isoPoints[0],
          p3: new Point(isoPoints[0].x, isoPoints[2].y),
          autoRightAngle: true,
          curve: { radius: 0.2 },
          label: { text: '' },
        },
        side12: {
          p1: isoPoints[0],
          p2: new Point(isoPoints[0].x, isoPoints[2].y),
          color: layout.colors.lines,
          label: { text: 'h' },
          offset: 0.15,
        },
        side31: {
          p1: isoPoints[0],
          p2: isoPoints[2],
          color: layout.colors.equalLength,
          label: { text: 'A' },
          offset: 0.15,
        },
      },
      tri2: {
        line: {
          points: [
            isoPoints[2],
            new Point(isoPoints[1].x, isoPoints[2].y),
            isoPoints[1],
          ],
          width: 0.01,
          close: false,
          borderToPoint: 'alwaysOn',
          position: new Point(0, 0),
          color: layout.colors.construction,
        },
        closeLine: {
          p1: isoPoints[1],
          p2: isoPoints[2],
          color: layout.colors.construction,
          width: 0.01,
        },
        angle1: {
          p1: isoPoints[1],
          p2: isoPoints[2],
          p3: new Point(isoPoints[1].x, isoPoints[2].y),
        },
        angle1R: {
          p1: new Point(isoPoints[1].x, isoPoints[2].y),
          p2: isoPoints[1],
          p3: isoPoints[0],
          autoRightAngle: true,
          curve: { radius: 0.2 },
          label: { text: '' },
        },
        angle2: {
          p1: isoPoints[2],
          p2: new Point(isoPoints[1].x, isoPoints[2].y),
          p3: isoPoints[1],
          autoRightAngle: true,
          curve: { radius: 0.2 },
          label: { text: '' },
        },
        side12: {
          p1: new Point(isoPoints[1].x, isoPoints[2].y),
          p2: isoPoints[1],
          color: layout.colors.lines,
          label: { text: 'h' },
          offset: 0.15,
        },
        side31: {
          p1: isoPoints[2],
          p2: isoPoints[1],
          color: layout.colors.equalLength,
          label: { text: 'A' },
          offset: 0.15,
        },
      },
    },
  };

  const { iso } = layout;
  const isoL = iso.left;
  const isoR = iso.right;
  const { main } = layout.iso;
  const rec = iso.rect;
  layout.addElements = [
    {
      name: 'rect',
      method: 'collection',
      options: {
        transform: new Transform('rect').translate(0, 0),
      },
      addElements: [
        ['', 'tri1', 'collection', {}, {}, [
          ['', 'line', 'polyLine', rec.tri1.line],
          ['', 'closeLine', 'line', rec.tri1.closeLine],
          ['', 'angle1', 'angle', [main.angle, rec.tri1.angle1]],
          ['', 'angle1R', 'angle', [main.angle, rec.tri1.angle1R]],
          ['', 'angle2', 'angle', [main.angle, rec.tri1.angle2]],
          ['', 'side12', 'line', [main.sideLength, rec.tri1.side12]],
          ['', 'side31', 'line', [main.sideLength, rec.tri1.side31]],
        ]],
        ['', 'tri2', 'collection', {}, {}, [
          ['', 'line', 'polyLine', rec.tri2.line],
          ['', 'closeLine', 'line', rec.tri2.closeLine],
          ['', 'angle1', 'angle', [main.angle, rec.tri2.angle1]],
          ['', 'angle1R', 'angle', [main.angle, rec.tri2.angle1R]],
          ['', 'angle2', 'angle', [main.angle, rec.tri2.angle2]],
          ['', 'side12', 'line', [main.sideLength, rec.tri2.side12]],
          ['', 'side31', 'line', [main.sideLength, rec.tri2.side31]],
        ]],
      ],
    },
    {
      name: 'tri',
      method: 'shapes/collection',
      options: {
        transform: new Transform('iso').translate(0, 0),
      },
      addElements: [
        ['', 'line', 'polyLine', main.tri],
        ['', 'side12', 'line', [main.sideLength, main.side12]],
        ['', 'side23', 'line', [main.sideLength, main.side23]],
        ['', 'side31', 'line', [main.sideLength, main.side31]],
        ['', 'angle1', 'angle', [main.angle, main.angle1]],
        ['', 'angle2', 'angle', [main.angle, main.angle2]],
        ['', 'angle3', 'angle', [main.angle, main.angle3]],
      ],
    },
    ['', 'split', 'line', [iso.splitLine]],
    ['', 'topPoint', 'polygon', [iso.point, iso.topPoint]],
    ['', 'midPoint', 'polygon', [iso.point, iso.midPoint]],
    {
      name: 'left',
      method: 'collection',
      options: new Transform('left').translate(0, 0),
      addElements: [
        ['', 'line', 'polyLine', isoL.tri],
        ['', 'angle1', 'angle', [main.angle, isoL.angle1]],
        ['', 'angle2', 'angle', [main.angle, isoL.angle2]],
        ['', 'angle3', 'angle', [main.angle, isoL.angle3]],
        ['', 'side12', 'line', [main.sideLength, isoL.side12]],
        ['', 'side23', 'line', [main.sideLength, isoL.side23]],
        ['', 'side31', 'line', [main.sideLength, isoL.side31]],
      ],
    },
    {
      name: 'right',
      method: 'collection',
      options: new Transform('right').translate(0, 0),
      addElements: [
        ['', 'line', 'polyLine', isoR.tri],
        ['', 'angle1', 'angle', [main.angle, isoR.angle1]],
        ['', 'angle2', 'angle', [main.angle, isoR.angle2]],
        ['', 'angle3', 'angle', [main.angle, isoR.angle3]],
        ['', 'side12', 'line', [main.sideLength, isoR.side12]],
        ['', 'side23', 'line', [main.sideLength, isoR.side23]],
        ['', 'side31', 'line', [main.sideLength, isoR.side31]],
      ],
    },
  ];
  const elements = {
    a: { text: 'a', color: layout.colors.angles },
    a_: { text: 'a', color: layout.colors.angles },
    a__: { text: 'a', color: layout.colors.angles },
    b: { text: 'b', color: layout.colors.angles },
    b_: { text: 'b', color: layout.colors.angles },
    b__: { text: 'b', color: layout.colors.angles },
    _2: '2',
    _2_: '2',
    _2__: '2',
    _180: '180º',
    plus: ' + ',
    plus_: ' + ',
    minus: ' \u2212 ',
    minus_: ' \u2212 ',
    'equals': '  =  ',
    div: ' \u00F7 ',
    div_: ' \u00F7 ',
    v: { symbol: 'vinculum' },
    v_: { symbol: 'vinculum' },
    x: { symbol: 'xStrike', color: layout.colors.diagram.disabled },
    x_: { symbol: 'xStrike', color: layout.colors.diagram.disabled },
    x__: { symbol: 'xStrike', color: layout.colors.diagram.disabled },
  };
  layout.addEquationA = [
    {
      // path: '',
      name: 'eqnA',
      method: 'equation/addNavigator',
      options: {
        color: layout.colors.diagram.text.base,
        scale: 1,
        position: [-0.15, 0.8],
        defaultFormAlignment: {
          fixTo: 'equals',
        },
        elements,
        forms: {
          '0': ['a', 'plus', 'a_', 'plus_', 'b', 'equals', '_180'],
          '1': [
            { strike: ['a', 'x'] }, 'plus', '_2', 'a_', 'plus_', 'b', 'equals', '_180'],
          '2': ['_2', 'a_', 'plus_', 'b', 'equals', '_180'],
          '3': [
            {
              bottomComment: [
                ['_2', 'a_', 'plus_', 'b'],
                ['minus', '_2_', 'a__'],
                null,
                0.1,
              ],
            },
            'equals',
            {
              bottomComment: ['_180', ['minus_', '_2__', 'a'], null, 0.1],
            },
          ],
          '4': [
            {
              bottomComment: [
                [{ strike: [['_2', 'a_'], 'x'] }, 'plus_', 'b'],
                ['minus', { strike: [['_2_', 'a__'], 'x_'] }],
                null,
                0.1,
              ],
            },
            'equals',
            {
              bottomComment: ['_180', ['minus_', '_2__', 'a'], null, 0.1],
            },
          ],
          '5': [
            'b',
            'equals',
            '_180', 'minus_', '_2__', 'a',
          ],
        },
        formSeries: ['0', '1', '2', '3', '4', '5'],
      },
    },
  ];
  layout.addEquationB = [
    {
      // path: '',
      name: 'eqnB',
      method: 'equation/addNavigator',
      options: {
        color: layout.colors.diagram.text.base,
        scale: 1,
        position: [-0.15, 0.8],
        defaultFormAlignment: {
          fixTo: 'equals',
        },
        elements,
        forms: {
          '0': ['a', 'plus', 'a_', 'plus_', 'b', 'equals', '_180'],
          '1': [
            { strike: ['a', 'x'] }, 'plus', '_2', 'a_', 'plus_', 'b', 'equals', '_180'],
          '2': ['_2', 'a_', 'plus_', 'b', 'equals', '_180'],
          '3': [
            {
              bottomComment: [
                ['_2', 'a_', 'plus_', 'b'],
                ['minus', 'b_'],
                null,
                0.1,
              ],
            },
            'equals',
            {
              bottomComment: ['_180', ['minus_', 'b__'], null, 0.1],
            },
          ],
          '4': [
            {
              bottomComment: [
                ['_2', 'a_', 'plus_', { strike: ['b', 'x'] }],
                ['minus', { strike: ['b_', 'x_'] }],
                null,
                0.1,
              ],
            },
            'equals',
            {
              bottomComment: ['_180', ['minus_', 'b__'], null, 0.1],
            },
          ],
          '5': [
            '_2', 'a_',
            'equals',
            '_180', 'minus_', 'b__',
          ],
          '6': [
            {
              bottomComment: [['_2', 'a_'], ['div', '_2_'], null, 0.1],
            },
            'equals',
            {
              bottomComment: [['_180', 'minus_', 'b__'], ['div_', '_2__'], null, 0.1],
            },
          ],
          '7': [
            {
              frac: [['_2', 'a_'], '_2_', 'v'],
            },
            'equals',
            {
              frac: [['_180', 'minus_', 'b__'], '_2__', 'v_'],
            },
          ],
          '8': [
            {
              frac: [
                [{ strike: ['_2', 'x'] }, 'a_'],
                { strike: ['_2_', 'x_'] },
                'v',
              ],
            },
            'equals',
            {
              frac: [['_180', 'minus_', 'b__'], '_2__', 'v_'],
            },
          ],
          '9': [
            'a_',
            'equals',
            {
              frac: [['_180', 'minus_', 'b__'], '_2__', 'v_'],
            },
          ],
        },
        formSeries: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
    },
  ];

  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  const equilPoints = [
    new Point(-1, -1).add(0, 1 - Math.tan(Math.PI / 6)),
    new Point(1, -1).add(0, 1 - Math.tan(Math.PI / 6)),
    new Point(0, 0.732050).add(0, 1 - Math.tan(Math.PI / 6)),
  ];

  layout.equil = {
    position: new Point(0, 0),
    scenario: {
      center: { position: new Point(0, -(1 - Math.tan(Math.PI / 6))) },
    },
    tri: {
      points: equilPoints,
      width: 0.015,
      close: true,
      borderToPoint: 'alwaysOn',
      position: new Point(0, 0),
      color: layout.colors.lines,
    },
    sideLength: layout.iso.main.sideLength,
    side12: {
      p1: equilPoints[1],
      p2: equilPoints[0],
      color: layout.colors.lines,
    },
    side23: {
      p1: equilPoints[2],
      p2: equilPoints[1],
      color: layout.colors.lines,
    },
    side31: {
      p1: equilPoints[0],
      p2: equilPoints[2],
      color: layout.colors.lines,
    },
    angle: layout.iso.main.angle,
    angle1: {
      p1: equilPoints[1],
      p2: equilPoints[0],
      p3: equilPoints[2],
      // label: { text: ['a', '60º'] },
    },
    angle2: {
      p1: equilPoints[2],
      p2: equilPoints[1],
      p3: equilPoints[0],
    },
    angle3: {
      p1: equilPoints[0],
      p2: equilPoints[2],
      p3: equilPoints[1],
    },
    // iso1: {
    //   p1: equilPoints[2],
    //   p2: equilPoints[0],
    //   color: layout.colors.equalLength,
    // },
    // iso2: {
    //   p1: equilPoints[1],
    //   p2: equilPoints[2],
    //   color: layout.colors.equalLength,
    // },
    iso: {
      close: false,
      color: layout.colors.equalLength,
      width: 0.03,
      borderToPoint: 'never',
      transform: new Transform('iso').rotate(0).translate(0, 0),
    },
  };

  const { equil } = layout;
  layout.addEquilateralElements = [
    {
      name: 'tri',
      method: 'collection',
      options: {
        transform: new Transform('equil').translate(0, 0),
      },
      addElements: [
        ['', 'line', 'polyLine', equil.tri],
        ['', 'side12', 'line', [equil.sideLength, equil.side12]],
        ['', 'side23', 'line', [equil.sideLength, equil.side23]],
        ['', 'side31', 'line', [equil.sideLength, equil.side31]],
        ['', 'angle1', 'angle', [equil.angle, equil.angle1]],
        ['', 'angle2', 'angle', [equil.angle, equil.angle2]],
        ['', 'angle3', 'angle', [equil.angle, equil.angle3]],
        ['', 'isoLines', 'polyLine', [equil.tri, equil.iso]],
      ],
    },
  ];

  return layout;
}
