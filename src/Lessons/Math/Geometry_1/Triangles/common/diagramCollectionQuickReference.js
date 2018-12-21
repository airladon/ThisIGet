// @flow
import Fig from 'figureone';
import LessonDiagram from './diagram';
// import {
//   Transform,
// } from '../../../../../js/diagram/tools/g2';
import CommonDiagramCollection from '../../../../LessonsCommon/DiagramCollection';
// import AlternateAnglesQR from '../../RelatedAngles/quickReference/alternateAngles';
import { QRAlternateAngles } from '../../RelatedAngles/quickReference/quickReference';
import { QRSupplementaryAngles } from '../../AdjacentAngles/quickReference/quickReference';

const { Transform } = Fig;

export default class QuickReferenceCollection extends CommonDiagramCollection {
  diagram: LessonDiagram;
  _supplementary: QRSupplementaryAngles;
  _alternateAngles: QRAlternateAngles;

  constructor(
    diagram: LessonDiagram,
    layout: Object,
    transform: Transform = new Transform('QR Collection').scale(1, 1).translate(0, 0),
  ) {
    super(diagram, layout, transform);
    this.add('supplementary', new QRSupplementaryAngles(this.diagram));
    this.add('alternateAngles', new QRAlternateAngles(this.diagram));
    this._supplementary.setPosition(0, 0);
    this._alternateAngles.setPosition(0, 0);
    this.hasTouchableElements = true;
  }
}
