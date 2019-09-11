// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
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

export default class QRQuadrangle extends PopupBoxCollection {
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
    this.setTitle('Quadrangles');
    this.setDescription('A |quadrangle|, or |quadrilateral| is a shape with |four sides| and |four angles|. A quadrangle\'s angles will always add to |360º|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    collection._quad1.showAll();
    collection._quad2.showAll();
    collection._quad3.showAll();
    this.transformToQRWindow(collection, new Rect(-2.5, -0.5, 5, 1.8));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Main: QRQuadrangle,
});
