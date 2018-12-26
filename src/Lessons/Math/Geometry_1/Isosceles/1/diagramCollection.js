// @flow
import Fig from 'figureone';

import lessonLayout from '../common/layout';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import IsocelesCollection from '../common/diagramCollectionIsoceles';
import EquilateralCollection from '../common/diagramCollectionEquilateral';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _iso: IsocelesCollection;
  _equil: EquilateralCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('iso', new IsocelesCollection(diagram, this.layout));
    this.add('equil', new EquilateralCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
