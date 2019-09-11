// @flow
import Fig from 'figureone';

import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
import CommonCollectionObjects from './diagramCollectionCommon';
import CommonCollectionCircle from './dcCircle';
import CommonDiagramCollection from '../../../../../common/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _objects: CommonCollectionObjects;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    // this.diagram.addElements(this, this.layout.addObjectsElements);
    this.add('objects', new CommonCollectionObjects(diagram, this.layout));
    this.add('circle', new CommonCollectionCircle(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
