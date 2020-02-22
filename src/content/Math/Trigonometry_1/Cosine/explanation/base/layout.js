// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  // colors.lines = colors.get('blue').rgb;

  // const eqn = {
  //   name: 'eqn',
  //   method: 'addEquation',
  //   options: {
  //     color: colors.diagram.text.base,
  //     scale: 0.9,
  //     elements: {
  //       equals: '  =  ',
  //       a: { color: colors.angles },
  //       b: { color: colors.angles },
  //       v: { symbol: 'vinculum' },
  //       brace: {
  //         symbol: 'brace', side: 'top', numLines: 3, color: colors.working,
  //       },
  //       lb: { symbol: 'bracket', side: 'left' },
  //       rb: { symbol: 'bracket', side: 'right' },
  //       strike: { symbol: 'xStrike', color: colors.working },
  //       r: { symbol: 'radical', color: colors.sides },
  //     },
  //     defaultFormAlignment: {
  //       fixTo: 'equals',    // Points can also be defined as objects
  //       alignH: 'center',
  //       alignV: 'baseline',
  //     },
  //     forms: {
  //       '0': ['a', 'equals', 'b'],
  //     },
  //   },
  // };

  layout.addElements = [
  ];
  return layout;
}
