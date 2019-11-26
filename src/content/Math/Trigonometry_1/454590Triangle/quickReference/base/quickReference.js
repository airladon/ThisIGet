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
import external from './external.md';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  // click,
  highlight,
} = Fig.tools.html;

export default class QRMainPres extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      '45º': highlight(colors.angles),
      '90º': highlight(colors.angles),
      '45-45-90_triangle': this._collection.bindToggleGroups(
        this._collection._tri,
        [
          ['A1', 'A2', 'Ar2'],
          ['1', '2', 'r2'],
        ],
        colors.sides,
        ['pulse', 'show'],
      ),
    };
    this.setTitle('45-45-90 Triangle');
    this.setDescription('A triangle with two |45º| angles, and a |90º| angle have |opposite sides with proportions| of |1|, |1| and |√2| respectively. This is commonly called a |45-45-90_triangle|.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll.setScenarios('default');
    const tri = coll._tri;
    tri._r2._label.showForm('0');
    tri._Ar2._label.showForm('0');
    tri._A1.hide();
    tri._A2.hide();
    tri._Ar2.hide();
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(coll, new Rect(-1.75, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  MainPres: QRMainPres,
  Main: <StaticQR
    title=""
    content={external}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
});
