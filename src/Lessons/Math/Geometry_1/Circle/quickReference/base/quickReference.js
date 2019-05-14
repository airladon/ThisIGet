// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import CommonCollection from './collection';

const lessonUID = require.resolve('../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('./version').split('/').slice(-2, -1)[0];

const { Transform, Rect } = Fig;
const {
  click,
  highlight,
//   clickWord,
} = Fig.tools.html;

export class QRDiameter extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform, 'collection', CommonCollection);
    this.hasTouchableElements = true;
    const modifiers = {
      __diameter__: click(
        this._collection.pulseDiameter, [this._collection], layout.colors.qrCircle_diameter,
      ),
      __diameter___: click(
        this._collection.pulseDiameter, [this._collection], layout.colors.qrCircle_diameter,
      ),
      __center__: highlight(layout.colors.qrCircle_center),
      __circumference__: highlight(layout.colors.qrCircle_circle),
      __radius__: highlight(layout.colors.qrCircle_radius),
    };
    this.setTitle('Diameter');
    this.setDescription([
      'A circle\'s |__diameter__| is any line that extends the width of the circle while crossing through the |__center__|.',
      'The |__diameter___| is twice the |__radius__| and can be multiplied by |π| to get the |__circumference__| length.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const circle = this._collection._circle;
    circle._center.show();
    circle._line.show();
    circle._diameter.showAll();
    circle._diameter.makeTouchable();
    this._collection._eqnDiameterRadius.showForm('base');
    this._collection._eqnDiameterRadius.setScenario('qr');
    this._collection._eqnDiameterCircumference.showForm('base');
    this._collection._eqnDiameterCircumference.setScenario('qr');
    this.transformToQRWindow(this._collection, new Rect(-1.5, -1.9, 2.5, 3));
  }
}

export class QRRadius extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform, 'collection', CommonCollection);
    this.hasTouchableElements = true;
    const modifiers = {
      __radius__: click(this._collection.pulseRadius, [this._collection], layout.colors.qrCircle_radius),
      __radius___: click(this._collection.pulseRadius, [this._collection], layout.colors.qrCircle_radius),
      __center__: highlight(layout.colors.qrCircle_center),
      __edge__: highlight(layout.colors.qrCircle_circle),
      __circumference__: highlight(layout.colors.qrCircle_circle),
      __diameter__: highlight(layout.colors.qrCircle_diameter),
    };
    this.setTitle('Radius');
    this.setDescription([
      'A circle\'s |__radius__| is any line that extends from the circle |__center__| to the |__edge__|.',
      'The |__radius___| is half the |__diameter__| and can be multiplied by |2π| to get the |__circumference__| length.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const circle = this._collection._circle;
    circle._center.show();
    circle._line.show();
    circle._radius.showAll();
    circle._radius.makeTouchable();
    this._collection._eqnRadiusDiameter.showForm('base');
    this._collection._eqnRadiusDiameter.setScenario('qr');
    this._collection._eqnRadiusCircumference.showForm('base');
    this._collection._eqnRadiusCircumference.setScenario('qr');
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.9, 2.5, 3));
  }
}

export class QRCircumference extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform, 'collection', CommonCollection);
    this.hasTouchableElements = true;
    const modifiers = {
      __circumference__: click(
        this._collection.pulseCircle, [this._collection], layout.colors.qrCircle_circle,
      ),
      __circumference___: click(
        this._collection.pulseCircle, [this._collection], layout.colors.qrCircle_circle,
      ),
      __radius__: highlight(layout.colors.qrCircle_radius),
      __diameter__: highlight(layout.colors.qrCircle_diameter),
    };
    this.setTitle('Circumference');
    this.setDescription([
      'A circle\'s |__circumference__| or |perimeter| is the outside edge of the circle.',
      'The |__circumference___| has a ratio with the |__diameter__| of |π|, and ratio with the |__radius__| of |2π|.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const circle = this._collection._circle;
    circle._line.show();
    this._collection._eqnCircumferenceRadius.showForm('base');
    this._collection._eqnCircumferenceRadius.setScenario('qr');
    this._collection._eqnCircumferenceDiameter.showForm('base');
    this._collection._eqnCircumferenceDiameter.setScenario('qr');
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.9, 2.5, 3));
  }
}

export class QRCircle extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform, 'collection', CommonCollection);
    this.hasTouchableElements = true;
    const modifiers = {
      __center__: highlight(layout.colors.qrCircle_center),
      __outside_edge__: highlight(layout.colors.qrCircle_circle),
    };
    this.setTitle('Circle');
    this.setDescription([
      'A circle is a shape whose |__outside_edge__| is a constant distance from its |__center__|.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.5 });
    super.show();
    const circle = this._collection._circle;
    circle._line.show();
    circle._center.show();
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.25, 2.5, 2.5));
  }
}

export class QRPi extends PopupBoxCollection {
  _collection: CommonCollection;

  constructor(
    diagram: Object,
    transform: Transform = new Transform().scale(1, 1).translate(0, 0),
  ) {
    const layout = lessonLayout();
    super(diagram, layout, transform, 'collection', CommonCollection);
    this.hasTouchableElements = true;
    const modifiers = {
      diameter: highlight(layout.colors.qrCircle_diameter),
      circumference: highlight(layout.colors.qrCircle_circle),
    };
    this.setTitle('Pi (π)');
    this.setDescription([
      'The ratio between the |circumference| and |diameter| of a circle is |π|.',
      'The symbol |π|, pronounced |pi|, represents an irrational number that is approximately |3.1415926535|.',
      'In other words, if you multiply the diameter by π, then you get the length of the circumference.',
    ], modifiers);
    this.setLink(lessonUID);
  }

  show() {
    this.setDiagramSpace({ location: 'left', ySize: 0.7, xSize: 0.4 });
    super.show();
    const circle = this._collection._circle;
    circle._diameter.showAll();
    circle._line.show();
    // circle._center.show();
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.6, 2.5, 3));
  }
}

function attachQuickReference1() {
  if (window.quickReference == null) {
    window.quickReference = {};
  }
  if (window.quickReference[lessonUID] == null) {
    window.quickReference[lessonUID] = {};
  }
  window.quickReference[lessonUID][versionUID] = {
    Diameter: QRDiameter,
    Radius: QRRadius,
    Circumference: QRCircumference,
    Circle: QRCircle,
    Pi: QRPi,
  };
}

attachQuickReference1();

