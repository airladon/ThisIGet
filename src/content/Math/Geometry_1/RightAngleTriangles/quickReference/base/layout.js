// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  Transform,
  // Line,
  // getPoint,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrRightAngleTriangle_sides = colors.get('blue').rgb;
  colors.qrRightAngleTriangle_rightAngle = colors.get('red').rgb;
  colors.qrRightAngleTriangle_angles = colors.get('green').rgb;
  // overly complicated as just a cut and past from explanation layout
  const leftSide = 3;
  const p0 = new Point(-1.7, -0.7);
  const p1 = p0
    .add(leftSide * Math.cos(Math.PI / 6), leftSide * Math.sin(Math.PI / 6));
  const height = p1.y - p0.y;
  const p2 = new Point(
    p1.x + height / Math.tan(Math.PI / 3),
    p0.y,
  );
  const triPoints = [p0, p1, p2];
  const t = new Transform()
    .translate(1.7, 0.7)
    .rotate(Math.PI / 6 * 5)
    .translate(leftSide, 0);
  const tri2Points = triPoints.map(p => p.transformBy(t.m()));

  const angle = (text, textScale, color = colors.qrRightAngleTriangle_angles, radius = 0.3) => ({
    curve: {
      radius,
      sides: 100,
    },
    label: {
      text,
      scale: textScale,
    },
    autoRightAngle: true,
    color,
  });
  const side = (text, scale) => ({
    label: {
      text, location: 'outside', offset: 0.05, scale,
    },
  });

  // eslint-disable-next-line max-len
  const tri = {
    name: 'tri',
    method: 'polyline',
    options: {
      color: colors.qrRightAngleTriangle_sides,
      close: true,
      width: 0.03,
      points: tri2Points,
      side: [
        side('A', 1.2),
        side('B', 1.2),
        side('C', 1.2),
      ],
      angle: [
        angle(''),
        angle('', 1, colors.qrRightAngleTriangle_rightAngle, 0.4),
        angle(''),
      ],
    },
    mods: {
      scenarios: {
        qr: { position: [-1.3, -0.5], scale: 1 },
      },
    },
  };


  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////
  const elements = {
    A: { color: colors.qrRightAngleTriangle_sides },
    B: { color: colors.qrRightAngleTriangle_sides },
    C: { text: 'C', color: colors.qrRightAngleTriangle_sides },
    equals: '   =   ',
    plus: ' + ',
    _1: '1',
    _2a: '2',
    _2b: '2',
    _2c: '2',
    v: { symbol: 'vinculum' },
    Area: { text: 'Area', color: colors.qrRightAngleTriangle_sides },
  };

  const half = { frac: ['_1', 'v', '_2a', 0.7] };
  const sup = (content, s) => ({ sup: [content, ['  ', s]] });

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      color: colors.diagram.text.base,
      defaultFormAlignment: {
        xAlign: 'center',
        yAlign: 'baseline',
      },
      scale: 1.5,
      elements,
      forms: {
        '0': [
          sup('A', '_2a'), 'plus', sup('B', '_2b'),
          'equals',
          sup('C', '_2c'),
        ],
        'area': ['Area', 'equals', half, ' ', 'A', ' ', 'B'],
      },
    },
    mods: {
      scenarios: {
        qr: { position: [0, -1.5], scale: 1 },
      },
    },
  };


  layout.addElements = [
    tri,
    eqn,
  ];
  return layout;
}
