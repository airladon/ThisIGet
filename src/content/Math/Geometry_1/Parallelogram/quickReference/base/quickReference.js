// @flow
import Fig from 'figureone';
import React from 'react';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import StaticQR from '../../../../../../js/components/staticQR';
// import external from './external.md';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
  style,
//   highlight,
} = Fig.tools.html;

export default class QRMainPres extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const pgram = coll._pgram;
    const { colors } = this.layout;
    const modifiers = {
      parallelogram: this.bindAccent(pgram),
    };
    this.setTitle('Parallelogram');
    this.setDescription([
      'A |parallelogram| is a four sided shape with |parallel opposite sides|. It\'s properties are |opposite sides are equal|, |opposite angles are equal|, |diagonals intersect at their midpoints|. Conversely, if a four sided shape has any of these properties, it is a parallelogram. A parallelogram\'s area is: |Area| = |A| \u00D7 |H|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll.setScenarios('default');
    this.setDiagramSpace({ location: 'top', size: 0.55 });
    this.transformToQRWindow(coll, new Rect(-1.8, -1, 3.6, 2.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  MainPres: QRMainPres,
  // Main: <StaticQR
  //   title=""
  //   content={external}
  //   link={`${details.path}/${details.uid}/explanation/base?page=1`}
  // />,
});
