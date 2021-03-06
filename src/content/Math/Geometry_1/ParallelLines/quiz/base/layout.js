// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const { Rect, Point } = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.lines = colors.get('grey', 'dark').rgb;
  colors.selected = colors.get('red').rgb;
  colors.movable = colors.get('blue').rgb;
  layout.length = 1.5;
  layout.width = 0.03;
  layout.scale = {
    long: 2.55,
    short: 0.5,
  };
  layout.line = {
    method: 'line',
    options: {
      length: layout.length,
      width: layout.width,
      color: colors.lines,
      vertexSpaceStart: 'center',
      move: {
        type: 'centerTranslateEndRotation',
        middleLengthPercent: 0.5,
        translationBounds: new Rect(-2.5, -1.5, 5, 3),
      },
    },
    mods: {
      scenarios: {
        center: { position: new Point(0, 0.4), rotation: 0, scale: 1 },
      },
      _line: {
        isInteractive: true,
        interactiveLocation: new Point(layout.length / 3 * 0.8, 0),
      },
      _midLine: {
        isInteractive: true,
      },
    },
  };
  // layout.line1 = joinObjects({}, layout.line, {
  //   name: 'line1',
  // });
  // layout.line2 = joinObjects({}, layout.line, {
  //   name: 'line2',
  //   mods: {
  //     scenarios: {
  //       center: { position: new Point(0, -0.4) },
  //     },
  //   },
  // });
  // layout.addElements = [
  //   layout.line1,
  //   layout.line2,
  // ];

  layout.line1 = joinObjects({}, layout.line, { name: 'line1' });
  layout.line2 = joinObjects({}, layout.line, { name: 'line2' });
  layout.line3 = joinObjects({}, layout.line, { name: 'line3' });
  layout.line4 = joinObjects({}, layout.line, { name: 'line4' });
  layout.line5 = joinObjects({}, layout.line, { name: 'line5' });
  layout.line6 = joinObjects({}, layout.line, { name: 'line6' });

  layout.addElements = [
    layout.line1,
    layout.line2,
    layout.line3,
    layout.line4,
    layout.line5,
    layout.line6,
  ];
  return layout;
}
