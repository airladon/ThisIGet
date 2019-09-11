// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// eslint-disable-next-line import/no-cycle
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import CommonLessonDiagram from '../../../../../common/CommonLessonDiagram';
// eslint-disable-next-line import/no-cycle
import QuizCollection from './diagramCollectionQuiz';

const { Transform } = Fig;
export default class DiagramCollection extends CommonDiagramCollection {
  _quiz: QuizCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('quiz', new QuizCollection(diagram, this.layout));
  }
}
