// @flow
import React from 'react';
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../common/DiagramCollectionPopup';
import CommonCollection from './collection';
import details from '../../details';
import version from './version';
import StaticQR from '../../../../../../js/components/staticQR';
import perpendicular from './perpendicular.md';

const lessonUID = details.uid;
const versionUID = version.uid;

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
      less_than_90: clickW('less than 90º', coll.goToAcute, [coll], layout.colors.qrAngleTypes_angle),
      acute_angle: click(coll.pulseAngle, [coll], layout.colors.qrAngleTypes_angle),
    };
    this.setTitle('Acute Angle');
    this.setDescription([
      centerH('An |acute_angle| is any angle |less_than_90|.'),
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(0.5);
    fig._line1.makeTouchable();
    fig._acute.showAll();
    fig._line1.move.maxTransform.updateRotation(Math.PI / 2 * 0.98);
    fig._line1.move.minTransform.updateRotation(0);
    this.transformToQRWindow(collection, new Rect(-0.6, 0.5, 2, 1.4));
    this.diagram.animateNextFrame();
  }
}

export class QRRight extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    super(diagram, lessonLayout(), transform, 'collection', CommonCollection);
    // this.hasTouchableElements = true;
    const coll = this._collection;
    const modifiers = {
      right_angle: click(coll.pulseAngle, [coll], this.layout.colors.qrAngleTypes_angle),
      angle_mark: click(coll.pulseAngle, [coll], this.layout.colors.qrAngleTypes_angle),
      _90: highlightWord('90º', this.layout.colors.qrAngleTypes_angle),
    };
    this.setTitle('Right Angle');
    this.setDescription([
      'A |right_angle| is an angle of |_90|. Two lines that form a right angle are called |perpendicular| lines. The |angle_mark| is often shown as a square instead of an arc.',
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    super.show();
    const collection = this._collection;
    // collection.show();
    collection.hideAll();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig.hideAll();
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(Math.PI / 2);
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    this.transformToQRWindow(collection, new Rect(-0.6, 0.3, 2, 1.6));
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
      between_90_and_180: clickW('between 90º and 180º', coll.goToObtuse, [coll], layout.colors.qrAngleTypes_angle),
      obtuse_angle: click(coll.pulseAngle, [coll], layout.colors.qrAngleTypes_angle),
    };
    this.setTitle('Obtuse Angle');
    this.setDescription([
      centerH('An |obtuse_angle| is any angle |between_90_and_180|.'),
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(2);
    fig._line1.makeTouchable();
    fig._obtuse.showAll();
    fig._line1.move.minTransform.updateRotation(Math.PI / 2 * 1.02);
    fig._line1.move.maxTransform.updateRotation(Math.PI * 0.98);
    this.transformToQRWindow(collection, new Rect(-1.2, 0.6, 2.5, 1.2));
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
    // this.hasTouchableElements = true;
    const coll = this._collection;
    const modifiers = {
      straight_angle: click(coll.pulseAngle, [coll], layout.colors.qrAngleTypes_angle),
      _180: clickW('180º', this.makeStraightAngle, [this], layout.colors.qrAngleTypes_angle),
    };
    this.setTitle('Straight Angle');
    this.setDescription([
      centerH([
        'A |straight_angle| is an angle of |_180|.',
      ]),
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  makeStraightAngle() {
    this._collection._fig._line1.setRotation(0);
    this._collection.goToStraight();
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._angle.autoRightAngle = false;
    fig._line1.setRotation(Math.PI);
    this.transformToQRWindow(collection, new Rect(-1.5, 0.5, 3, 1.2));
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
      between_180_and_360: clickW('between 180º and 360º', coll.goToReflex, [coll], layout.colors.qrAngleTypes_angle),
      reflex_angle: click(coll.pulseAngle, [coll], layout.colors.qrAngleTypes_angle),
    };
    this.setTitle('Reflex Angle');
    this.setDescription([
      centerH('An |reflex_angle| is any angle |between_180_and_360|.'),
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.6 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._line1.setRotation(4);
    fig._line1.makeTouchable();
    fig._reflex.showAll();
    fig._line1.move.minTransform.updateRotation(Math.PI * 1.02);
    fig._line1.move.maxTransform.updateRotation(Math.PI * 1.98);
    this.transformToQRWindow(collection, new Rect(-1.5, -0.5, 3, 1.7));
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
    // this.hasTouchableElements = true;
    const coll = this._collection;
    const modifiers = {
      full_angle: click(coll.pulseAngle, [coll], layout.colors.qrAngleTypes_angle),
      _360: clickW('360º', this.makeFullAngle, [this], layout.colors.qrAngleTypes_angle),
    };
    this.setTitle('Full Angle');
    this.setDescription([
      centerH([
        'A |full_angle| is an angle of |_360|.',
      ]),
    ], modifiers);
    this.setLink(`${details.path}/${details.uid}/explanation/base?page=1`);
  }

  makeFullAngle() {
    this._collection._fig._line1.setRotation(0);
    this._collection.goToFull();
  }

  show() {
    this.setDiagramSpace({ location: 'top', size: 0.5 });
    super.show();
    const collection = this._collection;
    collection.hideAll();
    collection.show();
    const fig = collection._fig;
    fig.setScenario('qr');
    fig._line1.showAll();
    fig._line2.showAll();
    fig._angle.showAll();
    fig._angle.autoRightAngle = false;
    fig._line1.setRotation(Math.PI * 1.999);
    this.transformToQRWindow(collection, new Rect(-1.2, 0, 3, 1.7));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(details.path, lessonUID, versionUID, {
  Acute: QRAcute,
  Obtuse: QRObtuse,
  Reflex: QRReflex,
  Right: QRRight,
  Straight: QRStraight,
  Full: QRFull,
  Perpendicular: <StaticQR
    title="Perpendicular Lines"
    content={perpendicular}
    link={`${details.path}/${details.uid}/explanation/base?page=2`}
  />,
});

