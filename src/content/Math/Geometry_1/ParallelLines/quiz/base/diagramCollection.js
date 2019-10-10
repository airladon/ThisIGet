// @flow
import Fig from 'figureone';
import diagramLayout from './layout';
// eslint-disable-next-line import/no-cycle
import CommonDiagramCollection from '../../../../../common/DiagramCollection';
import CommonTopicDiagram from '../../../../../common/CommonTopicDiagram';
// eslint-disable-next-line import/no-cycle
import QuizCollection from './diagramCollectionQuiz';
import Quiz2Collection from './diagramCollectionQuiz2';

const { Transform } = Fig;
export default class DiagramCollection extends CommonDiagramCollection {
  _quiz1: QuizCollection;
  _quiz2: Quiz2Collection;

  constructor(
    diagram: CommonTopicDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = diagramLayout();
    super(diagram, layout, transform);

    this.add('quiz1', new QuizCollection(diagram, this.layout));
    this.add('quiz2', new Quiz2Collection(diagram, this.layout));
  }
}
