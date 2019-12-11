// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  // Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.sides = colors.get('blue', 'base').rgb;
  colors.areaTri = colors.get('diagram', 'construction6', 'darkest').rgb;
  colors.areaTriLabel = colors.get('diagram', 'construction6').rgb;
  colors.areaPoly = colors.get('diagram', 'construction6', 'darkest').rgb;
  colors.areaPolyLabel = colors.get('diagram', 'construction6').rgb;
  colors.areaCircle = colors.get('diagram', 'construction6', 'darkest').rgb;
  colors.areaCircleLabel = colors.get('diagram', 'construction6').rgb;
  //
  colors.height = colors.get('diagram', 'construction7').rgb;
  colors.border = colors.get('diagram', 'construction8').rgb;
  colors.radius = colors.get('diagram', 'construction7').rgb;
  colors.circumference = colors.get('diagram', 'disabledDark').rgb;
  //
  colors.disabled = colors.get('grey', 'darker').rgb;
  colors.disabledLabel = colors.get('grey', 'base').rgb;
  //
  colors.grid = colors.get('grey', 'darker').rgb;
  const radius = 1.25;
  layout.radius = radius;
  const circle = {
    name: 'circle',
    method: 'polygon',
    options: {
      radius: radius + 0.02,
      width: 0.03,
      sides: 200,
      color: colors.sides,
    },
  };

  const lightCircle = {
    name: 'lightCircle',
    method: 'polygon',
    options: {
      radius: radius + 0.02,
      width: 0.02,
      sides: 200,
      color: colors.disabled,
    },
  };

  const circleFill = {
    name: 'circleFill',
    method: 'polygon',
    options: {
      radius,
      fill: true,
      sides: 100,
      color: colors.areaCircle,
    },
  };

  const grid = {
    name: 'grid',
    method: 'grid',
    options: {
      xStep: 0.25,
      yStep: 0.25,
      bounds: new Rect(-radius, -radius, radius * 2, radius * 2),
      color: colors.grid,
    },
  };

  layout.polygonSides = [
    6,
    10,
    50,
  ];
  const triAngle = layout.polygonSides.map(a => Math.PI * 2 / a);
  const triPoints = triAngle.map(a => [
    [0, 0],
    [radius, 0],
    [radius * Math.cos(a), radius * Math.sin(a)],
  ]);

  const poly = (name, index) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: 'fill',
        method: 'polygon',
        options: {
          radius,
          fill: true,
          sides: layout.polygonSides[index],
          color: colors.areaPoly,
        },
      },
      {
        name: 'triFill',
        method: 'fan',
        options: {
          points: triPoints[index],
          color: colors.areaTri,
        },
      },
      {
        name: 'lines',
        method: 'radialLines',
        options: {
          outerRadius: radius,
          dAngle: Math.PI * 2 / layout.polygonSides[index],
          color: colors.sides,
          width: 0.008,
        },
      },
      {
        name: 'borderHighlight',
        method: 'polygon',
        options: {
          radius,
          width: 0.02,
          sides: layout.polygonSides[index],
          color: colors.border,
        },
      },
      {
        name: 'border',
        method: 'polygon',
        options: {
          radius,
          width: 0.008,
          sides: layout.polygonSides[index],
          color: colors.sides,
        },
      },
      {
        name: 'height',
        method: 'line',
        options: {
          p1: [0, 0],
          p2: [
            radius * Math.cos(triAngle[index] / 2) * Math.cos(triAngle[index] / 2),
            radius * Math.cos(triAngle[index] / 2) * Math.sin(triAngle[index] / 2),
          ],
          width: 0.015,
          label: {
            text: 'h',
            offset: 0.05,
            location: 'outside',
          },
          color: colors.height,
        },
      },
      {
        name: 'radius',
        method: 'line',
        options: {
          p1: [0, 0],
          p2: [radius, 0],
          width: 0.015,
          label: {
            text: 'r',
            offset: 0.05,
            location: 'outside',
          },
          color: colors.height,
        },
        mods: {
          scenarios: {
            height: { rotation: triAngle[index] / 2 },
            circle: { rotation: 0 },
          },
        },
      },
      {
        name: 'base',
        method: 'line',
        options: {
          p2: [radius, 0],
          p1: [
            radius * Math.cos(triAngle[index]),
            radius * Math.sin(triAngle[index]),
          ],
          width: 0.015,
          offset: 0.3,
          label: {
            text: 'b',
            offset: 0.05,
            location: 'outside',
          },
          arrows: {
            width: 0.05,
            height: 0.05,
          },
          color: colors.border,
        },
      },
    ],
  });

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      circleFill,
      grid,
      circle,
      lightCircle,
      // polyFill('polyFill', layout.polygonSides[0]),
      // polyFill('polyFillMore', layout.polygonSides[1]),
      // polyFill('polyFillMost', layout.polygonSides[2]),
      poly('poly', 0),
      poly('polyMore', 1),
      poly('polyMost', 2),
    ],
    mods: {
      scenarios: {
        center: { position: [0, -0.2] },
        left: { position: [-1.2, -0.2] },
      },
    },
  };

  const AreaTri = {
    bottomComment: {
      content: 'Area', comment: 'tri', scale: 0.5, contentSpace: 0,
    },
  };
  const AreaCirc = {
    bottomComment: {
      content: '_Area', comment: 'circle', scale: 0.5, contentSpace: 0,
    },
  };
  const AreaAll = {
    bottomComment: {
      content: '__Area', comment: 'allTri', scale: 0.5, contentSpace: 0,
    },
  };
  const top = (content, commentText, symbol) => ({
    topComment: {
      content,
      comment: commentText,
      symbol,
      inSize: false,
    },
  });
  const half = { frac: ['_1', '_2', 'v', 0.6] };
  const r2 = { sup: ['__r', [' ', '_2']] };
  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      scale: 1,
      defaultFormAlignment: {
        fixTo: 'equals',
      },
      elements: {
        Area: { color: colors.sides },
        _Area: { text: 'Area', color: colors.sides },
        __Area: { text: 'Area', color: colors.sides },
        tri: { text: 'triangle', color: colors.sides },
        allTri: { text: 'all triangles', color: colors.sides },
        circle: { text: 'circle', color: colors.sides },
        equals: '  =  ',
        mul: ' \u00D7 ',
        _mul: ' \u00D7 ',
        h: { text: 'h', color: colors.height },
        b: { text: 'b', color: colors.border },
        border: { text: ' border', color: colors.border },
        r: { text: 'r', color: colors.radius },
        _r: { text: 'r', color: colors.radius },
        __r: { text: 'r', color: colors.radius },
        _1: '1',
        _2: '2',
        __2: '2',
        pi: 'π',
        sides: { text: `${layout.polygonSides[0]}` },
        v: { symbol: 'vinculum' },
        brace: {
          symbol: 'brace', side: 'top', color: colors.disabledLabel,
        },
        sBrace: {
          symbol: 'brace', side: 'top', color: colors.disabledLabel,
        },
        x: { symbol: 'xStrike', color: colors.disabledLabel },
        _x: { symbol: 'xStrike', color: colors.disabledLabel },
      },
      forms: {
        '0': [AreaTri, 'equals', half, ' ', 'h', ' ', 'mul', ' ', 'b'],
        '1': [AreaAll, 'equals', half, ' ', 'h', ' ', 'mul', ' ', 'b', ' ', '_mul', ' ', 'sides'],
        '2': [
          AreaAll, 'equals', half, ' ', 'h', ' ', 'mul', ' ',
          top(['b', ' ', '_mul', ' ', 'sides'], 'border', 'brace'),
        ],
        '3': [AreaAll, 'equals', half, ' ', 'h', ' ', 'mul', 'border'],
        '4': [AreaCirc, 'equals', half, ' ', 'h', ' ', 'mul', 'border'],
        '5': [
          AreaCirc, 'equals', half,
          top([' ', 'h', ' '], [' ', 'r', ' '], 'sBrace'),
          'mul', 'border'],
        '6': {
          content: [AreaCirc, 'equals', half, ' ', 'r', ' ', 'mul', 'border'],
          translation: { r: ['linear'] },
        },
        '7': [
          AreaCirc, 'equals', half, ' ', 'r', ' ', 'mul',
          top('border', ['__2', ' ', 'pi', ' ', '_r'], 'brace'),
        ],
        '8': [
          AreaCirc, 'equals', half, ' ', 'r', ' ', 'mul', '__2', ' ', 'pi', ' ', '_r',
        ],
        '9': {
          content: [
            AreaCirc, 'equals', half, ' ', 'mul', '__2', ' ',
            'pi', ' ', '_r', ' ', 'r',
          ],
          translation: { r: ['curved', 'up', 0.8] },
        },
        '10': [
          AreaCirc, 'equals',
          { strike: [half, 'x'] },
          ' ', 'mul',
          { strike: ['__2', '_x'] }, ' ',
          'pi', ' ', '_r', ' ', 'r',
        ],
        '11': {
          content:  [AreaCirc, 'equals', 'pi', ' ', '_r', ' ', 'r'],
          translation: { r: ['linear'] },
        },
        '12': [
          AreaCirc, 'equals', 'pi', ' ',
          top(['_r', ' ', 'r'], r2, 'sBrace'),
        ],
        '13': [AreaCirc, 'equals', 'pi', ' ', r2],
        '14': ['_Area', 'equals', 'pi', ' ', r2],
      },
    },
    mods: {
      scenarios: {
        right: { position: [1.2, 0] },
        qr: { position: [2.7, 0.5], scale: 1.2 },
        summary: { position: [1.2, -0.2] },
      },
    },
  };


  layout.addElements = [
    fig,
    eqn,
  ];
  return layout;
}
