// @flow
import React from 'react';
import Fig from 'figureone';
import StaticQR from '../../../../../../js/components/staticQR';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import triangle from './triangle.md';

const topicUID = details.uid;
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
    const layout = diagramLayout();
    super(
      diagram,
      layout,
      transform,
      'collection',
      CommonCollection,
    );
    this.hasTouchableElements = true;

    const modifiers = {};
    this.setTitle('Triangle');
    this.setDescription('A |triangle| is a shape that has |three sides| and |three angles|. All the angles within a triangle add up to |180º|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const collection = this._collection;
    collection.show();
    const total = collection._totalAngle;
    const eqn = collection._eqn;
    collection.updateTotalAngles();
    total._fixedTriangle._line.show();
    total._angleC.showAll();
    total._angleB.showAll();
    total._angleA.showAll();
    eqn.showForm('0');
    eqn.setScenario('default');
    this.transformToQRWindow(collection, new Rect(-2, -0.9, 4, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  AngleSumPres: QRTriangle,
  AngleSum: <StaticQR
    title="Triangle"
    content={triangle}
    link={`${details.path}/${details.uid}/summary/base?page=1`}
  />,
});
