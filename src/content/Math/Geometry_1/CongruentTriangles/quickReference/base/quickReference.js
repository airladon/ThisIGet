// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import diagramLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';

const topicUID = details.uid;
const versionUID = version.uid;

const { Transform, Rect } = Fig;
const {
  click,
  highlight,
  highlightWord,
} = Fig.tools.html;

export class QRCongruentTriangles extends PopupBoxCollection {
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

    const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      side_lengths: highlight(colors.qrCongruent_sides),
      angles: highlight(colors.qrCongruent_angles),
      rotated: click(coll.rotateTriangle, [coll, null, null], colors.diagram.action),
      flipped: click(coll.simpleFlip, [coll, 1, null], colors.diagram.action),
    };
    this.setTitle('Congruent Triangles');
    this.setDescription(['Triangles are congruent when they have the same corresponding |side_lengths| and |angles|. Shapes remain congruent even if they are |rotated| or |flipped|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6, xSize: 0.5 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    collection.isFlipped = false;
    congruent._tri1.setScenario('qrLeft');
    congruent._tri2.setScenario('qrRight');
    congruent._tri2.makeTouchable();
    congruent._tri2.isMovable = true;
    congruent._tri2.touchInBoundingRect = true;
    congruent._tri2.move.type = 'rotation';
    this.transformToQRWindow(collection, new Rect(-1.8, -1.1, 3.6, 2.2));
    this.diagram.animateNextFrame();
  }
}

export class QRAaa extends PopupBoxCollection {
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

    const { colors } = this.layout;
    const modifiers = {
      different_side_lengths: highlight(colors.qrCongruent_sides),
      three_angles: highlight(colors.qrCongruent_angles),
    };
    this.setTitle('AAA Congruence');
    this.setDescription(['Triangles with the same |three_angles| can have |different_side_lengths|. Therefore knowing two triangles have the same three angles is |not sufficient to determine if they are congruent|.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.55 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    congruent._tri1._side01.hide();
    congruent._tri1._side12.hide();
    congruent._tri1._side20.hide();
    congruent._tri2._side01.hide();
    congruent._tri2._side12.hide();
    congruent._tri2._side20.hide();
    congruent._tri1.setScenario('qrLeftAaa');
    congruent._tri2.setScenario('qrRightAaa');
    this.transformToQRWindow(collection, new Rect(-3.2, -1, 6, 2.2));
    this.diagram.animateNextFrame();
  }
}

export class QRSas extends PopupBoxCollection {
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

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      two_sides_of_the_same_length: highlight(colors.qrCongruent_sides),
      three_angles: highlight(colors.qrCongruent_angles),
    };
    this.setTitle('SAS Congruence');
    this.setDescription([
      'If two triangles share |two_sides_of_the_same_length|, and the |angle_between| those two sides is also the same on both triangles, then the triangles |are congruent|. This case is often called the |Side Angle Side| case.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    congruent._tri1.setScenario('qrLeft');
    congruent._tri2.setScenario('qrRight');
    congruent._tri1._side01.hide();
    congruent._tri1._angle1.hide();
    congruent._tri1._angle0.hide();
    congruent._tri2._side01.hide();
    congruent._tri2._angle1.hide();
    congruent._tri2._angle0.hide();
    this.transformToQRWindow(collection, new Rect(-1.8, -0.95, 3.6, 1.9));
    this.diagram.animateNextFrame();
  }
}

export class QRSsa extends PopupBoxCollection {
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

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      angle_a: highlightWord('angle (a)', colors.qrCongruent_angles),
    };
    this.setTitle('SSA Congruence');
    this.setDescription([
      'If two triangles have the same |angle_a|, |adjacent side (B)|, and |opposite side (A)|, then we can only be sure they are |congruent| if the |opposite side is longer or equal to the adjacent side|, or |A ≥ B|. This case is often called the |Side Side Angle| case.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    congruent._tri1.setScenario('qrLeft');
    congruent._tri2.setScenario('qrRight');
    congruent._tri1._side20.hide();
    congruent._tri1._angle1.hide();
    congruent._tri1._angle0.hide();
    congruent._tri2._side20.hide();
    congruent._tri2._angle1.hide();
    congruent._tri2._angle0.hide();
    this.transformToQRWindow(collection, new Rect(-1.8, -0.95, 3.6, 1.9));
    this.diagram.animateNextFrame();
  }
}

export class QRAsa extends PopupBoxCollection {
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

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      two_angles: highlight(colors.qrCongruent_angles),
      side_between: highlight(colors.qrCongruent_sides),
    };
    this.setTitle('ASA Congruence');
    this.setDescription([
      'If two triangles share the same |two_angles| and |side_between| them, then they will be |congruent|.',
      'This case is often called the |Angle Side Angle| case.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    congruent._tri1.setScenario('qrLeft');
    congruent._tri2.setScenario('qrRight');
    congruent._tri1._side20.hide();
    congruent._tri1._side01.hide();
    congruent._tri1._angle0.hide();
    congruent._tri2._side20.hide();
    congruent._tri2._side01.hide();
    congruent._tri2._angle0.hide();
    this.transformToQRWindow(collection, new Rect(-1.8, -0.95, 3.6, 1.9));
    this.diagram.animateNextFrame();
  }
}

export class QRAas extends PopupBoxCollection {
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

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      two_angles: highlight(colors.qrCongruent_angles),
      side_not_between: highlight(colors.qrCongruent_sides),
    };
    this.setTitle('AAS Congruence');
    this.setDescription([
      'If two triangles share the same |two_angles| and relatively positioned |side_not_between| them, then they will be |congruent|. This case is often called the |Angle Angle Side| case.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    congruent._tri1.setScenario('qrLeft');
    congruent._tri2.setScenario('qrRight');
    congruent._tri1._side20.hide();
    congruent._tri1._side12.hide();
    congruent._tri1._angle0.hide();
    congruent._tri2._side20.hide();
    congruent._tri2._side12.hide();
    congruent._tri2._angle0.hide();
    this.transformToQRWindow(collection, new Rect(-1.8, -0.95, 3.6, 1.9));
    this.diagram.animateNextFrame();
  }
}


export class QRSss extends PopupBoxCollection {
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

    // const coll = this._collection;
    const { colors } = this.layout;
    const modifiers = {
      side_lengths: highlight(colors.qrCongruent_sides),
    };
    this.setTitle('SSS Congruence');
    this.setDescription([
      'If two triangles share the same |side_lengths|, then they will be |congruent|. This case is often called the |Side Side Side| case.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    const congruent = collection._congruentTriangles;
    congruent.showAll();
    collection.resetTriangle();
    congruent._tri1.setScenario('qrLeft');
    congruent._tri2.setScenario('qrRight');
    congruent._tri1._angle0.hide();
    congruent._tri1._angle1.hide();
    congruent._tri1._angle2.hide();
    congruent._tri2._angle0.hide();
    congruent._tri2._angle1.hide();
    congruent._tri2._angle2.hide();
    this.transformToQRWindow(collection, new Rect(-1.8, -0.8, 3.6, 1.9));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, topicUID, versionUID, {
  CongruentTriangles: QRCongruentTriangles,
  Aaa: QRAaa,
  Sas: QRSas,
  Ssa: QRSsa,
  Asa: QRAsa,
  Aas: QRAas,
  Sss: QRSss,
});
