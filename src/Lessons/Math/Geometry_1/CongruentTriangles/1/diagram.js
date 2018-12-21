// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../common/diagram';

// eslint-disable-next-line import/no-cycle
import DiagramCollection from './diagramCollection';

const { Transform } = Fig;
export default class LessonDiagram extends CommonLessonDiagram {
  elements: DiagramCollection;

  createDiagramElements() {
    super.createDiagramElements();
    this.elements = new DiagramCollection(this, new Transform('Diagram Elements').translate(0, 0));

    this.elements.hasTouchableElements = true;
  }
}
