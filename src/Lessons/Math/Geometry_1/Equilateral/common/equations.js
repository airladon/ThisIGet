// @flow
import Fig from 'figureone';

const {
  Diagram, DiagramElementPrimative, DiagramElementCollection,
  Equation,
} = Fig;

export type TypeTriangleAreaEquationCollection = {
  _Area: DiagramElementPrimative;
  _rectangle: DiagramElementPrimative;
  _triangle: DiagramElementPrimative;
  _equals: DiagramElementPrimative;
  _A: DiagramElementPrimative;
  _B: DiagramElementPrimative;
  _mul: DiagramElementPrimative;
  __1: DiagramElementPrimative;
  __2: DiagramElementPrimative;
  _v: DiagramElementPrimative;
} & DiagramElementCollection;

export type TypeTriangleAreaEquation = {
  collection: TypeTriangleAreaEquationCollection;
} & Equation;

export function addIsocelesEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const eqn = diagram.equation.makeEqn();
  const aColor = layout.colors.angles;
  const bColor = layout.colors.angles;
  const colText = layout.colors.diagram.text.base;

  eqn.createElements(
    {
      a: ['a', aColor],
      b: ['b', bColor],
      b_: ['b', bColor],
      b__: ['b', bColor],
      equals: '  =  ',
      plus: ' + ',
      _2: '2',
      _180: '180º',
    },
    colText,
  );
  eqn.formAlignment.fixTo = eqn.collection._equals;
  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;

  eqn.addForm('0', [
    '_2', 'a', 'plus', 'b',
    'equals',
    '_180',
  ]);

  eqn.addForm('1', [
    '2', 'a', 'plus', 'b',
    'equals',
    '_180',
  ]);

  const trianglesArea = numSides => eqn.phrase([
    eqn.bottomComment('Area', 'triangles'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'space', 'h', 'space',
    'mul_',
    'b',
    'mul',
    numSides,
  ]);
  eqn.addForm('1', [trianglesArea('least')], { formType: '0' });
  eqn.addForm('1', [trianglesArea('medium')], { formType: '1' });
  eqn.addForm('1', [trianglesArea('most')], { formType: '2' });

  const triangleAreaRearranged = numSides => eqn.phrase([
    eqn.bottomComment('Area', 'triangles'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'space', 'h', 'space',
    'mul_',
    eqn.topComment(['b', 'mul', numSides], 'border', 'bt_'),
  ]);
  eqn.addForm('2', [triangleAreaRearranged('least')], { formType: '0' });
  eqn.addForm('2', [triangleAreaRearranged('medium')], { formType: '1' });
  eqn.addForm('2', [triangleAreaRearranged('most')], { formType: '2' });

  eqn.addForm('3', [
    eqn.bottomComment('Area', 'triangles'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'space', 'h', 'space',
    'mul_',
    'border',
  ]);

  eqn.addForm('4', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'space', 'h', 'space',
    'mul_',
    'border',
  ]);

  eqn.addForm('5', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    eqn.topComment(['space', 'h', 'space'], 'r_', 'bt'),
    'mul_',
    'border',
  ]);

  eqn.addForm('6', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'r_',
    'mul_',
    'border',
  ]);

  eqn.addForm('7', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'r_',
    'mul_',
    eqn.topComment('border', ['_2_', 'space', 'pi', 'space', 'r'], 'bt_'),
  ]);

  eqn.addForm('8', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'r_',
    'mul_',
    '_2_', 'space', 'pi', 'space', 'r',
  ]);

  eqn.addForm('9', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.sfrac('_1', '_2', 'v', 0.6), 'space',
    'mul_',
    '_2_', 'space', 'pi', 'space', 'r', 'space',
    'r_',
  ], {
    elementMods: {
      r_: { style: 'curved', direction: 'up', mag: 0.9 },
    },
  });

  eqn.addForm('10', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    eqn.strike(eqn.sfrac('_1', '_2', 'v', 0.6), 'x'), 'space',
    'mul_',
    eqn.strike('_2_', 'x_'), 'space', 'pi', 'space', 'r', 'space',
    'r_',
  ], {
    elementMods: {
      r_: { style: 'linear' },
    },
  });
  eqn.addForm('11', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    'pi', 'space', 'r', 'space',
    'r_',
  ]);

  eqn.addForm('12', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    'pi', 'space',
    eqn.strike('r', 'x'), 'space',
    eqn.sup('r_', ['space', '_2']),
  ]);

  eqn.addForm('13', [
    eqn.bottomComment('Area', 'circle'),
    'equals',
    'pi', 'space',
    eqn.sup('r_', ['space', '_2']),
  ]);

  eqn.addForm('14', [
    'AreaCircle',
    'equals',
    'pi', 'space',
    eqn.sup('r_', ['space', '_2']),
  ]);

  eqn.collection.setPosition(layout.triangleAreaEquation);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}

export function addBorderEquation(
  diagram: Diagram,
  layout: Object,
  addToCollection: DiagramElementCollection,
  name: string,
) {
  const sides = layout.polygonSides;
  const eqn = diagram.equation.makeEqn();
  const colBorder = layout.colors.border;
  const colText = layout.colors.diagram.text.base;
  // const colLine = layout.colors.line;
  eqn.createElements(
    {
      border: ['border', colBorder],
      equals: '  =  ',
      least: sides[0].toString(),
      medium: sides[1].toString(),
      most: sides[2].toString(),
      b: ['b', colBorder],
      mul: ' \u00D7 ',
    },
    colText,
  );

  eqn.formAlignment.hAlign = 'center';
  eqn.formAlignment.vAlign = 'baseline';
  eqn.formAlignment.scale = 1.0;

  const border = numSides => eqn.phrase([
    'border',
    'equals',
    'b',
    'mul',
    numSides,
  ]);
  eqn.addForm('0', [border('least')], { formType: '0' });
  eqn.addForm('0', [border('least')], { formType: '1' });
  eqn.addForm('0', [border('least')], { formType: '2' });

  eqn.collection.setPosition(layout.borderEquation);
  eqn.setCurrentForm('0');
  // eslint-disable-next-line no-param-reassign
  addToCollection.eqns[name] = eqn;
  addToCollection.add(name, eqn.collection);
}
