// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../common/diagram';

// eslint-disable-next-line import/no-cycle
import DiagramCollection from './diagramCollection';
// import { Transform } from '../../../../../js/diagram/tools/g2';

const { Transform } = Fig;

class LessonDiagram extends CommonLessonDiagram {
  elements: DiagramCollection;

  createDiagramElements() {
    super.createDiagramElements();
    this.elements = new DiagramCollection(this, new Transform('Summary').scale(1, 1).rotate(0).translate(0, 0));

    this.elements.hasTouchableElements = true;
  }
}

export default LessonDiagram;
