// @flow
import Fig from 'figureone';
import CommonLessonDiagram from '../../../../LessonsCommon/CommonLessonDiagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
// import QRTriangle from '../../Triangles/quickReference/quickReference';
// import { QRSss, QRAas } from '../../CongruentTriangles/quickReference/quickReference';
// import { QRRectangle } from '../../Quadrangles/quickReference/quickReference';
// import { QRAlternateAngles } from '../../RelatedAngles/quickReference/quickReference';

const { Transform } = Fig;

export default class QuickReferenceCollection extends CommonDiagramCollection {
  _tri: QRTriangle;
  _sss: QRSss;
  _rect: QRRectangle;
  _aas: QRAas;
  _alt: QRAlternateAngles;
  // _alternateAngles: QRAlternateAngles;

  constructor(
    diagram: CommonLessonDiagram,
    layout: Object,
    transform: Transform = new Transform('QR Collection').scale(1, 1).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    // this.add('tri', new QRTriangle(this.diagram));
    // this.add('sss', new QRSss(this.diagram));
    // this.add('aas', new QRAas(this.diagram));
    // this.add('rect', new QRRectangle(this.diagram));
    // this.add('alt', new QRAlternateAngles(this.diagram));
    const tempObj = this.diagram.shapes.collection();
    this.add('tri', tempObj);
    this.add('sss', tempObj);
    this.add('aas', tempObj);
    this.add('rect', tempObj);
    this.add('alt', tempObj);
    this.hasTouchableElements = true;
  }
}
