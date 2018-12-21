// @flow
import Fig from 'figureone';
import lessonLayout from './layout';

// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';
import AdjacentCollection from '../common/diagramCollectionAdjacent';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import type { TypeUnits } from '../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _adjacent: AdjacentCollection;
  units: TypeUnits;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);
    this.units = 'deg';
    this.add('adjacent', new AdjacentCollection(diagram, this.layout));
    this.add('unitsSelector', this.makeUnitsSelector());
    this._adjacent.setPosition(this.layout.position);
    this.hasTouchableElements = true;
  }

  // eslint-disable-next-line class-methods-use-this
  setUnits(units: TypeUnits) {
    this.units = units;
    if (this._adjacent.isShown) {
      this._adjacent.setUnits(units);
    }
  }
}
