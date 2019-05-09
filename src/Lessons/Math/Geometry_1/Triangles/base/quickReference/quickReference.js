// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, Rect } = Fig;
// const {
//   click,
//   highlight,
//   clickWord,
// } = Fig.tools.html;

export default class QRTriangle extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('');
    this.setDescription('A |triangle| is a shape that has |three sides| and |three angles|. All the angles within a triangle add up to |180º|.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    const total = collection._totalAngle;
    collection.updateTotalAngles();
    total._fixedTriangle._line.show();
    total._angleC.showAll();
    total._angleB.showAll();
    total._angleA.showAll();
    this.transformToQRWindow(collection, new Rect(-2, -1.4, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference1() {
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

attachQuickReference1();

