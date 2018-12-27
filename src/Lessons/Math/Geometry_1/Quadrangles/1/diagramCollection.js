// @flow
import Fig from 'figureone';
import lessonLayout from './layout';

// eslint-disable-next-line import/no-cycle
import LessonDiagram from './diagram';

import CommonLessonDiagramCollection from '../common/diagramCollection';
// import QuickReferenceCollection from '../common/diagramCollectionQuickReference';
import QuadCollection from '../common/diagramCollectionQuad';
import RectCollection from '../common/diagramCollectionRect';
import SquareCollection from '../common/diagramCollectionSquare';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  // _triangle: TriangleCollection;
  // _qr: QuickReferenceCollection;
  _quad: QuadCollection;
  _rect: RectCollection;
  _square: SquareCollection;

  constructor(
    diagram: LessonDiagram,
    transform: Transform = new Transform('1 DiagramCollection'),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('quad', new QuadCollection(diagram, this.layout));
    this.add('rect', new RectCollection(diagram, this.layout));
    this.add('square', new SquareCollection(diagram, this.layout));
    // this.add('qr', new QuickReferenceCollection(diagram, this.layout));
    // this._qr.hideAll();
    this.hasTouchableElements = true;
  }
}
