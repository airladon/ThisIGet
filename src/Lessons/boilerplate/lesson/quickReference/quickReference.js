// @flow

import { Transform } from '../../../../../js/diagram/tools/g2';
import lessonLayout from './layout';
// import * as html from '../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../details';

import XCollection from '../common/diagramCollectionX';


export default class QR_TODO extends PopupBoxCollection {
  _collection: XCollection;

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
      XCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};

    this.setTitle('TODO');
    this.setDescription('TODO', modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSize(2.5, 1.3);
    super.show();
    const collection = this._collection;
    collection.showAll();
    collection.transform.updateScale(0.7, 0.7);
    // collection.setPosition(this.layout.position);
    this.diagram.animateNextFrame();
  }
}
