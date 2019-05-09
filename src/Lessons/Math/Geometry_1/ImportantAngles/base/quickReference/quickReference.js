// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from '../common/diagramCollectionCommon';

const { Transform, Rect } = Fig;
const {
  click,
  centerH,
  clickW,
  highlightWord,
} = Fig.tools.html;

export class QRAcute extends PopupBoxCollection {
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
    const coll = this._collection;
    const modifiers = {
      less_than_90: clickW('less than 90º', coll.goToAcute, [coll], layout.colors.angle),
      acute_angle: click(coll.pulseAngle, [coll], layout.colors.angle),
    };
    this.setTitle('Acute Angle');
    this.setDescription([
      centerH('An |acute_angle| is any angle |less_than_90|.'),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(0.5);
    fig._line1.makeTouchable();
    fig._line1.move.maxTransform.updateRotation(Math.PI / 2 * 0.98);
    fig._line1.move.minTransform.updateRotation(0);
    this.transformToQRWindow(collection, new Rect(-0.6, 0.2, 2, 1.6));
    this.diagram.animateNextFrame();
  }
}

export class QRRight extends PopupBoxCollection {
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
    const coll = this._collection;
    const modifiers = {
      right_angle: click(coll.pulseAngle, [coll], layout.colors.angle),
      angle_mark: click(coll.pulseAngle, [coll], layout.colors.angle),
      _90: highlightWord('90º', layout.colors.angle),
    };
    this.setTitle('Right Angle');
    this.setDescription([
      centerH([
        'A |right_angle| is an angle of |_90|. Two lines that form a right angle are called |perpendicular| lines. The |angle_mark| is often shown as a square instead of an arc.',
      ]),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.6 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(Math.PI / 2);
    this.transformToQRWindow(collection, new Rect(-0.6, 0.2, 2, 1.6));
    this.diagram.animateNextFrame();
  }
}

export class QRObtuse extends PopupBoxCollection {
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
    const coll = this._collection;
    const modifiers = {
      between_90_and_180: clickW('between 90º and 180º', coll.goToObtuse, [coll], layout.colors.angle),
      obtuse_angle: click(coll.pulseAngle, [coll], layout.colors.angle),
    };
    this.setTitle('Obtuse Angle');
    this.setDescription([
      centerH('An |obtuse_angle| is any angle |between_90_and_180|.'),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', xSize: 0, ySize: 0.7 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(2);
    fig._line1.makeTouchable();
    fig._line1.move.minTransform.updateRotation(Math.PI / 2 * 1.02);
    fig._line1.move.maxTransform.updateRotation(Math.PI * 0.98);
    this.transformToQRWindow(collection, new Rect(-1.2, -0.2, 3, 2));
    this.diagram.animateNextFrame();
  }
}

export class QRStraight extends PopupBoxCollection {
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
    const coll = this._collection;
    const modifiers = {
      straight_angle: click(coll.pulseAngle, [coll], layout.colors.angle),
      _180: clickW('180º', this.makeStraightAngle, [this], layout.colors.angle),
    };
    this.setTitle('Straight Angle');
    this.setDescription([
      centerH([
        'A |straight_angle| is an angle of |_180|.',
      ]),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  makeStraightAngle() {
    this._collection._fig._line1.setRotation(0);
    this._collection.goToStraight();
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._angle.autoRightAngle = false;
    fig._line1.setRotation(Math.PI);
    this.transformToQRWindow(collection, new Rect(-1.5, -0.2, 3, 2));
    this.diagram.animateNextFrame();
  }
}

export class QRReflex extends PopupBoxCollection {
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
    const coll = this._collection;
    const modifiers = {
      between_180_and_360: clickW('between 180º and 360º', coll.goToReflex, [coll], layout.colors.angle),
      reflex_angle: click(coll.pulseAngle, [coll], layout.colors.angle),
    };
    this.setTitle('Reflex Angle');
    this.setDescription([
      centerH('An |reflex_angle| is any angle |between_180_and_360|.'),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'top', xSize: 0, ySize: 0.7 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(4);
    fig._line1.makeTouchable();
    fig._line1.move.minTransform.updateRotation(Math.PI * 1.02);
    fig._line1.move.maxTransform.updateRotation(Math.PI * 1.98);
    this.transformToQRWindow(collection, new Rect(-1.2, -1, 3, 2));
    this.diagram.animateNextFrame();
  }
}

export class QRFull extends PopupBoxCollection {
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
    const coll = this._collection;
    const modifiers = {
      full_angle: click(coll.pulseAngle, [coll], layout.colors.angle),
      _360: clickW('360º', this.makeFullAngle, [this], layout.colors.angle),
    };
    this.setTitle('Full Angle');
    this.setDescription([
      centerH([
        'A |full_angle| is an angle of |_360|.',
      ]),
    ], modifiers);
    this.setLink(details.details.uid);
  }

  makeFullAngle() {
    this._collection._fig._line1.setRotation(0);
    this._collection.goToFull();
  }

  show() {
    this.setDiagramSpace({ location: 'top', ySize: 0.7 });
    super.show();
    const collection = this._collection;
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._angle.autoRightAngle = false;
    fig._line1.setRotation(Math.PI * 1.999);
    this.transformToQRWindow(collection, new Rect(-1.2, -0.6, 3, 2));
    this.diagram.animateNextFrame();
  }
}

function attachQuickReference1() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[details.details.uid] == null) {
    window.quickReference[details.details.uid] = {};
  }
  window.quickReference[details.details.uid][version.details.uid] = {
    Acute: QRAcute,
    Obtuse: QRObtuse,
    Reflex: QRReflex,
    Right: QRRight,
    Straight: QRStraight,
    Full: QRFull,
  };
}

attachQuickReference1();

