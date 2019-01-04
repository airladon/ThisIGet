// @flow
import Fig from 'figureone';
// import {
//   Transform,
// } from '../../../../../../js/diagram/tools/g2';
import lessonLayout from '../quickReference/layout';
import CommonDiagramCollection from '../../../../../LessonsCommon/DiagramCollection';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
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
