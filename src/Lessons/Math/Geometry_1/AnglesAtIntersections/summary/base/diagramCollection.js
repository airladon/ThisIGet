// @flow
import Fig from 'figureone';

import lessonLayout from '../../explanation/base/layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonCollectionOpposite from '../../explanation/base/diagramCollectionCommonOpposite';
import CommonCollectionThreeLines from '../../explanation/base/diagramCollectionCommonThreeLines';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  _opposite: CommonCollectionOpposite;
  _threeLines: CommonCollectionThreeLines;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('opposite', new CommonCollectionOpposite(diagram, this.layout));
    this.add('threeLines', new CommonCollectionThreeLines(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
