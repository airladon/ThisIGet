// @flow
import Fig from 'figureone';
import lessonLayout from './layout';
// import * as html from '../../../../../../js/tools/htmlGenerator';
import PopupBoxCollection from '../../../../../LessonsCommon/DiagramCollectionPopup';
import details from '../../details';
import version from '../version';
import CommonCollection from '../common/dcCircle';

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
      diameter: click(this._collection.pulseDiameter, [this._collection], layout.colors.diameter),
      diameter_: click(this._collection.pulseDiameter, [this._collection], layout.colors.diameter),
      center: highlight(layout.colors.center),
      circumference: highlight(layout.colors.circle),
      radius: highlight(layout.colors.radius),
    };
    this.setTitle('Diameter');
    this.setDescription([
      'A circle\'s |diameter| is any line that extends the width of the circle while crossing through the |center|.',
      'The |diameter_| is twice the |radius| and can be multiplied by |π| to get the |circumference| length.',
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
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
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.5, 2.5, 2.5));
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
      radius: click(this._collection.pulseRadius, [this._collection], layout.colors.radius),
      radius_: click(this._collection.pulseRadius, [this._collection], layout.colors.radius),
      center: highlight(layout.colors.center),
      edge: highlight(layout.colors.circle),
      circumference: highlight(layout.colors.circle),
      diameter: highlight(layout.colors.diameter),
    };
    this.setTitle('Radius');
    this.setDescription([
      'A circle\'s |radius| is any line that extends from the circle |center| to the |edge|.',
      'The |radius_| is half the |diameter| and can be multiplied by |2π| to get the |circumference| length.',
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
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
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.5, 2.5, 2.5));
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
      circumference: click(this._collection.pulseCircle, [this._collection], layout.colors.circle),
      circumference_: click(this._collection.pulseCircle, [this._collection], layout.colors.circle),
      radius: highlight(layout.colors.radius),
      diameter: highlight(layout.colors.diameter),
    };
    this.setTitle('Circumference');
    this.setDescription([
      'A circle\'s |circumference| or |perimeter| is the outside edge of the circle.',
      'The |circumference_| has a ratio with the |diameter| of |π|, and ratio with the |radius| of |2π|.',
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
    super.show();
    const circle = this._collection._circle;
    circle._line.show();
    this._collection._eqnCircumferenceRadius.showForm('base');
    this._collection._eqnCircumferenceRadius.setScenario('qr');
    this._collection._eqnCircumferenceDiameter.showForm('base');
    this._collection._eqnCircumferenceDiameter.setScenario('qr');
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.5, 2.5, 2.5));
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
      center: highlight(layout.colors.center),
      outside_edge: highlight(layout.colors.circle),
    };
    this.setTitle('Circle');
    this.setDescription([
      'A circle is a shape whose |outside_edge| is a constant distance from its |center|.',
    ], modifiers);
    this.setLink(details.details.uid);
  }

  show() {
    this.setDiagramSpace({ location: 'auto', ySize: 0.7, xSize: 0.5 });
    super.show();
    const circle = this._collection._circle;
    circle._line.show();
    circle._center.show();
    this.transformToQRWindow(this._collection, new Rect(-1.25, -1.25, 2.5, 2.5));
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
    Diameter: QRDiameter,
    Radius: QRRadius,
    Circumference: QRCircumference,
    Circle: QRCircle,
  };
}

attachQuickReference1();

