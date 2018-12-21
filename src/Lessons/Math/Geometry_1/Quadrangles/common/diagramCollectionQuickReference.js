// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
import QRTriangle from '../../Triangles/quickReference/quickReference';
import { QRAsa, QRCongruentTriangles } from '../../CongruentTriangles/quickReference/quickReference';
import { QRComplementaryAngles } from '../../AdjacentAngles/quickReference/quickReference';
import { QRInteriorAngles } from '../../RelatedAngles/quickReference/quickReference';

const { Transform } = Fig;

export default class QuickReferenceCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  _tri: QRTriangle;
  _asa: QRAsa;
  _comp: QRComplementaryAngles;
  _congruent: QRCongruentTriangles;
  _interor: QRInteriorAngles;

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform('QR Collection').scale(1, 1).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('tri', new QRTriangle(this.diagram));
    this.add('asa', new QRAsa(this.diagram));
    this.add('comp', new QRComplementaryAngles(this.diagram));
    this.add('congruent', new QRCongruentTriangles(this.diagram));
    this.add('interior', new QRInteriorAngles(this.diagram));
    this.hasTouchableElements = true;
  }
}
