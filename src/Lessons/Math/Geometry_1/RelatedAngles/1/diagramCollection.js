// @flow
import Fig from 'figureone';
import lessonLayout from './layout';

// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';

import OppositeCollection from '../common/diagramCollectionOpposite';
import ThreeLinesCollection from '../common/diagramCollectionThreeLines';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import type { TypeUnits } from '../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _opposite: OppositeCollection;
  _threeLines: ThreeLinesCollection;
  units: TypeUnits;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.units = 'deg';
    this.add('opposite', new OppositeCollection(diagram, this.layout));
    this.add('threeLines', new ThreeLinesCollection(diagram, this.layout));
    this.add('unitsSelector', this.makeUnitsSelector());
  }

  // eslint-disable-next-line class-methods-use-this
  setUnits(units: TypeUnits) {
    this.units = units;
    if (this._opposite.isShown) {
      this._opposite.setUnits(units);
    }
    if (this._threeLines.isShown) {
      this._threeLines.setUnits(units);
    }
  }
}
