// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';
import CommonLessonDiagramCollection from '../common/diagramCollection';

// eslint-disable-next-line import/no-cycle
import QuizAngle1Collection from './diagramCollectionAngles1Quiz';
import type { TypeUnits } from '../../../../LessonsCommon/DiagramCollection';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  units: TypeUnits;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.units = 'deg';
    this.add('quizA1', new QuizAngle1Collection(diagram, this.layout));
    this.add('unitsSelector', this.makeUnitsSelector());
  }
}
