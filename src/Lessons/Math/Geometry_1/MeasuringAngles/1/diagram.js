// @flow
import Fig from 'figureone';
import CircleCollection from './diagramCollectionCircle';
import type { TypeCircleCollectionExtended } from './diagramCollectionCircle';
import lessonLayout from './layout';
import AngleCircleDiagram from '../../../../LessonsCommon/AngleCircle/diagram';

const { DiagramElementCollection } = Fig;

type typeElements = {
  _circle: TypeCircleCollectionExtended;
} & DiagramElementCollection ;

// $FlowFixMe
class LessonDiagram extends AngleCircleDiagram {
  elements: typeElements;

  constructor(id: string) {
    super(id, lessonLayout(), CircleCollection);
  }
}

export default LessonDiagram;
