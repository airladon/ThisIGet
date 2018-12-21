// @flow
import {
  Transform,
} from '../../../../../js/diagram/tools/g2';
import lessonLayout from './layout';
// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';
import CommonLessonDiagramCollection from '../common/diagramCollection';
// eslint-disable-next-line import/no-cycle
import QuizCollection from './diagramCollectionQuiz';

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _quiz: QuizCollection;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('quiz', new QuizCollection(diagram, this.layout));
  }
}
