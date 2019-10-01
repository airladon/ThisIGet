// @flow
import Fig from 'figureone';
import diagramLayout from './layout';
// eslint-disable-next-line import/no-cycle
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
// eslint-disable-next-line import/no-cycle
import QuizCollection from './diagramCollectionQuiz';

const { Transform } = Fig;
export default class DiagramCollection extends CommonDiagramCollection {
  _quiz: QuizCollection;

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);
    this.add('quiz', new QuizCollection(diagram, this.layout));
  }
}
