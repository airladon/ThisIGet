// @flow

import {
  Transform,
} from '../../../../../js/diagram/tools/g2';

// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';

import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';


export default class CommonLessonDiagramCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform(),
  ) {
    super(diagram, layout, transform);
  }
}
