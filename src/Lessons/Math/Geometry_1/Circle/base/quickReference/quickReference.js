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
      __diameter__: click(
        this._collection.pulseDiameter, [this._collection], layout.colors.diameter,
      ),
      __diameter___: click(
        this._collection.pulseDiameter, [this._collection], layout.colors.diameter,
      ),
      __center__: highlight(layout.colors.center),
      __circumference__: highlight(layout.colors.circle),
      __radius__: highlight(layout.colors.radius),
    };
    this.setTitle('Diameter');
    this.setDescription([
      'A circle\'s |__diameter__| is any line that extends the width of the circle while crossing through the |__center__|.',
      'The |__diameter___| is twice the |__radius__| and can be multiplied by |π| to get the |__circumference__| length.',
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
      __radius__: click(this._collection.pulseRadius, [this._collection], layout.colors.radius),
      __radius___: click(this._collection.pulseRadius, [this._collection], layout.colors.radius),
      __center__: highlight(layout.colors.center),
      __edge__: highlight(layout.colors.circle),
      __circumference__: highlight(layout.colors.circle),
      __diameter__: highlight(layout.colors.diameter),
    };
    this.setTitle('Radius');
    this.setDescription([
      'A circle\'s |__radius__| is any line that extends from the circle |__center__| to the |__edge__|.',
      'The |__radius___| is half the |__diameter__| and can be multiplied by |2π| to get the |__circumference__| length.',
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
      __circumference__: click(
        this._collection.pulseCircle, [this._collection], layout.colors.circle,
      ),
      __circumference___: click(
        this._collection.pulseCircle, [this._collection], layout.colors.circle,
      ),
      __radius__: highlight(layout.colors.radius),
      __diameter__: highlight(layout.colors.diameter),
    };
    this.setTitle('Circumference');
    this.setDescription([
      'A circle\'s |__circumference__| or |perimeter| is the outside edge of the circle.',
      'The |__circumference___| has a ratio with the |__diameter__| of |π|, and ratio with the |__radius__| of |2π|.',
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
      __center__: highlight(layout.colors.center),
      __outside_edge__: highlight(layout.colors.circle),
    };
    this.setTitle('Circle');
    this.setDescription([
      'A circle is a shape whose |__outside_edge__| is a constant distance from its |__center__|.',
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

