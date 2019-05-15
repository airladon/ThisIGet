// @flow
import Fig from 'figureone';
import { attachQuickReference } from '../../../../../../js/tools/misc';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';

const lessonUID = require.resolve('../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('./version').split('/').slice(-2, -1)[0];

const { Transform, Rect } = Fig;
const {
  click,
//   highlight,
//   clickWord,
} = Fig.tools.html;

export class QRComplementary extends PopupBoxCollection {
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
      Complementary_angles: click(
        coll.goToRandomAngle,
        [coll, [Math.PI / 2, Math.PI / 2], 0, 1.5, null],
        this.layout.colors.diagram.action,
      ),
    };
    this.setTitle('Complementary Angles');
    this.setDescription('|Complementary_angles| add up to a |right angle|, which is |90º|.', modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    const fig = this._collection._fig;
    coll.show();
    fig.showAll();
    fig._angleC.hide();
    fig.setScenario('qr');
    coll._eqns._complementary.setScenario('qr');
    coll._eqns._complementary.showForm('c');
    coll._eqns._complementary.setFormSeries('1');
    fig._line3.move.element = null;
    fig._line3.setRotation(Math.PI / 2);
    fig._line2.setRotation(Math.PI / 6);
    this.transformToQRWindow(coll, new Rect(-0.6, -0.8, 2, 2.4));
    this.diagram.animateNextFrame();
  }
}

export class QRSupplementary extends PopupBoxCollection {
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
      Supplementary_angles: click(
        coll.goToRandomAngle,
        [coll, [Math.PI, Math.PI], 0, 1.5, null],
        this.layout.colors.diagram.action,
      ),
    };
    this.setTitle('Supplementary Angles');
    this.setDescription('|Supplementary_angles| add up to a |straight angle|, which is |180º|.', modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    const fig = this._collection._fig;
    coll.show();
    fig.showAll();
    fig._angleC.hide();
    fig.setScenario('qr');
    coll._eqns._supplementary.setScenario('qr');
    coll._eqns._supplementary.showForm('c');
    coll._eqns._supplementary.setFormSeries('1');
    fig._line3.move.element = null;
    fig._line3.setRotation(Math.PI);
    fig._line2.setRotation(Math.PI / 3);
    this.transformToQRWindow(coll, new Rect(-1.5, -1, 3, 2.4));
    this.diagram.animateNextFrame();
  }
}

export class QRExplementary extends PopupBoxCollection {
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
      Explementary_angles: click(
        coll.goToRandomAngle,
        [coll, [Math.PI * 1.999, Math.PI * 1.999], 0, 1.5, null],
        this.layout.colors.diagram.action,
      ),
    };
    this.setTitle('Explementary Angles');
    this.setDescription('|Explementary_angles| add up to a |full angle|, which is |360º|.', modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const coll = this._collection;
    const fig = this._collection._fig;
    coll.show();
    fig.showAll();
    fig._angleC.hide();
    fig.setScenario('qr');
    coll._eqns._explementary.setScenario('qr');
    coll._eqns._explementary.showForm('c');
    coll._eqns._explementary.setFormSeries('1');
    fig._line3.move.element = null;
    fig._line3.setRotation(Math.PI * 1.999);
    fig._line2.setRotation(Math.PI / 3 * 2);
    this.transformToQRWindow(coll, new Rect(-1.5, -1.2, 3, 2.4));
    this.diagram.animateNextFrame();
  }
}

attachQuickReference(lessonUID, versionUID, {
  Complementary: QRComplementary,
  Supplementary: QRSupplementary,
  Explementary: QRExplementary,
});
