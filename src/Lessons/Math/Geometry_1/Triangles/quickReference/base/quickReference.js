// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
// const {
//   click,
//   highlight,
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
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const collection = this._collection;
    collection.show();
    const total = collection._totalAngle;
    collection.updateTotalAngles();
    total._fixedTriangle._line.show();
    total._angleC.showAll();
    total._angleB.showAll();
    total._angleA.showAll();
    this.transformToQRWindow(collection, new Rect(-2, -0.9, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRTriangle,
});
