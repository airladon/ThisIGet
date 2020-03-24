// @flow
// import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

// const {
//   // Point,
//   // Transform,
//   // Line,
// } = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrExternalAngles_sides = colors.get('blue').rgb;
  colors.qrExternalAngles_externalSide = colors.get('grey', 'base').rgb;
  colors.qrExternalAngles_disabled = colors.get('grey', 'darker').rgb;
  colors.qrExternalAngles_angles = colors.get('green').rgb;
  colors.qrExternalAngles_externalAngle = colors.get('red').rgb;
  const angle = text => ({
    color: colors.qrExternalAngles_angles,
    label: {
      text,
      radius: 0.43,
      scale: 0.9,
    },
    curve: {
      radius: 0.4,
      width: 0.02,
      sides: 201,
    },
  });

  const points = [[-2, -1], [0, 0.6], [0.7, -1]];
  const tri = {
    name: 'tri',
    method: 'polyline',
    options: {
      points,
      width: 0.03,
      color: colors.qrExternalAngles_sides,
      close: true,
      angle: [
        angle('a'),
        angle('b'),
        angle('c'),
      ],
    },
  };

  const line = {
    name: 'externalLine',
    method: 'line',
    options: {
      vertextSpaceStart: 'start',
      position: points[2],
      length: 1,
      dashStyle: {
        style: [0.05],
      },
      width: 0.03,
      color: colors.qrExternalAngles_externalSide,
    },
  };

  const adjacent = {
    name: 'adjacent',
    method: 'line',
    options: {
      // vertextSpaceStart: 'start',
      p1: points[2],
      p2: points[1],
      width: 0.02,
      color: colors.qrExternalAngles_sides,
    },
  };

  const externalAngle = {
    name: 'externalAngle',
    method: 'angle',
    options: {
      label: {
        text: 'a + b',
        radius: 0.4,
        scale: 0.9,
      },
      curve: {
        radius: 0.4,
        width: 0.02,
        sides: 200,
      },
      color: colors.qrExternalAngles_externalAngle,
      position: points[2],
      p1: [points[2][0] + 1, points[2][1]],
      p2: points[2],
      p3: points[1],
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      externalAngle,
      adjacent,
      line,
      tri,
    ],
    mods: {
      scenarios: {
        default: { position: [0, 0], scale: 1 },
        left: { position: [-1, 0], scale: 1 },
      },
    },
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
