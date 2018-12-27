// @flow
import Fig from 'figureone';
import lessonLayout from './layout';

import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';

import CommonLessonDiagramCollection from '../common/diagramCollection';
// import ShapesCollection from '../common/diagramCollectionShapes';
import MeasureCollection from '../common/diagramCollectionMeasure';
// import SizeCollection from '../common/diagramCollectionSize';
import RectAreaCollection from '../common/diagramCollectionRect';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  // _shapes: ShapesCollection;
  _measure: MeasureCollection;
  // _size: SizeCollection;
  _rect: RectAreaCollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform(),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    // this.add('shapes', new ShapesCollection(diagram, this.layout));
    this.add('measure', new MeasureCollection(diagram, this.layout));
    // this.add('size', new SizeCollection(diagram, this.layout));
    this.add('rect', new RectAreaCollection(diagram, this.layout));
  }
}
