// @flow
import Fig from 'figureone';
import lessonLayout from '../quickReference/layout';
// eslint-disable-next-line import/no-cycle
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import * as qr from '../quickReference/quickReference';

const { Transform } = Fig;

export default class DiagramCollection extends CommonDiagramCollection {
  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform('Dev'),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);
    Object.keys(qr).forEach((key) => {
      this.add(key, new qr[key](diagram, transform));
    });
    this.hasTouchableElements = true;
  }
}
