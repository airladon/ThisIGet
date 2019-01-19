// @flow
import Fig from 'figureone';
// import { Transform } from '../../../../../../js/diagram/tools/g2';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import TotalAngleTriangleCollection from '../common/diagramCollectionTotalAngleTriangle';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';

const { Transform } = Fig;
const { html } = Fig.tools;

export default class QRTriangle extends PopupBoxCollection {
  _tri: TotalAngleTriangleCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'tri',
      TotalAngleTriangleCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {
      Triangle: html.click(
        this._tri.randomize,
        [this._tri, null], this.layout.colors.line,
      ),
    };

    this.setTitle('Triangle');
    this.setDescription('A |Triangle| is a shape with |three sides|, and |three angles|. All the angles within a triangle add up to |180º| (|π radians|).', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.3);
    super.show();
    const tri = this._tri;
    tri.showAll();
    tri._triangle._point1.setColor([0, 0, 0, 0.1]);
    tri._triangle._point2.setColor([0, 0, 0, 0.1]);
    tri._triangle._point3.setColor([0, 0, 0, 0.1]);
    tri.transform.updateScale(0.7, 0.7);
    tri._line1.hide();
    tri._line2.hide();
    tri._angleA.hide();
    tri._angleB.hide();
    tri._triangle.hasTouchableElements = true;
    tri._triangle.autoShowAngles = true;
    this.diagram.animateNextFrame();
  }
}

// console.log('Tri Tri')
function attachQuickReference() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Main: QRTriangle,
  };
}

attachQuickReference();
