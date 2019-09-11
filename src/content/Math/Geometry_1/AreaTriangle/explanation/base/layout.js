// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  Rect,
  Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'grid',
  'area',
  'disabled',
  'construction1',
  'construction2',
  'fill',
  'fill1',
  'fill2',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const introTriangle = {
    name: 'triangle',
    method: 'polygon',
    options: {
      width: 0.05,
      color: colors.sides,
      sides: 3,
      radius: 0.84,
      rotation: -Math.PI / 6,
      position: [0, -0.58],
    },
  };

  const grid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: new Rect(-1.5, -1.25, 3, 1.75),
      xStep: 0.25,
      yStep: 0.25,
      numLinesThick: 2,
      color: colors.grid,
    },
  };

  const intro = {
    name: 'intro',
    method: 'collection',
    addElements: [
      grid,
      introTriangle,
    ],
    options: {
      position: [0, 0.2],
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const w = 3;
  const h = 1.5;
  const lineWidth = 0.02;
  const line = (name, position, angle, length, text) => ({
    name,
    method: 'line',
    options: {
      position,
      angle,
      length,
      vertexSpaceStart: 'center',
      label: {
        text,
        location: 'outside',
        offset: 0.1,
      },
      color: colors.sides,
      width: lineWidth,
    },
  });

  const rectangle = {
    name: 'rectangle',
    method: 'collection',
    addElements: [
      line('left', [-w / 2, 0], Math.PI / 2, h + lineWidth, 'B'),
      line('right', [w / 2, 0], -Math.PI / 2, h + lineWidth, 'B'),
      line('top', [0, h / 2], 0, w + lineWidth, 'A'),
      line('bottom', [0, -h / 2], -Math.PI, w + lineWidth, 'A'),
      line('diagonal', [0, 0], -Math.atan(h / w), Math.sqrt(w * w + h * h), ''),
    ],
    options: {
      position: [0, -0.4],
    },
  };

  const rectEqn = {
    name: 'rectEqn',
    method: 'addEquation',
    options: {
      position: [0, 0.9],
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      color: colors.diagram.text.base,
      elements: {
        Area: { color: colors.area },
        rect: { text: 'rectangle', color: colors.sides },
        tri: { text: 'triangle', color: colors.sides },
        equals: '  =  ',
        A: { color: colors.sides },
        B: { color: colors.sides },
        mul: ' \u00D7 ',
        _1: '1',
        _2: '2',
        v: { symbol: 'vinculum' },
      },
      forms: {
        'rect': [
          { sub: ['Area', 'rect'] }, 'equals', 'A', 'mul', 'B',
        ],
        'tri': [
          { sub: ['Area', 'tri'] },
          'equals',
          { frac: ['_1', '_2', 'v', 0.7] },
          ' ', 'A', 'mul', 'B',
        ],
      },
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  const tri1 = [
    new Point(-1.5, -0.75),
    new Point(1.5, -0.75),
    new Point(0.3, 0.4),
  ];
  const tri = (name, points) => ({
    name,
    method: 'polyLine',
    options: {
      points,
      width: lineWidth,
      color: colors.sides,
      close: true,
    },
  });
  const rect = (name, points, color, text1, text2, text3, text4) => ({
    name,
    method: 'polyLine',
    options: {
      // borderToPoint: 'alwaysOn',
      width: lineWidth / 2,
      color,
      points,
      side: [
        { label: { text: text1, offset: 0.05, location: 'outside' } },
        { label: { text: text2, offset: 0.05, location: 'outside' } },
        { label: { text: text3, offset: 0.05, location: 'outside' } },
        { label: { text: text4, offset: 0.05, location: 'outside' } },
      ],
      close: true,
    },
  });
  const rectPoints = (points, left, xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0) => {
    let p0 = points[1];
    const p1 = points[2];
    if (left) {
      [p0] = points;
    }
    return [
      new Point(Math.min(p0.x, p1.x) + xOffset, Math.min(p0.y, p1.y) + yOffset),
      new Point(Math.min(p0.x, p1.x) + xOffset, Math.max(p0.y, p1.y) + hOffset),
      new Point(Math.max(p0.x, p1.x) + wOffset, Math.max(p0.y, p1.y) + hOffset),
      new Point(Math.max(p0.x, p1.x) + wOffset, Math.min(p0.y, p1.y) + yOffset),
    ];
  };
  const fill = (name, points, color) => ({
    name,
    method: 'fan',
    options: {
      points,
      color,
    },
  });

  const base = (name, p1, p2, yOffset, text) => ({
    name,
    method: 'line',
    options: {
      width: lineWidth / 2,
      p1: p1.add(0, yOffset),
      p2: p2.add(0, yOffset),
      color: colors.sides,
      arrows: {
        width: lineWidth * 3,
        height: lineWidth * 3,
      },
      label: {
        text,
        offset: 0.01,
        location: 'bottom',
      },
    },
  });

  const height = (name, p1, p2, xOffset, text) => ({
    name,
    method: 'line',
    options: {
      width: lineWidth / 2,
      p1: p1.add(xOffset, 0),
      p2: p2.add(xOffset, 0),
      color: colors.sides,
      arrows: {
        width: lineWidth * 3,
        height: lineWidth * 3,
      },
      label: {
        text,
        offset: 0.01,
        location: 'outside',
        orientation: 'horizontal',
      },
    },
  });

  const side = new Line(tri1[0], tri1[2]);
  const t = new Transform().rotate(-side.ang + Math.PI).translate(0, -0.9);
  const temp = tri1.map(p => p.transformBy(t.m()));
  const tri2 = [temp[2], temp[0], temp[1]];

  const area1 = {
    name: 'area1',
    method: 'collection',
    addElements: [
      fill(
        'leftFill', [tri1[0], tri1[2], new Point(tri1[2].x, tri1[0].y)],
        colors.fill1,
      ),
      fill(
        'rightFill', [new Point(tri1[2].x, tri1[1].y), tri1[2], tri1[1]],
        colors.fill2,
      ),
      tri('tri', tri1),
      rect(
        'leftRect', rectPoints(tri1, true, -0.02, -0.01, -0.005, 0.01),
        colors.construction1, 'h', '', '','B',
      ),
      rect(
        'rightRect', rectPoints(tri1, false, 0.005, -0.01, 0.02, 0.01),
        colors.construction2, '', '', 'h','C',
      ),
      base('base', tri1[0], tri1[1], -0.3, 'base'),
      height('height', new Point(tri1[1].x, tri1[2].y), tri1[1], 0.3, 'height'),
    ],
    mods: {
      scenarios: {
        area2: { rotation: -side.ang + Math.PI, position: [-0.5, -1.1] },
        summary2: { rotation: -side.ang + Math.PI, position: [-0.0, -0.9] },
        default: { rotation: 0, position: [0, -0.3] },
        summary: { rotation: 0, position: [0, 0] },
        qr: { rotation: 0, position: [0, -0.1] },
      },
    },
  };

  const area2 = {
    name: 'area2',
    method: 'collection',
    addElements: [
      fill(
        'rightFill', [new Point(tri2[2].x, tri2[1].y), tri2[2], tri2[1]],
        colors.fill2,
      ),
      fill(
        'leftFill', [tri2[0], tri2[2], new Point(tri2[2].x, tri2[0].y)],
        colors.fill1,
      ),
      fill('triFill', [tri2[0], tri2[2], tri2[1]], colors.fill),
      tri('tri', tri2),
      rect(
        'leftRect', rectPoints(tri2, true, -0.01, 0.0, -0.005, 0.0),
        colors.construction1, 'h', '', '','B',
      ),
      rect(
        'rightRect', rectPoints(tri2, false, -0.02, -0.01, 0.02, 0.01),
        colors.construction2, '', 'C', 'h','',
      ),
      base('base', tri2[0], tri2[1], -0.3, 'base'),
      height('height', tri2[0], new Point(tri2[0].x, tri2[2].y), -0.7, 'height'),
    ],
    mods: {
      scenarios: {
        // area2: { rotation: -side.ang + Math.PI, position: [0, -0.9] },
        area2: { position: [-0.5, -0.2] },
      },
    },
  };

  const sub = (content, subscript) => ({
    sub: { content, subscript },
  });
  const top = (content, commentText, symbol) => ({
    topComment: {
      content,
      comment: commentText,
      symbol,
    },
  });
  const half = { frac: ['_1', '_2', 'v', 0.6] };
  const _half = { frac: ['__1', '__2', '_v', 0.6] };
  const __half = { frac: ['___1', '___2', '__v', 0.6] };

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      color: colors.diagram.text.base,
      elements: {
        Area: { color: colors.sides },
        _Area: { text: 'Area', color: colors.construction1 },
        __Area: { text: 'Area', color: colors.construction2 },
        tri: { text: 'triangle', color: colors.sides },
        trihb: { text: 'triangle hB', color: colors.construction1 },
        trihc: { text: 'triangle hC', color: colors.construction2 },
        h: 'h',
        _h: { text: 'h', color: colors.construction1 },
        B: { text: 'B', color: colors.construction1 },
        __h: { text: 'h', color: colors.construction2 },
        C: { text: 'C', color: colors.construction2 },
        equals: '  =  ',
        mul: ' \u00D7 ',
        plus: '  +  ',
        minus: '  –  ',
        _1: '1',
        _2: '2',
        v: { symbol: 'vinculum' },
        __1: { text: '1', color: colors.construction1 },
        __2: { text: '2', color: colors.construction1 },
        _v: { symbol: 'vinculum', color: colors.construction1 },
        ___1: { text: '1', color: colors.construction2 },
        ___2: { text: '2', color: colors.construction2 },
        __v: { symbol: 'vinculum', color: colors.construction2 },
        brace: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.disabled,
        },
        _brace: {
          symbol: 'brace', side: 'top', numLines: 3, color: colors.disabled,
        },
        sBrace: {
          symbol: 'brace', side: 'top', numLines: 1, color: colors.disabled,
        },
        lb: { symbol: 'bracket', side: 'left' },
        rb: { symbol: 'bracket', side: 'right' },
        s: { symbol: 'xStrike', color: colors.disabled },
        _s: { symbol: 'xStrike', color: colors.disabled },
        base: { color: colors.sides },
        height: { color: colors.sides },
      },
      forms: {
        '0': [
          sub('Area', 'tri'), 'equals',
          sub('_Area', 'trihb'), 'plus', sub('__Area', 'trihc'),
        ],
        '1': [
          sub('Area', 'tri'), 'equals',
          top(sub('_Area', 'trihb'), [_half, '_h', 'B'], 'brace'),
          'plus',
          top(sub('__Area', 'trihc'), [__half, '__h', 'C'], '_brace'),
        ],
        '2': [
          sub('Area', 'tri'), 'equals', '    ', _half, ' ', '_h', ' ', 'B',
          'plus', __half, ' ', '__h', ' ', 'C',
        ],
        '3': [
          sub('Area', 'tri'), 'equals',
          { brac: [[_half, ' ', '_h', ' ', 'B', 'plus', __half, ' ', '__h', ' ', 'C'], 'lb', 'rb'] },
        ],
        '4': [
          sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul',
          {
            brac: [
              [
                { strike: [[_half, ' ', '_h'], 's'] }, ' ', 'B',
                'plus',
                { strike: [[__half, ' ', '__h'], '_s'] }, ' ', 'C',
              ],
              'lb', 'rb',
            ],
          },
        ],
        '5': [
          sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul',
          { brac: [['B', 'plus', 'C'], 'lb', 'rb'] },
        ],
        '6': [
          sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul',
          top({ brac: [['B', 'plus', 'C'], 'lb', 'rb'] }, 'base', 'brace'),
        ],
        '7': [sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul', 'base'],
        '8': [
          sub('Area', 'tri'), 'equals', half,
          top([' ', 'h', ' '], 'height', 'sBrace'),
          'mul', 'base',
        ],
        '9': [
          sub('Area', 'tri'), 'equals', half, '  ', 'height', 'mul', 'base',
        ],
        '10': [
          'Area', 'equals', half, '  ', 'height', 'mul', 'base',
        ],
        // /////////////////////////////////////////////
        // /////////////////////////////////////////////
        // /////////////////////////////////////////////
        // /////////////////////////////////////////////
        '20': [
          sub('Area', 'tri'), 'equals',
          sub('__Area', 'trihc'), 'minus', sub('_Area', 'trihb'),
        ],
        '21': [
          sub('Area', 'tri'), 'equals',
          top(sub('__Area', 'trihc'), [__half, '__h', 'C'], 'brace'),
          'minus',
          top(sub('_Area', 'trihb'), [_half, '_h', 'B'], '_brace'),
        ],
        '22': [
          sub('Area', 'tri'), 'equals', '    ', __half, ' ', '__h', ' ', 'C',
          'minus', _half, ' ', '_h', ' ', 'B',
        ],
        '23': [
          sub('Area', 'tri'), 'equals',
          { brac: [[__half, ' ', '__h', ' ', 'C', 'minus', _half, ' ', '_h', ' ', 'B'], 'lb', 'rb'] },
        ],
        '24': [
          sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul',
          {
            brac: [
              [
                { strike: [[__half, ' ', '__h'], 's'] }, ' ', 'C',
                'minus',
                { strike: [[_half, ' ', '_h'], '_s'] }, ' ', 'B',
              ],
              'lb', 'rb',
            ],
          },
        ],
        '25': [
          sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul',
          { brac: [['C', 'minus', 'B'], 'lb', 'rb'] },
        ],
        '26': [
          sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul',
          top({ brac: [['C', 'minus', 'B'], 'lb', 'rb'] }, 'base', 'brace'),
        ],
        '27': [sub('Area', 'tri'), 'equals', half, ' ', 'h', ' ', 'mul', 'base'],
        '28': [
          sub('Area', 'tri'), 'equals', half,
          top([' ', 'h', ' '], 'height', 'sBrace'),
          'mul', 'base',
        ],
        '29': [
          sub('Area', 'tri'), 'equals', half, '  ', 'height', 'mul', 'base',
        ],
        '30': [
          'Area', 'equals', half, '  ', 'height', 'mul', 'base',
        ],
      },
    },
    mods: {
      scenarios: {
        default: { position: [-0.6, 0.7] },
        summary: { position: [-0.4, 0.4] },
        // qr: { position: [-0.4, -1.3] },
        qr: { position: [-0.6, 0.7] },
        area2: { position: [-0.6, 0.9] },
      },
    },
  };

  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////
  layout.bounds = new Rect(-2.4, -1.2, 4.8, 2.2);
  layout.minSeparation = 0.4;
  layout.gridSpacing = 0.2;
  layout.baseY = -1.3;
  layout.heightX = 2.5;
  const dimHeight = {
    name: 'height',
    method: 'line',
    options: {
      vertexSpaceStart: 'start',
      width: 0.01,
      arrows: {
        height: 0.04,
        width: 0.04,
      },
      angle: Math.PI / 2,
      color: colors.sides,
      position: [layout.heightX, -0.5],
      label: {
        text: null,
        location: 'right',
        offset: 0.05,
      },
      length: 1,
    },
  };

  const dimBase = {
    name: 'base',
    method: 'line',
    options: {
      vertexSpaceStart: 'start',
      width: 0.01,
      arrows: {
        height: 0.04,
        width: 0.04,
      },
      angle: 0,
      color: colors.sides,
      position: [-0.5, layout.baseY],
      label: {
        text: null,
        location: 'bottom',
        offset: 0.05,
      },
      length: 1,
    },
  };

  const implicationsGrid = {
    name: 'grid',
    method: 'grid',
    options: {
      bounds: layout.bounds,
      xStep: layout.gridSpacing,
      yStep: layout.gridSpacing,
      numLinesThick: 2,
      color: colors.grid,
    },
  };

  const implicationsTri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      // borderToPoint: 'alwaysOn',
      color: colors.sides,
      points: [[-1, -1], [0, 0.8], [1, -1]],
      close: true,
      width: 0.03,
      // pad: {
      //   color: [1, 0, 0, 0.4],
      //   radius: 0.1,
      //   touchRadius: 0.3,
      //   sides: 100,
      //   // isMovable: true,
      // },
    },
  };

  const pad = (name, position) => ({
    name,
    method: 'polygon',
    options: {
      color: [1, 0, 0, 0.4],
      radius: 0.15,
      sides: 100,
      position,
      fill: true,
    },
    mods: {
      move: {
        canBeMovedAfterLoosingTouch: true,
      },
    },
  });

  const implicationsText = {
    name: 'text',
    method: 'text',
    options: {
      text: 'Area',
      alignH: 'center',
      position: [0, -1.8],
      color: colors.sides,
      size: 0.15,
    },
  };

  const implications = {
    name: 'implications',
    method: 'collection',
    addElements: [
      pad('pad0', [-1, -1]),
      pad('pad1', [0, 0.8]),
      pad('pad2', [1, -1]),
      implicationsGrid,
      implicationsTri,
      dimHeight,
      dimBase,
      implicationsText,
    ],
  };

  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  const heightLine = (position, length) => ({
    name: 'height',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'line',
        options: {
          angle: Math.PI / 2,
          color: colors.sides,
          width: 0.01,
          length,
          dashStyle: {
            style: [0.05, 0.02],
          },
          label: {
            text: 'height',
            orientation: 'horizontal',
            offset: 0.07,
            location: 'left',
          },
        },
      },
      {
        name: 'angle',
        method: 'angle',
        options: {
          angle: Math.PI / 2,
          color: colors.sides,
          autoRightAngle: true,
          curve: {
            width: 0.01,
            radius: 0.2,
          },
        },
      },
    ],
    options: {
      position,
    },
  });

  const height1 = {
    name: 'height1',
    method: 'collection',
    addElements: [
      base('base', tri1[0], tri1[1], -0.3, 'base'),
      heightLine([tri1[2].x, tri1[0].y], tri1[2].y - tri1[0].y),
      tri('tri', tri1),
    ],
    mods: {
      scenarios: {
        default: { position: [-1.4, -0.25], scale: 0.8 },
        summary: { position: [-1.4, -0.65], scale: 0.8 },
        qr: { position: [-1.4, -0.25], scale: 0.8 },
      },
    },
  };

  const height2 = {
    name: 'height2',
    method: 'collection',
    addElements: [
      heightLine([tri2[2].x, tri2[0].y], tri2[2].y - tri2[0].y),
      {
        name: 'baseExtension',
        method: 'line',
        options: {
          color: colors.sides,
          width: 0.01,
          length: 0.8,
          angle: Math.PI,
          position: tri2[0],
          dashStyle: {
            style: [0.05, 0.02],
          },
          vertexSpaceStart: 'start',
        },
      },
      base('base', tri2[0], tri2[1], -0.3, 'base'),
      tri('tri', tri2),
    ],
    mods: {
      scenarios: {
        default: { position: [1.3, 0], scale: 0.8 },
        summary: { position: [1.3, -0.4], scale: 0.8 },
        qr: { position: [1.3, 0], scale: 0.8 },
      },
    },
  };

  layout.addElements = [
    intro,
    rectangle,
    rectEqn,
    area1,
    area2,
    eqn,
    implications,
    height1,
    height2,
  ];
  return layout;
}