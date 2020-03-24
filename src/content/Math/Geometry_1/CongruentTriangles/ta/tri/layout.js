// @flow
// import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

// const {
//   Point,
//   Transform,
//   // Line,
// } = Fig;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.pads = colors.get('yellow', 'darkest').rgb;
  colors.construction = colors.get('yellow', 'darkest').rgb;
  colors.disabled = colors.get('diagram', 'disabled', 'darker').rgb;
  colors.highlight = colors.get('green').rgb;
  layout.width = 0.02;

  layout.tri = {
    name: 'tri',
    method: 'polyline',
    options: {
      points: [
        [1, 2 * (Math.sqrt(3) / 2 - 0.5)],
        [2, -1],
        [-2, -1],
      ],
      color: colors.sides,
      width: layout.width,
      close: true,
      makeValid: {
        shape: 'triangle',
        hide: {
          minAngle: 10 * Math.PI / 180,
          maxAngle: 170 * Math.PI / 180,
          minSide: 0.8,
        },
      },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
          sides: 100,
        },
        label: {
          radius: 0.31,
        },
        autoRightAngle: true,
      },
      pad: {
        color: [0, 0, 0, 0.001],
        radius: 0.07,
        touchRadius: 0.8,
        sides: 30,
        fill: true,
        isMovable: true,
        boundary: [-2.65, -1.8, 5.3, 3.6],
      },
      side: {
        label: {
          offset: 0.1,
          precision: 2,
        },
      },
    },
  };

  layout.addElements = [
    // layout.oneProp,
    layout.tri,
    // layout.angleTri,
  ];

  return layout;
}
