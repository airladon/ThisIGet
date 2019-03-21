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

export default class QRDiameter extends PopupBoxCollection {
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
      center: highlight(layout.colors.center),
    };
    this.setTitle('Diameter');
    this.setDescription([
      'The |diameter| is any line that extends the width of the circle while crossing through the |center|.',
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
  };
}

attachQuickReference1();

