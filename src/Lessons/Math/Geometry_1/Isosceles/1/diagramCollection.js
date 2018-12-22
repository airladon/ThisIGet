// @flow
import Fig from 'figureone';

// import {
//   Transform,
// } from '../../../../../js/diagram/tools/g2';
import lessonLayout from './layout';

// eslint-disable-next-line import/no-cycle
// import LessonDiagram from './diagram';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

import IsocelesCollection from '../common/diagramCollectionIsoceles';
import QuickReferenceCollection from '../common/diagramCollectionQuickReference';
import EquilateralCollection from '../common/diagramCollectionEquilateral';
import CommonLessonDiagramCollection from '../common/diagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _iso: IsocelesCollection;
  _equil: EquilateralCollection;
  _qr: QuickReferenceCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('iso', new IsocelesCollection(diagram, this.layout));
    this.add('equil', new EquilateralCollection(diagram, this.layout));
    this.add('qr', new QuickReferenceCollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
