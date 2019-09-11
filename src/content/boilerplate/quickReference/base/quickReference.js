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

const lessonUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
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
    const { colors } = this.layout;
    const modifiers = {};
    this.setTitle('');
    this.setDescription('', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    
    super.show();
    const coll = this._collection;
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(coll, new Rect(-2, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  MainPres: QRMainPres,
  // Main: <StaticQR
  //   title=""
  //   content={external}
  //   link={`${details.path}/${details.uid}/explanation/base?page=1`}
  // />,
});
