// @flow
import Fig from 'figureone';
import { makeAngle } from '../../../../LessonsCommon/tools/angle';
import type { TypeAngle } from '../../../../LessonsCommon/tools/angle';

const {
  Transform, Point, DiagramElementPrimative, Diagram,
} = Fig;

export type TypeLabeledAngle = TypeAngle;

export type TypeIndexAngle = {
  lineIndex: number;
  angleIndex: number;
} & TypeAngle;

export function makeLabeledAngle(
  diagram: Diagram,
  layout: Object,
  radius: number,
  color: Array<number>,
) {
  const eqn = diagram.equation.makeEqn();
  eqn.createElements(
    {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f',
      g: 'g',
      h: 'h',
      equals: ' = ',
      minus: ' \u2212 ',
      _180: '180º',
      pi: 'π',
    },
    layout.colors.diagram.text.base,
  );

  eqn.formAlignment.fixTo = new Point(0, 0);
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'middle';
  eqn.formAlignment.scale = 0.7;

  eqn.setElem('a', layout.colors.angleA);
  eqn.setElem('b', layout.colors.angleB);
  eqn.setElem('c', layout.colors.angleC);
  eqn.setElem('d', layout.colors.angleD);

  eqn.addForm('a', ['a']);
  eqn.addForm('b', ['b']);
  eqn.addForm('c', ['c']);
  eqn.addForm('d', ['d']);
  eqn.addForm('e', ['e']);
  eqn.addForm('f', ['f']);
  eqn.addForm('g', ['g']);
  eqn.addForm('h', ['h']);

  const angle = makeAngle(
    diagram,
    layout.angle.arc.radius,
    layout.angle.arc.width,
    layout.angle.arc.sides,
    color,
  );

  angle.addLabel(eqn, layout.angle.label.radius);
  // console.log(angle._label.transform.matrix())
  return angle;
}

export type TypeSupplementaryAngle = {
  scaleAndDisolve: () => {};
} & DiagramElementPrimative;

export function makeSupplementaryAngle(
  diagram: Diagram,
  layout: Object,
) {
  const arcLayout = layout.angle.arc;
  const arc = diagram.shapes.polygon({
    sides: arcLayout.sides,
    radius: arcLayout.radius,
    width: arcLayout.width * 2,
    sidesToDraw: arcLayout.sides / 2,
    color: layout.colors.supplementary,
    transform: new Transform().rotate(0).translate(0, 0),
  });

  arc.scaleAndDisolve = () => {
    arc.stop();
    arc.stop();
    arc.show();
    arc.pulseScaleNow(2, 1.2, 0.25,
      () => {
        arc.disolveOut(2);
      });
  };
  // arc.setPosition(layout.line1.opposite.position);
  return arc;
}
