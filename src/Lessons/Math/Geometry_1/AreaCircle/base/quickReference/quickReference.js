// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';

import CircleAreaCollection from '../common/diagramCollectionCircleArea';

const { Transform, Rect } = Fig;
const { html } = Fig.tools;

export default class QR_TODO extends PopupBoxCollection {
  _collection: CircleAreaCollection;

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
      CircleAreaCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = { radius: html.highlight(this.layout.colors.radius) };

    this.setTitle('Area of a Circle');
    this.setDescription('|Circle area| is the product of |π| and the |radius| squared.', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    collection.show();
    collection._circle.show();
    collection._radius.showAll();
    collection.eqns.triRectEqn.showForm('14');
    collection.eqns.triRectEqn.getCurrentForm().arrange(1.5, 'center', 'middle');
    collection.legacySetScenario(collection._radius, { rotation: 0 });
    // collection.transform.updateScale(0.5, 0.5);
    // collection.setPosition(this.layout.position);
    this.transformToQRWindow(collection, new Rect(-1.5, -1.4, 3, 2.4));
    this.diagram.animateNextFrame();
  }
}
