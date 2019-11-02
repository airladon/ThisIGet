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
import similar from './similar.md';
import sas from './sas.md';
import aa from './aa.md';
import ssa from './ssa.md';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
  // highlight,
} = Fig.tools.html;

export class QRSimilar extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const { colors } = this.layout;
    this.setTitle('Similar Triangles');
    const modifiers = {
      corresponding_angles: click(coll.pulseAngles, [coll, null], colors.qrSimilarTrianglesAngles),
      corresponding_angles_: click(coll.pulseAngles, [coll, null], colors.qrSimilarTrianglesAngles),
      corresponding_sides: click(coll.pulseTriRSide, [coll, null], colors.qrSimilarTrianglesSides),
    };
    this.setDescription([
      '|Similar triangles| have |corresponding_sides| that are proportional (have the same |scaling| factor, shown as |s| in the diagram).',
      'All |similar triangles| have equal |corresponding_angles|, and all triangles with equal |corresponding_angles_| angles are |similar|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll.setScenarios('default');
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(coll, new Rect(-2, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

export class QRAA extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      two_corresponding_angles: click(coll.toggleAa, [coll, true], colors.qrSimilarTrianglesAngles),
    };
    this.setTitle('AA Similarity');
    this.setDescription('If any triangles have |two_corresponding_angles| that are |equal|, then the triangles are |similar|. This is often called the |AA| similarity test.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll.setScenarios('default');
    coll.toggleAa(false);
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(coll, new Rect(-2, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

export class QRSAS extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      any_triangles: click(coll.toggleSas, [coll, true], colors.diagram.action),
      two_corresponding_sides: click(coll.pulseAllSides, [coll], colors.qrSimilarTrianglesSides),
      equal_angle: click(coll.pulseAllAngles, [coll], colors.qrSimilarTrianglesAngles),
    };
    this.setTitle('SAS Similarity');
    this.setDescription('If |any_triangles| have |two_corresponding_sides| that are proportional and share an |equal_angle| between those sides, then the triangles are |similar|. This is often called the |SAS| similarity test.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll.setScenarios('default');
    coll.toggleSas(false);
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(coll, new Rect(-2, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

export class QRSSA extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, diagramLayout(), transform, 'collection', CommonCollection);

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      any_triangles: click(coll.toggleSsa, [coll, true], colors.diagram.action),
      two_corresponding_sides: click(coll.pulseAllSides, [coll], colors.qrSimilarTrianglesSides),
      equal_angle: click(coll.pulseAllAngles, [coll], colors.qrSimilarTrianglesAngles),
      adjacent: click(coll.pulseAdjacent, [coll], colors.qrSimilarTrianglesSides),
      opposite: click(coll.pulseOpposite, [coll], colors.qrSimilarTrianglesSides),
    };
    this.setTitle('SSA Similarity');
    this.setDescription('If |any_triangles| have |two_corresponding_sides| that are proportional and share a corresponding |equal_angle| adjacent to just one of the sides, then the triangles are |only similar| if the side |opposite| the angle is |greater than or equal to| the |adjacent| side. This is often called the |SSA| similarity test.', modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const coll = this._collection;
    coll.showAll();
    coll.setScenarios('default');
    coll.toggleSsa(false);
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(coll, new Rect(-2, -1, 3.5, 2.2));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  SimilarPres: QRSimilar,
  SsaPres: QRSSA,
  SasPres: QRSAS,
  AaPres: QRAA,
  Similar: <StaticQR
    title=""
    content={similar}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
  Sas: <StaticQR
    title=""
    content={sas}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
  Aa: <StaticQR
    title=""
    content={aa}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
  Ssa: <StaticQR
    title=""
    content={ssa}
    link={`${details.path}/${details.uid}/explanation/base?page=1`}
  />,
});
