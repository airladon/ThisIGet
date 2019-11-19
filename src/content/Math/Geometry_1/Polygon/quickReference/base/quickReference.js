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
import polygon from './polygon.md';
import regular from './regular.md';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  // click,
  highlight,
} = Fig.tools.html;

export class QRPolygon extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      total_angle: highlight(colors.angles),
    };
    this.setTitle('Polygon');
    this.setDescription('A |polygon| is a shape made up of |straight sides|. A polygon with |n| sides has a |total_angle| of:', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll.show([coll._poly0, coll._poly1, coll._poly2]);
    coll._eqnTot.showForm('0');
    coll.setScenarios('default');
    // coll._eqnTot.setScenario('default');
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    this.transformToQRWindow(coll, new Rect(-1.75, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

export class QRRegularPolygon extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    // const coll = this._collection;
    // const { colors } = this.layout;
    const modifiers = {};
    this.setTitle('Regular Polygon');
    this.setDescription('A |regular polygon| is a polygon with |equal sides and angles|. Each angle of an |n|-sided polygon has a measure of:', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.hideAll();
    coll.show([coll._p3, coll._p5, coll._p8]);
    coll.setScenarios('default');
    coll._eqnTot.showForm('1');
    coll._eqnTot.setScenarios('low');
    this.setDiagramSpace({ location: 'top', size: 0.4 });
    this.transformToQRWindow(coll, new Rect(-1.7, -0.6, 3.4, 1.7));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  PolygonPres: QRPolygon,
  RegularPolygonPres: QRRegularPolygon,
  Polygon: <StaticQR
    title="Polygon"
    content={polygon}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
  RegularPolygon: <StaticQR
    title="Regular Polygon"
    content={regular}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
});
