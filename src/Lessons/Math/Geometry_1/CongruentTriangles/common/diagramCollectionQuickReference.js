// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import QRTriangle from '../../Triangles/quickReference/quickReference';
import { QRAsa, QRSss, QRAas } from '../quickReference/quickReference';

const { Transform } = Fig;

export default class QuickReferenceCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  _tri: QRTriangle;
  _asa: QRAsa;
  _sss: QRSss;
  _aas: QRAas;
  // _alternateAngles: QRAlternateAngles;

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform('QR Collection').scale(1, 1).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('tri', new QRTriangle(this.diagram));
    this.add('asa', new QRAsa(this.diagram));
    // this.add('sss', diagram.shapes.collection());
    this.add('sss', new QRSss(this.diagram));
    this.add('aas', new QRAas(this.diagram));
    this.hasTouchableElements = true;
  }
}
