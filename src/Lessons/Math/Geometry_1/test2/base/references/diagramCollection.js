// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import CommonLessonDiagram from '../../../../../LessonsCommon/CommonLessonDiagram';
import CommonLessonDiagramCollection from '../common/diagramCollection';
import TriangleCollection from '../common/diagramCollectionTriangles';
import AAACollection from '../common/diagramCollectionAAA';
import SASCollection from '../common/diagramCollectionSAS';
import SSSCollection from '../common/diagramCollectionSSS';
import SSACollection from '../common/diagramCollectionSSA';

const { Transform } = Fig;

export default class DiagramCollection extends CommonLessonDiagramCollection {
  _triangle: TriangleCollection;
  _aaa: AAACollection;
  _sas: SASCollection;
  _sss: SSSCollection;
  _ssa: SSACollection;

  constructor(
    diagram: CommonLessonDiagram,
    transform: Transform = new Transform('1 DiagramCollection'),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform);

    this.add('triangle', new TriangleCollection(diagram, this.layout));
    this.add('aaa', new AAACollection(diagram, this.layout));
    this.add('sas', new SASCollection(diagram, this.layout));
    this.add('sss', new SSSCollection(diagram, this.layout));
    this.add('ssa', new SSACollection(diagram, this.layout));
    this.hasTouchableElements = true;
  }
}
